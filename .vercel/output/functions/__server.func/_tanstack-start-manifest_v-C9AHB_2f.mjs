//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-C9AHB_2f.js
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
		preloads: ["/assets/index-BlaPVH28.js", "/assets/utils-DIeGwD3a.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-BlaPVH28.js"
		} }]
	},
	"/": {
		filePath: "/workspace/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-CzByA9ju.js",
			"/assets/app-shell-BqM-G3pz.js",
			"/assets/badge-BtVIrc9f.js"
		]
	},
	"/academy": {
		filePath: "/workspace/src/routes/academy.tsx",
		children: ["/academy/$slug"],
		preloads: [
			"/assets/academy-C_liITWM.js",
			"/assets/app-shell-BqM-G3pz.js",
			"/assets/academy-Boy8996u.js"
		]
	},
	"/ethics": {
		filePath: "/workspace/src/routes/ethics.tsx",
		children: void 0,
		preloads: ["/assets/ethics-LYY9mepS.js", "/assets/app-shell-BqM-G3pz.js"]
	},
	"/report": {
		filePath: "/workspace/src/routes/report.tsx",
		children: void 0,
		preloads: [
			"/assets/report-CJzddE2_.js",
			"/assets/app-shell-BqM-G3pz.js",
			"/assets/textarea-CDHphI83.js"
		]
	},
	"/academy/$slug": {
		filePath: "/workspace/src/routes/academy.$slug.tsx",
		children: void 0,
		preloads: ["/assets/academy._slug-tyTT57fO.js"]
	},
	"/lab/$tool": {
		filePath: "/workspace/src/routes/lab.$tool.tsx",
		children: void 0,
		preloads: [
			"/assets/lab._tool-4AuuwSa-.js",
			"/assets/app-shell-BqM-G3pz.js",
			"/assets/badge-BtVIrc9f.js",
			"/assets/textarea-CDHphI83.js"
		]
	}
} });
//#endregion
export { tsrStartManifest };
