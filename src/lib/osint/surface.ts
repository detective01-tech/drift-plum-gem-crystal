export type Severity = "ok" | "info" | "low" | "medium";

export type SurfaceFinding = {
  id: string;
  title: string;
  severity: Severity;
  owasp: string;
  cwe: string;
  observation: string;
  why: string;
  fix: string;
  stop: string;
};

const HEADER_KEYS = [
  "strict-transport-security",
  "content-security-policy",
  "content-security-policy-report-only",
  "x-frame-options",
  "x-content-type-options",
  "referrer-policy",
  "permissions-policy",
  "x-xss-protection",
  "server",
  "x-powered-by",
  "x-aspnet-version",
  "x-aspnetmvc-version",
  "via",
  "nel",
  "report-to",
  "cross-origin-opener-policy",
  "cross-origin-resource-policy",
  "cross-origin-embedder-policy",
  "access-control-allow-origin",
  "content-type",
  "www-authenticate",
] as const;

export const SURFACE_HEADER_ALLOW = new Set<string>(HEADER_KEYS);

const SENSITIVE_ROBOTS =
  /\/(admin|backup|old|phpmyadmin|wp-admin|wp-login|\.git|config|db|sql|dump|staging|debug|test|private|\.env|server-status|cgi-bin)\b/i;

function h(headers: Record<string, string>, key: string) {
  return headers[key.toLowerCase()]?.trim() || "";
}

function finding(partial: SurfaceFinding): SurfaceFinding {
  return partial;
}

export function unwrapTxt(data: string): string {
  return data
    .replace(/^\s*"|"\s*$/g, "")
    .replace(/"\s+"/g, "")
    .trim();
}

export function analyzeCookies(setCookie: string[]): SurfaceFinding[] {
  const out: SurfaceFinding[] = [];
  setCookie.forEach((raw, i) => {
    const parts = raw.split(";").map((p) => p.trim());
    const name = parts[0]?.split("=")[0] ?? `cookie-${i}`;
    const flags = new Set(parts.slice(1).map((p) => p.split("=")[0].toLowerCase()));
    const missing: string[] = [];
    if (!flags.has("secure")) missing.push("Secure");
    if (!flags.has("httponly")) missing.push("HttpOnly");
    if (!flags.has("samesite")) missing.push("SameSite");
    if (missing.length === 0) {
      out.push(
        finding({
          id: `cookie-ok-${i}`,
          title: `${name} cookie is flagged`,
          severity: "ok",
          owasp: "A05:2021 Misconfiguration",
          cwe: "CWE-614",
          observation: raw.slice(0, 180),
          why: "Secure + HttpOnly + SameSite is the modern baseline for session cookies.",
          fix: "Keep these flags on every cookie that authenticates a user.",
          stop: "Do not steal or replay other people’s cookies. That is unauthorised access.",
        }),
      );
      return;
    }
    out.push(
      finding({
        id: `cookie-${i}`,
        title: `${name} cookie missing ${missing.join(", ")}`,
        severity: missing.includes("Secure") || missing.includes("HttpOnly") ? "medium" : "low",
        owasp: "A05:2021 Misconfiguration",
        cwe: "CWE-614",
        observation: raw.slice(0, 180),
        why: "Without Secure a cookie can travel on HTTP. Without HttpOnly, script on the page can read it. Without SameSite, it is sent on cross-site requests.",
        fix: `Set-Cookie: ${name}=…; Secure; HttpOnly; SameSite=Lax (or Strict).`,
        stop: "Do not attempt session hijacking or XSS against this host.",
      }),
    );
  });
  return out;
}

export function analyzeRobots(body: string | null, status: number): SurfaceFinding[] {
  if (status === 404 || !body) {
    return [
      finding({
        id: "robots-absent",
        title: "No public robots.txt",
        severity: "info",
        owasp: "A05:2021 Misconfiguration",
        cwe: "CWE-200",
        observation: status ? `HTTP ${status}` : "Not retrieved",
        why: "Absence is fine. Presence is only a problem when it advertises sensitive paths.",
        fix: "Optional: publish a short robots.txt that does not name backups or admin panels.",
        stop: "Do not brute-force paths that are not listed. Directory guessing is not OSINT.",
      }),
    ];
  }
  const hits = body
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => /^disallow:/i.test(l) && SENSITIVE_ROBOTS.test(l));
  if (hits.length === 0) {
    return [
      finding({
        id: "robots-ok",
        title: "robots.txt does not advertise sensitive paths",
        severity: "ok",
        owasp: "A05:2021 Misconfiguration",
        cwe: "CWE-200",
        observation: `${body.split(/\r?\n/).length} lines published`,
        why: "Search engines read this file. So does everyone else. Keep it boring.",
        fix: "Review Disallow lines yearly. Remove anything that names a backup, admin, or .git path.",
        stop: "Disallow is not authentication. Do not fetch hidden paths on a host you do not own.",
      }),
    ];
  }
  return [
    finding({
      id: "robots-leak",
      title: "robots.txt names sensitive-looking paths",
      severity: "medium",
      owasp: "A05:2021 Misconfiguration",
      cwe: "CWE-200",
      observation: hits.slice(0, 8).join(" · "),
      why: "robots.txt is a public map. Disallow: /backup/ tells an investigator — and an attacker — where you think secrets live. It does not lock the door.",
      fix: "Remove those paths from the web root. Block them in the server. Then delete them from robots.txt.",
      stop: "Do not download /backup, /phpmyadmin, or /.git. Fetching them without authorisation is computer misuse.",
    }),
  ];
}

export function analyzeSecurityTxt(body: string | null, status: number): SurfaceFinding[] {
  if (status === 200 && body && /contact:/i.test(body)) {
    return [
      finding({
        id: "security-txt-ok",
        title: "security.txt is published",
        severity: "ok",
        owasp: "A05:2021 Misconfiguration",
        cwe: "CWE-16",
        observation: body.split(/\r?\n/).slice(0, 6).join(" ").slice(0, 220),
        why: "RFC 9116 tells researchers where to send a vulnerability report. That is a maturity signal.",
        fix: "Keep Contact, Expires, and Preferred-Languages current.",
        stop: "Do not file fake bug reports or demand a bounty.",
      }),
    ];
  }
  return [
    finding({
      id: "security-txt-missing",
      title: "No RFC 9116 security.txt",
      severity: "info",
      owasp: "A05:2021 Misconfiguration",
      cwe: "CWE-16",
      observation: status ? `/.well-known/security.txt → HTTP ${status}` : "Not retrieved",
      why: "Without a published contact, well-meaning researchers guess emails or stay silent. Neither is good for a defender.",
      fix: "Publish https://your-domain/.well-known/security.txt with a Contact: mailto: line and an Expires: date.",
      stop: "Missing security.txt is not an invitation to probe the host.",
    }),
  ];
}

export function analyzeHeaders(input: {
  url: string;
  finalUrl: string;
  status: number;
  headers: Record<string, string>;
}): SurfaceFinding[] {
  const findings: SurfaceFinding[] = [];
  const headers = input.headers;
  const https = input.finalUrl.toLowerCase().startsWith("https:");
  const csp = h(headers, "content-security-policy");
  const xfo = h(headers, "x-frame-options");
  const hsts = h(headers, "strict-transport-security");
  const nosniff = h(headers, "x-content-type-options");
  const referrer = h(headers, "referrer-policy");
  const perms = h(headers, "permissions-policy");
  const server = h(headers, "server");
  const powered = h(headers, "x-powered-by") || h(headers, "x-aspnet-version");
  const coop = h(headers, "cross-origin-opener-policy");
  const acao = h(headers, "access-control-allow-origin");
  const frameAncestors = /frame-ancestors/i.test(csp);

  if (!https) {
    findings.push(
      finding({
        id: "no-https",
        title: "Response was not over HTTPS",
        severity: "medium",
        owasp: "A02:2021 Cryptographic Failures",
        cwe: "CWE-319",
        observation: input.finalUrl,
        why: "Anything on the path — café Wi-Fi, a proxy, a malicious network — can read or change the page.",
        fix: "Serve HTTPS, redirect HTTP to HTTPS, then add HSTS.",
        stop: "Do not run SSL-stripping or man-in-the-middle attacks against this host.",
      }),
    );
  } else if (!hsts) {
    findings.push(
      finding({
        id: "no-hsts",
        title: "Missing Strict-Transport-Security",
        severity: "medium",
        owasp: "A05:2021 Misconfiguration",
        cwe: "CWE-319",
        observation: "No HSTS header on the HTTPS response.",
        why: "The first visit can still be downgraded to HTTP. Browsers will not remember to insist on TLS.",
        fix: "Strict-Transport-Security: max-age=63072000; includeSubDomains; preload",
        stop: "Do not attempt SSL stripping. Report the missing header; do not exploit it.",
      }),
    );
  } else {
    findings.push(
      finding({
        id: "hsts-ok",
        title: "HSTS is present",
        severity: "ok",
        owasp: "A05:2021 Misconfiguration",
        cwe: "CWE-319",
        observation: hsts,
        why: "The browser will refuse to speak HTTP to this host for max-age seconds.",
        fix: "Confirm includeSubDomains and consider HSTS preload once you are sure every subdomain speaks HTTPS.",
        stop: "N/A",
      }),
    );
  }

  if (!csp) {
    findings.push(
      finding({
        id: "no-csp",
        title: "Missing Content-Security-Policy",
        severity: "low",
        owasp: "A05:2021 Misconfiguration",
        cwe: "CWE-693",
        observation: "No CSP header.",
        why: "CSP is a seatbelt against injected script. Missing it does not mean the site is owned — it means one layer is absent.",
        fix: "Start with Content-Security-Policy-Report-Only, then enforce a policy that avoids 'unsafe-inline' where you can.",
        stop: "Do not fire XSS payloads at this site to “prove” the finding.",
      }),
    );
  } else if (/unsafe-inline|unsafe-eval/i.test(csp)) {
    findings.push(
      finding({
        id: "csp-weak",
        title: "CSP allows unsafe-inline or unsafe-eval",
        severity: "info",
        owasp: "A05:2021 Misconfiguration",
        cwe: "CWE-693",
        observation: csp.slice(0, 240),
        why: "A policy that allows inline script is better than nothing, but it will not stop a classic XSS gadget.",
        fix: "Move scripts to files, use nonces or hashes, drop unsafe-eval.",
        stop: "Do not test XSS here. Use a local DVWA / Juice Shop instance if you need to practise.",
      }),
    );
  } else {
    findings.push(
      finding({
        id: "csp-ok",
        title: "Content-Security-Policy is present",
        severity: "ok",
        owasp: "A05:2021 Misconfiguration",
        cwe: "CWE-693",
        observation: csp.slice(0, 240),
        why: "A real policy is a defensive control you can cite in a report.",
        fix: "Review it after every frontend change.",
        stop: "N/A",
      }),
    );
  }

  if (!xfo && !frameAncestors) {
    findings.push(
      finding({
        id: "no-frame",
        title: "No clickjacking defence (XFO / frame-ancestors)",
        severity: "low",
        owasp: "A05:2021 Misconfiguration",
        cwe: "CWE-1021",
        observation: "Neither X-Frame-Options nor CSP frame-ancestors.",
        why: "Another site may embed this page in an iframe and overlay a decoy UI. Login and payment pages are the usual concern.",
        fix: "Content-Security-Policy: frame-ancestors 'self'  — or X-Frame-Options: DENY",
        stop: "Do not build a clickjacking proof-of-concept against a live third-party site.",
      }),
    );
  }

  if (nosniff.toLowerCase() !== "nosniff") {
    findings.push(
      finding({
        id: "no-nosniff",
        title: "Missing X-Content-Type-Options: nosniff",
        severity: "low",
        owasp: "A05:2021 Misconfiguration",
        cwe: "CWE-693",
        observation: nosniff || "header absent",
        why: "Browsers may MIME-sniff a response and treat a text file as script.",
        fix: "X-Content-Type-Options: nosniff",
        stop: "N/A",
      }),
    );
  }

  if (!referrer) {
    findings.push(
      finding({
        id: "no-referrer",
        title: "Missing Referrer-Policy",
        severity: "info",
        owasp: "A01:2021 Broken Access Control",
        cwe: "CWE-200",
        observation: "header absent",
        why: "The default referrer can leak path and query (tokens, search terms) to third-party origins.",
        fix: "Referrer-Policy: strict-origin-when-cross-origin",
        stop: "N/A",
      }),
    );
  }

  if (!perms) {
    findings.push(
      finding({
        id: "no-permissions",
        title: "No Permissions-Policy",
        severity: "info",
        owasp: "A05:2021 Misconfiguration",
        cwe: "CWE-693",
        observation: "header absent",
        why: "You can disable camera, microphone, and interest-cohort features from the server.",
        fix: "Permissions-Policy: camera=(), microphone=(), geolocation=()",
        stop: "N/A",
      }),
    );
  }

  if (server && /\d/.test(server)) {
    findings.push(
      finding({
        id: "server-version",
        title: "Server header discloses a version",
        severity: "low",
        owasp: "A05:2021 Misconfiguration",
        cwe: "CWE-200",
        observation: server,
        why: "A version turns an OSINT note into a shopping list of public CVEs. The header itself is not an exploit.",
        fix: "Configure the server to send a generic token (nginx, cloudfront) or omit it.",
        stop: "Do not search exploit-db and fire a payload. Mapping a version to a CVE is a literature review, not a live attack.",
      }),
    );
  } else if (server) {
    findings.push(
      finding({
        id: "server-token",
        title: "Server token is generic",
        severity: "ok",
        owasp: "A05:2021 Misconfiguration",
        cwe: "CWE-200",
        observation: server,
        why: "Naming the product without a version is a reasonable compromise.",
        fix: "Keep it generic.",
        stop: "N/A",
      }),
    );
  }

  if (powered) {
    findings.push(
      finding({
        id: "powered-by",
        title: "Framework / language leaked (X-Powered-By)",
        severity: "low",
        owasp: "A05:2021 Misconfiguration",
        cwe: "CWE-200",
        observation: powered,
        why: "PHP/7.4 or ASP.NET version strings are gold for an attacker and noise for a user. They belong in a private inventory, not in every response.",
        fix: "Disable the header (expose_php=off, remove X-Powered-By in the framework).",
        stop: "Do not exploit the disclosed runtime. Note it, recommend hiding it, move on.",
      }),
    );
  }

  if (acao === "*") {
    findings.push(
      finding({
        id: "acao-star",
        title: "CORS allows any origin (*)",
        severity: "info",
        owasp: "A05:2021 Misconfiguration",
        cwe: "CWE-942",
        observation: "Access-Control-Allow-Origin: *",
        why: "Fine for a fully public API. Dangerous if responses can include a user’s data. This lab cannot see whether credentials are allowed — treat it as a lead.",
        fix: "Echo a specific origin. Never combine * with Access-Control-Allow-Credentials: true.",
        stop: "Do not harvest other users’ API responses from a malicious page.",
      }),
    );
  }

  if (coop) {
    findings.push(
      finding({
        id: "coop-ok",
        title: "Cross-Origin-Opener-Policy set",
        severity: "ok",
        owasp: "A05:2021 Misconfiguration",
        cwe: "CWE-346",
        observation: coop,
        why: "COOP reduces cross-origin window attacks (Spectre-class process sharing).",
        fix: "Prefer same-origin.",
        stop: "N/A",
      }),
    );
  }

  if (input.status >= 400) {
    findings.push(
      finding({
        id: "http-status",
        title: `Origin responded HTTP ${input.status}`,
        severity: "info",
        owasp: "A05:2021 Misconfiguration",
        cwe: "CWE-209",
        observation: `${input.url} → ${input.finalUrl}`,
        why: "A 401/403/404 is still OSINT: the resource exists or an auth wall is public. Error bodies sometimes leak stack traces — this lab does not parse HTML for that.",
        fix: "Return generic error pages. Do not include framework traces.",
        stop: "Do not fuzz paths looking for 200s on a host you do not own.",
      }),
    );
  }

  return findings;
}

export function hardeningScore(findings: SurfaceFinding[]): number {
  let score = 100;
  for (const f of findings) {
    if (f.severity === "medium") score -= 12;
    else if (f.severity === "low") score -= 6;
    else if (f.severity === "info" && !f.id.endsWith("-ok")) score -= 2;
  }
  return Math.max(0, Math.min(100, score));
}

export function pickResponseHeaders(res: Headers): { headers: Record<string, string>; setCookie: string[] } {
  const headers: Record<string, string> = {};
  res.forEach((value, key) => {
    const k = key.toLowerCase();
    if (SURFACE_HEADER_ALLOW.has(k)) headers[k] = value;
  });
  const setCookie = typeof res.getSetCookie === "function" ? res.getSetCookie() : [];
  return { headers, setCookie };
}
