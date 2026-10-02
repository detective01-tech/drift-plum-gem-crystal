import type { LucideIcon } from "lucide-react";
import {
  AtSign,
  Binary,
  Github,
  Globe,
  Hash,
  ImageIcon,
  Link2,
  Phone,
  Route,
  Search,
  ShieldAlert,
  UserRound,
} from "lucide-react";

export type ToolDef = {
  id: string;
  name: string;
  group: "collection" | "local" | "exposure" | "output";
  blurb: string;
  lesson: string;
  sample: string;
  sampleHint: string;
  icon: LucideIcon;
};

export const TOOLS: ToolDef[] = [
  {
    id: "username",
    name: "Username recon",
    group: "collection",
    blurb: "Probe public profile URLs for a handle you already use.",
    lesson:
      "Username reuse is the cheapest way an investigator correlates accounts. This module only requests public profile pages and records HTTP status — it never logs in, never bypasses CAPTCHAs, and never reads private content. Run it on handles you own, or on the sample subject.",
    sample: "octocat",
    sampleHint: "GitHub’s public mascot account",
    icon: UserRound,
  },
  {
    id: "domain",
    name: "Domain intel",
    group: "collection",
    blurb: "DNS records, RDAP registration, certificate-transparency names, SPF/DMARC.",
    lesson:
      "DNS and RDAP are public by design. They tell you how a name is delegated (MX, NS, TXT), who registered it, and which hostnames appeared on public TLS certificates. SPF and DMARC live in the same TXT records — they are email-authentication policy, not a licence to spoof. This is passive reconnaissance — no port scans, no brute force.",
    sample: "example.com",
    sampleHint: "IANA reserved documentation domain",
    icon: Globe,
  },
  {
    id: "ip",
    name: "IP intelligence",
    group: "collection",
    blurb: "Geolocation, ASN, and organisation for a public address.",
    lesson:
      "IP geolocation is a best-effort estimate from regional internet registries and commercial databases. It is often accurate to a city for consumer ISPs and wildly wrong for VPNs, CDNs, and anycast. Treat it as a lead, not a location.",
    sample: "1.1.1.1",
    sampleHint: "Cloudflare public resolver",
    icon: Binary,
  },
  {
    id: "email",
    name: "Email footprint",
    group: "collection",
    blurb: "Format, disposable check, MX records, Gravatar portrait.",
    lesson:
      "An email address leaks its provider (MX), whether it is a throwaway domain, and — if the owner opted in — a Gravatar. This lab does not query breach corpora. Checking whether your own address is in a breach belongs on Have I Been Pwned, in your browser, under your control.",
    sample: "test@example.com",
    sampleHint: "RFC documentation address",
    icon: AtSign,
  },
  {
    id: "url",
    name: "URL inspector",
    group: "collection",
    blurb: "Parse components and follow a short public redirect chain.",
    lesson:
      "Phishing and tracking links hide behind redirects and fat query strings. The inspector follows a short public chain and refuses private/link-local targets so it cannot be used as an SSRF probe against internal networks.",
    sample: "https://example.com",
    sampleHint: "Public documentation site",
    icon: Link2,
  },
  {
    id: "github",
    name: "GitHub public",
    group: "collection",
    blurb: "Public profile, repos, and hireable flag via the GitHub API.",
    lesson:
      "GitHub’s public API is an OSINT staple: bios, emails that users chose to publish, organisations, and commit metadata. Tokens, private repos, and authenticated scopes are out of bounds for this lab.",
    sample: "octocat",
    sampleHint: "GitHub mascot",
    icon: Github,
  },
  {
    id: "image",
    name: "Image forensics",
    group: "local",
    blurb: "Read EXIF, GPS, and camera tags in the browser — nothing is uploaded.",
    lesson:
      "Phones embed GPS, timestamps, and device model in JPEG/HEIC files. Posting a photo can publish your house. This module never leaves your device. Strip metadata before you share.",
    sample: "",
    sampleHint: "Drop any JPEG you took",
    icon: ImageIcon,
  },
  {
    id: "phone",
    name: "Phone parser",
    group: "local",
    blurb: "Country, type, and validity — never an owner lookup.",
    lesson:
      "E.164 parsing tells you the calling country and whether a number is a plausible mobile or fixed line. It does not identify a subscriber. Reverse-phone directories that sell names are not part of this laboratory.",
    sample: "+12025550100",
    sampleHint: "North American example range (555)",
    icon: Phone,
  },
  {
    id: "hash",
    name: "Hash identifier",
    group: "local",
    blurb: "Guess algorithm from length and prefix. Does not crack.",
    lesson:
      "Identifying a hash is the first step in incident response (what am I looking at?). Cracking other people’s passwords is not education — it is unauthorised access. This module stops at identification.",
    sample: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    sampleHint: "SHA-256 of an empty string",
    icon: Hash,
  },
  {
    id: "dorks",
    name: "Search dorks",
    group: "local",
    blurb: "Build self-audit queries. You run them in your own browser.",
    lesson:
      "Search operators (filetype, site, intitle) are how investigators find documents people forgot were public. OpenLens only composes the query. You decide whether to run it, and you should run it on your own name first.",
    sample: "your-name",
    sampleHint: "Use your own name or brand",
    icon: Search,
  },
  {
    id: "exposure",
    name: "HTTP surface",
    group: "exposure",
    blurb: "Passive security headers, cookies, robots.txt, security.txt. Not a pentest.",
    lesson:
      "A single public GET is enough to see missing HSTS, a PHP version in X-Powered-By, cookies without HttpOnly, and a robots.txt that names /backup/. Those are OWASP A05 observations. This module never port-scans, never fuzzes paths, and never sends an exploit. Run it on a site you own, or on the sample.",
    sample: "https://example.com",
    sampleHint: "IANA example site",
    icon: ShieldAlert,
  },
  {
    id: "range",
    name: "Training range",
    group: "exposure",
    blurb: "Four fictional cases: misconfig, mail spoofing, EXIF, staging leak.",
    lesson:
      "Live sites go down, block datacentre IPs, and are a poor viva. The range is a marked script of four organisations that never existed. Each case maps an OSINT observation to an OWASP/CWE id, draws the attack path, and paints a red stop line before the payload. You cannot exploit a hostname that is not real — which is the point.",
    sample: "",
    sampleHint: "Load Harbor Clinic",
    icon: Route,
  },
];

export const TOOL_BY_ID = Object.fromEntries(TOOLS.map((t) => [t.id, t]));

export const GROUP_LABEL: Record<ToolDef["group"], string> = {
  collection: "Collection",
  local: "Local analysis",
  exposure: "Exposure",
  output: "Output",
};

export const CYCLE = [
  { step: "01", title: "Direction", body: "Define a lawful question. Whose footprint? Why? What is out of scope?" },
  { step: "02", title: "Collection", body: "Gather only public sources. Log the source, time, and method." },
  { step: "03", title: "Processing", body: "Normalise, de-duplicate, and discard noise. Keep raw copies." },
  { step: "04", title: "Analysis", body: "Correlate. A username hit plus an MX record is a hypothesis, not a fact." },
  { step: "05", title: "Dissemination", body: "Write a sourced report. Separate observation from inference." },
];
