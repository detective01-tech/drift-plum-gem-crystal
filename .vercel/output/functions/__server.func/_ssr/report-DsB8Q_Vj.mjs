import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as Button, s as useCaseFile, t as AppShell } from "./app-shell-DeTVcByP.mjs";
import { n as Label, r as Textarea, t as Input } from "./textarea-DUHBqqKz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/report-DsB8Q_Vj.js
var import_jsx_runtime = require_jsx_runtime();
function ReportPage() {
	const title = useCaseFile((s) => s.title);
	const analyst = useCaseFile((s) => s.analyst);
	const notes = useCaseFile((s) => s.notes);
	const findings = useCaseFile((s) => s.findings);
	const ethics = useCaseFile((s) => s.ethicsAcceptedAt);
	const setMeta = useCaseFile((s) => s.setMeta);
	const removeFinding = useCaseFile((s) => s.removeFinding);
	const clearFindings = useCaseFile((s) => s.clearFindings);
	function download() {
		const payload = {
			instrument: "OpenLens Educational OSINT Laboratory",
			title,
			analyst,
			ethicsAcceptedAt: ethics,
			notes,
			findings,
			exportedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "openlens-case-file.json";
		a.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.18em] text-accent uppercase",
				children: "Dissemination"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight sm:text-5xl",
				children: "Case file"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted print:hidden",
				children: "Findings live in this browser only. Export JSON for your FYP appendix, or print this page."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-4 print:hidden sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "title",
						children: "Case title"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "title",
						value: title,
						onChange: (e) => setMeta({ title: e.target.value })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "analyst",
						children: "Analyst"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "analyst",
						value: analyst,
						placeholder: "Your name / roll number",
						onChange: (e) => setMeta({ analyst: e.target.value })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-2 print:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "notes",
					children: "Direction / notes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "notes",
					value: notes,
					placeholder: "Lawful question, scope, and what you will not collect.",
					onChange: (e) => setMeta({ notes: e.target.value })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-3 print:hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						onClick: () => window.print(),
						children: "Print / PDF"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "secondary",
						onClick: download,
						children: "Export JSON"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						onClick: clearFindings,
						children: "Clear findings"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "mt-10 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "border-b border-border pb-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-[0.16em] text-faint uppercase",
								children: "OpenLens laboratory report"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 font-display text-3xl",
								children: title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-muted",
								children: [
									"Analyst ",
									analyst || "—",
									" · Charter ",
									ethics ? new Date(ethics).toLocaleString() : "not recorded",
									" ·",
									" ",
									findings.length,
									" finding",
									findings.length === 1 ? "" : "s"
								]
							})
						]
					}),
					notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs tracking-[0.14em] text-faint uppercase",
						children: "Direction"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 whitespace-pre-wrap text-sm",
						children: notes
					})] }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xs tracking-[0.14em] text-faint uppercase",
							children: "Collection log"
						}), findings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "No findings yet. Run a module and choose “Add to case file”."
						}) : findings.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] tracking-[0.14em] text-accent uppercase",
										children: f.tool
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-medium",
										children: f.summary
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 font-mono text-xs text-faint",
										children: [
											f.query,
											" · ",
											new Date(f.at).toISOString()
										]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-xs text-muted hover:text-danger print:hidden",
									onClick: () => removeFinding(f.id),
									children: "Remove"
								})]
							}), f.detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
								className: "mt-3 max-h-48 overflow-auto whitespace-pre-wrap font-mono text-[11px] text-muted",
								children: f.detail
							}) : null]
						}, f.id))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "text-xs leading-relaxed text-faint",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Limitations: HTTP 200 is not identity. IP geolocation is probabilistic. Many platforms block datacentre IPs. Header checks are not a penetration test. No breach corpora. No authentication bypass. This instrument is for education." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2",
							children: "Suggested citation: OpenLens (2026). Educational OSINT Laboratory. Web application."
						})]
					})
				]
			})
		]
	}) });
}
//#endregion
export { ReportPage as component };
