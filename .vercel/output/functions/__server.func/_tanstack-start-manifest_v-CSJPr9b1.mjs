//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-CSJPr9b1.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/workspace/src/routes/__root.tsx",
		children: [
			"/",
			"/academy",
			"/ethics",
			"/report",
			"/lab/$tool"
		],
		preloads: ["/assets/index-DcjXwom6.js", "/assets/utils-Dj4-J2QM.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-DcjXwom6.js"
		} }]
	},
	"/": {
		filePath: "/workspace/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-B7kqW9lr.js",
			"/assets/app-shell-BawHRDOi.js",
			"/assets/badge-DoFGFwUp.js"
		]
	},
	"/academy": {
		filePath: "/workspace/src/routes/academy.tsx",
		children: ["/academy/$slug"],
		preloads: [
			"/assets/academy-Dwcn9fTm.js",
			"/assets/app-shell-BawHRDOi.js",
			"/assets/academy-DYurHMVa.js"
		]
	},
	"/ethics": {
		filePath: "/workspace/src/routes/ethics.tsx",
		children: void 0,
		preloads: ["/assets/ethics-_GUwWbCD.js", "/assets/app-shell-BawHRDOi.js"]
	},
	"/report": {
		filePath: "/workspace/src/routes/report.tsx",
		children: void 0,
		preloads: [
			"/assets/report-DLF9IKZx.js",
			"/assets/app-shell-BawHRDOi.js",
			"/assets/textarea-CyIYXoch.js"
		]
	},
	"/academy/$slug": {
		filePath: "/workspace/src/routes/academy.$slug.tsx",
		children: void 0,
		preloads: ["/assets/academy._slug-hx3e14HB.js"]
	},
	"/lab/$tool": {
		filePath: "/workspace/src/routes/lab.$tool.tsx",
		children: void 0,
		preloads: [
			"/assets/lab._tool-CJyINMpJ.js",
			"/assets/app-shell-BawHRDOi.js",
			"/assets/badge-DoFGFwUp.js",
			"/assets/textarea-CyIYXoch.js"
		]
	}
} });
//#endregion
export { tsrStartManifest };
