import { a as string, i as object, t as array } from "../_libs/zod.mjs";
import { n as createServerFn, r as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { a as isDomain, c as isIp, i as USERNAME_RE, l as isPrivateHost, o as isEmail, r as PLATFORM_BY_ID, s as isHttpUrl } from "./validate-oSww8SoE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/functions-DyU-A3xb.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var UA = "OpenLens/1.0 (Educational OSINT laboratory; academic coursework; public-source only)";
var RateLimitError = class extends Error {
	constructor(message = "This lab throttles lookups. Wait a minute and retry.") {
		super(message);
		this.name = "RateLimitError";
	}
};
var buckets = /* @__PURE__ */ new Map();
function rateLimit(key, max, windowMs) {
	const now = Date.now();
	const b = buckets.get(key);
	if (!b || now - b.t > windowMs) {
		buckets.set(key, {
			n: 1,
			t: now
		});
		return;
	}
	if (b.n >= max) throw new RateLimitError();
	b.n += 1;
}
function assertPublicHttpUrl(raw) {
	let u;
	try {
		u = new URL(raw);
	} catch {
		throw new Error("Invalid URL");
	}
	if (u.protocol !== "https:" && u.protocol !== "http:") throw new Error("Only http(s) URLs are allowed");
	if (u.username || u.password) throw new Error("URLs with credentials are blocked");
	if (isPrivateHost(u.hostname)) throw new Error("Private or local addresses are blocked");
	return u;
}
async function safeFetch(raw, opts = {}) {
	const method = opts.method ?? "GET";
	const timeoutMs = opts.timeoutMs ?? 4e3;
	const maxBytes = opts.maxBytes ?? 24e3;
	const url = assertPublicHttpUrl(raw);
	try {
		const res = await fetch(url, {
			method,
			redirect: "manual",
			headers: {
				"User-Agent": UA,
				Accept: "text/html,application/json;q=0.9,*/*;q=0.8"
			},
			signal: AbortSignal.timeout(timeoutMs)
		});
		const location = res.headers.get("location");
		let snippet = "";
		if (method === "GET" && res.body) {
			const slice = new Uint8Array(await res.arrayBuffer()).slice(0, maxBytes);
			snippet = new TextDecoder("utf-8", { fatal: false }).decode(slice);
		}
		return {
			ok: res.ok,
			status: res.status,
			location,
			finalUrl: url.toString(),
			snippet,
			error: null
		};
	} catch (err) {
		const message = err instanceof Error ? err.message : "fetch failed";
		return {
			ok: false,
			status: 0,
			location: null,
			finalUrl: url.toString(),
			snippet: "",
			error: message
		};
	}
}
async function safeJson(raw, opts = {}) {
	const url = assertPublicHttpUrl(raw);
	try {
		const res = await fetch(url, {
			method: "GET",
			redirect: "follow",
			headers: {
				"User-Agent": UA,
				Accept: "application/json, application/dns-json",
				...opts.headers
			},
			signal: AbortSignal.timeout(opts.timeoutMs ?? 6e3)
		});
		if (!res.ok) return {
			data: null,
			status: res.status,
			error: `HTTP ${res.status}`
		};
		return {
			data: await res.json(),
			status: res.status,
			error: null
		};
	} catch (err) {
		return {
			data: null,
			status: 0,
			error: err instanceof Error ? err.message : "fetch failed"
		};
	}
}
async function clientKey() {
	const { getRequestHeader } = await import("./ssr.mjs").then((n) => n.a).then((n) => n.t);
	return getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() || getRequestHeader("x-real-ip") || "anon";
}
function classify(httpStatus, location, error) {
	if (error) return {
		status: "unknown",
		note: "Timed out or blocked by the host"
	};
	if (httpStatus === 404 || httpStatus === 410) return {
		status: "available",
		note: "Public profile URL returned not found"
	};
	if (httpStatus === 200) return {
		status: "claimed",
		note: "Public page responded 200"
	};
	if (httpStatus === 301 || httpStatus === 302 || httpStatus === 303 || httpStatus === 307 || httpStatus === 308) return {
		status: "unknown",
		note: location ? `Redirected to ${location}` : "Redirect without a profile guarantee"
	};
	if (httpStatus === 401 || httpStatus === 403) return {
		status: "unknown",
		note: "Host refused the probe (auth wall or bot filter)"
	};
	return {
		status: "unknown",
		note: `HTTP ${httpStatus}`
	};
}
var checkUsernameBatch_createServerFn_handler = createServerRpc({
	id: "9b13b9097d8721d93a056e81ed09dccaf7fc7e1787b011cbcd34e707d007350b",
	name: "checkUsernameBatch",
	filename: "src/lib/osint/functions.ts"
}, (opts) => checkUsernameBatch.__executeServer(opts));
var checkUsernameBatch = createServerFn({ method: "POST" }).validator(object({
	username: string().min(1).max(39),
	ids: array(string()).min(1).max(8)
})).handler(checkUsernameBatch_createServerFn_handler, async ({ data }) => {
	rateLimit(`user:${await clientKey()}`, 40, 6e5);
	const username = data.username.trim();
	if (!USERNAME_RE.test(username)) throw new Error("Usernames may only contain letters, numbers, dot, underscore, hyphen.");
	return {
		username,
		results: (await Promise.all(data.ids.map(async (id) => {
			const platform = PLATFORM_BY_ID[id];
			if (!platform) return null;
			const url = platform.url.replaceAll("{u}", encodeURIComponent(username));
			const res = await safeFetch(url, {
				method: "GET",
				timeoutMs: 3500,
				maxBytes: 4e3
			});
			const { status, note } = classify(res.status, res.location, res.error);
			return {
				id: platform.id,
				name: platform.name,
				category: platform.category,
				url,
				status,
				httpStatus: res.status || null,
				note
			};
		}))).filter((r) => r !== null)
	};
});
async function doh(name, type) {
	const { data, error } = await safeJson(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${encodeURIComponent(type)}`, {
		headers: { Accept: "application/dns-json" },
		timeoutMs: 5e3
	});
	return {
		type,
		error,
		records: (data?.Answer ?? []).map((a) => ({
			name: a.name,
			data: a.data,
			ttl: a.TTL ?? null
		}))
	};
}
var lookupDomain_createServerFn_handler = createServerRpc({
	id: "f1355e7b065ef4e6c0daf668d3704c3fc0070965b16fd86ce05ce82923f656ef",
	name: "lookupDomain",
	filename: "src/lib/osint/functions.ts"
}, (opts) => lookupDomain.__executeServer(opts));
var lookupDomain = createServerFn({ method: "POST" }).validator(object({ domain: string().min(1).max(253) })).handler(lookupDomain_createServerFn_handler, async ({ data }) => {
	rateLimit(`dom:${await clientKey()}`, 30, 6e5);
	const domain = data.domain.trim().toLowerCase().replace(/^https?:\/\//, "").split("/")[0] ?? "";
	if (!isDomain(domain)) throw new Error("Enter a registrable domain such as example.com");
	const dns = await Promise.all([
		"A",
		"AAAA",
		"MX",
		"NS",
		"TXT",
		"CNAME",
		"SOA"
	].map((t) => doh(domain, t)));
	const rdap = await safeJson(`https://rdap.org/domain/${encodeURIComponent(domain)}`, { timeoutMs: 7e3 });
	let registrar = null;
	let registered = null;
	let expires = null;
	let nameservers = [];
	let status = [];
	if (rdap.data) {
		const fn = ((rdap.data.entities ?? []).find((e) => e.roles?.includes("registrar"))?.vcardArray?.[1])?.find((row) => row[0] === "fn");
		registrar = typeof fn?.[3] === "string" ? fn[3] : null;
		const events = rdap.data.events ?? [];
		registered = events.find((e) => e.eventAction === "registration")?.eventDate ?? null;
		expires = events.find((e) => e.eventAction === "expiration")?.eventDate ?? null;
		nameservers = (rdap.data.nameservers ?? []).map((n) => n.ldhName).filter((x) => Boolean(x));
		status = Array.isArray(rdap.data.status) ? rdap.data.status : [];
	}
	return {
		domain,
		dns,
		rdap: {
			ok: Boolean(rdap.data),
			error: rdap.error,
			registrar,
			registered,
			expires,
			nameservers,
			status
		}
	};
});
var lookupCertificates_createServerFn_handler = createServerRpc({
	id: "02046d0e53a2916ce7ceacc7dee16b443a29dca7be59f81f9584a3bfca888a59",
	name: "lookupCertificates",
	filename: "src/lib/osint/functions.ts"
}, (opts) => lookupCertificates.__executeServer(opts));
var lookupCertificates = createServerFn({ method: "POST" }).validator(object({ domain: string().min(1).max(253) })).handler(lookupCertificates_createServerFn_handler, async ({ data }) => {
	rateLimit(`crt:${await clientKey()}`, 12, 6e5);
	const domain = data.domain.trim().toLowerCase().replace(/^https?:\/\//, "").split("/")[0] ?? "";
	if (!isDomain(domain)) throw new Error("Enter a registrable domain such as example.com");
	const { data: rows, error } = await safeJson(`https://crt.sh/?q=${encodeURIComponent(domain)}&output=json`, { timeoutMs: 12e3 });
	const names = /* @__PURE__ */ new Set();
	if (rows) for (const row of rows) {
		const raw = row.name_value ?? "";
		for (const part of raw.split("\n")) {
			const n = part.trim().toLowerCase();
			if (n) names.add(n);
		}
		if (names.size > 80) break;
	}
	return {
		domain,
		error,
		names: [...names].sort().slice(0, 80)
	};
});
var lookupIp_createServerFn_handler = createServerRpc({
	id: "ebb72159df7181f48a4ade4a60b7cdb7a15eff4483b571a15a613d9e976d345d",
	name: "lookupIp",
	filename: "src/lib/osint/functions.ts"
}, (opts) => lookupIp.__executeServer(opts));
var lookupIp = createServerFn({ method: "POST" }).validator(object({ ip: string().min(1).max(80) })).handler(lookupIp_createServerFn_handler, async ({ data }) => {
	rateLimit(`ip:${await clientKey()}`, 30, 6e5);
	const ip = data.ip.trim();
	if (!isIp(ip)) throw new Error("Enter a public IPv4 or IPv6 address");
	if (isPrivateHost(ip)) throw new Error("Private and loopback addresses are out of scope");
	const { data: json, error } = await safeJson(`https://ipwho.is/${encodeURIComponent(ip)}`);
	if (!json || json.success === false) throw new Error(error || "IP lookup failed");
	return {
		ip: json.ip ?? ip,
		type: json.type ?? null,
		continent: json.continent ?? null,
		country: json.country ?? null,
		countryCode: json.country_code ?? null,
		city: json.city ?? null,
		region: json.region ?? null,
		latitude: json.latitude ?? null,
		longitude: json.longitude ?? null,
		asn: json.connection?.asn ?? null,
		org: json.connection?.org ?? null,
		isp: json.connection?.isp ?? null,
		timezone: json.timezone?.id ?? null
	};
});
var lookupEmail_createServerFn_handler = createServerRpc({
	id: "2a9207625e8d4cd382bf7bfe0a5bdbb314241a995a500991db7bed76e936ae58",
	name: "lookupEmail",
	filename: "src/lib/osint/functions.ts"
}, (opts) => lookupEmail.__executeServer(opts));
var lookupEmail = createServerFn({ method: "POST" }).validator(object({
	email: string().min(3).max(120),
	hash: string().length(32)
})).handler(lookupEmail_createServerFn_handler, async ({ data }) => {
	rateLimit(`em:${await clientKey()}`, 30, 6e5);
	const email = data.email.trim().toLowerCase();
	if (!isEmail(email)) throw new Error("Enter a valid email address");
	const domain = email.split("@")[1] ?? "";
	const mx = await doh(domain, "MX");
	const gravatarUrl = `https://www.gravatar.com/avatar/${data.hash}?d=404&s=128`;
	const grav = await safeFetch(gravatarUrl, {
		method: "HEAD",
		timeoutMs: 4e3
	});
	return {
		email,
		domain,
		mx: mx.records,
		mxError: mx.error,
		gravatar: {
			url: gravatarUrl.replace("d=404", "d=identicon"),
			present: grav.status === 200
		}
	};
});
var lookupGithub_createServerFn_handler = createServerRpc({
	id: "2d252b0443236e18d7907cf965c40e82e526f9a2270a1ced847f4e7c8c05febd",
	name: "lookupGithub",
	filename: "src/lib/osint/functions.ts"
}, (opts) => lookupGithub.__executeServer(opts));
var lookupGithub = createServerFn({ method: "POST" }).validator(object({ username: string().min(1).max(39) })).handler(lookupGithub_createServerFn_handler, async ({ data }) => {
	rateLimit(`gh:${await clientKey()}`, 20, 6e5);
	const username = data.username.trim();
	if (!USERNAME_RE.test(username)) throw new Error("Invalid GitHub username");
	const userRes = await safeJson(`https://api.github.com/users/${encodeURIComponent(username)}`, { headers: { Accept: "application/vnd.github+json" } });
	if (!userRes.data || userRes.data.message === "Not Found") return {
		found: false,
		username
	};
	const reposRes = await safeJson(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=8&sort=updated`, { headers: { Accept: "application/vnd.github+json" } });
	const u = userRes.data;
	return {
		found: true,
		username,
		profile: {
			login: u.login ?? username,
			name: u.name ?? null,
			bio: u.bio ?? null,
			company: u.company ?? null,
			blog: u.blog ?? null,
			location: u.location ?? null,
			twitter: u.twitter_username ?? null,
			publicRepos: u.public_repos ?? 0,
			followers: u.followers ?? 0,
			following: u.following ?? 0,
			createdAt: u.created_at ?? null,
			htmlUrl: u.html_url ?? `https://github.com/${username}`,
			avatarUrl: u.avatar_url ?? null,
			hireable: u.hireable ?? null,
			email: u.email ?? null
		},
		repos: (reposRes.data ?? []).filter((r) => !r.fork).slice(0, 8)
	};
});
var inspectUrl_createServerFn_handler = createServerRpc({
	id: "472577c7cd78520f352dfd50039434701c58de9cbba8d770aa825ffc822fd4a9",
	name: "inspectUrl",
	filename: "src/lib/osint/functions.ts"
}, (opts) => inspectUrl.__executeServer(opts));
var inspectUrl = createServerFn({ method: "POST" }).validator(object({ url: string().min(8).max(1500) })).handler(inspectUrl_createServerFn_handler, async ({ data }) => {
	rateLimit(`url:${await clientKey()}`, 20, 6e5);
	if (!isHttpUrl(data.url)) throw new Error("Only public http(s) URLs");
	const chain = [];
	let current = data.url;
	for (let i = 0; i < 5; i++) {
		const parsed = new URL(current);
		if (isPrivateHost(parsed.hostname)) {
			chain.push({
				url: current,
				status: 0,
				location: null
			});
			break;
		}
		const res = await safeFetch(current, {
			method: "GET",
			timeoutMs: 4e3,
			maxBytes: 512
		});
		chain.push({
			url: current,
			status: res.status,
			location: res.location
		});
		if (!res.location) break;
		try {
			current = new URL(res.location, current).toString();
		} catch {
			break;
		}
	}
	return { chain };
});
//#endregion
export { checkUsernameBatch_createServerFn_handler, inspectUrl_createServerFn_handler, lookupCertificates_createServerFn_handler, lookupDomain_createServerFn_handler, lookupEmail_createServerFn_handler, lookupGithub_createServerFn_handler, lookupIp_createServerFn_handler };
