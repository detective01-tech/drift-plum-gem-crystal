//#region node_modules/.nitro/vite/services/ssr/assets/validate-oSww8SoE.js
/** Public profile URL templates. Server builds the URL; clients never supply it. */
var PLATFORMS = [
	{
		id: "github",
		name: "GitHub",
		category: "Code",
		url: "https://github.com/{u}"
	},
	{
		id: "gitlab",
		name: "GitLab",
		category: "Code",
		url: "https://gitlab.com/{u}"
	},
	{
		id: "codeberg",
		name: "Codeberg",
		category: "Code",
		url: "https://codeberg.org/{u}"
	},
	{
		id: "npm",
		name: "npm",
		category: "Code",
		url: "https://www.npmjs.com/~{u}"
	},
	{
		id: "pypi",
		name: "PyPI",
		category: "Code",
		url: "https://pypi.org/user/{u}/"
	},
	{
		id: "reddit",
		name: "Reddit",
		category: "Social",
		url: "https://www.reddit.com/user/{u}"
	},
	{
		id: "hackernews",
		name: "Hacker News",
		category: "Social",
		url: "https://news.ycombinator.com/user?id={u}"
	},
	{
		id: "devto",
		name: "dev.to",
		category: "Writing",
		url: "https://dev.to/{u}"
	},
	{
		id: "hashnode",
		name: "Hashnode",
		category: "Writing",
		url: "https://hashnode.com/@{u}"
	},
	{
		id: "medium",
		name: "Medium",
		category: "Writing",
		url: "https://medium.com/@{u}"
	},
	{
		id: "youtube",
		name: "YouTube",
		category: "Media",
		url: "https://www.youtube.com/@{u}"
	},
	{
		id: "twitch",
		name: "Twitch",
		category: "Media",
		url: "https://www.twitch.tv/{u}"
	},
	{
		id: "soundcloud",
		name: "SoundCloud",
		category: "Media",
		url: "https://soundcloud.com/{u}"
	},
	{
		id: "vimeo",
		name: "Vimeo",
		category: "Media",
		url: "https://vimeo.com/{u}"
	},
	{
		id: "pinterest",
		name: "Pinterest",
		category: "Social",
		url: "https://www.pinterest.com/{u}/"
	},
	{
		id: "keybase",
		name: "Keybase",
		category: "Identity",
		url: "https://keybase.io/{u}"
	},
	{
		id: "aboutme",
		name: "About.me",
		category: "Identity",
		url: "https://about.me/{u}"
	},
	{
		id: "kaggle",
		name: "Kaggle",
		category: "Research",
		url: "https://www.kaggle.com/{u}"
	},
	{
		id: "huggingface",
		name: "Hugging Face",
		category: "Research",
		url: "https://huggingface.co/{u}"
	},
	{
		id: "replit",
		name: "Replit",
		category: "Code",
		url: "https://replit.com/@{u}"
	},
	{
		id: "leetcode",
		name: "LeetCode",
		category: "Code",
		url: "https://leetcode.com/u/{u}/"
	},
	{
		id: "codeforces",
		name: "Codeforces",
		category: "Code",
		url: "https://codeforces.com/profile/{u}"
	},
	{
		id: "tryhackme",
		name: "TryHackMe",
		category: "Security",
		url: "https://tryhackme.com/p/{u}"
	},
	{
		id: "chess",
		name: "Chess.com",
		category: "Games",
		url: "https://www.chess.com/member/{u}"
	}
];
var PLATFORM_BY_ID = Object.fromEntries(PLATFORMS.map((p) => [p.id, p]));
var USERNAME_RE = /^[a-zA-Z0-9._-]{1,39}$/;
var IPV4 = /^(?:25[0-5]|2[0-4]\d|1?\d?\d)(?:\.(?:25[0-5]|2[0-4]\d|1?\d?\d)){3}$/;
var IPV6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::1|(::)?([0-9a-fA-F]{1,4}:){1,6}[0-9a-fA-F]{1,4}(::)?)$/;
function isIp(value) {
	const v = value.trim();
	return IPV4.test(v) || IPV6.test(v);
}
function isDomain(value) {
	const v = value.trim().toLowerCase().replace(/\.$/, "");
	if (v.length < 1 || v.length > 253) return false;
	if (v.includes("://") || v.includes("/") || v.includes(" ")) return false;
	return /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/.test(v);
}
function isEmail(value) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) && value.length < 120;
}
function isHttpUrl(value) {
	try {
		const u = new URL(value);
		return u.protocol === "http:" || u.protocol === "https:";
	} catch {
		return false;
	}
}
function isPrivateHost(host) {
	const h = host.replace(/^\[|\]$/g, "").toLowerCase();
	if (h === "localhost" || h.endsWith(".localhost") || h === "::1" || h === "0.0.0.0") return true;
	const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(h);
	if (m) {
		const [a, b] = [Number(m[1]), Number(m[2])];
		if (a === 10 || a === 127 || a === 0) return true;
		if (a === 169 && b === 254) return true;
		if (a === 192 && b === 168) return true;
		if (a === 172 && b >= 16 && b <= 31) return true;
		if (a === 100 && b >= 64 && b <= 127) return true;
	}
	if (h.startsWith("fc") || h.startsWith("fd") || h.startsWith("fe80")) return true;
	return false;
}
var DISPOSABLE_DOMAINS = /* @__PURE__ */ new Set([
	"mailinator.com",
	"guerrillamail.com",
	"10minutemail.com",
	"tempmail.com",
	"yopmail.com",
	"trashmail.com",
	"getnada.com",
	"sharklasers.com",
	"guerrillamailblock.com",
	"temp-mail.org",
	"discard.email",
	"maildrop.cc"
]);
//#endregion
export { isDomain as a, isIp as c, USERNAME_RE as i, isPrivateHost as l, PLATFORMS as n, isEmail as o, PLATFORM_BY_ID as r, isHttpUrl as s, DISPOSABLE_DOMAINS as t };
