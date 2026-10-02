import { isPrivateHost } from "./validate";

const UA =
  "OpenLens/1.0 (Educational OSINT laboratory; academic coursework; public-source only)";

export class RateLimitError extends Error {
  constructor(message = "This lab throttles lookups. Wait a minute and retry.") {
    super(message);
    this.name = "RateLimitError";
  }
}

const buckets = new Map<string, { n: number; t: number }>();

export function rateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || now - b.t > windowMs) {
    buckets.set(key, { n: 1, t: now });
    return;
  }
  if (b.n >= max) throw new RateLimitError();
  b.n += 1;
}

export type SafeFetchResult = {
  ok: boolean;
  status: number;
  location: string | null;
  finalUrl: string;
  snippet: string;
  error: string | null;
};

function assertPublicHttpUrl(raw: string): URL {
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    throw new Error("Invalid URL");
  }
  if (u.protocol !== "https:" && u.protocol !== "http:") {
    throw new Error("Only http(s) URLs are allowed");
  }
  if (u.username || u.password) throw new Error("URLs with credentials are blocked");
  if (isPrivateHost(u.hostname)) throw new Error("Private or local addresses are blocked");
  return u;
}

export async function safeFetch(
  raw: string,
  opts: { method?: "GET" | "HEAD"; timeoutMs?: number; maxBytes?: number } = {},
): Promise<SafeFetchResult> {
  const method = opts.method ?? "GET";
  const timeoutMs = opts.timeoutMs ?? 4000;
  const maxBytes = opts.maxBytes ?? 24_000;
  const url = assertPublicHttpUrl(raw);

  try {
    const res = await fetch(url, {
      method,
      redirect: "manual",
      headers: {
        "User-Agent": UA,
        Accept: "text/html,application/json;q=0.9,*/*;q=0.8",
      },
      signal: AbortSignal.timeout(timeoutMs),
    });
    const location = res.headers.get("location");
    let snippet = "";
    if (method === "GET" && res.body) {
      const buf = new Uint8Array(await res.arrayBuffer());
      const slice = buf.slice(0, maxBytes);
      snippet = new TextDecoder("utf-8", { fatal: false }).decode(slice);
    }
    return {
      ok: res.ok,
      status: res.status,
      location,
      finalUrl: url.toString(),
      snippet,
      error: null,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "fetch failed";
    return {
      ok: false,
      status: 0,
      location: null,
      finalUrl: url.toString(),
      snippet: "",
      error: message,
    };
  }
}

export async function safeJson<T>(
  raw: string,
  opts: { timeoutMs?: number; headers?: Record<string, string> } = {},
): Promise<{ data: T | null; status: number; error: string | null }> {
  const url = assertPublicHttpUrl(raw);
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      headers: {
        "User-Agent": UA,
        Accept: "application/json, application/dns-json",
        ...opts.headers,
      },
      signal: AbortSignal.timeout(opts.timeoutMs ?? 6000),
    });
    if (!res.ok) {
      return { data: null, status: res.status, error: `HTTP ${res.status}` };
    }
    const data = (await res.json()) as T;
    return { data, status: res.status, error: null };
  } catch (err) {
    return {
      data: null,
      status: 0,
      error: err instanceof Error ? err.message : "fetch failed",
    };
  }
}
