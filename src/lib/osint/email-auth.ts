import { unwrapTxt, type SurfaceFinding } from "./surface";

export type SpfQualifier = "fail-open" | "softfail" | "reject" | "neutral" | "unknown" | "missing";
export type DmarcPolicy = "none" | "quarantine" | "reject" | "missing";

export type EmailAuthResult = {
  spf: { present: boolean; record: string | null; qualifier: SpfQualifier };
  dmarc: { present: boolean; record: string | null; policy: DmarcPolicy };
  findings: SurfaceFinding[];
};

function flattenTxt(records: string[]): string[] {
  return records.map(unwrapTxt).filter(Boolean);
}

function spfQualifier(record: string): SpfQualifier {
  if (/\+all\b/i.test(record)) return "fail-open";
  if (/~all\b/i.test(record)) return "softfail";
  if (/-all\b/i.test(record)) return "reject";
  if (/\?all\b/i.test(record)) return "neutral";
  if (/(?:^|\s)all\b/i.test(record)) return "fail-open";
  return "unknown";
}

export function analyzeEmailAuth(txtRecords: string[], dmarcTxt: string[] = []): EmailAuthResult {
  const txt = flattenTxt(txtRecords);
  const dmarcRecords = flattenTxt(dmarcTxt);
  const spfRecord = txt.find((r) => /^v=spf1\b/i.test(r)) ?? null;
  const dmarcRecord =
    dmarcRecords.find((r) => /^v=dmarc1\b/i.test(r)) ?? txt.find((r) => /^v=dmarc1\b/i.test(r)) ?? null;

  const qualifier: SpfQualifier = spfRecord ? spfQualifier(spfRecord) : "missing";
  let policy: DmarcPolicy = "missing";
  if (dmarcRecord) {
    const m = /[;\s]p\s*=\s*(none|quarantine|reject)/i.exec(dmarcRecord);
    policy = (m?.[1]?.toLowerCase() as DmarcPolicy) ?? "none";
  }

  const findings: SurfaceFinding[] = [];

  if (!spfRecord) {
    findings.push({
      id: "spf-missing",
      title: "No SPF record published",
      severity: "medium",
      owasp: "A07:2021 Identification Failures",
      cwe: "CWE-290",
      observation: "No TXT starting with v=spf1",
      why: "Receivers have no list of hosts allowed to send mail as this domain. Spoofed invoices and password resets become easier.",
      fix: "Publish a tight SPF, then move to -all once every legitimate sender is listed.",
      stop: "Do not send spoofed mail to “demonstrate” the gap. That is fraud.",
    });
  } else if (qualifier === "fail-open") {
    findings.push({
      id: "spf-plus-all",
      title: "SPF ends in +all (fail-open)",
      severity: "medium",
      owasp: "A07:2021 Identification Failures",
      cwe: "CWE-290",
      observation: spfRecord,
      why: "+all (or a bare all) tells receivers that every host on the internet is an authorised sender. SPF is present and useless.",
      fix: "Replace +all with -all after listing your real mailers (Google, Microsoft, your MTA).",
      stop: "Do not forge From: headers for this domain.",
    });
  } else if (qualifier === "softfail" || qualifier === "neutral") {
    findings.push({
      id: "spf-soft",
      title: qualifier === "softfail" ? "SPF uses ~all (softfail)" : "SPF uses ?all (neutral)",
      severity: "low",
      owasp: "A07:2021 Identification Failures",
      cwe: "CWE-290",
      observation: spfRecord,
      why: "Softfail is a stepping stone. Many inboxes still deliver the message, marked as suspicious at best.",
      fix: "Graduate to -all and add a DMARC policy.",
      stop: "Do not run a phishing exercise against real inboxes without written authorisation.",
    });
  } else if (qualifier === "reject") {
    findings.push({
      id: "spf-ok",
      title: "SPF ends in -all",
      severity: "ok",
      owasp: "A07:2021 Identification Failures",
      cwe: "CWE-290",
      observation: spfRecord,
      why: "Fail-closed SPF is the baseline. It still needs DMARC so receivers know what to do.",
      fix: "Keep the include: chain accurate when you change mail providers.",
      stop: "N/A",
    });
  }

  if (!dmarcRecord) {
    findings.push({
      id: "dmarc-missing",
      title: "No DMARC policy at _dmarc",
      severity: "medium",
      owasp: "A07:2021 Identification Failures",
      cwe: "CWE-290",
      observation: "No TXT starting with v=DMARC1",
      why: "DMARC is how a domain asks receivers to quarantine or reject unauthenticated mail. Without it, SPF/DKIM are advisory.",
      fix: "Publish _dmarc.example.com TXT v=DMARC1; p=none; rua=mailto:dmarc@example.com then raise p= to quarantine, then reject.",
      stop: "Do not buy a “spoof test” service against someone else’s domain.",
    });
  } else if (policy === "none") {
    findings.push({
      id: "dmarc-none",
      title: "DMARC policy is p=none (monitor only)",
      severity: "low",
      owasp: "A07:2021 Identification Failures",
      cwe: "CWE-290",
      observation: dmarcRecord,
      why: "p=none is the correct first week. A year later it is unfinished work: spoofed mail still delivers.",
      fix: "Read rua reports, then p=quarantine, then p=reject.",
      stop: "N/A",
    });
  } else {
    findings.push({
      id: "dmarc-ok",
      title: `DMARC policy is p=${policy}`,
      severity: "ok",
      owasp: "A07:2021 Identification Failures",
      cwe: "CWE-290",
      observation: dmarcRecord,
      why: "Receivers have a clear instruction. This is what you want on a bank, a university, or a clinic.",
      fix: "Watch rua reports after provider changes.",
      stop: "N/A",
    });
  }

  return {
    spf: { present: Boolean(spfRecord), record: spfRecord, qualifier },
    dmarc: { present: Boolean(dmarcRecord), record: dmarcRecord, policy },
    findings,
  };
}
