import { useMemo, useState } from "react";
import { parsePhoneNumberFromString, type PhoneNumber } from "libphonenumber-js";
import { AddFindingButton } from "@/components/osint/add-finding";
import { ResultTable, ToolFrame } from "@/components/osint/tool-frame";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TOOL_BY_ID } from "@/lib/osint/catalog";

const tool = TOOL_BY_ID.phone!;

function describe(n: PhoneNumber) {
  const type = n.getType();
  return {
    e164: n.format("E.164"),
    international: n.formatInternational(),
    national: n.formatNational(),
    country: n.country ?? "unknown",
    countryCallingCode: n.countryCallingCode,
    type: type ?? "unknown",
    valid: n.isValid(),
    possible: n.isPossible(),
  };
}

export function PhoneTool() {
  const [raw, setRaw] = useState(tool.sample);
  const parsed = useMemo(() => {
    const n = parsePhoneNumberFromString(raw.trim());
    return n ? describe(n) : null;
  }, [raw]);

  return (
    <ToolFrame tool={tool} onSample={() => setRaw(tool.sample)}>
      <div className="space-y-2">
        <Label htmlFor="phone">Number (include country code)</Label>
        <Input
          id="phone"
          value={raw}
          placeholder="+92 300 1234567"
          autoComplete="off"
          onChange={(e) => setRaw(e.target.value)}
        />
      </div>
      {raw.trim() && !parsed ? <p className="mt-3 text-sm text-muted">Could not parse. Try E.164, e.g. +923001234567.</p> : null}
      {parsed ? (
        <div className="mt-8 space-y-4">
          <ResultTable
            rows={[
              { label: "Valid", value: parsed.valid ? "Yes" : "No" },
              { label: "Possible", value: parsed.possible ? "Yes" : "No" },
              { label: "Country", value: parsed.country },
              { label: "Calling code", value: `+${parsed.countryCallingCode}` },
              { label: "Type", value: parsed.type.replaceAll("_", " ").toLowerCase() },
              { label: "E.164", value: parsed.e164 },
              { label: "International", value: parsed.international },
              { label: "National", value: parsed.national },
            ]}
          />
          <AddFindingButton
            tool="phone"
            query={parsed.e164}
            summary={`${parsed.e164} · ${parsed.country} · ${parsed.type} · valid=${parsed.valid}`}
            detail={JSON.stringify(parsed, null, 2)}
          />
          <p className="text-xs text-faint">
            This is a format parser. It does not identify a subscriber, a SIM, or a home address.
          </p>
        </div>
      ) : null}
    </ToolFrame>
  );
}
