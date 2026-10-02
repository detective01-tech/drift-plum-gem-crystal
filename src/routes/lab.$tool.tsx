import { createFileRoute, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/app-shell";
import { DomainTool } from "@/components/tools/domain-tool";
import { DorksTool } from "@/components/tools/dorks-tool";
import { EmailTool } from "@/components/tools/email-tool";
import { ExposureTool } from "@/components/tools/exposure-tool";
import { GithubTool } from "@/components/tools/github-tool";
import { HashTool } from "@/components/tools/hash-tool";
import { ImageTool } from "@/components/tools/image-tool";
import { IpTool } from "@/components/tools/ip-tool";
import { PhoneTool } from "@/components/tools/phone-tool";
import { RangeTool } from "@/components/tools/range-tool";
import { UrlTool } from "@/components/tools/url-tool";
import { UsernameTool } from "@/components/tools/username-tool";
import { TOOL_BY_ID } from "@/lib/osint/catalog";

export const Route = createFileRoute("/lab/$tool")({
  component: LabTool,
});

const MAP = {
  username: UsernameTool,
  domain: DomainTool,
  ip: IpTool,
  email: EmailTool,
  url: UrlTool,
  github: GithubTool,
  image: ImageTool,
  phone: PhoneTool,
  hash: HashTool,
  dorks: DorksTool,
  exposure: ExposureTool,
  range: RangeTool,
} as const;

function LabTool() {
  const { tool } = Route.useParams();
  const def = TOOL_BY_ID[tool];
  const Comp = MAP[tool as keyof typeof MAP];
  if (!def || !Comp) throw notFound();
  return (
    <AppShell>
      <Comp />
    </AppShell>
  );
}
