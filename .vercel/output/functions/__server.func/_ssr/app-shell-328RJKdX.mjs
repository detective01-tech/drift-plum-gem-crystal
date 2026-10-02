import { a as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Phone, c as Image, d as Github, f as Binary, i as Search, l as Hash, n as UserRound, o as Menu, p as AtSign, s as Link2, t as X, u as Globe } from "../_libs/lucide-react.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, o as DialogTitle, p as Slot, r as DialogContent, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { i as cn } from "./router-B9M01Ilw.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-328RJKdX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LensMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("text-foreground", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "16",
				r: "11",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.25"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "16",
				r: "6.75",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.25",
				className: "text-accent"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "16",
				r: "2.1",
				fill: "currentColor"
			})
		]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,border-color,color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:opacity-90",
			secondary: "bg-card-2 text-foreground border border-border hover:border-foreground/20",
			outline: "border border-border bg-transparent text-foreground hover:bg-card-2",
			ghost: "text-muted hover:text-foreground hover:bg-card-2",
			accent: "bg-accent text-accent-foreground hover:opacity-90",
			danger: "bg-danger/15 text-danger border border-danger/30 hover:bg-danger/25"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Sheet = Dialog;
function SheetContent({ className, children, side = "left", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-background/70 data-[state=open]:animate-in data-[state=closed]:animate-out" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed z-50 flex h-full w-[min(20rem,88vw)] flex-col border-border bg-background p-5 shadow-xl", side === "left" ? "inset-y-0 left-0 border-r" : "inset-y-0 right-0 border-l", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-4 right-4 rounded-md p-2 text-muted hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mb-4 pr-8", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		className: cn("font-display text-xl", className),
		...props
	});
}
var TOOLS = [
	{
		id: "username",
		name: "Username recon",
		group: "collection",
		blurb: "Probe public profile URLs for a handle you already use.",
		lesson: "Username reuse is the cheapest way an investigator correlates accounts. This module only requests public profile pages and records HTTP status — it never logs in, never bypasses CAPTCHAs, and never reads private content. Run it on handles you own, or on the sample subject.",
		sample: "octocat",
		sampleHint: "GitHub’s public mascot account",
		icon: UserRound
	},
	{
		id: "domain",
		name: "Domain intel",
		group: "collection",
		blurb: "DNS records, RDAP registration, certificate-transparency names.",
		lesson: "DNS and RDAP are public by design. They tell you how a name is delegated (MX, NS, TXT), who registered it, and which hostnames appeared on public TLS certificates. This is passive reconnaissance — no port scans, no brute force.",
		sample: "example.com",
		sampleHint: "IANA reserved documentation domain",
		icon: Globe
	},
	{
		id: "ip",
		name: "IP intelligence",
		group: "collection",
		blurb: "Geolocation, ASN, and organisation for a public address.",
		lesson: "IP geolocation is a best-effort estimate from regional internet registries and commercial databases. It is often accurate to a city for consumer ISPs and wildly wrong for VPNs, CDNs, and anycast. Treat it as a lead, not a location.",
		sample: "1.1.1.1",
		sampleHint: "Cloudflare public resolver",
		icon: Binary
	},
	{
		id: "email",
		name: "Email footprint",
		group: "collection",
		blurb: "Format, disposable check, MX records, Gravatar portrait.",
		lesson: "An email address leaks its provider (MX), whether it is a throwaway domain, and — if the owner opted in — a Gravatar. This lab does not query breach corpora. Checking whether your own address is in a breach belongs on Have I Been Pwned, in your browser, under your control.",
		sample: "test@example.com",
		sampleHint: "RFC documentation address",
		icon: AtSign
	},
	{
		id: "url",
		name: "URL inspector",
		group: "collection",
		blurb: "Parse components and follow a short public redirect chain.",
		lesson: "Phishing and tracking links hide behind redirects and fat query strings. The inspector follows a short public chain and refuses private/link-local targets so it cannot be used as an SSRF probe against internal networks.",
		sample: "https://example.com",
		sampleHint: "Public documentation site",
		icon: Link2
	},
	{
		id: "github",
		name: "GitHub public",
		group: "collection",
		blurb: "Public profile, repos, and hireable flag via the GitHub API.",
		lesson: "GitHub’s public API is an OSINT staple: bios, emails that users chose to publish, organisations, and commit metadata. Tokens, private repos, and authenticated scopes are out of bounds for this lab.",
		sample: "octocat",
		sampleHint: "GitHub mascot",
		icon: Github
	},
	{
		id: "image",
		name: "Image forensics",
		group: "local",
		blurb: "Read EXIF, GPS, and camera tags in the browser — nothing is uploaded.",
		lesson: "Phones embed GPS, timestamps, and device model in JPEG/HEIC files. Posting a photo can publish your house. This module never leaves your device. Strip metadata before you share.",
		sample: "",
		sampleHint: "Drop any JPEG you took",
		icon: Image
	},
	{
		id: "phone",
		name: "Phone parser",
		group: "local",
		blurb: "Country, type, and validity — never an owner lookup.",
		lesson: "E.164 parsing tells you the calling country and whether a number is a plausible mobile or fixed line. It does not identify a subscriber. Reverse-phone directories that sell names are not part of this laboratory.",
		sample: "+12025550100",
		sampleHint: "North American example range (555)",
		icon: Phone
	},
	{
		id: "hash",
		name: "Hash identifier",
		group: "local",
		blurb: "Guess algorithm from length and prefix. Does not crack.",
		lesson: "Identifying a hash is the first step in incident response (what am I looking at?). Cracking other people’s passwords is not education — it is unauthorised access. This module stops at identification.",
		sample: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
		sampleHint: "SHA-256 of an empty string",
		icon: Hash
	},
	{
		id: "dorks",
		name: "Search dorks",
		group: "local",
		blurb: "Build self-audit queries. You run them in your own browser.",
		lesson: "Search operators (filetype, site, intitle) are how investigators find documents people forgot were public. OpenLens only composes the query. You decide whether to run it, and you should run it on your own name first.",
		sample: "your-name",
		sampleHint: "Use your own name or brand",
		icon: Search
	}
];
var TOOL_BY_ID = Object.fromEntries(TOOLS.map((t) => [t.id, t]));
var CYCLE = [
	{
		step: "01",
		title: "Direction",
		body: "Define a lawful question. Whose footprint? Why? What is out of scope?"
	},
	{
		step: "02",
		title: "Collection",
		body: "Gather only public sources. Log the source, time, and method."
	},
	{
		step: "03",
		title: "Processing",
		body: "Normalise, de-duplicate, and discard noise. Keep raw copies."
	},
	{
		step: "04",
		title: "Analysis",
		body: "Correlate. A username hit plus an MX record is a hypothesis, not a fact."
	},
	{
		step: "05",
		title: "Dissemination",
		body: "Write a sourced report. Separate observation from inference."
	}
];
var useCaseFile = create()(persist((set) => ({
	ethicsAcceptedAt: null,
	title: "Self-audit case file",
	analyst: "",
	notes: "",
	findings: [],
	acceptEthics: () => set({ ethicsAcceptedAt: (/* @__PURE__ */ new Date()).toISOString() }),
	setMeta: (patch) => set(patch),
	addFinding: (f) => set((s) => ({ findings: [{
		...f,
		id: crypto.randomUUID(),
		at: (/* @__PURE__ */ new Date()).toISOString()
	}, ...s.findings].slice(0, 80) })),
	removeFinding: (id) => set((s) => ({ findings: s.findings.filter((x) => x.id !== id) })),
	clearFindings: () => set({ findings: [] })
}), { name: "openlens-case-v1" }));
var PLEDGES = [
	"I will only investigate accounts I own, the built-in sample subject, or systems I am authorised to assess.",
	"I will not dox, stalk, harass, or build a dossier on a person who did not consent.",
	"I understand this laboratory queries public sources only and never bypasses authentication or cracks passwords.",
	"I accept that misuse may violate local law, including PECA 2016 in Pakistan and equivalent computer-misuse statutes elsewhere."
];
function EthicsGate({ children }) {
	const ethicsAcceptedAt = useCaseFile((s) => s.ethicsAcceptedAt);
	const acceptEthics = useCaseFile((s) => s.acceptEthics);
	const [checked, setChecked] = (0, import_react.useState)(() => PLEDGES.map(() => false));
	if (ethicsAcceptedAt) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
	const all = checked.every(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-dvh bg-background px-4 py-10 text-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LensMark, { className: "size-10" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-[11px] tracking-[0.2em] text-accent uppercase",
					children: "Charter · required"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl leading-tight tracking-tight sm:text-[2.75rem]",
					children: "OpenLens is a teaching laboratory, not a weapon."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted",
					children: "This is an educational OSINT workbench for a final-year project: public DNS, public profiles, and files you already have. Accept the charter to continue. You can re-read it anytime under Ethics."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-8 space-y-3",
					children: PLEDGES.map((text, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex cursor-pointer gap-3 rounded-lg border border-border bg-card p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							className: "mt-1 size-4 accent-accent",
							checked: checked[i],
							onChange: (e) => {
								const next = [...checked];
								next[i] = e.target.checked;
								setChecked(next);
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm leading-relaxed",
							children: text
						})]
					}) }, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-8 w-full sm:w-auto",
					disabled: !all,
					onClick: acceptEthics,
					children: "I accept — enter the lab"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("mt-4 text-xs text-faint", all ? "opacity-0" : "opacity-100"),
					children: "Tick every pledge. This is the same standard an examiner will hold you to."
				})
			]
		})
	});
}
var NAV = [
	{
		href: "/",
		label: "Overview",
		match: (p) => p === "/"
	},
	...TOOLS.map((t) => ({
		href: `/lab/${t.id}`,
		label: t.name,
		group: t.group,
		match: (p) => p === `/lab/${t.id}`
	})),
	{
		href: "/report",
		label: "Case file",
		match: (p) => p === "/report"
	},
	{
		href: "/academy",
		label: "Academy",
		match: (p) => p.startsWith("/academy")
	},
	{
		href: "/ethics",
		label: "Ethics charter",
		match: (p) => p === "/ethics"
	}
];
function NavLinks({ onNavigate }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const groups = [
		{
			key: "root",
			label: "",
			items: NAV.filter((n) => n.href === "/")
		},
		{
			key: "collection",
			label: "Collection",
			items: NAV.filter((n) => n.group === "collection")
		},
		{
			key: "local",
			label: "Local analysis",
			items: NAV.filter((n) => n.group === "local")
		},
		{
			key: "out",
			label: "Output",
			items: NAV.filter((n) => [
				"/report",
				"/academy",
				"/ethics"
			].includes(n.href))
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex flex-col gap-5",
		children: groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [g.label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-2 px-2 text-[10px] font-medium tracking-[0.18em] text-faint uppercase",
			children: g.label
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col gap-0.5",
			children: g.items.map((item) => {
				const active = item.match(pathname);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: item.href,
					onClick: onNavigate,
					className: cn("block rounded-md px-2 py-2 text-sm transition-colors duration-150", active ? "bg-card-2 text-foreground" : "text-muted hover:bg-card-2/60 hover:text-foreground"),
					children: item.label
				}) }, item.href);
			})
		})] }, g.key))
	});
}
function Brand() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "flex items-center gap-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LensMark, { className: "size-8" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "leading-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block font-display text-lg tracking-tight",
				children: "OpenLens"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-[10px] tracking-[0.16em] text-faint uppercase",
				children: "Educational OSINT lab"
			})]
		})]
	});
}
function AppShell({ children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const findings = useCaseFile((s) => s.findings.length);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EthicsGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "fixed inset-y-0 left-0 z-20 hidden w-60 flex-col border-r border-border bg-background px-4 py-5 print:hidden lg:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex-1 overflow-y-auto pr-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinks, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "pt-4 text-[11px] leading-relaxed text-faint",
					children: [
						"Public sources only. ",
						findings,
						" finding",
						findings === 1 ? "" : "s",
						" in the case file."
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lg:pl-60",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-sm print:hidden lg:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 lg:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
							open,
							onOpenChange: setOpen,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "icon",
								"aria-label": "Open menu",
								onClick: () => setOpen(true),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
								side: "left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
									className: "sr-only",
									children: "Navigation"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinks, { onNavigate: () => setOpen(false) })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hidden text-[11px] tracking-[0.14em] text-faint uppercase sm:block lg:ml-0",
						children: "Educational use · public sources · no unauthorised access"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/report",
						className: "text-xs text-muted transition-colors hover:text-foreground",
						children: ["Case file", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 font-mono tabular-nums text-accent",
							children: findings
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 py-8 sm:px-6 lg:px-10 lg:py-10",
				children
			})]
		})]
	}) });
}
//#endregion
export { TOOL_BY_ID as a, TOOLS as i, Button as n, useCaseFile as o, CYCLE as r, AppShell as t };
