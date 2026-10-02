import { a as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { J as notFound, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as string, i as object, t as array } from "../_libs/zod.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as cn, n as Route$1 } from "./router-6Ed5zkYE.mjs";
import { i as GROUP_LABEL, n as Button, o as TOOL_BY_ID, s as useCaseFile, t as AppShell } from "./app-shell-DeTVcByP.mjs";
import { i as getServerFnById, n as createServerFn, r as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { i as USERNAME_RE, n as PLATFORMS, o as isEmail, s as isHttpUrl, t as DISPOSABLE_DOMAINS } from "./validate-oSww8SoE.mjs";
import { t as Badge } from "./badge-BrMyOu1F.mjs";
import { n as Label, r as Textarea, t as Input } from "./textarea-DUHBqqKz.mjs";
import { t as tt } from "../_libs/exifr.mjs";
import { t as parsePhoneNumber } from "../_libs/libphonenumber-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lab._tool-BrsG5f0q.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AddFindingButton({ tool, query, summary, detail }) {
	const addFinding = useCaseFile((s) => s.addFinding);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type: "button",
		variant: "secondary",
		size: "sm",
		onClick: () => {
			addFinding({
				tool,
				query,
				summary,
				detail
			});
			toast("Saved to case file");
		},
		children: "Add to case file"
	});
}
var SEVERITY = {
	ok: {
		label: "Sound",
		variant: "ok",
		ring: "border-ok/30"
	},
	info: {
		label: "Note",
		variant: "default",
		ring: "border-border"
	},
	low: {
		label: "Low",
		variant: "warn",
		ring: "border-warn/35"
	},
	medium: {
		label: "Medium",
		variant: "danger",
		ring: "border-danger/35"
	}
};
function FindingCard({ finding }) {
	const sev = SEVERITY[finding.severity];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("rounded-xl border bg-card p-4 sm:p-5", sev.ring),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: sev.variant,
						children: sev.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[11px] text-faint",
						children: finding.owasp
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[11px] text-faint",
						children: finding.cwe
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-3 font-medium leading-snug",
				children: finding.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-3 space-y-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-[11px] tracking-[0.14em] text-faint uppercase",
						children: "Observation"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-0.5 font-mono text-xs leading-relaxed break-all text-muted",
						children: finding.observation
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-[11px] tracking-[0.14em] text-faint uppercase",
						children: "Why it matters"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-0.5 text-muted",
						children: finding.why
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-[11px] tracking-[0.14em] text-faint uppercase",
						children: "Fix"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-0.5 text-foreground/90",
						children: finding.fix
					})] }),
					finding.stop !== "N/A" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md border border-danger/25 bg-danger/5 px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-[11px] tracking-[0.14em] text-danger uppercase",
							children: "Stop line"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-0.5 text-sm text-foreground/90",
							children: finding.stop
						})]
					}) : null
				]
			})
		]
	});
}
function ScoreBoard({ score, findings }) {
	const medium = findings.filter((f) => f.severity === "medium").length;
	const low = findings.filter((f) => f.severity === "low").length;
	const info = findings.filter((f) => f.severity === "info").length;
	const ok = findings.filter((f) => f.severity === "ok").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-end justify-between gap-4 rounded-xl border border-border bg-card p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.16em] text-faint uppercase",
				children: "Hardening score"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-1 font-display text-5xl tabular-nums", score >= 80 ? "text-ok" : score >= 55 ? "text-warn" : "text-danger"),
				children: score
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-sm text-xs text-muted",
				children: "Educational index from public headers and well-known files. Not a pentest grade, not a CVE count."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "grid grid-cols-2 gap-x-6 gap-y-1 font-mono text-xs tabular-nums text-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-danger",
					children: medium
				}), " medium"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-warn",
					children: low
				}), " low"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-faint",
					children: info
				}), " notes"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-ok",
					children: ok
				}), " sound"] })
			]
		})]
	});
}
function ToolFrame({ tool, children, onSample }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.18em] text-accent uppercase",
				children: GROUP_LABEL[tool.group]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight sm:text-5xl",
				children: tool.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-muted",
				children: tool.lesson
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap items-center gap-3",
				children: [
					tool.sample && onSample ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						size: "sm",
						type: "button",
						onClick: onSample,
						children: ["Load sample · ", tool.sampleHint]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Public sources" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/academy/$slug",
						params: { slug: "ethics-and-law" },
						className: "text-xs text-muted underline-offset-4 hover:text-foreground hover:underline",
						children: "Ethics notes"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children
			})
		]
	});
}
function ResultTable({ rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
		className: "divide-y divide-border overflow-hidden rounded-xl border border-border bg-card",
		children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-3 sm:gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-xs tracking-[0.12em] text-faint uppercase",
				children: row.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "font-mono text-sm break-all sm:col-span-2",
				children: row.value || "—"
			})]
		}, row.label))
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var checkUsernameBatch = createServerFn({ method: "POST" }).validator(object({
	username: string().min(1).max(39),
	ids: array(string()).min(1).max(8)
})).handler(createSsrRpc("9b13b9097d8721d93a056e81ed09dccaf7fc7e1787b011cbcd34e707d007350b"));
var lookupDomain = createServerFn({ method: "POST" }).validator(object({ domain: string().min(1).max(253) })).handler(createSsrRpc("f1355e7b065ef4e6c0daf668d3704c3fc0070965b16fd86ce05ce82923f656ef"));
var lookupCertificates = createServerFn({ method: "POST" }).validator(object({ domain: string().min(1).max(253) })).handler(createSsrRpc("02046d0e53a2916ce7ceacc7dee16b443a29dca7be59f81f9584a3bfca888a59"));
var lookupIp = createServerFn({ method: "POST" }).validator(object({ ip: string().min(1).max(80) })).handler(createSsrRpc("ebb72159df7181f48a4ade4a60b7cdb7a15eff4483b571a15a613d9e976d345d"));
var lookupEmail = createServerFn({ method: "POST" }).validator(object({
	email: string().min(3).max(120),
	hash: string().length(32)
})).handler(createSsrRpc("2a9207625e8d4cd382bf7bfe0a5bdbb314241a995a500991db7bed76e936ae58"));
var lookupGithub = createServerFn({ method: "POST" }).validator(object({ username: string().min(1).max(39) })).handler(createSsrRpc("2d252b0443236e18d7907cf965c40e82e526f9a2270a1ced847f4e7c8c05febd"));
var inspectUrl = createServerFn({ method: "POST" }).validator(object({ url: string().min(8).max(1500) })).handler(createSsrRpc("472577c7cd78520f352dfd50039434701c58de9cbba8d770aa825ffc822fd4a9"));
var inspectSurface = createServerFn({ method: "POST" }).validator(object({ url: string().min(8).max(1500) })).handler(createSsrRpc("5888f37f020ba24d85ccc2d8220ef66967513856b6ec064e18ab5714242da9dd"));
var tool$11 = TOOL_BY_ID.domain;
function DomainTool() {
	const [domain, setDomain] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [certBusy, setCertBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [result, setResult] = (0, import_react.useState)(null);
	const [certs, setCerts] = (0, import_react.useState)(null);
	async function run(target) {
		setBusy(true);
		setError(null);
		setCerts(null);
		try {
			setResult(await lookupDomain({ data: { domain: target } }));
		} catch (err) {
			setResult(null);
			setError(err instanceof Error ? err.message : "Lookup failed");
		} finally {
			setBusy(false);
		}
	}
	async function runCerts() {
		if (!result) return;
		setCertBusy(true);
		try {
			setCerts(await lookupCertificates({ data: { domain: result.domain } }));
		} catch (err) {
			setError(err instanceof Error ? err.message : "Certificate lookup failed");
		} finally {
			setCertBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToolFrame, {
		tool: tool$11,
		onSample: () => {
			setDomain(tool$11.sample);
			run(tool$11.sample);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-end",
				onSubmit: (e) => {
					e.preventDefault();
					run(domain);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "domain",
						children: "Domain"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "domain",
						value: domain,
						placeholder: "example.com",
						autoComplete: "off",
						onChange: (e) => setDomain(e.target.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: busy,
					children: busy ? "Querying…" : "Look up"
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-danger",
				children: error
			}) : null,
			result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultTable, { rows: [
						{
							label: "Registrar",
							value: result.rdap.registrar
						},
						{
							label: "Registered",
							value: result.rdap.registered?.slice(0, 10)
						},
						{
							label: "Expires",
							value: result.rdap.expires?.slice(0, 10)
						},
						{
							label: "Status",
							value: result.rdap.status.join(", ")
						},
						{
							label: "RDAP NS",
							value: result.rdap.nameservers.join(", ")
						}
					] }),
					result.mailAuth ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-xs tracking-[0.16em] text-faint uppercase",
										children: "Email authentication (SPF / DMARC)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: result.mailAuth.spf.qualifier === "reject" ? "ok" : "warn",
										children: ["SPF ", result.mailAuth.spf.qualifier]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: result.mailAuth.dmarc.policy === "reject" || result.mailAuth.dmarc.policy === "quarantine" ? "ok" : "warn",
										children: ["DMARC ", result.mailAuth.dmarc.policy]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "Read from public TXT records. This is not a spoof test — do not send mail as this domain."
							}),
							result.mailAuth.findings.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FindingCard, { finding: f }, f.id))
						]
					}) : null,
					result.dns.map((block) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mb-2 text-xs tracking-[0.16em] text-faint uppercase",
						children: [block.type, " records"]
					}), block.records.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: block.error || "None published"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-1 rounded-lg border border-border bg-card p-4 font-mono text-xs leading-relaxed",
						children: block.records.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "break-all",
							children: r.data
						}, i))
					})] }, block.type)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "secondary",
							onClick: () => void runCerts(),
							disabled: certBusy,
							children: certBusy ? "Reading logs…" : "Certificate transparency"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddFindingButton, {
							tool: "domain",
							query: result.domain,
							summary: `DNS + RDAP for ${result.domain}${result.rdap.registrar ? ` (${result.rdap.registrar})` : ""}`,
							detail: JSON.stringify({
								rdap: result.rdap,
								dns: result.dns,
								mailAuth: result.mailAuth
							}, null, 2)
						})]
					}),
					certs ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mb-2 text-xs tracking-[0.16em] text-faint uppercase",
							children: [
								"Hostnames in public certificates (",
								certs.names.length,
								")"
							]
						}),
						certs.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-danger",
							children: certs.error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "columns-1 gap-4 rounded-lg border border-border bg-card p-4 font-mono text-xs sm:columns-2",
							children: certs.names.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "break-all",
								children: n
							}, n))
						})
					] }) : null
				]
			}) : null
		]
	});
}
function buildDorks(subject) {
	const q = subject.trim();
	if (!q) return [];
	const quoted = `"${q.replace(/"/g, "")}"`;
	return [
		{
			title: "Exact phrase",
			query: quoted,
			why: "Finds pages that mention the subject as a contiguous string."
		},
		{
			title: "PDF documents",
			query: `${quoted} filetype:pdf`,
			why: "Resumes, papers, and slides often leak emails and phone numbers."
		},
		{
			title: "Spreadsheets",
			query: `${quoted} (filetype:xls OR filetype:xlsx OR filetype:csv)`,
			why: "Spreadsheets are a common source of accidental PII dumps."
		},
		{
			title: "GitHub code",
			query: `site:github.com ${quoted}`,
			why: "Public repos sometimes commit config files, emails, or API keys."
		},
		{
			title: "Paste sites",
			query: `${quoted} (site:pastebin.com OR site:paste.ee OR site:ghostbin.com)`,
			why: "Pastes are frequently used for dumps and forgotten notes."
		},
		{
			title: "Index pages",
			query: `${quoted} intitle:"index of"`,
			why: "Open directories can expose backups. Use only on assets you own."
		},
		{
			title: "LinkedIn public",
			query: `site:linkedin.com/in ${quoted}`,
			why: "Public professional profiles are a primary OSINT source."
		},
		{
			title: "News & blogs",
			query: `${quoted} (site:medium.com OR site:substack.com OR site:wordpress.com)`,
			why: "Long-form writing often includes biography and contact details."
		}
	];
}
function duckUrl(query) {
	return `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
}
function googleUrl(query) {
	return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}
var tool$10 = TOOL_BY_ID.dorks;
function DorksTool() {
	const [subject, setSubject] = (0, import_react.useState)("");
	const dorks = (0, import_react.useMemo)(() => buildDorks(subject), [subject]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToolFrame, {
		tool: tool$10,
		onSample: () => setSubject("Ada Lovelace"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "subject",
					children: "Your name, brand, or handle"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "subject",
					value: subject,
					placeholder: "your name",
					autoComplete: "off",
					onChange: (e) => setSubject(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 space-y-3",
				children: dorks.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl border border-border bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-[0.14em] text-faint uppercase",
							children: d.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-mono text-sm break-all",
							children: d.query
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: d.why
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "text-accent underline-offset-4 hover:underline",
								href: duckUrl(d.query),
								target: "_blank",
								rel: "noreferrer",
								children: "DuckDuckGo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "text-accent underline-offset-4 hover:underline",
								href: googleUrl(d.query),
								target: "_blank",
								rel: "noreferrer",
								children: "Google"
							})]
						})
					]
				}, d.title))
			}),
			dorks.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddFindingButton, {
					tool: "dorks",
					query: subject,
					summary: `Built ${dorks.length} self-audit queries for “${subject}”`,
					detail: dorks.map((d) => `${d.title}: ${d.query}`).join("\n")
				})
			}) : null
		]
	});
}
/** Tiny MD5 for Gravatar hashes. Not a cryptographic primitive for secrets. */
function md5(str) {
	function cmn(q, a, b, x, s, t) {
		a = a + q + x + t | 0;
		return (a << s | a >>> 32 - s) + b | 0;
	}
	function ff(a, b, c, d, x, s, t) {
		return cmn(b & c | ~b & d, a, b, x, s, t);
	}
	function gg(a, b, c, d, x, s, t) {
		return cmn(b & d | c & ~d, a, b, x, s, t);
	}
	function hh(a, b, c, d, x, s, t) {
		return cmn(b ^ c ^ d, a, b, x, s, t);
	}
	function ii(a, b, c, d, x, s, t) {
		return cmn(c ^ (b | ~d), a, b, x, s, t);
	}
	function md51(s) {
		const n = s.length;
		const state = [
			1732584193,
			-271733879,
			-1732584194,
			271733878
		];
		let i = 64;
		for (; i <= n; i += 64) md5cycle(state, md5blk(s.substring(i - 64, i)));
		const tail = new Array(16).fill(0);
		const rest = s.substring(i - 64);
		for (i = 0; i < rest.length; i++) tail[i >> 2] |= rest.charCodeAt(i) << (i % 4 << 3);
		tail[i >> 2] |= 128 << (i % 4 << 3);
		if (i > 55) {
			md5cycle(state, tail);
			for (let j = 0; j < 16; j++) tail[j] = 0;
		}
		tail[14] = n * 8;
		md5cycle(state, tail);
		return state;
	}
	function md5blk(s) {
		const md5blks = [];
		for (let i = 0; i < 64; i += 4) md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
		return md5blks;
	}
	function md5cycle(x, k) {
		let [a, b, c, d] = x;
		a = ff(a, b, c, d, k[0], 7, -680876936);
		d = ff(d, a, b, c, k[1], 12, -389564586);
		c = ff(c, d, a, b, k[2], 17, 606105819);
		b = ff(b, c, d, a, k[3], 22, -1044525330);
		a = ff(a, b, c, d, k[4], 7, -176418897);
		d = ff(d, a, b, c, k[5], 12, 1200080426);
		c = ff(c, d, a, b, k[6], 17, -1473231341);
		b = ff(b, c, d, a, k[7], 22, -45705983);
		a = ff(a, b, c, d, k[8], 7, 1770035416);
		d = ff(d, a, b, c, k[9], 12, -1958414417);
		c = ff(c, d, a, b, k[10], 17, -42063);
		b = ff(b, c, d, a, k[11], 22, -1990404162);
		a = ff(a, b, c, d, k[12], 7, 1804603682);
		d = ff(d, a, b, c, k[13], 12, -40341101);
		c = ff(c, d, a, b, k[14], 17, -1502002290);
		b = ff(b, c, d, a, k[15], 22, 1236535329);
		a = gg(a, b, c, d, k[1], 5, -165796510);
		d = gg(d, a, b, c, k[6], 9, -1069501632);
		c = gg(c, d, a, b, k[11], 14, 643717713);
		b = gg(b, c, d, a, k[0], 20, -373897302);
		a = gg(a, b, c, d, k[5], 5, -701558691);
		d = gg(d, a, b, c, k[10], 9, 38016083);
		c = gg(c, d, a, b, k[15], 14, -660478335);
		b = gg(b, c, d, a, k[4], 20, -405537848);
		a = gg(a, b, c, d, k[9], 5, 568446438);
		d = gg(d, a, b, c, k[14], 9, -1019803690);
		c = gg(c, d, a, b, k[3], 14, -187363961);
		b = gg(b, c, d, a, k[8], 20, 1163531501);
		a = gg(a, b, c, d, k[13], 5, -1444681467);
		d = gg(d, a, b, c, k[2], 9, -51403784);
		c = gg(c, d, a, b, k[7], 14, 1735328473);
		b = gg(b, c, d, a, k[12], 20, -1926607734);
		a = hh(a, b, c, d, k[5], 4, -378558);
		d = hh(d, a, b, c, k[8], 11, -2022574463);
		c = hh(c, d, a, b, k[11], 16, 1839030562);
		b = hh(b, c, d, a, k[14], 23, -35309556);
		a = hh(a, b, c, d, k[1], 4, -1530992060);
		d = hh(d, a, b, c, k[4], 11, 1272893353);
		c = hh(c, d, a, b, k[7], 16, -155497632);
		b = hh(b, c, d, a, k[10], 23, -1094730640);
		a = hh(a, b, c, d, k[13], 4, 681279174);
		d = hh(d, a, b, c, k[0], 11, -358537222);
		c = hh(c, d, a, b, k[3], 16, -722521979);
		b = hh(b, c, d, a, k[6], 23, 76029189);
		a = hh(a, b, c, d, k[9], 4, -640364487);
		d = hh(d, a, b, c, k[12], 11, -421815835);
		c = hh(c, d, a, b, k[15], 16, 530742520);
		b = hh(b, c, d, a, k[2], 23, -995338651);
		a = ii(a, b, c, d, k[0], 6, -198630844);
		d = ii(d, a, b, c, k[7], 10, 1126891415);
		c = ii(c, d, a, b, k[14], 15, -1416354905);
		b = ii(b, c, d, a, k[5], 21, -57434055);
		a = ii(a, b, c, d, k[12], 6, 1700485571);
		d = ii(d, a, b, c, k[3], 10, -1894986606);
		c = ii(c, d, a, b, k[10], 15, -1051523);
		b = ii(b, c, d, a, k[1], 21, -2054922799);
		a = ii(a, b, c, d, k[8], 6, 1873313359);
		d = ii(d, a, b, c, k[15], 10, -30611744);
		c = ii(c, d, a, b, k[6], 15, -1560198380);
		b = ii(b, c, d, a, k[13], 21, 1309151649);
		a = ii(a, b, c, d, k[4], 6, -145523070);
		d = ii(d, a, b, c, k[11], 10, -1120210379);
		c = ii(c, d, a, b, k[2], 15, 718787259);
		b = ii(b, c, d, a, k[9], 21, -343485551);
		x[0] = a + x[0] | 0;
		x[1] = b + x[1] | 0;
		x[2] = c + x[2] | 0;
		x[3] = d + x[3] | 0;
	}
	function rhex(n) {
		const hex = "0123456789abcdef";
		let s = "";
		for (let j = 0; j < 4; j++) s += hex.charAt(n >> j * 8 + 4 & 15) + hex.charAt(n >> j * 8 & 15);
		return s;
	}
	return md51(unescape(encodeURIComponent(str))).map(rhex).join("");
}
var tool$9 = TOOL_BY_ID.email;
function EmailTool() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [result, setResult] = (0, import_react.useState)(null);
	const [disposable, setDisposable] = (0, import_react.useState)(false);
	async function run(target) {
		const e = target.trim().toLowerCase();
		if (!isEmail(e)) {
			setError("That does not look like an email address.");
			return;
		}
		setBusy(true);
		setError(null);
		const domain = e.split("@")[1] ?? "";
		setDisposable(DISPOSABLE_DOMAINS.has(domain));
		try {
			setResult(await lookupEmail({ data: {
				email: e,
				hash: md5(e)
			} }));
		} catch (err) {
			setResult(null);
			setError(err instanceof Error ? err.message : "Lookup failed");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToolFrame, {
		tool: tool$9,
		onSample: () => {
			setEmail(tool$9.sample);
			run(tool$9.sample);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-end",
				onSubmit: (e) => {
					e.preventDefault();
					run(email);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "email",
						children: "Email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "email",
						value: email,
						placeholder: "you@example.com",
						autoComplete: "off",
						onChange: (e) => setEmail(e.target.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: busy,
					children: busy ? "Checking…" : "Inspect"
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-danger",
				children: error
			}) : null,
			result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [disposable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "warn",
							children: "Disposable domain"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "ok",
							children: "Not on the lab’s throwaway list"
						}), result.gravatar.present ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "accent",
							children: "Gravatar portrait exists"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "No Gravatar" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultTable, { rows: [
						{
							label: "Address",
							value: result.email
						},
						{
							label: "Domain",
							value: result.domain
						},
						{
							label: "MX",
							value: result.mx.length ? result.mx.map((m) => m.data).join(" · ") : result.mxError || "None"
						}
					] }),
					result.gravatar.present ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: result.gravatar.url,
						alt: "",
						width: 64,
						height: 64,
						className: "size-16 rounded-lg outline outline-1 -outline-offset-1 outline-foreground/10"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddFindingButton, {
						tool: "email",
						query: result.email,
						summary: `${result.email} · MX ${result.mx[0]?.data ?? "none"} · gravatar ${result.gravatar.present ? "yes" : "no"}`,
						detail: JSON.stringify({
							...result,
							disposable
						}, null, 2)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-faint",
						children: "Breach search is deliberately omitted. Check your own address on Have I Been Pwned in a private browser session if you need that."
					})
				]
			}) : null
		]
	});
}
var tool$8 = TOOL_BY_ID.exposure;
function ExposureTool() {
	const [url, setUrl] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [result, setResult] = (0, import_react.useState)(null);
	async function run(target) {
		if (!isHttpUrl(target)) {
			setError("Only public http(s) URLs you are allowed to look at.");
			return;
		}
		setBusy(true);
		setError(null);
		try {
			setResult(await inspectSurface({ data: { url: target } }));
		} catch (err) {
			setResult(null);
			setError(err instanceof Error ? err.message : "Surface check failed");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToolFrame, {
		tool: tool$8,
		onSample: () => {
			setUrl(tool$8.sample);
			run(tool$8.sample);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-5 rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted",
				children: "One public GET plus robots.txt and security.txt. No ports, no directory brute force, no payloads. Use a hostname you own — or the sample."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-end",
				onSubmit: (e) => {
					e.preventDefault();
					run(url);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "surface-url",
						children: "Public URL"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "surface-url",
						value: url,
						placeholder: "https://example.com",
						autoComplete: "off",
						onChange: (e) => setUrl(e.target.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: busy,
					children: busy ? "Reading headers…" : "Check surface"
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-danger",
				children: error
			}) : null,
			result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBoard, {
						score: result.score,
						findings: result.findings
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultTable, { rows: [
						{
							label: "Requested",
							value: result.url
						},
						{
							label: "Final URL",
							value: result.finalUrl
						},
						{
							label: "HTTPS",
							value: result.https ? "yes" : "no"
						},
						{
							label: "HTTP status",
							value: String(result.status)
						},
						{
							label: "Hops",
							value: result.hops.join(" → ")
						}
					] }),
					Object.keys(result.headers).length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 text-xs tracking-[0.16em] text-faint uppercase",
						children: "Captured response headers"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-1 rounded-lg border border-border bg-card p-4 font-mono text-xs leading-relaxed",
						children: Object.entries(result.headers).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "break-all",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-accent",
									children: k
								}),
								": ",
								v
							]
						}, k))
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "No security-relevant headers on the final response."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xs tracking-[0.16em] text-faint uppercase",
							children: "Findings"
						}), result.findings.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FindingCard, { finding: f }, f.id))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddFindingButton, {
						tool: "exposure",
						query: result.finalUrl,
						summary: `HTTP surface score ${result.score}/100 · ${result.findings.filter((f) => f.severity === "medium" || f.severity === "low").length} issues on ${new URL(result.finalUrl).hostname}`,
						detail: JSON.stringify({
							score: result.score,
							headers: result.headers,
							findings: result.findings.map((f) => ({
								id: f.id,
								severity: f.severity,
								title: f.title,
								owasp: f.owasp,
								cwe: f.cwe
							}))
						}, null, 2)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							"Read",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/academy/$slug",
								params: { slug: "visible-vulns" },
								className: "underline-offset-4 hover:underline",
								children: "visible vulnerabilities"
							}),
							" ",
							"and",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/academy/$slug",
								params: { slug: "owasp-a05" },
								className: "underline-offset-4 hover:underline",
								children: "OWASP A05"
							}),
							" ",
							"before the viva."
						]
					})
				]
			}) : null
		]
	});
}
var tool$7 = TOOL_BY_ID.github;
function GithubTool() {
	const [username, setUsername] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [result, setResult] = (0, import_react.useState)(null);
	async function run(target) {
		setBusy(true);
		setError(null);
		try {
			setResult(await lookupGithub({ data: { username: target } }));
		} catch (err) {
			setResult(null);
			setError(err instanceof Error ? err.message : "Lookup failed");
		} finally {
			setBusy(false);
		}
	}
	const profile = result && result.found ? result.profile : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToolFrame, {
		tool: tool$7,
		onSample: () => {
			setUsername(tool$7.sample);
			run(tool$7.sample);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-end",
				onSubmit: (e) => {
					e.preventDefault();
					run(username);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "gh",
						children: "GitHub username"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "gh",
						value: username,
						placeholder: "octocat",
						autoComplete: "off",
						onChange: (e) => setUsername(e.target.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: busy,
					children: busy ? "Fetching…" : "Load public profile"
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-danger",
				children: error
			}) : null,
			result && !result.found ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: "No public GitHub user with that login."
			}) : null,
			profile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [profile.avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: profile.avatarUrl,
							alt: "",
							width: 64,
							height: 64,
							className: "size-16 rounded-lg outline outline-1 -outline-offset-1 outline-foreground/10"
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl",
							children: profile.name || profile.login
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: profile.htmlUrl,
							className: "text-sm text-accent hover:underline",
							target: "_blank",
							rel: "noreferrer",
							children: profile.htmlUrl
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultTable, { rows: [
						{
							label: "Bio",
							value: profile.bio
						},
						{
							label: "Company",
							value: profile.company
						},
						{
							label: "Blog",
							value: profile.blog
						},
						{
							label: "Location",
							value: profile.location
						},
						{
							label: "Public email",
							value: profile.email
						},
						{
							label: "X / Twitter",
							value: profile.twitter
						},
						{
							label: "Repos",
							value: String(profile.publicRepos)
						},
						{
							label: "Followers",
							value: String(profile.followers)
						},
						{
							label: "Joined",
							value: profile.createdAt?.slice(0, 10)
						},
						{
							label: "Hireable",
							value: profile.hireable == null ? "unspecified" : profile.hireable ? "yes" : "no"
						}
					] }),
					result?.found && result.repos.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: result.repos.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-lg border border-border bg-card px-4 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: r.html_url,
									className: "text-sm hover:underline",
									target: "_blank",
									rel: "noreferrer",
									children: r.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted",
									children: r.description || "No description"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 font-mono text-[11px] text-faint",
									children: [
										r.language || "—",
										" · ",
										r.stargazers_count,
										" stars"
									]
								})
							]
						}, r.name))
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddFindingButton, {
						tool: "github",
						query: profile.login,
						summary: `GitHub ${profile.login} · ${profile.publicRepos} public repos · ${profile.followers} followers`,
						detail: JSON.stringify(profile, null, 2)
					})
				]
			}) : null
		]
	});
}
function identifyHash(input) {
	const raw = input.trim();
	if (!raw) return [];
	const guesses = [];
	const hex = /^[a-fA-F0-9]+$/.test(raw);
	const b64 = /^[A-Za-z0-9+/=]+$/.test(raw);
	if (raw.startsWith("$2a$") || raw.startsWith("$2b$") || raw.startsWith("$2y$")) guesses.push({
		name: "bcrypt",
		confidence: "high",
		notes: "Adaptive password hash. Designed to be slow. Do not attempt to crack."
	});
	if (raw.startsWith("$argon2")) guesses.push({
		name: "Argon2",
		confidence: "high",
		notes: "Memory-hard password hash (winner of the Password Hashing Competition)."
	});
	if (raw.startsWith("$6$")) guesses.push({
		name: "SHA-512 crypt",
		confidence: "high",
		notes: "Unix shadow password format (sha512crypt)."
	});
	if (raw.startsWith("$5$")) guesses.push({
		name: "SHA-256 crypt",
		confidence: "high",
		notes: "Unix shadow password format (sha256crypt)."
	});
	if (raw.startsWith("$1$")) guesses.push({
		name: "MD5 crypt",
		confidence: "high",
		notes: "Legacy Unix $1$ format. Weak — educational ID only."
	});
	if (raw.split(".").length === 3 && raw.length > 40) guesses.push({
		name: "JWT (JSON Web Token)",
		confidence: "medium",
		notes: "Three base64url segments. Inspect header/payload only — never share live tokens."
	});
	if (hex && raw.length === 32) {
		guesses.push({
			name: "MD5",
			confidence: "medium",
			notes: "32 hex chars. Also matches NTLM and many other 128-bit fingerprints."
		});
		guesses.push({
			name: "NTLM",
			confidence: "low",
			notes: "Windows NTLM is also 32 hex chars. Context (source) is required."
		});
	}
	if (hex && raw.length === 40) guesses.push({
		name: "SHA-1",
		confidence: "medium",
		notes: "40 hex chars. Deprecated for collision resistance."
	});
	if (hex && raw.length === 64) guesses.push({
		name: "SHA-256",
		confidence: "medium",
		notes: "64 hex chars. Also matches SHA3-256 in hex form."
	});
	if (hex && raw.length === 96) guesses.push({
		name: "SHA-384",
		confidence: "medium",
		notes: "96 hex chars."
	});
	if (hex && raw.length === 128) guesses.push({
		name: "SHA-512",
		confidence: "medium",
		notes: "128 hex chars."
	});
	if (raw.startsWith("sha256$") || raw.includes("pbkdf2")) guesses.push({
		name: "PBKDF2 / framework digest",
		confidence: "medium",
		notes: "Application-specific salted digest."
	});
	if (b64 && !hex && raw.length >= 20 && guesses.length === 0) guesses.push({
		name: "Base64 blob",
		confidence: "low",
		notes: "Could be any digest encoded in Base64. Decode first, then re-identify."
	});
	if (guesses.length === 0) guesses.push({
		name: "Unknown",
		confidence: "low",
		notes: `Length ${raw.length}. Hash ID is heuristic — many algorithms share encodings.`
	});
	return guesses;
}
var tool$6 = TOOL_BY_ID.hash;
function HashTool() {
	const [raw, setRaw] = (0, import_react.useState)(tool$6.sample);
	const guesses = (0, import_react.useMemo)(() => identifyHash(raw), [raw]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToolFrame, {
		tool: tool$6,
		onSample: () => setRaw(tool$6.sample),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "hash",
					children: "Digest"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "hash",
					value: raw,
					rows: 4,
					className: "font-mono",
					onChange: (e) => setRaw(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs text-faint",
				children: [
					"Length ",
					raw.trim().length,
					" · identification only, never cracking"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 space-y-3",
				children: guesses.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl border border-border bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl",
							children: g.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: g.confidence === "high" ? "ok" : g.confidence === "medium" ? "accent" : "default",
							children: g.confidence
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: g.notes
					})]
				}, g.name))
			}),
			raw.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddFindingButton, {
					tool: "hash",
					query: raw.trim().slice(0, 24) + (raw.trim().length > 24 ? "…" : ""),
					summary: `Hash ID: ${guesses.map((g) => g.name).join(", ")}`,
					detail: JSON.stringify(guesses, null, 2)
				})
			}) : null
		]
	});
}
var tool$5 = TOOL_BY_ID.image;
function ImageTool() {
	const [meta, setMeta] = (0, import_react.useState)(null);
	const [preview, setPreview] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	async function onFile(file) {
		setError(null);
		if (preview) URL.revokeObjectURL(preview);
		setPreview(URL.createObjectURL(file));
		try {
			const parsed = await tt.parse(file, {
				gps: true,
				tiff: true,
				exif: true
			}) ?? {};
			const gps = await tt.gps(file).catch(() => null);
			const bitmap = await createImageBitmap(file).catch(() => null);
			setMeta({
				fileName: file.name,
				fileSize: file.size,
				mime: file.type || "unknown",
				width: bitmap?.width,
				height: bitmap?.height,
				make: str(parsed.Make),
				model: str(parsed.Model),
				lens: str(parsed.LensModel),
				software: str(parsed.Software),
				taken: str(parsed.DateTimeOriginal || parsed.CreateDate || parsed.ModifyDate),
				lat: gps?.latitude,
				lon: gps?.longitude,
				rawKeys: Object.keys(parsed).length
			});
		} catch (err) {
			setMeta(null);
			setError(err instanceof Error ? err.message : "Could not read metadata");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToolFrame, {
		tool: tool$5,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card px-4 py-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "file",
						accept: "image/jpeg,image/jpg,image/tiff,image/heic,image/heif,image/png,image/webp",
						className: "sr-only",
						onChange: (e) => {
							const f = e.target.files?.[0];
							if (f) onFile(f);
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm",
						children: "Drop a photo you took — it stays on this device"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 text-xs text-faint",
						children: "JPEG, TIFF, HEIC. PNG/WebP often have no EXIF."
					})
				]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-danger",
				children: error
			}) : null,
			preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: preview,
				alt: "Selected file preview",
				className: "mt-6 max-h-64 rounded-lg object-contain outline outline-1 -outline-offset-1 outline-foreground/10"
			}) : null,
			meta ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultTable, { rows: [
						{
							label: "File",
							value: `${meta.fileName} · ${Math.round(meta.fileSize / 1024)} KB`
						},
						{
							label: "Type",
							value: meta.mime
						},
						{
							label: "Pixels",
							value: meta.width && meta.height ? `${meta.width} × ${meta.height}` : "—"
						},
						{
							label: "Camera",
							value: [meta.make, meta.model].filter(Boolean).join(" ")
						},
						{
							label: "Lens",
							value: meta.lens
						},
						{
							label: "Software",
							value: meta.software
						},
						{
							label: "Taken",
							value: meta.taken
						},
						{
							label: "GPS",
							value: meta.lat != null && meta.lon != null ? `${meta.lat.toFixed(6)}, ${meta.lon.toFixed(6)}` : "None in file"
						},
						{
							label: "Tags read",
							value: String(meta.rawKeys)
						}
					] }),
					meta.lat != null && meta.lon != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "inline-block text-sm text-accent underline-offset-4 hover:underline",
						href: `https://www.openstreetmap.org/?mlat=${meta.lat}&mlon=${meta.lon}#map=16/${meta.lat}/${meta.lon}`,
						target: "_blank",
						rel: "noreferrer",
						children: "Open GPS on OpenStreetMap"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddFindingButton, {
						tool: "image",
						query: meta.fileName,
						summary: `EXIF for ${meta.fileName}${meta.lat != null ? " · GPS present" : " · no GPS"}`,
						detail: JSON.stringify(meta, null, 2)
					})
				]
			}) : null
		]
	});
}
function str(v) {
	if (v instanceof Date) return v.toISOString();
	if (typeof v === "string" && v.trim()) return v;
	if (typeof v === "number") return String(v);
}
var tool$4 = TOOL_BY_ID.ip;
function IpTool() {
	const [ip, setIp] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [result, setResult] = (0, import_react.useState)(null);
	async function run(target) {
		setBusy(true);
		setError(null);
		try {
			setResult(await lookupIp({ data: { ip: target } }));
		} catch (err) {
			setResult(null);
			setError(err instanceof Error ? err.message : "Lookup failed");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToolFrame, {
		tool: tool$4,
		onSample: () => {
			setIp(tool$4.sample);
			run(tool$4.sample);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-end",
				onSubmit: (e) => {
					e.preventDefault();
					run(ip);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "ip",
						children: "Public IP"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "ip",
						value: ip,
						placeholder: "1.1.1.1",
						autoComplete: "off",
						onChange: (e) => setIp(e.target.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: busy,
					children: busy ? "Looking up…" : "Geolocate"
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-danger",
				children: error
			}) : null,
			result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultTable, { rows: [
						{
							label: "Address",
							value: result.ip
						},
						{
							label: "Type",
							value: result.type
						},
						{
							label: "City",
							value: [result.city, result.region].filter(Boolean).join(", ")
						},
						{
							label: "Country",
							value: result.country
						},
						{
							label: "ASN",
							value: result.asn ? `AS${result.asn}` : null
						},
						{
							label: "Organisation",
							value: result.org
						},
						{
							label: "ISP",
							value: result.isp
						},
						{
							label: "Timezone",
							value: result.timezone
						},
						{
							label: "Coordinates",
							value: result.latitude != null && result.longitude != null ? `${result.latitude.toFixed(4)}, ${result.longitude.toFixed(4)}` : null
						}
					] }),
					result.latitude != null && result.longitude != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "inline-block text-sm text-accent underline-offset-4 hover:underline",
						href: `https://www.openstreetmap.org/?mlat=${result.latitude}&mlon=${result.longitude}#map=6/${result.latitude}/${result.longitude}`,
						target: "_blank",
						rel: "noreferrer",
						children: "View estimate on OpenStreetMap"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddFindingButton, {
						tool: "ip",
						query: result.ip,
						summary: `${result.ip} · ${result.org || result.isp || "unknown org"} · ${result.country || "unknown country"}`,
						detail: JSON.stringify(result, null, 2)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-faint",
						children: "Anycast, CDNs and VPNs make city-level geolocation a hint. Never treat it as a street address."
					})
				]
			}) : null
		]
	});
}
var tool$3 = TOOL_BY_ID.phone;
function describe(n) {
	const type = n.getType();
	return {
		e164: n.format("E.164"),
		international: n.formatInternational(),
		national: n.formatNational(),
		country: n.country ?? "unknown",
		countryCallingCode: n.countryCallingCode,
		type: type ?? "unknown",
		valid: n.isValid(),
		possible: n.isPossible()
	};
}
function PhoneTool() {
	const [raw, setRaw] = (0, import_react.useState)(tool$3.sample);
	const parsed = (0, import_react.useMemo)(() => {
		const n = parsePhoneNumber(raw.trim());
		return n ? describe(n) : null;
	}, [raw]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToolFrame, {
		tool: tool$3,
		onSample: () => setRaw(tool$3.sample),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "phone",
					children: "Number (include country code)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "phone",
					value: raw,
					placeholder: "+92 300 1234567",
					autoComplete: "off",
					onChange: (e) => setRaw(e.target.value)
				})]
			}),
			raw.trim() && !parsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "Could not parse. Try E.164, e.g. +923001234567."
			}) : null,
			parsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultTable, { rows: [
						{
							label: "Valid",
							value: parsed.valid ? "Yes" : "No"
						},
						{
							label: "Possible",
							value: parsed.possible ? "Yes" : "No"
						},
						{
							label: "Country",
							value: parsed.country
						},
						{
							label: "Calling code",
							value: `+${parsed.countryCallingCode}`
						},
						{
							label: "Type",
							value: parsed.type.replaceAll("_", " ").toLowerCase()
						},
						{
							label: "E.164",
							value: parsed.e164
						},
						{
							label: "International",
							value: parsed.international
						},
						{
							label: "National",
							value: parsed.national
						}
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddFindingButton, {
						tool: "phone",
						query: parsed.e164,
						summary: `${parsed.e164} · ${parsed.country} · ${parsed.type} · valid=${parsed.valid}`,
						detail: JSON.stringify(parsed, null, 2)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-faint",
						children: "This is a format parser. It does not identify a subscriber, a SIM, or a home address."
					})
				]
			}) : null
		]
	});
}
var KIND = {
	observe: {
		label: "Observe",
		className: "border-border text-muted"
	},
	infer: {
		label: "Infer",
		className: "border-warn/40 text-warn"
	},
	stop: {
		label: "Stop",
		className: "border-danger/45 bg-danger/5 text-danger"
	},
	defend: {
		label: "Defend",
		className: "border-ok/40 text-ok"
	}
};
function AttackPath({ steps }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "space-y-3",
		children: steps.map((step, i) => {
			const k = KIND[step.kind];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: cn("rounded-xl border bg-card p-4", k.className),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[11px] tabular-nums text-accent",
							children: step.n
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] tracking-[0.16em] uppercase",
							children: k.label
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-medium text-foreground",
						children: step.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: step.body
					}),
					i < steps.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-mono text-[10px] tracking-[0.2em] text-faint uppercase",
						children: "↓"
					}) : null
				]
			}, step.n);
		})
	});
}
var SCENARIOS = [
	{
		id: "harbor-clinic",
		kicker: "Web misconfiguration",
		title: "Harbor Clinic — the street-view stack",
		org: "Fictional private clinic (training range only)",
		minutes: 8,
		blurb: "A public homepage leaks its runtime, forgets security headers, and advertises /backup/ in robots.txt. Nothing here is an exploit — it is what a stranger learns from one GET.",
		viva: "Explain the difference between information disclosure (CWE-200) and exploiting a PHP CVE. Examiners want the stop line.",
		evidence: [
			{
				label: "Host",
				value: "www.harbor-clinic.example (fictional)"
			},
			{
				label: "Server",
				value: "Apache/2.4.41 (Ubuntu)"
			},
			{
				label: "X-Powered-By",
				value: "PHP/7.4.3"
			},
			{
				label: "HTTPS",
				value: "Yes, no HSTS"
			},
			{
				label: "robots.txt",
				value: "Disallow: /backup/  ·  Disallow: /phpmyadmin/"
			},
			{
				label: "security.txt",
				value: "absent"
			}
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
				stop: "Do not run a PHP exploit, webshell, or scanner against any clinic — fictional or real."
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
				stop: "Do not host a clickjacking PoC against the live hostname."
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
				stop: "Do not fetch /backup or /phpmyadmin on a host you do not own. That is access, not OSINT."
			}
		],
		path: [
			{
				n: "01",
				kind: "observe",
				title: "One public GET",
				body: "Headers and robots.txt are volunteered by the server. No login, no scan, no payload."
			},
			{
				n: "02",
				kind: "infer",
				title: "Stack + forgotten paths",
				body: "PHP 7.4.3 plus /backup/ is a hypothesis: unpatched runtime, possible leftover archive. Hypothesis is not proof."
			},
			{
				n: "03",
				kind: "stop",
				title: "Stop before the payload",
				body: "Looking up CVE-2024-… in a database is literature. Sending it to the clinic is PECA / Computer Misuse. The range ends here."
			},
			{
				n: "04",
				kind: "defend",
				title: "What the clinic should do this week",
				body: "Patch PHP, hide versions, add headers, pull admin tools off the internet, publish security.txt, take a backup that is not in /var/www."
			}
		]
	},
	{
		id: "northwind-mail",
		kicker: "Email authentication",
		title: "Northwind Logistics — anyone may speak as finance",
		org: "Fictional freight SME (training range only)",
		minutes: 7,
		blurb: "DNS says the company has mail. SPF ends in +all. There is no DMARC. A stranger can see, from public TXT records, that spoofed invoices will likely deliver.",
		viva: "Quote the SPF record, explain +all versus -all, and say why actually sending a spoofed message is fraud, not a lab exercise.",
		evidence: [
			{
				label: "Domain",
				value: "northwind-lab.example (fictional)"
			},
			{
				label: "MX",
				value: "10 mail.northwind-lab.example"
			},
			{
				label: "SPF",
				value: "v=spf1 ip4:203.0.113.10 +all"
			},
			{
				label: "DMARC",
				value: "none published"
			},
			{
				label: "DKIM",
				value: "not enumerated (selector guessing is out of scope)"
			}
		],
		findings: [{
			id: "nw-spf",
			title: "SPF fail-open (+all)",
			severity: "medium",
			owasp: "A07:2021 Identification Failures",
			cwe: "CWE-290",
			observation: "v=spf1 ip4:203.0.113.10 +all",
			why: "The ip4 mechanism names one server, then +all authorises the rest of the internet. Receivers that honour SPF will still pass a forged message.",
			fix: "v=spf1 ip4:203.0.113.10 include:_spf.google.com -all — only list real senders.",
			stop: "Do not send a fake invoice from accounts@northwind-lab.example. That is a crime, not a screenshot."
		}, {
			id: "nw-dmarc",
			title: "No DMARC policy",
			severity: "medium",
			owasp: "A07:2021 Identification Failures",
			cwe: "CWE-290",
			observation: "_dmarc.northwind-lab.example NXDOMAIN",
			why: "Without p=quarantine or p=reject, even a good SPF is advisory. Finance staff will see a normal-looking mail from their own domain.",
			fix: "Start with p=none and rua= reports for two weeks, then raise the policy.",
			stop: "No phishing the accounts team “to raise awareness” without a signed exercise and a lawyer."
		}],
		path: [
			{
				n: "01",
				kind: "observe",
				title: "TXT and MX are public",
				body: "Cloudflare DNS-over-HTTPS returns the same records anyone can see. No packet is sent to Northwind’s mail server."
			},
			{
				n: "02",
				kind: "infer",
				title: "Spoofed finance mail will probably land",
				body: "+all plus no DMARC is a classic BEC (business email compromise) precondition. It is still only a precondition."
			},
			{
				n: "03",
				kind: "stop",
				title: "Do not press send",
				body: "A student demonstration stops at the screenshot of the TXT record. The forged invoice is the crime."
			},
			{
				n: "04",
				kind: "defend",
				title: "Fix DNS this afternoon",
				body: "-all, DMARC p=reject, disable user-to-user forwarding, train finance to call a known number before paying."
			}
		]
	},
	{
		id: "ayesha",
		kicker: "Personal correlation",
		title: "Ayesha K. — three public facts, one residence",
		org: "Fictional student persona (consent built into the range)",
		minutes: 6,
		blurb: "A reused handle, a Gravatar, and a holiday JPEG with GPS. Each fact is public. Together they sketch a life. This is why the lab starts with a self-audit.",
		viva: "Show how you refused to merge identities on a single 200, then show the two independent sources that made the correlation defensible.",
		evidence: [
			{
				label: "Handle",
				value: "ayesha.k — GitHub 200, Instagram 200 (simulated)"
			},
			{
				label: "GitHub bio",
				value: "CS student · Karachi"
			},
			{
				label: "Gravatar",
				value: "Present for 2021-batch university address"
			},
			{
				label: "Photo EXIF",
				value: "N 24.8607, E 67.0011 · iPhone 13 · 18:04 PKT"
			},
			{
				label: "Consent",
				value: "Persona is fictional; treat a real classmate as out of scope"
			}
		],
		findings: [{
			id: "ay-reuse",
			title: "Username reuse across two public sites",
			severity: "low",
			owasp: "A01:2021 Broken Access Control",
			cwe: "CWE-359",
			observation: "ayesha.k exists on GitHub (bio: Karachi student) and a matching public Instagram.",
			why: "One 200 is a page. Two independent pages with the same unusual handle and the same city is a correlation. It is still not a legal identity.",
			fix: "Unique handles on email, banking, and university SSO. Reuse is fine on throwaway hobbies.",
			stop: "Do not message, follow, or visit the person. Correlation is not consent to contact."
		}, {
			id: "ay-exif",
			title: "Holiday photo still carries GPS",
			severity: "medium",
			owasp: "A01:2021 Broken Access Control",
			cwe: "CWE-200",
			observation: "EXIF GPS ≈ I.I. Chundrigar / campus-adjacent; timestamp 18:04.",
			why: "A repeated evening geotag plus a student bio is how OSINT becomes a physical-security issue. The camera wrote the truth into the file.",
			fix: "Export without location. Strip EXIF before Instagram. Turn off precise location for the camera roll.",
			stop: "Do not go to the coordinates. Doxxing and stalking are offences under PECA, not clever analysis."
		}],
		path: [
			{
				n: "01",
				kind: "observe",
				title: "Public profile + file metadata",
				body: "Username probe and in-browser EXIF. No breach dump, no login, no face recognition."
			},
			{
				n: "02",
				kind: "infer",
				title: "Likely campus-adjacent evenings",
				body: "Two independent sources (bio city + GPS) support a cautious inference. Write it as inference, not fact."
			},
			{
				n: "03",
				kind: "stop",
				title: "No approach, no reset questions",
				body: "Using the data to answer a password-reset prompt, to shoulder-surf, or to wait outside a hostel is the crime."
			},
			{
				n: "04",
				kind: "defend",
				title: "Shrink the footprint",
				body: "Unique handles, 2FA on email first, strip EXIF, search your own name quarterly. That is the whole point of the FYP."
			}
		]
	},
	{
		id: "atlas-staging",
		kicker: "Certificate transparency",
		title: "Atlas Pay — staging walked in through the front log",
		org: "Fictional payments startup (training range only)",
		minutes: 7,
		blurb: "Public certificate-transparency logs list staging and vpn hostnames. Nobody scanned a port. A CA already published the names.",
		viva: "Why is crt.sh OSINT, and why is then opening staging.atlas-pay.example in Burp not OSINT?",
		evidence: [
			{
				label: "Apex",
				value: "atlas-pay.example (fictional)"
			},
			{
				label: "CT names",
				value: "www · api · staging · admin-staging · vpn"
			},
			{
				label: "Issuer",
				value: "Let's Encrypt (simulated)"
			},
			{
				label: "TXT",
				value: "google-site-verification=3f9c… (not a secret, still noisy)"
			}
		],
		findings: [{
			id: "at-ct",
			title: "Staging and VPN names in public certificates",
			severity: "medium",
			owasp: "A05:2021 Misconfiguration",
			cwe: "CWE-668",
			observation: "staging.atlas-pay.example, admin-staging.atlas-pay.example, vpn.atlas-pay.example",
			why: "Let’s Encrypt logs every issuance. Staging often has debug, seed users, or last quarter’s feature flags. The name is public; the service behind it may not have been meant to be.",
			fix: "Use a private CA or internal names for staging. Split-horizon DNS. Do not request public certificates for vpn. or admin-staging.",
			stop: "Do not port-scan, open, or brute-force staging. Seeing the name in crt.sh is the end of the OSINT step."
		}, {
			id: "at-txt",
			title: "Site-verification token in DNS",
			severity: "info",
			owasp: "A05:2021 Misconfiguration",
			cwe: "CWE-200",
			observation: "google-site-verification=3f9c… published on the apex",
			why: "Verification TXT records are designed to be public. They still tell you which cloud and marketing tools the company uses.",
			fix: "Acceptable. Do not treat them as credentials. Rotate if a vendor asks you to.",
			stop: "A verification token is not a password. Do not try it as one."
		}],
		path: [
			{
				n: "01",
				kind: "observe",
				title: "crt.sh is a public log",
				body: "Certificate transparency is how the web audits CAs. Anyone may list names. That is the design."
			},
			{
				n: "02",
				kind: "infer",
				title: "Staging is probably softer than prod",
				body: "A reasonable defender assumption: debug on, WAF off, copied production data. Still an assumption until you have a contract to test."
			},
			{
				n: "03",
				kind: "stop",
				title: "No Nmap, no Burp, no default creds",
				body: "The moment you send a probe to staging.atlas-pay.example you have left OSINT. Coursework does not include that step."
			},
			{
				n: "04",
				kind: "defend",
				title: "Hide the name, then harden the box",
				body: "Private certificates, VPN-only staging, no prod data in fixtures, bug bounty scoped to production with written rules."
			}
		]
	}
];
Object.fromEntries(SCENARIOS.map((s) => [s.id, s]));
var tool$2 = TOOL_BY_ID.range;
function RangeTool() {
	const [id, setId] = (0, import_react.useState)(SCENARIOS[0]?.id ?? "harbor-clinic");
	const scenario = (0, import_react.useMemo)(() => SCENARIOS.find((s) => s.id === id) ?? SCENARIOS[0], [id]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToolFrame, {
		tool: tool$2,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-6 rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted",
				children: "Four marked scripts. Hostnames end in .example and are not real. Walk the path in a viva: observation, inference, the stop line, then the fix."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-3 sm:grid-cols-2",
				children: SCENARIOS.map((s) => {
					const active = s.id === scenario.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setId(s.id),
						className: cn("h-full w-full rounded-xl border p-4 text-left transition-colors duration-150", active ? "border-accent/50 bg-card-2" : "border-border bg-card hover:bg-card-2/60"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] tracking-[0.16em] text-accent uppercase",
								children: s.kicker
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-medium leading-snug",
								children: s.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: s.blurb
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 font-mono text-[11px] tabular-nums text-faint",
								children: [s.minutes, " min"]
							})
						]
					}) }, s.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioBody, { scenario })
		]
	});
}
function ScenarioBody({ scenario }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-10 space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "accent",
						children: scenario.kicker
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Fictional range" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 font-display text-3xl tracking-tight",
					children: scenario.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: scenario.org
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-2 text-xs tracking-[0.16em] text-faint uppercase",
				children: "Public evidence (simulated)"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "divide-y divide-border overflow-hidden rounded-xl border border-border bg-card",
				children: scenario.evidence.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-3 sm:gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs tracking-[0.12em] text-faint uppercase",
						children: row.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "font-mono text-sm break-all sm:col-span-2",
						children: row.value
					})]
				}, row.label))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xs tracking-[0.16em] text-faint uppercase",
					children: "Mapped observations"
				}), scenario.findings.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FindingCard, { finding: f }, f.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-3 text-xs tracking-[0.16em] text-faint uppercase",
				children: "Attack path"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttackPath, { steps: scenario.path })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs tracking-[0.16em] text-faint uppercase",
						children: "Viva prompt"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed",
						children: scenario.viva
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm text-muted",
						children: [
							"Pair with",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/academy/$slug",
								params: { slug: "attack-paths" },
								className: "underline-offset-4 hover:underline",
								children: "attack-path method"
							}),
							"."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddFindingButton, {
				tool: "range",
				query: scenario.id,
				summary: `${scenario.title} · ${scenario.findings.length} mapped observations`,
				detail: JSON.stringify({
					scenario: scenario.id,
					evidence: scenario.evidence,
					findings: scenario.findings.map((f) => ({
						title: f.title,
						severity: f.severity,
						owasp: f.owasp,
						cwe: f.cwe
					})),
					path: scenario.path
				}, null, 2)
			})
		]
	});
}
var tool$1 = TOOL_BY_ID.url;
function UrlTool() {
	const [url, setUrl] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [chain, setChain] = (0, import_react.useState)(null);
	const parsed = (0, import_react.useMemo)(() => {
		try {
			return new URL(url);
		} catch {
			return null;
		}
	}, [url]);
	async function run(target) {
		if (!isHttpUrl(target)) {
			setError("Only public http(s) URLs.");
			return;
		}
		setBusy(true);
		setError(null);
		try {
			const res = await inspectUrl({ data: { url: target } });
			setChain(res.chain);
		} catch (err) {
			setChain(null);
			setError(err instanceof Error ? err.message : "Inspect failed");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToolFrame, {
		tool: tool$1,
		onSample: () => {
			setUrl(tool$1.sample);
			run(tool$1.sample);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-end",
				onSubmit: (e) => {
					e.preventDefault();
					run(url);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "url",
						children: "URL"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "url",
						value: url,
						placeholder: "https://example.com",
						onChange: (e) => setUrl(e.target.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: busy,
					children: busy ? "Following…" : "Inspect"
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-danger",
				children: error
			}) : null,
			parsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultTable, { rows: [
					{
						label: "Protocol",
						value: parsed.protocol.replace(":", "")
					},
					{
						label: "Host",
						value: parsed.hostname
					},
					{
						label: "Port",
						value: parsed.port || "default"
					},
					{
						label: "Path",
						value: parsed.pathname
					},
					{
						label: "Query",
						value: parsed.search || "—"
					},
					{
						label: "Fragment",
						value: parsed.hash || "—"
					}
				] })
			}) : null,
			chain ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xs tracking-[0.16em] text-faint uppercase",
						children: "Redirect chain (max 5, public hosts)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "space-y-2",
						children: chain.map((hop, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-lg border border-border bg-card px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs break-all",
								children: hop.url
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-muted",
								children: ["HTTP ", hop.status || "blocked"]
							})]
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddFindingButton, {
						tool: "url",
						query: url,
						summary: `URL inspect · ${chain.length} hop(s) ending at ${chain[chain.length - 1]?.url}`,
						detail: JSON.stringify(chain, null, 2)
					})
				]
			}) : null
		]
	});
}
var tool = TOOL_BY_ID.username;
function UsernameTool() {
	const [username, setUsername] = (0, import_react.useState)("");
	const [hits, setHits] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [progress, setProgress] = (0, import_react.useState)(0);
	async function run(target) {
		const u = target.trim();
		if (!USERNAME_RE.test(u)) {
			setError("Letters, numbers, dot, underscore, hyphen — max 39 characters.");
			return;
		}
		setBusy(true);
		setError(null);
		setHits([]);
		setProgress(0);
		const all = [];
		try {
			for (let i = 0; i < PLATFORMS.length; i += 8) {
				const res = await checkUsernameBatch({ data: {
					username: u,
					ids: PLATFORMS.slice(i, i + 8).map((p) => p.id)
				} });
				all.push(...res.results);
				setHits([...all]);
				setProgress(Math.min(100, Math.round(all.length / PLATFORMS.length * 100)));
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "Lookup failed");
		} finally {
			setBusy(false);
			setProgress(100);
		}
	}
	const claimed = hits.filter((h) => h.status === "claimed").length;
	const available = hits.filter((h) => h.status === "available").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToolFrame, {
		tool,
		onSample: () => {
			setUsername(tool.sample);
			run(tool.sample);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-end",
				onSubmit: (e) => {
					e.preventDefault();
					run(username);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "username",
						children: "Handle"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "username",
						value: username,
						autoComplete: "off",
						placeholder: "octocat",
						onChange: (e) => setUsername(e.target.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: busy,
					children: busy ? "Probing…" : "Run recon"
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-danger",
				children: error
			}) : null,
			busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 font-mono text-xs tabular-nums text-muted",
				children: [progress, "% of public profile URLs"]
			}) : null,
			hits.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "ok",
								children: [claimed, " claimed"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [available, " not found"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "warn",
								children: [hits.length - claimed - available, " unknown"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddFindingButton, {
								tool: "username",
								query: username,
								summary: `${claimed} public profile hits for “${username}” across ${hits.length} sites`,
								detail: hits.filter((h) => h.status === "claimed").map((h) => `${h.name}: ${h.url}`).join("\n")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-border overflow-hidden rounded-xl border border-border bg-card",
						children: hits.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								children: h.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-faint",
								children: h.category
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("text-xs tracking-wide uppercase", h.status === "claimed" && "text-ok", h.status === "available" && "text-muted", h.status === "unknown" && "text-warn"),
									children: h.status
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: h.url,
									target: "_blank",
									rel: "noreferrer",
									className: "text-xs text-muted underline-offset-4 hover:text-foreground hover:underline",
									children: "Open"
								})]
							})]
						}, h.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-faint",
						children: "A 200 is a public page, not a confirmed identity. Unknown usually means the host blocked the lab’s datacentre IP — open the URL yourself to verify."
					})
				]
			}) : null
		]
	});
}
var MAP = {
	username: UsernameTool,
	domain: DomainTool,
	ip: IpTool,
	email: EmailTool,
	url: UrlTool,
	github: GithubTool,
	image: ImageTool,
	phone: PhoneTool,
	hash: HashTool,
	dorks: DorksTool,
	exposure: ExposureTool,
	range: RangeTool
};
function LabTool() {
	const { tool } = Route$1.useParams();
	const def = TOOL_BY_ID[tool];
	const Comp = MAP[tool];
	if (!def || !Comp) throw notFound();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comp, {}) });
}
//#endregion
export { LabTool as component };
