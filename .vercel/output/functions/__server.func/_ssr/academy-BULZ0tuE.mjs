import { a as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as cn } from "./router-B9M01Ilw.mjs";
import { n as Button, o as useCaseFile, t as AppShell } from "./app-shell-328RJKdX.mjs";
import { r as QUIZ, t as ARTICLES } from "./academy-BI0bfjf_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/academy-BULZ0tuE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Quiz() {
	const [answers, setAnswers] = (0, import_react.useState)({});
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const addFinding = useCaseFile((s) => s.addFinding);
	const score = QUIZ.reduce((n, q) => n + (answers[q.id] === q.answer ? 1 : 0), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6 space-y-6",
		children: [
			QUIZ.map((q, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "rounded-xl border border-border bg-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("legend", {
						className: "font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs text-accent",
							children: String(i + 1).padStart(2, "0")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2",
							children: q.q
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 space-y-2",
						children: q.options.map((opt, idx) => {
							const chosen = answers[q.id] === idx;
							const correct = submitted && idx === q.answer;
							const wrong = submitted && chosen && idx !== q.answer;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: cn("flex cursor-pointer gap-3 rounded-md border px-3 py-2 text-sm", correct ? "border-ok/50 bg-ok/10" : wrong ? "border-danger/50 bg-danger/10" : "border-border"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									name: q.id,
									className: "mt-0.5 accent-accent",
									checked: chosen,
									onChange: () => {
										setSubmitted(false);
										setAnswers((s) => ({
											...s,
											[q.id]: idx
										}));
									}
								}), opt]
							}, idx);
						})
					}),
					submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: q.why
					}) : null
				]
			}, q.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					onClick: () => {
						if (Object.keys(answers).length < QUIZ.length) {
							toast("Answer every question first");
							return;
						}
						setSubmitted(true);
					},
					children: "Score quiz"
				}), submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "secondary",
					onClick: () => {
						addFinding({
							tool: "academy",
							query: "ethics-quiz",
							summary: `Ethics quiz score ${score}/${QUIZ.length}`,
							detail: QUIZ.map((q) => `${q.id}: selected ${answers[q.id]} (correct ${q.answer})`).join("\n")
						});
						toast("Score saved to case file");
					},
					children: [
						"Save ",
						score,
						"/",
						QUIZ.length,
						" to case file"
					]
				}) : null]
			}),
			submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-display text-2xl tabular-nums",
				children: [
					score,
					" / ",
					QUIZ.length
				]
			}) : null
		]
	});
}
function Academy() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.18em] text-accent uppercase",
				children: "Academy"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight sm:text-5xl",
				children: "Method, law, and how to write it up"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted",
				children: "Short briefings you can cite in a final-year report. They are teaching notes, not legal advice."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-10 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card",
				children: ARTICLES.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/academy/$slug",
					params: { slug: a.slug },
					className: "flex flex-col gap-1 px-5 py-4 hover:bg-card-2 sm:flex-row sm:items-baseline sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-[11px] tracking-[0.14em] text-faint uppercase",
						children: a.kicker
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block font-medium",
						children: a.title
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-xs tabular-nums text-muted",
						children: [a.minutes, " min"]
					})]
				}) }, a.slug))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl tracking-tight",
						children: "Ethics quiz"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Five questions. Save the score to the case file for your appendix."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quiz, {})
				]
			})
		]
	}) });
}
//#endregion
export { Academy as component };
