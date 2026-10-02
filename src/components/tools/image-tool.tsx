import { useState } from "react";
import exifr from "exifr";
import { AddFindingButton } from "@/components/osint/add-finding";
import { ResultTable, ToolFrame } from "@/components/osint/tool-frame";
import { TOOL_BY_ID } from "@/lib/osint/catalog";

const tool = TOOL_BY_ID.image!;

type Meta = {
  fileName: string;
  fileSize: number;
  mime: string;
  width?: number;
  height?: number;
  make?: string;
  model?: string;
  lens?: string;
  software?: string;
  taken?: string;
  lat?: number;
  lon?: number;
  rawKeys: number;
};

export function ImageTool() {
  const [meta, setMeta] = useState<Meta | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onFile(file: File) {
    setError(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
    try {
      const parsed = ((await exifr.parse(file, { gps: true, tiff: true, exif: true })) ?? {}) as Record<string, unknown>;
      const gps = await exifr.gps(file).catch(() => null);
      const bitmap = await createImageBitmap(file).catch(() => null);
      setMeta({
        fileName: file.name,
        fileSize: file.size,
        mime: file.type || "unknown",
        width: bitmap?.width,
        height: bitmap?.height,
        make: str(parsed.Make),
        model: str(parsed.Model),
        lens: str(parsed.LensModel),
        software: str(parsed.Software),
        taken: str(parsed.DateTimeOriginal || parsed.CreateDate || parsed.ModifyDate),
        lat: gps?.latitude,
        lon: gps?.longitude,
        rawKeys: Object.keys(parsed).length,
      });
    } catch (err) {
      setMeta(null);
      setError(err instanceof Error ? err.message : "Could not read metadata");
    }
  }

  return (
    <ToolFrame tool={tool}>
      <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card px-4 py-10 text-center">
        <input
          type="file"
          accept="image/jpeg,image/jpg,image/tiff,image/heic,image/heif,image/png,image/webp"
          className="sr-only"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void onFile(f);
          }}
        />
        <span className="text-sm">Drop a photo you took — it stays on this device</span>
        <span className="mt-1 text-xs text-faint">JPEG, TIFF, HEIC. PNG/WebP often have no EXIF.</span>
      </label>
      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
      {preview ? (
        <img
          src={preview}
          alt="Selected file preview"
          className="mt-6 max-h-64 rounded-lg object-contain outline outline-1 -outline-offset-1 outline-foreground/10"
        />
      ) : null}
      {meta ? (
        <div className="mt-6 space-y-4">
          <ResultTable
            rows={[
              { label: "File", value: `${meta.fileName} · ${Math.round(meta.fileSize / 1024)} KB` },
              { label: "Type", value: meta.mime },
              { label: "Pixels", value: meta.width && meta.height ? `${meta.width} × ${meta.height}` : "—" },
              { label: "Camera", value: [meta.make, meta.model].filter(Boolean).join(" ") },
              { label: "Lens", value: meta.lens },
              { label: "Software", value: meta.software },
              { label: "Taken", value: meta.taken },
              {
                label: "GPS",
                value: meta.lat != null && meta.lon != null ? `${meta.lat.toFixed(6)}, ${meta.lon.toFixed(6)}` : "None in file",
              },
              { label: "Tags read", value: String(meta.rawKeys) },
            ]}
          />
          {meta.lat != null && meta.lon != null ? (
            <a
              className="inline-block text-sm text-accent underline-offset-4 hover:underline"
              href={`https://www.openstreetmap.org/?mlat=${meta.lat}&mlon=${meta.lon}#map=16/${meta.lat}/${meta.lon}`}
              target="_blank"
              rel="noreferrer"
            >
              Open GPS on OpenStreetMap
            </a>
          ) : null}
          <AddFindingButton
            tool="image"
            query={meta.fileName}
            summary={`EXIF for ${meta.fileName}${meta.lat != null ? " · GPS present" : " · no GPS"}`}
            detail={JSON.stringify(meta, null, 2)}
          />
        </div>
      ) : null}
    </ToolFrame>
  );
}

function str(v: unknown): string | undefined {
  if (v instanceof Date) return v.toISOString();
  if (typeof v === "string" && v.trim()) return v;
  if (typeof v === "number") return String(v);
  return undefined;
}
