export type Platform = {
  id: string;
  name: string;
  category: string;
  url: string;
};

/** Public profile URL templates. Server builds the URL; clients never supply it. */
export const PLATFORMS: Platform[] = [
  { id: "github", name: "GitHub", category: "Code", url: "https://github.com/{u}" },
  { id: "gitlab", name: "GitLab", category: "Code", url: "https://gitlab.com/{u}" },
  { id: "codeberg", name: "Codeberg", category: "Code", url: "https://codeberg.org/{u}" },
  { id: "npm", name: "npm", category: "Code", url: "https://www.npmjs.com/~{u}" },
  { id: "pypi", name: "PyPI", category: "Code", url: "https://pypi.org/user/{u}/" },
  { id: "reddit", name: "Reddit", category: "Social", url: "https://www.reddit.com/user/{u}" },
  { id: "hackernews", name: "Hacker News", category: "Social", url: "https://news.ycombinator.com/user?id={u}" },
  { id: "devto", name: "dev.to", category: "Writing", url: "https://dev.to/{u}" },
  { id: "hashnode", name: "Hashnode", category: "Writing", url: "https://hashnode.com/@{u}" },
  { id: "medium", name: "Medium", category: "Writing", url: "https://medium.com/@{u}" },
  { id: "youtube", name: "YouTube", category: "Media", url: "https://www.youtube.com/@{u}" },
  { id: "twitch", name: "Twitch", category: "Media", url: "https://www.twitch.tv/{u}" },
  { id: "soundcloud", name: "SoundCloud", category: "Media", url: "https://soundcloud.com/{u}" },
  { id: "vimeo", name: "Vimeo", category: "Media", url: "https://vimeo.com/{u}" },
  { id: "pinterest", name: "Pinterest", category: "Social", url: "https://www.pinterest.com/{u}/" },
  { id: "keybase", name: "Keybase", category: "Identity", url: "https://keybase.io/{u}" },
  { id: "aboutme", name: "About.me", category: "Identity", url: "https://about.me/{u}" },
  { id: "kaggle", name: "Kaggle", category: "Research", url: "https://www.kaggle.com/{u}" },
  { id: "huggingface", name: "Hugging Face", category: "Research", url: "https://huggingface.co/{u}" },
  { id: "replit", name: "Replit", category: "Code", url: "https://replit.com/@{u}" },
  { id: "leetcode", name: "LeetCode", category: "Code", url: "https://leetcode.com/u/{u}/" },
  { id: "codeforces", name: "Codeforces", category: "Code", url: "https://codeforces.com/profile/{u}" },
  { id: "tryhackme", name: "TryHackMe", category: "Security", url: "https://tryhackme.com/p/{u}" },
  { id: "chess", name: "Chess.com", category: "Games", url: "https://www.chess.com/member/{u}" },
];

export const PLATFORM_BY_ID = Object.fromEntries(PLATFORMS.map((p) => [p.id, p]));

export const USERNAME_RE = /^[a-zA-Z0-9._-]{1,39}$/;
