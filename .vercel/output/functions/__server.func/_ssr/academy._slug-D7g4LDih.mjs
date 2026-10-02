import { v as Link, z as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { h as ArrowLeft } from "../_libs/lucide-react.mjs";
import { r as Route$1 } from "./router-B9M01Ilw.mjs";
import { t as AppShell } from "./app-shell-328RJKdX.mjs";
import { n as ARTICLE_BY_SLUG } from "./academy-BI0bfjf_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/academy._slug-D7g4LDih.js
var import_jsx_runtime = require_jsx_runtime();
function ArticlePage() {
	const { slug } = Route$1.useParams();
	const article = ARTICLE_BY_SLUG[slug];
	if (!article) throw notFound();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/academy",
				className: "inline-flex items-center gap-2 text-sm text-muted hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Academy"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-8 text-[11px] tracking-[0.18em] text-accent uppercase",
				children: [
					article.kicker,
					" · ",
					article.minutes,
					" min"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl tracking-tight sm:text-5xl",
				children: article.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 space-y-5 text-[1.05rem] leading-relaxed text-foreground/90",
				children: article.body.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, i))
			})
		]
	}) });
}
//#endregion
export { ArticlePage as component };
