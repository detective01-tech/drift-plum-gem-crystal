//#region node_modules/.nitro/vite/services/ssr/assets/academy-BM2fVPuC.js
var ARTICLES = [
	{
		slug: "what-is-osint",
		title: "What OSINT is — and what it is not",
		kicker: "Foundations",
		minutes: 6,
		body: [
			"Open-source intelligence (OSINT) is the disciplined collection and analysis of information that is already public: websites, DNS, company registries, social profiles, news, academic papers, satellite imagery that a provider already published, and government gazettes. The “open” refers to the source, not to an open licence to investigate whoever you like.",
			"OSINT is not hacking. It does not guess passwords, bypass logins, exploit software, scan ports, dump databases, or impersonate a person to obtain access. Those acts are computer misuse in most jurisdictions, including under Pakistan’s PECA 2016, the UK Computer Misuse Act, and the US CFAA.",
			"In a final-year project the educational goal is twofold: (1) demonstrate that a surprising amount of personal data is already public, and (2) practise a method that a SOC analyst, journalist, or defender could defend in front of an ethics board. If a step would embarrass you in a viva, it does not belong in the lab."
		]
	},
	{
		slug: "intelligence-cycle",
		title: "The intelligence cycle, applied to a self-audit",
		kicker: "Method",
		minutes: 7,
		body: [
			"Direction. Write the question in one sentence: “What can a stranger learn about me from public sources in 30 minutes?” Scope excludes family members, classmates, and any account you do not control.",
			"Collection. Prefer primary sources (the site itself, RDAP, certificate transparency) over scrapers and people-search brokers. Record URL, UTC time, and the exact query. OpenLens writes this into the case file so your FYP report has a chain of custody.",
			"Processing. Usernames collide. “ali_khan” on GitHub is not automatically the same person as “ali_khan” on a gaming site. Keep raw status codes; do not silently merge identities.",
			"Analysis. Look for independent corroboration: a GitHub bio that lists the same blog as an MX-verified domain. One hit is a lead. Two independent public sources are a finding.",
			"Dissemination. Separate Observation (“GitHub user octocat exists”) from Inference (“this is the GitHub mascot”). Examiners mark this distinction."
		]
	},
	{
		slug: "ethics-and-law",
		title: "Ethics, consent, and the law",
		kicker: "Charter",
		minutes: 8,
		body: [
			"Consent is the default. Investigate accounts you own, a fictional sample, or a system you have written authorisation to assess. “It was public” is not a complete defence for stalking, doxxing, or workplace harassment.",
			"Pakistan: the Prevention of Electronic Crimes Act 2016 (PECA) criminalises unauthorised access, unauthorised copying of data, and several forms of cyber harassment and impersonation. Collecting public WHOIS data is not the same as accessing someone’s Gmail. Do not blur the two in your report.",
			"Elsewhere: Computer Misuse Act (UK), CFAA (US), GDPR (EU) for processing personal data of EU residents. Even public data can become a GDPR processing activity if you build a dossier on a person. Students outside those jurisdictions still have university ethics codes.",
			"Prohibited in this lab: targeting a real person who did not consent; facial recognition; reverse-image hunting of private photos; scraping behind a login; credential stuffing; war-driving; purchasing leaked databases.",
			"If you are a journalist working a public-interest story, you operate under a different (still lawful) framework with an editor. That is not a student assignment. Keep the FYP inside the self-audit frame."
		]
	},
	{
		slug: "usernames",
		title: "Username enumeration, carefully",
		kicker: "Collection",
		minutes: 5,
		body: [
			"People reuse handles. A probe that requests https://github.com/alice and receives HTTP 200 has found a public page, not a password. That is the whole trick, and it is why defenders tell users to pick unique handles for high-risk accounts.",
			"False positives are common. Some sites always return 200 and render “user not found” in HTML. OpenLens marks those as unknown rather than claiming a hit. A responsible report never inflates counts.",
			"Rate. Hammering a site from a cloud IP is indistinguishable from abuse. This lab batches requests, identifies itself, and throttles. Do not wrap it in a loop against a single target."
		]
	},
	{
		slug: "dns-rdap",
		title: "DNS, RDAP, and certificate transparency",
		kicker: "Collection",
		minutes: 6,
		body: [
			"DNS is a public distributed database. MX tells you where mail goes; TXT often holds SPF/DMARC and sometimes verification tokens; NS names the operator. None of this requires sending packets to the target’s mail server — we query a resolver (Cloudflare DNS-over-HTTPS).",
			"RDAP replaced most public WHOIS gateways. Registration dates, registrar, and (where not redacted) abuse contacts are legitimate OSINT. Privacy redaction is itself a finding: many ccTLDs now hide personal registrant data, which is good.",
			"Certificate transparency logs (crt.sh) list every hostname for which a public CA issued a certificate. That is how you discover www, api, staging, and forgotten subdomains without scanning. It is passive. Port scanning those hosts is a different, usually unauthorised, activity."
		]
	},
	{
		slug: "metadata",
		title: "Why a holiday photo can publish your house",
		kicker: "Local analysis",
		minutes: 5,
		body: [
			"JPEG APP1 segments store EXIF: camera make, lens, timestamp, and — if location services were on — GPS latitude and longitude to several decimal places. OpenLens reads this entirely in the browser. The file is never uploaded.",
			"Before posting, export “without location” or run a metadata stripper. Newsrooms do this as policy. Students should too.",
			"PDF, Office, and image files also carry author names and software versions. The dorks module exists so you can find your own forgotten files, not anyone else’s."
		]
	},
	{
		slug: "visible-vulns",
		title: "Vulnerabilities you can see without touching the server",
		kicker: "Exposure",
		minutes: 8,
		body: [
			"Most student “vulnerability scanners” are Nmap plus a copy of Nuclei. That is not OSINT, and against a host you do not own it is usually computer misuse. The interesting pedagogical fact is that a large class of weaknesses is already hanging off the front of the response: headers, cookies, robots.txt, DNS policy, certificate names.",
			"OpenLens’s HTTP surface module issues a small number of public GETs. It records Strict-Transport-Security, Content-Security-Policy, X-Frame-Options / CSP frame-ancestors, X-Content-Type-Options, Referrer-Policy, Server, X-Powered-By, Set-Cookie flags, robots.txt, and RFC 9116 security.txt. That is the whole probe. No port range, no directory brute force, no payload.",
			"Call the results observations, not “critical vulns”. A missing HSTS header is OWASP A05 / CWE-319. It is a configuration defect a defender should fix this week. It is not a shell. Mapping PHP/7.4.3 to a CVE catalogue is a literature review you can put in an appendix. Sending the CVE to the server is the line this laboratory will not cross.",
			"robots.txt deserves its own paragraph. Disallow: /backup/ does not protect /backup/. It publishes a hypothesis about where secrets live. The OSINT finding is the line in the file. Fetching the zip is access."
		]
	},
	{
		slug: "owasp-a05",
		title: "OWASP A05, read from the street",
		kicker: "Exposure",
		minutes: 7,
		body: [
			"OWASP Top 10:2021 A05 Security Misconfiguration covers default accounts, unnecessary features, verbose errors, missing security headers, and leftover staging. Several of those leak into public space.",
			"Security headers are cheap. HSTS tells the browser to refuse HTTP. CSP is a seatbelt against injected script. frame-ancestors / X-Frame-Options stop other sites from overlaying your login. nosniff stops a text file from being executed as script. None of them require a WAF licence. Absence is a finding you can remediate in nginx in an afternoon.",
			"A06 Vulnerable and Outdated Components is the neighbour. You do not need to exploit PHP 7.4 to know it is end-of-life — the X-Powered-By header told you. In a report, write: “The origin disclosed PHP/7.4.3. PHP 7.4 reached end-of-life on 28 November 2022. Recommendation: upgrade and hide the header.” Do not write: “I popped a shell.”",
			"A07 Identification and Authentication Failures covers the mail side. SPF +all and a missing DMARC policy are public TXT records. They are the precondition for business-email compromise. They are not themselves a phish."
		]
	},
	{
		slug: "attack-paths",
		title: "From a public fact to an attack path — and where to stop",
		kicker: "Method",
		minutes: 7,
		body: [
			"An attack path is a story: observation → inference → (the step you will not take) → defender action. The Training range in this lab is four such stories with fictional hostnames, so a viva never depends on a live website staying up.",
			"Observation is what the source said: “TXT v=spf1 ip4:203.0.113.10 +all”. Inference is what a competent analyst thinks it means: “Receivers that honour SPF will still accept mail from any host.” The forbidden step is sending the invoice. The defender action is -all plus DMARC p=reject.",
			"Examiners mark the stop line. A project that demonstrates Burp against a classmate’s site fails ethics. A project that shows a marked-up path and a remediation list passes. If you cannot say the stop line out loud, the step does not belong in the dissertation.",
			"Two independent public sources make a correlation. One HTTP 200 does not. Write Observation and Inference as separate sentences. The range cases are written that way on purpose — copy the shape, not the fictional facts, into your self-audit."
		]
	},
	{
		slug: "email-auth",
		title: "SPF, DKIM, and DMARC as OSINT",
		kicker: "Collection",
		minutes: 6,
		body: [
			"Sender Policy Framework is a TXT record listing who may send mail as the domain. The last mechanism matters: -all (fail closed), ~all (soft fail), +all (fail open, i.e. anyone). You query a resolver; you do not talk to the target’s MX.",
			"DMARC sits at _dmarc.example.com and tells receivers what to do when SPF or DKIM fail: p=none (monitor), p=quarantine, p=reject. A domain with p=none a year after launch has unfinished work. A domain with no DMARC at all is asking to be impersonated.",
			"DKIM needs a selector (google, s1, default…). Guessing selectors is closer to enumeration than this lab will do. Note the limitation in your report: “DKIM was not enumerated.”",
			"None of this authorises a spoofed message. Publishing a screenshot of +all is the demonstration. Pressing send is fraud in every jurisdiction this lab mentions."
		]
	},
	{
		slug: "reduce-footprint",
		title: "How to shrink your own digital footprint",
		kicker: "Defence",
		minutes: 6,
		body: [
			"Unique usernames on banks, email, and work. Reuse is fine on throwaway hobbies.",
			"Unique passwords plus a manager. 2FA on email first — it is the recovery hub for everything else.",
			"Search your own name and old email quarterly. Remove forgotten profiles. Lock down GitHub emails in commit settings.",
			"Strip EXIF. Avoid posting live locations. Review connected apps on Google / Apple / GitHub yearly.",
			"Assume anything you type in a “private” Discord or WhatsApp group can be screenshotted. OSINT includes leaked screenshots that other people publish."
		]
	},
	{
		slug: "cite",
		title: "How to write this up as a final-year project",
		kicker: "FYP",
		minutes: 5,
		body: [
			"Suggested title: “An Ethical Laboratory for Open-Source Intelligence and Personal Digital-Footprint Awareness.”",
			"Learning outcomes to claim: (1) explain OSINT vs computer misuse; (2) collect public DNS/RDAP/profile evidence with provenance; (3) analyse EXIF and search-dork exposure; (4) map public HTTP headers and DNS mail policy to OWASP A05 / CWE ids without exploiting them; (5) produce a sourced intelligence report; (6) recommend footprint reductions.",
			"Method: run the built-in sample subject for screenshots, walk one Training range case in the viva, then repeat the full cycle on accounts you own. Export the case file. Include the ethics charter you accepted as Appendix A.",
			"Cite OpenLens as the instrument, not as the literature. Literature: Bellingcat’s online investigation guides; NATO OSINT Handbook; SANS OSINT resources; RFC 9083 (RDAP); RFC 9116 (security.txt); certificate-transparency.org; OWASP Top 10:2021 (especially A05 Security Misconfiguration); your university ethics policy; PECA 2016 for Pakistani submissions.",
			"Limitations section (examiners like this): HTTP 200 is not identity; geolocation is probabilistic; many platforms block datacentre IPs; no breach data; no social-graph API; header checks are not a penetration test; missing HSTS is not a CVE exploit."
		]
	}
];
var ARTICLE_BY_SLUG = Object.fromEntries(ARTICLES.map((a) => [a.slug, a]));
var QUIZ = [
	{
		id: "q1",
		q: "A GitHub profile returns HTTP 200 for a username. What have you actually established?",
		options: [
			"You know the owner’s legal name",
			"A public page exists at that URL",
			"You may legally log in as that user",
			"The same person owns every other site with that handle"
		],
		answer: 1,
		why: "Status 200 means a public document was served. Identity and cross-site correlation need independent sources."
	},
	{
		id: "q2",
		q: "Which of these is outside OSINT and likely computer misuse?",
		options: [
			"Reading RDAP for example.com",
			"Searching your own name with filetype:pdf",
			"Guessing a password to “verify” an email",
			"Listing hostnames from certificate transparency"
		],
		answer: 2,
		why: "Credential guessing is unauthorised access, not open-source collection."
	},
	{
		id: "q3",
		q: "Why does OpenLens refuse to follow redirects to 10.0.0.0/8?",
		options: [
			"Those addresses are always offline",
			"To avoid using the lab as an SSRF probe against private networks",
			"IPv4 is deprecated",
			"RDAP forbids it"
		],
		answer: 1,
		why: "User-supplied URLs must not be allowed to hit internal or cloud-metadata endpoints."
	},
	{
		id: "q4",
		q: "EXIF GPS in a JPEG is best described as:",
		options: [
			"A rumour",
			"Device-asserted metadata that the photographer (or their phone) wrote into the file",
			"Proof of who took the photo",
			"A live tracking beacon"
		],
		answer: 1,
		why: "EXIF is only as honest as the device. It can be stripped or forged. It is still a serious leak when real."
	},
	{
		id: "q5",
		q: "The correct first subject for a student OSINT lab is:",
		options: [
			"A classmate who is not in the group",
			"A public official’s children",
			"Your own accounts, or a documented sample persona",
			"A random phone number from social media"
		],
		answer: 2,
		why: "Self-audit (or a fictional/sample subject) is the only ethically clean default for coursework."
	},
	{
		id: "q6",
		q: "A site’s HTTPS response has no Strict-Transport-Security header. The correct write-up is:",
		options: [
			"Critical remote-code-execution vulnerability",
			"OWASP A05 observation: missing HSTS; recommend enabling it; do not SSL-strip the host",
			"Proof that the certificate is forged",
			"Licence to run sslstrip on the campus Wi-Fi"
		],
		answer: 1,
		why: "Missing HSTS is a real misconfiguration and a real recommendation. Exploiting the missing header is not the lab."
	},
	{
		id: "q7",
		q: "robots.txt contains “Disallow: /backup/”. What have you established?",
		options: [
			"The backup zip is downloadable",
			"The operator published a path they would rather search engines skipped — which is not a lock",
			"You may fetch /backup/ because they invited you",
			"The site has no backups"
		],
		answer: 1,
		why: "The finding is the public line. Fetching /backup on a host you do not own is access, not OSINT."
	},
	{
		id: "q8",
		q: "SPF “v=spf1 ip4:203.0.113.10 +all” means:",
		options: [
			"Only 203.0.113.10 may send mail",
			"Mail is encrypted",
			"Every host, including the named one, is an authorised sender — fail-open",
			"DMARC is set to reject"
		],
		answer: 2,
		why: "+all authorises the internet. The ip4 mechanism is then decorative."
	},
	{
		id: "q9",
		q: "X-Powered-By: PHP/7.4.3 is best classified as:",
		options: [
			"An exploit you should fire in the viva",
			"Information disclosure (CWE-200) that supports a patch recommendation",
			"Proof of a webshell",
			"A private header only the admin can see"
		],
		answer: 1,
		why: "The version is public because the server sent it. Looking up CVEs is reading. Using them is misuse."
	},
	{
		id: "q10",
		q: "Certificate transparency lists staging.example.com. You may:",
		options: [
			"Report the public name and recommend a private CA — then stop",
			"Nmap the host “just to see”",
			"Try admin:admin on the staging login",
			"Paste a Nuclei template at it for bonus marks"
		],
		answer: 0,
		why: "crt.sh is OSINT. The next packet toward staging is a test, and tests need written scope."
	}
];
//#endregion
export { ARTICLE_BY_SLUG as n, QUIZ as r, ARTICLES as t };
