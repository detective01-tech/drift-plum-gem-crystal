import type { SurfaceFinding } from "./surface";

export type PathStep = {
  n: string;
  kind: "observe" | "infer" | "stop" | "defend";
  title: string;
  body: string;
};

export type RangeScenario = {
  id: string;
  kicker: string;
  title: string;
  org: string;
  minutes: number;
  blurb: string;
  viva: string;
  findings: SurfaceFinding[];
  path: PathStep[];
  evidence: { label: string; value: string }[];
};

export const SCENARIOS: RangeScenario[] = [
  {
    id: "harbor-clinic",
    kicker: "Web misconfiguration",
    title: "Harbor Clinic — the street-view stack",
    org: "Fictional private clinic (training range only)",
    minutes: 8,
    blurb:
      "A public homepage leaks its runtime, forgets security headers, and advertises /backup/ in robots.txt. Nothing here is an exploit — it is what a stranger learns from one GET.",
    viva: "Explain the difference between information disclosure (CWE-200) and exploiting a PHP CVE. Examiners want the stop line.",
    evidence: [
      { label: "Host", value: "www.harbor-clinic.example (fictional)" },
      { label: "Server", value: "Apache/2.4.41 (Ubuntu)" },
      { label: "X-Powered-By", value: "PHP/7.4.3" },
      { label: "HTTPS", value: "Yes, no HSTS" },
      { label: "robots.txt", value: "Disallow: /backup/  ·  Disallow: /phpmyadmin/" },
      { label: "security.txt", value: "absent" },
    ],
    findings: [
      {
        id: "hc-php",
        title: "PHP/7.4.3 advertised on every page",
        severity: "medium",
        owasp: "A06:2021 Vulnerable Components",
        cwe: "CWE-200",
        observation: "X-Powered-By: PHP/7.4.3 — end-of-life since 2022.",
        why: "The version is a public index into the CVE list. The header is the finding. The exploit is a different, illegal act.",
        fix: "Upgrade to a supported PHP. Set expose_php=off. Stop sending X-Powered-By.",
        stop: "Do not run a PHP exploit, webshell, or scanner against any clinic — fictional or real.",
      },
      {
        id: "hc-headers",
        title: "No HSTS, CSP, or frame-ancestors",
        severity: "medium",
        owasp: "A05:2021 Misconfiguration",
        cwe: "CWE-693",
        observation: "Strict-Transport-Security, Content-Security-Policy, X-Frame-Options all absent.",
        why: "A login page that can be framed is a clickjacking classroom example. Missing HSTS leaves the first hop on HTTP.",
        fix: "Add the three headers at the reverse proxy. Test with this lab’s HTTP surface module.",
        stop: "Do not host a clickjacking PoC against the live hostname.",
      },
      {
        id: "hc-robots",
        title: "robots.txt points at backup and phpMyAdmin",
        severity: "medium",
        owasp: "A05:2021 Misconfiguration",
        cwe: "CWE-200",
        observation: "Disallow: /backup/ · Disallow: /phpmyadmin/",
        why: "Search engines are asked not to index those paths. Humans read the same file. Disallow is not a password.",
        fix: "Remove the apps from the public vhost. Firewall phpMyAdmin. Delete backup zips from the web root. Then rewrite robots.txt.",
        stop: "Do not fetch /backup or /phpmyadmin on a host you do not own. That is access, not OSINT.",
      },
    ],
    path: [
      {
        n: "01",
        kind: "observe",
        title: "One public GET",
        body: "Headers and robots.txt are volunteered by the server. No login, no scan, no payload.",
      },
      {
        n: "02",
        kind: "infer",
        title: "Stack + forgotten paths",
        body: "PHP 7.4.3 plus /backup/ is a hypothesis: unpatched runtime, possible leftover archive. Hypothesis is not proof.",
      },
      {
        n: "03",
        kind: "stop",
        title: "Stop before the payload",
        body: "Looking up CVE-2024-… in a database is literature. Sending it to the clinic is PECA / Computer Misuse. The range ends here.",
      },
      {
        n: "04",
        kind: "defend",
        title: "What the clinic should do this week",
        body: "Patch PHP, hide versions, add headers, pull admin tools off the internet, publish security.txt, take a backup that is not in /var/www.",
      },
    ],
  },
  {
    id: "northwind-mail",
    kicker: "Email authentication",
    title: "Northwind Logistics — anyone may speak as finance",
    org: "Fictional freight SME (training range only)",
    minutes: 7,
    blurb:
      "DNS says the company has mail. SPF ends in +all. There is no DMARC. A stranger can see, from public TXT records, that spoofed invoices will likely deliver.",
    viva: "Quote the SPF record, explain +all versus -all, and say why actually sending a spoofed message is fraud, not a lab exercise.",
    evidence: [
      { label: "Domain", value: "northwind-lab.example (fictional)" },
      { label: "MX", value: "10 mail.northwind-lab.example" },
      { label: "SPF", value: "v=spf1 ip4:203.0.113.10 +all" },
      { label: "DMARC", value: "none published" },
      { label: "DKIM", value: "not enumerated (selector guessing is out of scope)" },
    ],
    findings: [
      {
        id: "nw-spf",
        title: "SPF fail-open (+all)",
        severity: "medium",
        owasp: "A07:2021 Identification Failures",
        cwe: "CWE-290",
        observation: "v=spf1 ip4:203.0.113.10 +all",
        why: "The ip4 mechanism names one server, then +all authorises the rest of the internet. Receivers that honour SPF will still pass a forged message.",
        fix: "v=spf1 ip4:203.0.113.10 include:_spf.google.com -all — only list real senders.",
        stop: "Do not send a fake invoice from accounts@northwind-lab.example. That is a crime, not a screenshot.",
      },
      {
        id: "nw-dmarc",
        title: "No DMARC policy",
        severity: "medium",
        owasp: "A07:2021 Identification Failures",
        cwe: "CWE-290",
        observation: "_dmarc.northwind-lab.example NXDOMAIN",
        why: "Without p=quarantine or p=reject, even a good SPF is advisory. Finance staff will see a normal-looking mail from their own domain.",
        fix: "Start with p=none and rua= reports for two weeks, then raise the policy.",
        stop: "No phishing the accounts team “to raise awareness” without a signed exercise and a lawyer.",
      },
    ],
    path: [
      {
        n: "01",
        kind: "observe",
        title: "TXT and MX are public",
        body: "Cloudflare DNS-over-HTTPS returns the same records anyone can see. No packet is sent to Northwind’s mail server.",
      },
      {
        n: "02",
        kind: "infer",
        title: "Spoofed finance mail will probably land",
        body: "+all plus no DMARC is a classic BEC (business email compromise) precondition. It is still only a precondition.",
      },
      {
        n: "03",
        kind: "stop",
        title: "Do not press send",
        body: "A student demonstration stops at the screenshot of the TXT record. The forged invoice is the crime.",
      },
      {
        n: "04",
        kind: "defend",
        title: "Fix DNS this afternoon",
        body: "-all, DMARC p=reject, disable user-to-user forwarding, train finance to call a known number before paying.",
      },
    ],
  },
  {
    id: "ayesha",
    kicker: "Personal correlation",
    title: "Ayesha K. — three public facts, one residence",
    org: "Fictional student persona (consent built into the range)",
    minutes: 6,
    blurb:
      "A reused handle, a Gravatar, and a holiday JPEG with GPS. Each fact is public. Together they sketch a life. This is why the lab starts with a self-audit.",
    viva: "Show how you refused to merge identities on a single 200, then show the two independent sources that made the correlation defensible.",
    evidence: [
      { label: "Handle", value: "ayesha.k — GitHub 200, Instagram 200 (simulated)" },
      { label: "GitHub bio", value: "CS student · Karachi" },
      { label: "Gravatar", value: "Present for 2021-batch university address" },
      { label: "Photo EXIF", value: "N 24.8607, E 67.0011 · iPhone 13 · 18:04 PKT" },
      { label: "Consent", value: "Persona is fictional; treat a real classmate as out of scope" },
    ],
    findings: [
      {
        id: "ay-reuse",
        title: "Username reuse across two public sites",
        severity: "low",
        owasp: "A01:2021 Broken Access Control",
        cwe: "CWE-359",
        observation: "ayesha.k exists on GitHub (bio: Karachi student) and a matching public Instagram.",
        why: "One 200 is a page. Two independent pages with the same unusual handle and the same city is a correlation. It is still not a legal identity.",
        fix: "Unique handles on email, banking, and university SSO. Reuse is fine on throwaway hobbies.",
        stop: "Do not message, follow, or visit the person. Correlation is not consent to contact.",
      },
      {
        id: "ay-exif",
        title: "Holiday photo still carries GPS",
        severity: "medium",
        owasp: "A01:2021 Broken Access Control",
        cwe: "CWE-200",
        observation: "EXIF GPS ≈ I.I. Chundrigar / campus-adjacent; timestamp 18:04.",
        why: "A repeated evening geotag plus a student bio is how OSINT becomes a physical-security issue. The camera wrote the truth into the file.",
        fix: "Export without location. Strip EXIF before Instagram. Turn off precise location for the camera roll.",
        stop: "Do not go to the coordinates. Doxxing and stalking are offences under PECA, not clever analysis.",
      },
    ],
    path: [
      {
        n: "01",
        kind: "observe",
        title: "Public profile + file metadata",
        body: "Username probe and in-browser EXIF. No breach dump, no login, no face recognition.",
      },
      {
        n: "02",
        kind: "infer",
        title: "Likely campus-adjacent evenings",
        body: "Two independent sources (bio city + GPS) support a cautious inference. Write it as inference, not fact.",
      },
      {
        n: "03",
        kind: "stop",
        title: "No approach, no reset questions",
        body: "Using the data to answer a password-reset prompt, to shoulder-surf, or to wait outside a hostel is the crime.",
      },
      {
        n: "04",
        kind: "defend",
        title: "Shrink the footprint",
        body: "Unique handles, 2FA on email first, strip EXIF, search your own name quarterly. That is the whole point of the FYP.",
      },
    ],
  },
  {
    id: "atlas-staging",
    kicker: "Certificate transparency",
    title: "Atlas Pay — staging walked in through the front log",
    org: "Fictional payments startup (training range only)",
    minutes: 7,
    blurb:
      "Public certificate-transparency logs list staging and vpn hostnames. Nobody scanned a port. A CA already published the names.",
    viva: "Why is crt.sh OSINT, and why is then opening staging.atlas-pay.example in Burp not OSINT?",
    evidence: [
      { label: "Apex", value: "atlas-pay.example (fictional)" },
      { label: "CT names", value: "www · api · staging · admin-staging · vpn" },
      { label: "Issuer", value: "Let's Encrypt (simulated)" },
      { label: "TXT", value: "google-site-verification=3f9c… (not a secret, still noisy)" },
    ],
    findings: [
      {
        id: "at-ct",
        title: "Staging and VPN names in public certificates",
        severity: "medium",
        owasp: "A05:2021 Misconfiguration",
        cwe: "CWE-668",
        observation: "staging.atlas-pay.example, admin-staging.atlas-pay.example, vpn.atlas-pay.example",
        why: "Let’s Encrypt logs every issuance. Staging often has debug, seed users, or last quarter’s feature flags. The name is public; the service behind it may not have been meant to be.",
        fix: "Use a private CA or internal names for staging. Split-horizon DNS. Do not request public certificates for vpn. or admin-staging.",
        stop: "Do not port-scan, open, or brute-force staging. Seeing the name in crt.sh is the end of the OSINT step.",
      },
      {
        id: "at-txt",
        title: "Site-verification token in DNS",
        severity: "info",
        owasp: "A05:2021 Misconfiguration",
        cwe: "CWE-200",
        observation: "google-site-verification=3f9c… published on the apex",
        why: "Verification TXT records are designed to be public. They still tell you which cloud and marketing tools the company uses.",
        fix: "Acceptable. Do not treat them as credentials. Rotate if a vendor asks you to.",
        stop: "A verification token is not a password. Do not try it as one.",
      },
    ],
    path: [
      {
        n: "01",
        kind: "observe",
        title: "crt.sh is a public log",
        body: "Certificate transparency is how the web audits CAs. Anyone may list names. That is the design.",
      },
      {
        n: "02",
        kind: "infer",
        title: "Staging is probably softer than prod",
        body: "A reasonable defender assumption: debug on, WAF off, copied production data. Still an assumption until you have a contract to test.",
      },
      {
        n: "03",
        kind: "stop",
        title: "No Nmap, no Burp, no default creds",
        body: "The moment you send a probe to staging.atlas-pay.example you have left OSINT. Coursework does not include that step.",
      },
      {
        n: "04",
        kind: "defend",
        title: "Hide the name, then harden the box",
        body: "Private certificates, VPN-only staging, no prod data in fixtures, bug bounty scoped to production with written rules.",
      },
    ],
  },
];

export const SCENARIO_BY_ID = Object.fromEntries(SCENARIOS.map((s) => [s.id, s]));
