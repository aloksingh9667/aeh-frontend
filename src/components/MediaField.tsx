import { useRef, useState } from "react";
import { Sparkles, Upload, Loader2, X } from "lucide-react";

interface MediaFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onAiClick?: () => void;
  keySet?: boolean;
  compact?: boolean;
  maxSizeMB?: number;
}

export function MediaField({ label, value, onChange, onAiClick, keySet, compact, maxSizeMB = 5 }: MediaFieldProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file");
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`Image must be under ${maxSizeMB} MB`);
      return;
    }
    setUploading(true);
    try {
      const dataUrl: string = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
      });
      onChange(dataUrl);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={compact ? "" : "sm:col-span-2"}>
      {label && <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</span>}
      <div className="mt-1 flex flex-wrap gap-2 items-start">
        {value && (
          <div className="relative">
            <img src={value} alt="" className="h-16 w-16 object-cover rounded border border-border bg-muted" />
            <button type="button" onClick={() => onChange("")} className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600" title="Clear">
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
        <input
          type="text"
          value={value.startsWith("data:") ? "(uploaded image)" : value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://… or click Upload"
          readOnly={value.startsWith("data:")}
          className="flex-1 min-w-[180px] border border-border rounded-lg px-3 py-2 text-sm"
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-1 border border-blue-300 bg-blue-50 hover:bg-blue-100 disabled:opacity-50 text-blue-700 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap"
        >
          {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
          Upload
        </button>
        {onAiClick && (
          <button
            type="button"
            onClick={onAiClick}
            disabled={!keySet}
            title={!keySet ? "Add your Gemini API key first" : ""}
            className="inline-flex items-center gap-1 border border-amber-300 bg-amber-50 hover:bg-amber-100 disabled:opacity-50 text-amber-700 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap"
          >
            <Sparkles className="h-3.5 w-3.5" /> AI
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
