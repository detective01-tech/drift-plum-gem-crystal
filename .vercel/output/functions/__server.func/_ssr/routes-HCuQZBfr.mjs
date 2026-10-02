import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { g as ArrowRight } from "../_libs/lucide-react.mjs";
import { a as TOOLS, n as Button, r as CYCLE, s as useCaseFile, t as AppShell } from "./app-shell-DeTVcByP.mjs";
import { t as Badge } from "./badge-BrMyOu1F.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-HCuQZBfr.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const accepted = useCaseFile((s) => s.ethicsAcceptedAt);
	const findings = useCaseFile((s) => s.findings.length);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.2em] text-accent uppercase",
				children: "Final-year teaching laboratory"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 max-w-3xl font-display text-4xl leading-[1.12] tracking-tight sm:text-6xl",
				children: "See what the open web already knows — then write it up properly."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 max-w-2xl text-base text-muted sm:text-lg",
				children: "OpenLens is an educational OSINT workbench. It queries public DNS, public profiles, HTTP headers, and files you already have so you can audit your own digital footprint and map visible misconfiguration to OWASP — without exploiting it. It will not crack passwords, scan ports, or hunt people who did not consent."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/lab/$tool",
						params: { tool: "exposure" },
						children: ["Start with HTTP surface", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/academy",
						children: "Read the academy"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-12 grid grid-cols-3 gap-4 border-y border-border py-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						n: "12",
						l: "modules"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						n: "4",
						l: "range cases"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						n: String(findings),
						l: "case findings"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl tracking-tight",
						children: "Intelligence cycle"
					}), accepted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "ok",
						children: "Charter accepted"
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5",
					children: CYCLE.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl border border-border bg-card p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[11px] tabular-nums text-accent",
								children: c.step
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-medium",
								children: c.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: c.body
							})
						]
					}, c.step))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl tracking-tight",
					children: "Directory"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card",
					children: TOOLS.map((t) => {
						const Icon = t.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/lab/$tool",
							params: { tool: t.id },
							className: "flex items-start gap-4 px-4 py-4 transition-colors hover:bg-card-2 sm:px-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mt-0.5 size-4 shrink-0 text-accent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex flex-wrap items-baseline gap-x-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: t.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] tracking-[0.14em] text-faint uppercase",
											children: t.group
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 block text-sm text-muted",
										children: t.blurb
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "mt-1 size-4 shrink-0 text-faint" })
							]
						}) }, t.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14 rounded-2xl border border-border bg-card p-6 sm:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "How to demo this in a viva"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "mt-4 list-decimal space-y-2 pl-5 text-sm text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Load the sample subject on Username, Domain, IP, and GitHub — they are public documentation accounts." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Run HTTP surface on example.com and walk one Training range case (Harbor Clinic is the default viva script)." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Drop a photo you took into Image forensics and show whether GPS was stored." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Build search dorks for your own name; open one query in a new tab." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Save findings to the case file and print / export the report." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Take the ten-question ethics and exposure quiz in the Academy." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/report",
								children: "Open case file"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/academy/$slug",
								params: { slug: "cite" },
								children: "Citation notes"
							})
						})]
					})
				]
			})
		]
	}) });
}
function Stat({ n, l }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-[11px] tracking-[0.14em] text-faint uppercase",
		children: l
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-1 font-display text-3xl tabular-nums",
		children: n
	})] });
}
//#endregion
export { Home as component };
