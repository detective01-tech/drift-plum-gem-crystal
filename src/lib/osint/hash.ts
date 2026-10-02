export type HashGuess = {
  name: string;
  confidence: "high" | "medium" | "low";
  notes: string;
};

export function identifyHash(input: string): HashGuess[] {
  const raw = input.trim();
  if (!raw) return [];
  const guesses: HashGuess[] = [];
  const hex = /^[a-fA-F0-9]+$/.test(raw);
  const b64 = /^[A-Za-z0-9+/=]+$/.test(raw);

  if (raw.startsWith("$2a$") || raw.startsWith("$2b$") || raw.startsWith("$2y$")) {
    guesses.push({
      name: "bcrypt",
      confidence: "high",
      notes: "Adaptive password hash. Designed to be slow. Do not attempt to crack.",
    });
  }
  if (raw.startsWith("$argon2")) {
    guesses.push({
      name: "Argon2",
      confidence: "high",
      notes: "Memory-hard password hash (winner of the Password Hashing Competition).",
    });
  }
  if (raw.startsWith("$6$")) {
    guesses.push({ name: "SHA-512 crypt", confidence: "high", notes: "Unix shadow password format (sha512crypt)." });
  }
  if (raw.startsWith("$5$")) {
    guesses.push({ name: "SHA-256 crypt", confidence: "high", notes: "Unix shadow password format (sha256crypt)." });
  }
  if (raw.startsWith("$1$")) {
    guesses.push({ name: "MD5 crypt", confidence: "high", notes: "Legacy Unix $1$ format. Weak — educational ID only." });
  }
  if (raw.split(".").length === 3 && raw.length > 40) {
    guesses.push({
      name: "JWT (JSON Web Token)",
      confidence: "medium",
      notes: "Three base64url segments. Inspect header/payload only — never share live tokens.",
    });
  }
  if (hex && raw.length === 32) {
    guesses.push({
      name: "MD5",
      confidence: "medium",
      notes: "32 hex chars. Also matches NTLM and many other 128-bit fingerprints.",
    });
    guesses.push({
      name: "NTLM",
      confidence: "low",
      notes: "Windows NTLM is also 32 hex chars. Context (source) is required.",
    });
  }
  if (hex && raw.length === 40) {
    guesses.push({ name: "SHA-1", confidence: "medium", notes: "40 hex chars. Deprecated for collision resistance." });
  }
  if (hex && raw.length === 64) {
    guesses.push({ name: "SHA-256", confidence: "medium", notes: "64 hex chars. Also matches SHA3-256 in hex form." });
  }
  if (hex && raw.length === 96) {
    guesses.push({ name: "SHA-384", confidence: "medium", notes: "96 hex chars." });
  }
  if (hex && raw.length === 128) {
    guesses.push({ name: "SHA-512", confidence: "medium", notes: "128 hex chars." });
  }
  if (raw.startsWith("sha256$") || raw.includes("pbkdf2")) {
    guesses.push({ name: "PBKDF2 / framework digest", confidence: "medium", notes: "Application-specific salted digest." });
  }
  if (b64 && !hex && raw.length >= 20 && guesses.length === 0) {
    guesses.push({
      name: "Base64 blob",
      confidence: "low",
      notes: "Could be any digest encoded in Base64. Decode first, then re-identify.",
    });
  }
  if (guesses.length === 0) {
    guesses.push({
      name: "Unknown",
      confidence: "low",
      notes: `Length ${raw.length}. Hash ID is heuristic — many algorithms share encodings.`,
    });
  }
  return guesses;
}
