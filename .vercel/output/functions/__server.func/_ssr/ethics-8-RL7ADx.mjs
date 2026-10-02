import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { s as useCaseFile, t as AppShell } from "./app-shell-DeTVcByP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ethics-8-RL7ADx.js
var import_jsx_runtime = require_jsx_runtime();
var SECTIONS = [
	{
		h: "Purpose",
		p: "OpenLens exists so students can practise open-source collection, write a sourced report, and see how much of their own life is already public. It is not a surveillance product and it is not a hacking tool."
	},
	{
		h: "Allowed",
		p: "Accounts you own. The built-in sample subject (octocat, example.com, 1.1.1.1, documentation emails). The fictional Training range. Systems you have written permission to assess. Public DNS, RDAP, certificate transparency, public HTTP headers, robots.txt, security.txt, and public profile URLs."
	},
	{
		h: "Forbidden",
		p: "Doxxing, stalking, harassment. Password guessing or cracking. Port scans, directory brute force, and vulnerability exploitation. Scraping behind a login. Reverse-phone owner lookup. Purchasing or searching stolen breach dumps through this lab. Targeting classmates, relatives, or strangers “for the demo”. Sending spoofed mail to “prove” a missing DMARC record."
	},
	{
		h: "Law",
		p: "Unauthorised access and several forms of cyber harassment are offences under Pakistan’s PECA 2016, the UK Computer Misuse Act, the US CFAA, and equivalent statutes. Public data is not a blank cheque — processing a dossier on an EU resident can also engage GDPR. This page is teaching material, not legal advice. Follow your university ethics board."
	},
	{
		h: "Engineering limits",
		p: "Lookups are throttled. Private and loopback addresses are blocked so the URL inspector cannot be used as SSRF. Image metadata never leaves the browser. HTTP surface reads headers and two well-known files only. Nothing is stored on a server."
	}
];
function EthicsPage() {
	const at = useCaseFile((s) => s.ethicsAcceptedAt);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.18em] text-accent uppercase",
				children: "Charter"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight sm:text-5xl",
				children: "Ethics charter"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm text-muted",
				children: [
					"Accepted ",
					at ? new Date(at).toLocaleString() : "—",
					" in this browser."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 space-y-8",
				children: SECTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: s.h
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[1.02rem] leading-relaxed text-foreground/90",
					children: s.p
				})] }, s.h))
			})
		]
	}) });
}
//#endregion
export { EthicsPage as component };
