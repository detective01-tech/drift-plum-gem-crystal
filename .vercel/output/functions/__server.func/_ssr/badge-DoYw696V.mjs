import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { i as cn } from "./router-B9M01Ilw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-DoYw696V.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase", {
	variants: { variant: {
		default: "border-border text-muted",
		accent: "border-accent/40 text-accent bg-accent/10",
		ok: "border-ok/40 text-ok bg-ok/10",
		warn: "border-warn/40 text-warn bg-warn/10",
		danger: "border-danger/40 text-danger bg-danger/10",
		solid: "border-transparent bg-primary text-primary-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
//#endregion
export { Badge as t };
