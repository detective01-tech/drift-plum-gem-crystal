import { a as string, i as object, t as array } from "../_libs/zod.mjs";
import { n as createServerFn, r as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { a as isDomain, c as isIp, i as USERNAME_RE, l as isPrivateHost, o as isEmail, r as PLATFORM_BY_ID, s as isHttpUrl } from "./validate-oSww8SoE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/functions-CIyMOyGE.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var SURFACE_HEADER_ALLOW = /* @__PURE__ */ new Set([
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
	"www-authenticate"
]);
var SENSITIVE_ROBOTS = /\/(admin|backup|old|phpmyadmin|wp-admin|wp-login|\.git|config|db|sql|dump|staging|debug|test|private|\.env|server-status|cgi-bin)\b/i;
function h(headers, key) {
	return headers[key.toLowerCase()]?.trim() || "";
}
function finding(partial) {
	return partial;
}
function unwrapTxt(data) {
	return data.replace(/^\s*"|"\s*$/g, "").replace(/"\s+"/g, "").trim();
}
function analyzeCookies(setCookie) {
	const out = [];
	setCookie.forEach((raw, i) => {
		const parts = raw.split(";").map((p) => p.trim());
		const name = parts[0]?.split("=")[0] ?? `cookie-${i}`;
		const flags = new Set(parts.slice(1).map((p) => p.split("=")[0].toLowerCase()));
		const missing = [];
		if (!flags.has("secure")) missing.push("Secure");
		if (!flags.has("httponly")) missing.push("HttpOnly");
		if (!flags.has("samesite")) missing.push("SameSite");
		if (missing.length === 0) {
			out.push(finding({
				id: `cookie-ok-${i}`,
				title: `${name} cookie is flagged`,
				severity: "ok",
				owasp: "A05:2021 Misconfiguration",
				cwe: "CWE-614",
				observation: raw.slice(0, 180),
				why: "Secure + HttpOnly + SameSite is the modern baseline for session cookies.",
				fix: "Keep these flags on every cookie that authenticates a user.",
				stop: "Do not steal or replay other people’s cookies. That is unauthorised access."
			}));
			return;
		}
		out.push(finding({
			id: `cookie-${i}`,
			title: `${name} cookie missing ${missing.join(", ")}`,
			severity: missing.includes("Secure") || missing.includes("HttpOnly") ? "medium" : "low",
			owasp: "A05:2021 Misconfiguration",
			cwe: "CWE-614",
			observation: raw.slice(0, 180),
			why: "Without Secure a cookie can travel on HTTP. Without HttpOnly, script on the page can read it. Without SameSite, it is sent on cross-site requests.",
			fix: `Set-Cookie: ${name}=…; Secure; HttpOnly; SameSite=Lax (or Strict).`,
			stop: "Do not attempt session hijacking or XSS against this host."
		}));
	});
	return out;
}
function analyzeRobots(body, status) {
	if (status === 404 || !body) return [finding({
		id: "robots-absent",
		title: "No public robots.txt",
		severity: "info",
		owasp: "A05:2021 Misconfiguration",
		cwe: "CWE-200",
		observation: status ? `HTTP ${status}` : "Not retrieved",
		why: "Absence is fine. Presence is only a problem when it advertises sensitive paths.",
		fix: "Optional: publish a short robots.txt that does not name backups or admin panels.",
		stop: "Do not brute-force paths that are not listed. Directory guessing is not OSINT."
	})];
	const hits = body.split(/\r?\n/).map((l) => l.trim()).filter((l) => /^disallow:/i.test(l) && SENSITIVE_ROBOTS.test(l));
	if (hits.length === 0) return [finding({
		id: "robots-ok",
		title: "robots.txt does not advertise sensitive paths",
		severity: "ok",
		owasp: "A05:2021 Misconfiguration",
		cwe: "CWE-200",
		observation: `${body.split(/\r?\n/).length} lines published`,
		why: "Search engines read this file. So does everyone else. Keep it boring.",
		fix: "Review Disallow lines yearly. Remove anything that names a backup, admin, or .git path.",
		stop: "Disallow is not authentication. Do not fetch hidden paths on a host you do not own."
	})];
	return [finding({
		id: "robots-leak",
		title: "robots.txt names sensitive-looking paths",
		severity: "medium",
		owasp: "A05:2021 Misconfiguration",
		cwe: "CWE-200",
		observation: hits.slice(0, 8).join(" · "),
		why: "robots.txt is a public map. Disallow: /backup/ tells an investigator — and an attacker — where you think secrets live. It does not lock the door.",
		fix: "Remove those paths from the web root. Block them in the server. Then delete them from robots.txt.",
		stop: "Do not download /backup, /phpmyadmin, or /.git. Fetching them without authorisation is computer misuse."
	})];
}
function analyzeSecurityTxt(body, status) {
	if (status === 200 && body && /contact:/i.test(body)) return [finding({
		id: "security-txt-ok",
		title: "security.txt is published",
		severity: "ok",
		owasp: "A05:2021 Misconfiguration",
		cwe: "CWE-16",
		observation: body.split(/\r?\n/).slice(0, 6).join(" ").slice(0, 220),
		why: "RFC 9116 tells researchers where to send a vulnerability report. That is a maturity signal.",
		fix: "Keep Contact, Expires, and Preferred-Languages current.",
		stop: "Do not file fake bug reports or demand a bounty."
	})];
	return [finding({
		id: "security-txt-missing",
		title: "No RFC 9116 security.txt",
		severity: "info",
		owasp: "A05:2021 Misconfiguration",
		cwe: "CWE-16",
		observation: status ? `/.well-known/security.txt → HTTP ${status}` : "Not retrieved",
		why: "Without a published contact, well-meaning researchers guess emails or stay silent. Neither is good for a defender.",
		fix: "Publish https://your-domain/.well-known/security.txt with a Contact: mailto: line and an Expires: date.",
		stop: "Missing security.txt is not an invitation to probe the host."
	})];
}
function analyzeHeaders(input) {
	const findings = [];
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
	if (!https) findings.push(finding({
		id: "no-https",
		title: "Response was not over HTTPS",
		severity: "medium",
		owasp: "A02:2021 Cryptographic Failures",
		cwe: "CWE-319",
		observation: input.finalUrl,
		why: "Anything on the path — café Wi-Fi, a proxy, a malicious network — can read or change the page.",
		fix: "Serve HTTPS, redirect HTTP to HTTPS, then add HSTS.",
		stop: "Do not run SSL-stripping or man-in-the-middle attacks against this host."
	}));
	else if (!hsts) findings.push(finding({
		id: "no-hsts",
		title: "Missing Strict-Transport-Security",
		severity: "medium",
		owasp: "A05:2021 Misconfiguration",
		cwe: "CWE-319",
		observation: "No HSTS header on the HTTPS response.",
		why: "The first visit can still be downgraded to HTTP. Browsers will not remember to insist on TLS.",
		fix: "Strict-Transport-Security: max-age=63072000; includeSubDomains; preload",
		stop: "Do not attempt SSL stripping. Report the missing header; do not exploit it."
	}));
	else findings.push(finding({
		id: "hsts-ok",
		title: "HSTS is present",
		severity: "ok",
		owasp: "A05:2021 Misconfiguration",
		cwe: "CWE-319",
		observation: hsts,
		why: "The browser will refuse to speak HTTP to this host for max-age seconds.",
		fix: "Confirm includeSubDomains and consider HSTS preload once you are sure every subdomain speaks HTTPS.",
		stop: "N/A"
	}));
	if (!csp) findings.push(finding({
		id: "no-csp",
		title: "Missing Content-Security-Policy",
		severity: "low",
		owasp: "A05:2021 Misconfiguration",
		cwe: "CWE-693",
		observation: "No CSP header.",
		why: "CSP is a seatbelt against injected script. Missing it does not mean the site is owned — it means one layer is absent.",
		fix: "Start with Content-Security-Policy-Report-Only, then enforce a policy that avoids 'unsafe-inline' where you can.",
		stop: "Do not fire XSS payloads at this site to “prove” the finding."
	}));
	else if (/unsafe-inline|unsafe-eval/i.test(csp)) findings.push(finding({
		id: "csp-weak",
		title: "CSP allows unsafe-inline or unsafe-eval",
		severity: "info",
		owasp: "A05:2021 Misconfiguration",
		cwe: "CWE-693",
		observation: csp.slice(0, 240),
		why: "A policy that allows inline script is better than nothing, but it will not stop a classic XSS gadget.",
		fix: "Move scripts to files, use nonces or hashes, drop unsafe-eval.",
		stop: "Do not test XSS here. Use a local DVWA / Juice Shop instance if you need to practise."
	}));
	else findings.push(finding({
		id: "csp-ok",
		title: "Content-Security-Policy is present",
		severity: "ok",
		owasp: "A05:2021 Misconfiguration",
		cwe: "CWE-693",
		observation: csp.slice(0, 240),
		why: "A real policy is a defensive control you can cite in a report.",
		fix: "Review it after every frontend change.",
		stop: "N/A"
	}));
	if (!xfo && !frameAncestors) findings.push(finding({
		id: "no-frame",
		title: "No clickjacking defence (XFO / frame-ancestors)",
		severity: "low",
		owasp: "A05:2021 Misconfiguration",
		cwe: "CWE-1021",
		observation: "Neither X-Frame-Options nor CSP frame-ancestors.",
		why: "Another site may embed this page in an iframe and overlay a decoy UI. Login and payment pages are the usual concern.",
		fix: "Content-Security-Policy: frame-ancestors 'self'  — or X-Frame-Options: DENY",
		stop: "Do not build a clickjacking proof-of-concept against a live third-party site."
	}));
	if (nosniff.toLowerCase() !== "nosniff") findings.push(finding({
		id: "no-nosniff",
		title: "Missing X-Content-Type-Options: nosniff",
		severity: "low",
		owasp: "A05:2021 Misconfiguration",
		cwe: "CWE-693",
		observation: nosniff || "header absent",
		why: "Browsers may MIME-sniff a response and treat a text file as script.",
		fix: "X-Content-Type-Options: nosniff",
		stop: "N/A"
	}));
	if (!referrer) findings.push(finding({
		id: "no-referrer",
		title: "Missing Referrer-Policy",
		severity: "info",
		owasp: "A01:2021 Broken Access Control",
		cwe: "CWE-200",
		observation: "header absent",
		why: "The default referrer can leak path and query (tokens, search terms) to third-party origins.",
		fix: "Referrer-Policy: strict-origin-when-cross-origin",
		stop: "N/A"
	}));
	if (!perms) findings.push(finding({
		id: "no-permissions",
		title: "No Permissions-Policy",
		severity: "info",
		owasp: "A05:2021 Misconfiguration",
		cwe: "CWE-693",
		observation: "header absent",
		why: "You can disable camera, microphone, and interest-cohort features from the server.",
		fix: "Permissions-Policy: camera=(), microphone=(), geolocation=()",
		stop: "N/A"
	}));
	if (server && /\d/.test(server)) findings.push(finding({
		id: "server-version",
		title: "Server header discloses a version",
		severity: "low",
		owasp: "A05:2021 Misconfiguration",
		cwe: "CWE-200",
		observation: server,
		why: "A version turns an OSINT note into a shopping list of public CVEs. The header itself is not an exploit.",
		fix: "Configure the server to send a generic token (nginx, cloudfront) or omit it.",
		stop: "Do not search exploit-db and fire a payload. Mapping a version to a CVE is a literature review, not a live attack."
	}));
	else if (server) findings.push(finding({
		id: "server-token",
		title: "Server token is generic",
		severity: "ok",
		owasp: "A05:2021 Misconfiguration",
		cwe: "CWE-200",
		observation: server,
		why: "Naming the product without a version is a reasonable compromise.",
		fix: "Keep it generic.",
		stop: "N/A"
	}));
	if (powered) findings.push(finding({
		id: "powered-by",
		title: "Framework / language leaked (X-Powered-By)",
		severity: "low",
		owasp: "A05:2021 Misconfiguration",
		cwe: "CWE-200",
		observation: powered,
		why: "PHP/7.4 or ASP.NET version strings are gold for an attacker and noise for a user. They belong in a private inventory, not in every response.",
		fix: "Disable the header (expose_php=off, remove X-Powered-By in the framework).",
		stop: "Do not exploit the disclosed runtime. Note it, recommend hiding it, move on."
	}));
	if (acao === "*") findings.push(finding({
		id: "acao-star",
		title: "CORS allows any origin (*)",
		severity: "info",
		owasp: "A05:2021 Misconfiguration",
		cwe: "CWE-942",
		observation: "Access-Control-Allow-Origin: *",
		why: "Fine for a fully public API. Dangerous if responses can include a user’s data. This lab cannot see whether credentials are allowed — treat it as a lead.",
		fix: "Echo a specific origin. Never combine * with Access-Control-Allow-Credentials: true.",
		stop: "Do not harvest other users’ API responses from a malicious page."
	}));
	if (coop) findings.push(finding({
		id: "coop-ok",
		title: "Cross-Origin-Opener-Policy set",
		severity: "ok",
		owasp: "A05:2021 Misconfiguration",
		cwe: "CWE-346",
		observation: coop,
		why: "COOP reduces cross-origin window attacks (Spectre-class process sharing).",
		fix: "Prefer same-origin.",
		stop: "N/A"
	}));
	if (input.status >= 400) findings.push(finding({
		id: "http-status",
		title: `Origin responded HTTP ${input.status}`,
		severity: "info",
		owasp: "A05:2021 Misconfiguration",
		cwe: "CWE-209",
		observation: `${input.url} → ${input.finalUrl}`,
		why: "A 401/403/404 is still OSINT: the resource exists or an auth wall is public. Error bodies sometimes leak stack traces — this lab does not parse HTML for that.",
		fix: "Return generic error pages. Do not include framework traces.",
		stop: "Do not fuzz paths looking for 200s on a host you do not own."
	}));
	return findings;
}
function hardeningScore(findings) {
	let score = 100;
	for (const f of findings) if (f.severity === "medium") score -= 12;
	else if (f.severity === "low") score -= 6;
	else if (f.severity === "info" && !f.id.endsWith("-ok")) score -= 2;
	return Math.max(0, Math.min(100, score));
}
function pickResponseHeaders(res) {
	const headers = {};
	res.forEach((value, key) => {
		const k = key.toLowerCase();
		if (SURFACE_HEADER_ALLOW.has(k)) headers[k] = value;
	});
	return {
		headers,
		setCookie: typeof res.getSetCookie === "function" ? res.getSetCookie() : []
	};
}
function flattenTxt(records) {
	return records.map(unwrapTxt).filter(Boolean);
}
function spfQualifier(record) {
	if (/\+all\b/i.test(record)) return "fail-open";
	if (/~all\b/i.test(record)) return "softfail";
	if (/-all\b/i.test(record)) return "reject";
	if (/\?all\b/i.test(record)) return "neutral";
	if (/(?:^|\s)all\b/i.test(record)) return "fail-open";
	return "unknown";
}
function analyzeEmailAuth(txtRecords, dmarcTxt = []) {
	const txt = flattenTxt(txtRecords);
	const dmarcRecords = flattenTxt(dmarcTxt);
	const spfRecord = txt.find((r) => /^v=spf1\b/i.test(r)) ?? null;
	const dmarcRecord = dmarcRecords.find((r) => /^v=dmarc1\b/i.test(r)) ?? txt.find((r) => /^v=dmarc1\b/i.test(r)) ?? null;
	const qualifier = spfRecord ? spfQualifier(spfRecord) : "missing";
	let policy = "missing";
	if (dmarcRecord) policy = /[;\s]p\s*=\s*(none|quarantine|reject)/i.exec(dmarcRecord)?.[1]?.toLowerCase() ?? "none";
	const findings = [];
	if (!spfRecord) findings.push({
		id: "spf-missing",
		title: "No SPF record published",
		severity: "medium",
		owasp: "A07:2021 Identification Failures",
		cwe: "CWE-290",
		observation: "No TXT starting with v=spf1",
		why: "Receivers have no list of hosts allowed to send mail as this domain. Spoofed invoices and password resets become easier.",
		fix: "Publish a tight SPF, then move to -all once every legitimate sender is listed.",
		stop: "Do not send spoofed mail to “demonstrate” the gap. That is fraud."
	});
	else if (qualifier === "fail-open") findings.push({
		id: "spf-plus-all",
		title: "SPF ends in +all (fail-open)",
		severity: "medium",
		owasp: "A07:2021 Identification Failures",
		cwe: "CWE-290",
		observation: spfRecord,
		why: "+all (or a bare all) tells receivers that every host on the internet is an authorised sender. SPF is present and useless.",
		fix: "Replace +all with -all after listing your real mailers (Google, Microsoft, your MTA).",
		stop: "Do not forge From: headers for this domain."
	});
	else if (qualifier === "softfail" || qualifier === "neutral") findings.push({
		id: "spf-soft",
		title: qualifier === "softfail" ? "SPF uses ~all (softfail)" : "SPF uses ?all (neutral)",
		severity: "low",
		owasp: "A07:2021 Identification Failures",
		cwe: "CWE-290",
		observation: spfRecord,
		why: "Softfail is a stepping stone. Many inboxes still deliver the message, marked as suspicious at best.",
		fix: "Graduate to -all and add a DMARC policy.",
		stop: "Do not run a phishing exercise against real inboxes without written authorisation."
	});
	else if (qualifier === "reject") findings.push({
		id: "spf-ok",
		title: "SPF ends in -all",
		severity: "ok",
		owasp: "A07:2021 Identification Failures",
		cwe: "CWE-290",
		observation: spfRecord,
		why: "Fail-closed SPF is the baseline. It still needs DMARC so receivers know what to do.",
		fix: "Keep the include: chain accurate when you change mail providers.",
		stop: "N/A"
	});
	if (!dmarcRecord) findings.push({
		id: "dmarc-missing",
		title: "No DMARC policy at _dmarc",
		severity: "medium",
		owasp: "A07:2021 Identification Failures",
		cwe: "CWE-290",
		observation: "No TXT starting with v=DMARC1",
		why: "DMARC is how a domain asks receivers to quarantine or reject unauthenticated mail. Without it, SPF/DKIM are advisory.",
		fix: "Publish _dmarc.example.com TXT v=DMARC1; p=none; rua=mailto:dmarc@example.com then raise p= to quarantine, then reject.",
		stop: "Do not buy a “spoof test” service against someone else’s domain."
	});
	else if (policy === "none") findings.push({
		id: "dmarc-none",
		title: "DMARC policy is p=none (monitor only)",
		severity: "low",
		owasp: "A07:2021 Identification Failures",
		cwe: "CWE-290",
		observation: dmarcRecord,
		why: "p=none is the correct first week. A year later it is unfinished work: spoofed mail still delivers.",
		fix: "Read rua reports, then p=quarantine, then p=reject.",
		stop: "N/A"
	});
	else findings.push({
		id: "dmarc-ok",
		title: `DMARC policy is p=${policy}`,
		severity: "ok",
		owasp: "A07:2021 Identification Failures",
		cwe: "CWE-290",
		observation: dmarcRecord,
		why: "Receivers have a clear instruction. This is what you want on a bank, a university, or a clinic.",
		fix: "Watch rua reports after provider changes.",
		stop: "N/A"
	});
	return {
		spf: {
			present: Boolean(spfRecord),
			record: spfRecord,
			qualifier
		},
		dmarc: {
			present: Boolean(dmarcRecord),
			record: dmarcRecord,
			policy
		},
		findings
	};
}
var UA = "OpenLens/1.0 (Educational OSINT laboratory; academic coursework; public-source only)";
var RateLimitError = class extends Error {
	constructor(message = "This lab throttles lookups. Wait a minute and retry.") {
		super(message);
		this.name = "RateLimitError";
	}
};
var buckets = /* @__PURE__ */ new Map();
function rateLimit(key, max, windowMs) {
	const now = Date.now();
	const b = buckets.get(key);
	if (!b || now - b.t > windowMs) {
		buckets.set(key, {
			n: 1,
			t: now
		});
		return;
	}
	if (b.n >= max) throw new RateLimitError();
	b.n += 1;
}
function assertPublicHttpUrl(raw) {
	let u;
	try {
		u = new URL(raw);
	} catch {
		throw new Error("Invalid URL");
	}
	if (u.protocol !== "https:" && u.protocol !== "http:") throw new Error("Only http(s) URLs are allowed");
	if (u.username || u.password) throw new Error("URLs with credentials are blocked");
	if (isPrivateHost(u.hostname)) throw new Error("Private or local addresses are blocked");
	return u;
}
async function safeFetch(raw, opts = {}) {
	const method = opts.method ?? "GET";
	const timeoutMs = opts.timeoutMs ?? 4e3;
	const maxBytes = opts.maxBytes ?? 24e3;
	const url = assertPublicHttpUrl(raw);
	const empty = {
		headers: {},
		setCookie: []
	};
	try {
		const res = await fetch(url, {
			method,
			redirect: "manual",
			headers: {
				"User-Agent": UA,
				Accept: "text/html,application/json;q=0.9,*/*;q=0.8"
			},
			signal: AbortSignal.timeout(timeoutMs)
		});
		const location = res.headers.get("location");
		const picked = pickResponseHeaders(res.headers);
		let snippet = "";
		if (method === "GET" && res.body) {
			const slice = new Uint8Array(await res.arrayBuffer()).slice(0, maxBytes);
			snippet = new TextDecoder("utf-8", { fatal: false }).decode(slice);
		}
		return {
			ok: res.ok,
			status: res.status,
			location,
			finalUrl: url.toString(),
			snippet,
			error: null,
			headers: picked.headers,
			setCookie: picked.setCookie
		};
	} catch (err) {
		const message = err instanceof Error ? err.message : "fetch failed";
		return {
			ok: false,
			status: 0,
			location: null,
			finalUrl: url.toString(),
			snippet: "",
			error: message,
			...empty
		};
	}
}
async function safeJson(raw, opts = {}) {
	const url = assertPublicHttpUrl(raw);
	try {
		const res = await fetch(url, {
			method: "GET",
			redirect: "follow",
			headers: {
				"User-Agent": UA,
				Accept: "application/json, application/dns-json",
				...opts.headers
			},
			signal: AbortSignal.timeout(opts.timeoutMs ?? 6e3)
		});
		if (!res.ok) return {
			data: null,
			status: res.status,
			error: `HTTP ${res.status}`
		};
		return {
			data: await res.json(),
			status: res.status,
			error: null
		};
	} catch (err) {
		return {
			data: null,
			status: 0,
			error: err instanceof Error ? err.message : "fetch failed"
		};
	}
}
async function clientKey() {
	const { getRequestHeader } = await import("./ssr.mjs").then((n) => n.a).then((n) => n.t);
	return getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() || getRequestHeader("x-real-ip") || "anon";
}
function classify(httpStatus, location, error) {
	if (error) return {
		status: "unknown",
		note: "Timed out or blocked by the host"
	};
	if (httpStatus === 404 || httpStatus === 410) return {
		status: "available",
		note: "Public profile URL returned not found"
	};
	if (httpStatus === 200) return {
		status: "claimed",
		note: "Public page responded 200"
	};
	if (httpStatus === 301 || httpStatus === 302 || httpStatus === 303 || httpStatus === 307 || httpStatus === 308) return {
		status: "unknown",
		note: location ? `Redirected to ${location}` : "Redirect without a profile guarantee"
	};
	if (httpStatus === 401 || httpStatus === 403) return {
		status: "unknown",
		note: "Host refused the probe (auth wall or bot filter)"
	};
	return {
		status: "unknown",
		note: `HTTP ${httpStatus}`
	};
}
var checkUsernameBatch_createServerFn_handler = createServerRpc({
	id: "9b13b9097d8721d93a056e81ed09dccaf7fc7e1787b011cbcd34e707d007350b",
	name: "checkUsernameBatch",
	filename: "src/lib/osint/functions.ts"
}, (opts) => checkUsernameBatch.__executeServer(opts));
var checkUsernameBatch = createServerFn({ method: "POST" }).validator(object({
	username: string().min(1).max(39),
	ids: array(string()).min(1).max(8)
})).handler(checkUsernameBatch_createServerFn_handler, async ({ data }) => {
	rateLimit(`user:${await clientKey()}`, 40, 6e5);
	const username = data.username.trim();
	if (!USERNAME_RE.test(username)) throw new Error("Usernames may only contain letters, numbers, dot, underscore, hyphen.");
	return {
		username,
		results: (await Promise.all(data.ids.map(async (id) => {
			const platform = PLATFORM_BY_ID[id];
			if (!platform) return null;
			const url = platform.url.replaceAll("{u}", encodeURIComponent(username));
			const res = await safeFetch(url, {
				method: "GET",
				timeoutMs: 3500,
				maxBytes: 4e3
			});
			const { status, note } = classify(res.status, res.location, res.error);
			return {
				id: platform.id,
				name: platform.name,
				category: platform.category,
				url,
				status,
				httpStatus: res.status || null,
				note
			};
		}))).filter((r) => r !== null)
	};
});
async function doh(name, type) {
	const { data, error } = await safeJson(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${encodeURIComponent(type)}`, {
		headers: { Accept: "application/dns-json" },
		timeoutMs: 5e3
	});
	return {
		type,
		error,
		records: (data?.Answer ?? []).map((a) => ({
			name: a.name,
			data: a.data,
			ttl: a.TTL ?? null
		}))
	};
}
var lookupDomain_createServerFn_handler = createServerRpc({
	id: "f1355e7b065ef4e6c0daf668d3704c3fc0070965b16fd86ce05ce82923f656ef",
	name: "lookupDomain",
	filename: "src/lib/osint/functions.ts"
}, (opts) => lookupDomain.__executeServer(opts));
var lookupDomain = createServerFn({ method: "POST" }).validator(object({ domain: string().min(1).max(253) })).handler(lookupDomain_createServerFn_handler, async ({ data }) => {
	rateLimit(`dom:${await clientKey()}`, 30, 6e5);
	const domain = data.domain.trim().toLowerCase().replace(/^https?:\/\//, "").split("/")[0] ?? "";
	if (!isDomain(domain)) throw new Error("Enter a registrable domain such as example.com");
	const dns = await Promise.all([
		"A",
		"AAAA",
		"MX",
		"NS",
		"TXT",
		"CNAME",
		"SOA"
	].map((t) => doh(domain, t)));
	const dmarc = await doh(`_dmarc.${domain}`, "TXT");
	const mailAuth = analyzeEmailAuth(dns.find((b) => b.type === "TXT")?.records.map((r) => r.data) ?? [], dmarc.records.map((r) => r.data));
	const rdap = await safeJson(`https://rdap.org/domain/${encodeURIComponent(domain)}`, { timeoutMs: 7e3 });
	let registrar = null;
	let registered = null;
	let expires = null;
	let nameservers = [];
	let status = [];
	if (rdap.data) {
		const fn = ((rdap.data.entities ?? []).find((e) => e.roles?.includes("registrar"))?.vcardArray?.[1])?.find((row) => row[0] === "fn");
		registrar = typeof fn?.[3] === "string" ? fn[3] : null;
		const events = rdap.data.events ?? [];
		registered = events.find((e) => e.eventAction === "registration")?.eventDate ?? null;
		expires = events.find((e) => e.eventAction === "expiration")?.eventDate ?? null;
		nameservers = (rdap.data.nameservers ?? []).map((n) => n.ldhName).filter((x) => Boolean(x));
		status = Array.isArray(rdap.data.status) ? rdap.data.status : [];
	}
	return {
		domain,
		dns,
		rdap: {
			ok: Boolean(rdap.data),
			error: rdap.error,
			registrar,
			registered,
			expires,
			nameservers,
			status
		},
		mailAuth
	};
});
var lookupCertificates_createServerFn_handler = createServerRpc({
	id: "02046d0e53a2916ce7ceacc7dee16b443a29dca7be59f81f9584a3bfca888a59",
	name: "lookupCertificates",
	filename: "src/lib/osint/functions.ts"
}, (opts) => lookupCertificates.__executeServer(opts));
var lookupCertificates = createServerFn({ method: "POST" }).validator(object({ domain: string().min(1).max(253) })).handler(lookupCertificates_createServerFn_handler, async ({ data }) => {
	rateLimit(`crt:${await clientKey()}`, 12, 6e5);
	const domain = data.domain.trim().toLowerCase().replace(/^https?:\/\//, "").split("/")[0] ?? "";
	if (!isDomain(domain)) throw new Error("Enter a registrable domain such as example.com");
	const { data: rows, error } = await safeJson(`https://crt.sh/?q=${encodeURIComponent(domain)}&output=json`, { timeoutMs: 12e3 });
	const names = /* @__PURE__ */ new Set();
	if (rows) for (const row of rows) {
		const raw = row.name_value ?? "";
		for (const part of raw.split("\n")) {
			const n = part.trim().toLowerCase();
			if (n) names.add(n);
		}
		if (names.size > 80) break;
	}
	return {
		domain,
		error,
		names: [...names].sort().slice(0, 80)
	};
});
var lookupIp_createServerFn_handler = createServerRpc({
	id: "ebb72159df7181f48a4ade4a60b7cdb7a15eff4483b571a15a613d9e976d345d",
	name: "lookupIp",
	filename: "src/lib/osint/functions.ts"
}, (opts) => lookupIp.__executeServer(opts));
var lookupIp = createServerFn({ method: "POST" }).validator(object({ ip: string().min(1).max(80) })).handler(lookupIp_createServerFn_handler, async ({ data }) => {
	rateLimit(`ip:${await clientKey()}`, 30, 6e5);
	const ip = data.ip.trim();
	if (!isIp(ip)) throw new Error("Enter a public IPv4 or IPv6 address");
	if (isPrivateHost(ip)) throw new Error("Private and loopback addresses are out of scope");
	const { data: json, error } = await safeJson(`https://ipwho.is/${encodeURIComponent(ip)}`);
	if (!json || json.success === false) throw new Error(error || "IP lookup failed");
	return {
		ip: json.ip ?? ip,
		type: json.type ?? null,
		continent: json.continent ?? null,
		country: json.country ?? null,
		countryCode: json.country_code ?? null,
		city: json.city ?? null,
		region: json.region ?? null,
		latitude: json.latitude ?? null,
		longitude: json.longitude ?? null,
		asn: json.connection?.asn ?? null,
		org: json.connection?.org ?? null,
		isp: json.connection?.isp ?? null,
		timezone: json.timezone?.id ?? null
	};
});
var lookupEmail_createServerFn_handler = createServerRpc({
	id: "2a9207625e8d4cd382bf7bfe0a5bdbb314241a995a500991db7bed76e936ae58",
	name: "lookupEmail",
	filename: "src/lib/osint/functions.ts"
}, (opts) => lookupEmail.__executeServer(opts));
var lookupEmail = createServerFn({ method: "POST" }).validator(object({
	email: string().min(3).max(120),
	hash: string().length(32)
})).handler(lookupEmail_createServerFn_handler, async ({ data }) => {
	rateLimit(`em:${await clientKey()}`, 30, 6e5);
	const email = data.email.trim().toLowerCase();
	if (!isEmail(email)) throw new Error("Enter a valid email address");
	const domain = email.split("@")[1] ?? "";
	const mx = await doh(domain, "MX");
	const gravatarUrl = `https://www.gravatar.com/avatar/${data.hash}?d=404&s=128`;
	const grav = await safeFetch(gravatarUrl, {
		method: "HEAD",
		timeoutMs: 4e3
	});
	return {
		email,
		domain,
		mx: mx.records,
		mxError: mx.error,
		gravatar: {
			url: gravatarUrl.replace("d=404", "d=identicon"),
			present: grav.status === 200
		}
	};
});
var lookupGithub_createServerFn_handler = createServerRpc({
	id: "2d252b0443236e18d7907cf965c40e82e526f9a2270a1ced847f4e7c8c05febd",
	name: "lookupGithub",
	filename: "src/lib/osint/functions.ts"
}, (opts) => lookupGithub.__executeServer(opts));
var lookupGithub = createServerFn({ method: "POST" }).validator(object({ username: string().min(1).max(39) })).handler(lookupGithub_createServerFn_handler, async ({ data }) => {
	rateLimit(`gh:${await clientKey()}`, 20, 6e5);
	const username = data.username.trim();
	if (!USERNAME_RE.test(username)) throw new Error("Invalid GitHub username");
	const userRes = await safeJson(`https://api.github.com/users/${encodeURIComponent(username)}`, { headers: { Accept: "application/vnd.github+json" } });
	if (!userRes.data || userRes.data.message === "Not Found") return {
		found: false,
		username
	};
	const reposRes = await safeJson(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=8&sort=updated`, { headers: { Accept: "application/vnd.github+json" } });
	const u = userRes.data;
	return {
		found: true,
		username,
		profile: {
			login: u.login ?? username,
			name: u.name ?? null,
			bio: u.bio ?? null,
			company: u.company ?? null,
			blog: u.blog ?? null,
			location: u.location ?? null,
			twitter: u.twitter_username ?? null,
			publicRepos: u.public_repos ?? 0,
			followers: u.followers ?? 0,
			following: u.following ?? 0,
			createdAt: u.created_at ?? null,
			htmlUrl: u.html_url ?? `https://github.com/${username}`,
			avatarUrl: u.avatar_url ?? null,
			hireable: u.hireable ?? null,
			email: u.email ?? null
		},
		repos: (reposRes.data ?? []).filter((r) => !r.fork).slice(0, 8)
	};
});
var inspectUrl_createServerFn_handler = createServerRpc({
	id: "472577c7cd78520f352dfd50039434701c58de9cbba8d770aa825ffc822fd4a9",
	name: "inspectUrl",
	filename: "src/lib/osint/functions.ts"
}, (opts) => inspectUrl.__executeServer(opts));
var inspectUrl = createServerFn({ method: "POST" }).validator(object({ url: string().min(8).max(1500) })).handler(inspectUrl_createServerFn_handler, async ({ data }) => {
	rateLimit(`url:${await clientKey()}`, 20, 6e5);
	if (!isHttpUrl(data.url)) throw new Error("Only public http(s) URLs");
	const chain = [];
	let current = data.url;
	for (let i = 0; i < 5; i++) {
		const parsed = new URL(current);
		if (isPrivateHost(parsed.hostname)) {
			chain.push({
				url: current,
				status: 0,
				location: null
			});
			break;
		}
		const res = await safeFetch(current, {
			method: "GET",
			timeoutMs: 4e3,
			maxBytes: 512
		});
		chain.push({
			url: current,
			status: res.status,
			location: res.location
		});
		if (!res.location) break;
		try {
			current = new URL(res.location, current).toString();
		} catch {
			break;
		}
	}
	return { chain };
});
var inspectSurface_createServerFn_handler = createServerRpc({
	id: "5888f37f020ba24d85ccc2d8220ef66967513856b6ec064e18ab5714242da9dd",
	name: "inspectSurface",
	filename: "src/lib/osint/functions.ts"
}, (opts) => inspectSurface.__executeServer(opts));
var inspectSurface = createServerFn({ method: "POST" }).validator(object({ url: string().min(8).max(1500) })).handler(inspectSurface_createServerFn_handler, async ({ data }) => {
	rateLimit(`surf:${await clientKey()}`, 12, 6e5);
	if (!isHttpUrl(data.url)) throw new Error("Only public http(s) URLs");
	let current = data.url.trim();
	let last = await safeFetch(current, {
		method: "GET",
		timeoutMs: 5e3,
		maxBytes: 2048
	});
	const hops = [current];
	for (let i = 0; i < 4 && last.location; i++) {
		let next;
		try {
			next = new URL(last.location, current).toString();
		} catch {
			break;
		}
		const host = new URL(next).hostname;
		if (isPrivateHost(host)) throw new Error("Redirect to a private address was blocked");
		current = next;
		hops.push(current);
		last = await safeFetch(current, {
			method: "GET",
			timeoutMs: 5e3,
			maxBytes: 2048
		});
	}
	if (last.error && last.status === 0) throw new Error(last.error);
	const origin = new URL(last.finalUrl).origin;
	const robotsP = safeFetch(`${origin}/robots.txt`, {
		method: "GET",
		timeoutMs: 4e3,
		maxBytes: 8e3
	});
	const secP = safeFetch(`${origin}/.well-known/security.txt`, {
		method: "GET",
		timeoutMs: 4e3,
		maxBytes: 4e3
	});
	const [robots, security] = await Promise.all([robotsP, secP]);
	const findings = [
		...analyzeHeaders({
			url: data.url,
			finalUrl: last.finalUrl,
			status: last.status,
			headers: last.headers
		}),
		...analyzeCookies(last.setCookie),
		...analyzeRobots(robots.ok ? robots.snippet : null, robots.status),
		...analyzeSecurityTxt(security.ok ? security.snippet : null, security.status)
	];
	return {
		url: data.url,
		finalUrl: last.finalUrl,
		https: last.finalUrl.toLowerCase().startsWith("https:"),
		status: last.status,
		hops,
		headers: last.headers,
		setCookie: last.setCookie,
		robots: {
			status: robots.status,
			body: robots.ok ? robots.snippet.slice(0, 2e3) : null
		},
		securityTxt: {
			status: security.status,
			body: security.ok ? security.snippet.slice(0, 1500) : null
		},
		findings,
		score: hardeningScore(findings)
	};
});
//#endregion
export { checkUsernameBatch_createServerFn_handler, inspectSurface_createServerFn_handler, inspectUrl_createServerFn_handler, lookupCertificates_createServerFn_handler, lookupDomain_createServerFn_handler, lookupEmail_createServerFn_handler, lookupGithub_createServerFn_handler, lookupIp_createServerFn_handler };
