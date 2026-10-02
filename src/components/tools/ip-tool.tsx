import { useState } from "react";
import { AddFindingButton } from "@/components/osint/add-finding";
import { ResultTable, ToolFrame } from "@/components/osint/tool-frame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TOOL_BY_ID } from "@/lib/osint/catalog";
import { lookupIp } from "@/lib/osint/functions";

const tool = TOOL_BY_ID.ip!;
type IpResult = Awaited<ReturnType<typeof lookupIp>>;

export function IpTool() {
  const [ip, setIp] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<IpResult | null>(null);

  async function run(target: string) {
    setBusy(true);
    setError(null);
    try {
      setResult(await lookupIp({ data: { ip: target } }));
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Lookup failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <ToolFrame tool={tool} onSample={() => { setIp(tool.sample); void run(tool.sample); }}>
      <form
        className="flex flex-col gap-3 sm:flex-row sm:items-end"
        onSubmit={(e) => {
          e.preventDefault();
          void run(ip);
        }}
      >
        <div className="flex-1 space-y-2">
          <Label htmlFor="ip">Public IP</Label>
          <Input id="ip" value={ip} placeholder="1.1.1.1" autoComplete="off" onChange={(e) => setIp(e.target.value)} />
        </div>
        <Button type="submit" disabled={busy}>
          {busy ? "Looking up…" : "Geolocate"}
        </Button>
      </form>
      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
      {result ? (
        <div className="mt-8 space-y-4">
          <ResultTable
            rows={[
              { label: "Address", value: result.ip },
              { label: "Type", value: result.type },
              { label: "City", value: [result.city, result.region].filter(Boolean).join(", ") },
              { label: "Country", value: result.country },
              { label: "ASN", value: result.asn ? `AS${result.asn}` : null },
              { label: "Organisation", value: result.org },
              { label: "ISP", value: result.isp },
              { label: "Timezone", value: result.timezone },
              {
                label: "Coordinates",
                value:
                  result.latitude != null && result.longitude != null
                    ? `${result.latitude.toFixed(4)}, ${result.longitude.toFixed(4)}`
                    : null,
              },
            ]}
          />
          {result.latitude != null && result.longitude != null ? (
            <a
              className="inline-block text-sm text-accent underline-offset-4 hover:underline"
              href={`https://www.openstreetmap.org/?mlat=${result.latitude}&mlon=${result.longitude}#map=6/${result.latitude}/${result.longitude}`}
              target="_blank"
              rel="noreferrer"
            >
              View estimate on OpenStreetMap
            </a>
          ) : null}
          <AddFindingButton
            tool="ip"
            query={result.ip}
            summary={`${result.ip} · ${result.org || result.isp || "unknown org"} · ${result.country || "unknown country"}`}
            detail={JSON.stringify(result, null, 2)}
          />
          <p className="text-xs text-faint">
            Anycast, CDNs and VPNs make city-level geolocation a hint. Never treat it as a street address.
          </p>
        </div>
      ) : null}
    </ToolFrame>
  );
}
