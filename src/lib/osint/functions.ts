import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { PLATFORM_BY_ID, USERNAME_RE } from "./platforms";
import { isDomain, isEmail, isHttpUrl, isIp, isPrivateHost } from "./validate";
import { analyzeEmailAuth } from "./email-auth";
import { rateLimit, safeFetch, safeJson } from "./fetch-safe.server";
import {
  analyzeCookies,
  analyzeHeaders,
  analyzeRobots,
  analyzeSecurityTxt,
  hardeningScore,
} from "./surface";

async function clientKey() {
  const { getRequestHeader } = await import("@tanstack/react-start/server");
  return (
    getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ||
    getRequestHeader("x-real-ip") ||
    "anon"
  );
}

export type UsernameHit = {
  id: string;
  name: string;
  category: string;
  url: string;
  status: "claimed" | "available" | "unknown";
  httpStatus: number | null;
  note: string;
};

function classify(
  httpStatus: number,
  location: string | null,
  error: string | null,
): { status: UsernameHit["status"]; note: string } {
  if (error) return { status: "unknown", note: "Timed out or blocked by the host" };
  if (httpStatus === 404 || httpStatus === 410) {
    return { status: "available", note: "Public profile URL returned not found" };
  }
  if (httpStatus === 200) return { status: "claimed", note: "Public page responded 200" };
  if (httpStatus === 301 || httpStatus === 302 || httpStatus === 303 || httpStatus === 307 || httpStatus === 308) {
    return { status: "unknown", note: location ? `Redirected to ${location}` : "Redirect without a profile guarantee" };
  }
  if (httpStatus === 401 || httpStatus === 403) {
    return { status: "unknown", note: "Host refused the probe (auth wall or bot filter)" };
  }
  return { status: "unknown", note: `HTTP ${httpStatus}` };
}

export const checkUsernameBatch = createServerFn({ method: "POST" })
  .validator(
    z.object({
      username: z.string().min(1).max(39),
      ids: z.array(z.string()).min(1).max(8),
    }),
  )
  .handler(async ({ data }) => {
    rateLimit(`user:${await clientKey()}`, 40, 10 * 60 * 1000);
    const username = data.username.trim();
    if (!USERNAME_RE.test(username)) {
      throw new Error("Usernames may only contain letters, numbers, dot, underscore, hyphen.");
    }
    const results = await Promise.all(
      data.ids.map(async (id) => {
        const platform = PLATFORM_BY_ID[id];
        if (!platform) return null;
        const url = platform.url.replaceAll("{u}", encodeURIComponent(username));
        const res = await safeFetch(url, { method: "GET", timeoutMs: 3500, maxBytes: 4000 });
        const { status, note } = classify(res.status, res.location, res.error);
        return {
          id: platform.id,
          name: platform.name,
          category: platform.category,
          url,
          status,
          httpStatus: res.status || null,
          note,
        } satisfies UsernameHit;
      }),
    );
    return { username, results: results.filter((r): r is UsernameHit => r !== null) };
  });

type DnsAnswer = { name: string; type: number; data: string; TTL?: number };
type DnsJson = { Status: number; Answer?: DnsAnswer[] };

async function doh(name: string, type: string) {
  const url = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${encodeURIComponent(type)}`;
  const { data, error } = await safeJson<DnsJson>(url, {
    headers: { Accept: "application/dns-json" },
    timeoutMs: 5000,
  });
  return {
    type,
    error,
    records: (data?.Answer ?? []).map((a) => ({
      name: a.name,
      data: a.data,
      ttl: a.TTL ?? null,
    })),
  };
}

export const lookupDomain = createServerFn({ method: "POST" })
  .validator(z.object({ domain: z.string().min(1).max(253) }))
  .handler(async ({ data }) => {
    rateLimit(`dom:${await clientKey()}`, 30, 10 * 60 * 1000);
    const domain = data.domain.trim().toLowerCase().replace(/^https?:\/\//, "").split("/")[0] ?? "";
    if (!isDomain(domain)) throw new Error("Enter a registrable domain such as example.com");

    const types = ["A", "AAAA", "MX", "NS", "TXT", "CNAME", "SOA"] as const;
    const dns = await Promise.all(types.map((t) => doh(domain, t)));
    const dmarc = await doh(`_dmarc.${domain}`, "TXT");
    const txt = dns.find((b) => b.type === "TXT")?.records.map((r) => r.data) ?? [];
    const mailAuth = analyzeEmailAuth(txt, dmarc.records.map((r) => r.data));

    const rdap = await safeJson<Record<string, unknown>>(`https://rdap.org/domain/${encodeURIComponent(domain)}`, {
      timeoutMs: 7000,
    });

    let registrar: string | null = null;
    let registered: string | null = null;
    let expires: string | null = null;
    let nameservers: string[] = [];
    let status: string[] = [];
    if (rdap.data) {
      const entities = (rdap.data.entities as { roles?: string[]; vcardArray?: unknown[] }[] | undefined) ?? [];
      const reg = entities.find((e) => e.roles?.includes("registrar"));
      const vcard = reg?.vcardArray?.[1] as [string, unknown, string, string][] | undefined;
      const fn = vcard?.find((row) => row[0] === "fn");
      registrar = typeof fn?.[3] === "string" ? fn[3] : null;
      const events = (rdap.data.events as { eventAction?: string; eventDate?: string }[] | undefined) ?? [];
      registered = events.find((e) => e.eventAction === "registration")?.eventDate ?? null;
      expires = events.find((e) => e.eventAction === "expiration")?.eventDate ?? null;
      nameservers = ((rdap.data.nameservers as { ldhName?: string }[] | undefined) ?? [])
        .map((n) => n.ldhName)
        .filter((x): x is string => Boolean(x));
      status = Array.isArray(rdap.data.status) ? (rdap.data.status as string[]) : [];
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
        status,
      },
      mailAuth,
    };
  });

export const lookupCertificates = createServerFn({ method: "POST" })
  .validator(z.object({ domain: z.string().min(1).max(253) }))
  .handler(async ({ data }) => {
    rateLimit(`crt:${await clientKey()}`, 12, 10 * 60 * 1000);
    const domain = data.domain.trim().toLowerCase().replace(/^https?:\/\//, "").split("/")[0] ?? "";
    if (!isDomain(domain)) throw new Error("Enter a registrable domain such as example.com");
    const url = `https://crt.sh/?q=${encodeURIComponent(domain)}&output=json`;
    const { data: rows, error } = await safeJson<
      Array<{ name_value?: string; issuer_name?: string; not_before?: string }>
    >(url, { timeoutMs: 12000 });
    const names = new Set<string>();
    if (rows) {
      for (const row of rows) {
        const raw = row.name_value ?? "";
        for (const part of raw.split("\n")) {
          const n = part.trim().toLowerCase();
          if (n) names.add(n);
        }
        if (names.size > 80) break;
      }
    }
    return { domain, error, names: [...names].sort().slice(0, 80) };
  });

export const lookupIp = createServerFn({ method: "POST" })
  .validator(z.object({ ip: z.string().min(1).max(80) }))
  .handler(async ({ data }) => {
    rateLimit(`ip:${await clientKey()}`, 30, 10 * 60 * 1000);
    const ip = data.ip.trim();
    if (!isIp(ip)) throw new Error("Enter a public IPv4 or IPv6 address");
    if (isPrivateHost(ip)) throw new Error("Private and loopback addresses are out of scope");
    const { data: json, error } = await safeJson<{
      ip?: string;
      success?: boolean;
      type?: string;
      continent?: string;
      country?: string;
      country_code?: string;
      city?: string;
      region?: string;
      latitude?: number;
      longitude?: number;
      connection?: { asn?: number; org?: string; isp?: string; domain?: string };
      timezone?: { id?: string };
    }>(`https://ipwho.is/${encodeURIComponent(ip)}`);
    if (!json || json.success === false) {
      throw new Error(error || "IP lookup failed");
    }
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
      timezone: json.timezone?.id ?? null,
    };
  });

export const lookupEmail = createServerFn({ method: "POST" })
  .validator(z.object({ email: z.string().min(3).max(120), hash: z.string().length(32) }))
  .handler(async ({ data }) => {
    rateLimit(`em:${await clientKey()}`, 30, 10 * 60 * 1000);
    const email = data.email.trim().toLowerCase();
    if (!isEmail(email)) throw new Error("Enter a valid email address");
    const domain = email.split("@")[1] ?? "";
    const mx = await doh(domain, "MX");
    const gravatarUrl = `https://www.gravatar.com/avatar/${data.hash}?d=404&s=128`;
    const grav = await safeFetch(gravatarUrl, { method: "HEAD", timeoutMs: 4000 });
    return {
      email,
      domain,
      mx: mx.records,
      mxError: mx.error,
      gravatar: {
        url: gravatarUrl.replace("d=404", "d=identicon"),
        present: grav.status === 200,
      },
    };
  });

export const lookupGithub = createServerFn({ method: "POST" })
  .validator(z.object({ username: z.string().min(1).max(39) }))
  .handler(async ({ data }) => {
    rateLimit(`gh:${await clientKey()}`, 20, 10 * 60 * 1000);
    const username = data.username.trim();
    if (!USERNAME_RE.test(username)) throw new Error("Invalid GitHub username");
    const userRes = await safeJson<{
      login?: string;
      name?: string | null;
      bio?: string | null;
      company?: string | null;
      blog?: string | null;
      location?: string | null;
      twitter_username?: string | null;
      public_repos?: number;
      followers?: number;
      following?: number;
      created_at?: string;
      html_url?: string;
      avatar_url?: string;
      hireable?: boolean | null;
      email?: string | null;
      message?: string;
    }>(`https://api.github.com/users/${encodeURIComponent(username)}`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!userRes.data || userRes.data.message === "Not Found") {
      return { found: false as const, username };
    }
    const reposRes = await safeJson<
      Array<{
        name: string;
        html_url: string;
        description: string | null;
        stargazers_count: number;
        language: string | null;
        updated_at: string;
        fork: boolean;
      }>
    >(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=8&sort=updated`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    const u = userRes.data;
    return {
      found: true as const,
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
        email: u.email ?? null,
      },
      repos: (reposRes.data ?? []).filter((r) => !r.fork).slice(0, 8),
    };
  });

export const inspectUrl = createServerFn({ method: "POST" })
  .validator(z.object({ url: z.string().min(8).max(1500) }))
  .handler(async ({ data }) => {
    rateLimit(`url:${await clientKey()}`, 20, 10 * 60 * 1000);
    if (!isHttpUrl(data.url)) throw new Error("Only public http(s) URLs");
    const chain: { url: string; status: number; location: string | null }[] = [];
    let current = data.url;
    for (let i = 0; i < 5; i++) {
      const parsed = new URL(current);
      if (isPrivateHost(parsed.hostname)) {
        chain.push({ url: current, status: 0, location: null });
        break;
      }
      const res = await safeFetch(current, { method: "GET", timeoutMs: 4000, maxBytes: 512 });
      chain.push({ url: current, status: res.status, location: res.location });
      if (!res.location) break;
      try {
        current = new URL(res.location, current).toString();
      } catch {
        break;
      }
    }
    return { chain };
  });

export const inspectSurface = createServerFn({ method: "POST" })
  .validator(z.object({ url: z.string().min(8).max(1500) }))
  .handler(async ({ data }) => {
    rateLimit(`surf:${await clientKey()}`, 12, 10 * 60 * 1000);
    if (!isHttpUrl(data.url)) throw new Error("Only public http(s) URLs");

    let current = data.url.trim();
    let last = await safeFetch(current, { method: "GET", timeoutMs: 5000, maxBytes: 2048 });
    const hops: string[] = [current];
    for (let i = 0; i < 4 && last.location; i++) {
      let next: string;
      try {
        next = new URL(last.location, current).toString();
      } catch {
        break;
      }
      const host = new URL(next).hostname;
      if (isPrivateHost(host)) {
        throw new Error("Redirect to a private address was blocked");
      }
      current = next;
      hops.push(current);
      last = await safeFetch(current, { method: "GET", timeoutMs: 5000, maxBytes: 2048 });
    }

    if (last.error && last.status === 0) {
      throw new Error(last.error);
    }

    const origin = new URL(last.finalUrl).origin;
    const robotsP = safeFetch(`${origin}/robots.txt`, { method: "GET", timeoutMs: 4000, maxBytes: 8000 });
    const secP = safeFetch(`${origin}/.well-known/security.txt`, {
      method: "GET",
      timeoutMs: 4000,
      maxBytes: 4000,
    });
    const [robots, security] = await Promise.all([robotsP, secP]);

    const findings = [
      ...analyzeHeaders({
        url: data.url,
        finalUrl: last.finalUrl,
        status: last.status,
        headers: last.headers,
      }),
      ...analyzeCookies(last.setCookie),
      ...analyzeRobots(robots.ok ? robots.snippet : null, robots.status),
      ...analyzeSecurityTxt(security.ok ? security.snippet : null, security.status),
    ];

    return {
      url: data.url,
      finalUrl: last.finalUrl,
      https: last.finalUrl.toLowerCase().startsWith("https:"),
      status: last.status,
      hops,
      headers: last.headers,
      setCookie: last.setCookie,
      robots: { status: robots.status, body: robots.ok ? robots.snippet.slice(0, 2000) : null },
      securityTxt: { status: security.status, body: security.ok ? security.snippet.slice(0, 1500) : null },
      findings,
      score: hardeningScore(findings),
    };
  });
