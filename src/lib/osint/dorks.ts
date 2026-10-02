export type Dork = {
  title: string;
  query: string;
  why: string;
};

export function buildDorks(subject: string): Dork[] {
  const q = subject.trim();
  if (!q) return [];
  const quoted = `"${q.replace(/"/g, "")}"`;
  return [
    {
      title: "Exact phrase",
      query: quoted,
      why: "Finds pages that mention the subject as a contiguous string.",
    },
    {
      title: "PDF documents",
      query: `${quoted} filetype:pdf`,
      why: "Resumes, papers, and slides often leak emails and phone numbers.",
    },
    {
      title: "Spreadsheets",
      query: `${quoted} (filetype:xls OR filetype:xlsx OR filetype:csv)`,
      why: "Spreadsheets are a common source of accidental PII dumps.",
    },
    {
      title: "GitHub code",
      query: `site:github.com ${quoted}`,
      why: "Public repos sometimes commit config files, emails, or API keys.",
    },
    {
      title: "Paste sites",
      query: `${quoted} (site:pastebin.com OR site:paste.ee OR site:ghostbin.com)`,
      why: "Pastes are frequently used for dumps and forgotten notes.",
    },
    {
      title: "Index pages",
      query: `${quoted} intitle:"index of"`,
      why: "Open directories can expose backups. Use only on assets you own.",
    },
    {
      title: "LinkedIn public",
      query: `site:linkedin.com/in ${quoted}`,
      why: "Public professional profiles are a primary OSINT source.",
    },
    {
      title: "News & blogs",
      query: `${quoted} (site:medium.com OR site:substack.com OR site:wordpress.com)`,
      why: "Long-form writing often includes biography and contact details.",
    },
  ];
}

export function duckUrl(query: string): string {
  return `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
}

export function googleUrl(query: string): string {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}
