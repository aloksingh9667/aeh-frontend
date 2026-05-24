import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "wouter";
import { GraduationCap, Sparkles, Save, Loader2, ArrowLeft, Image as ImageIcon, Plus, Trash2, Key, CheckCircle2, AlertCircle, ExternalLink, Eye, EyeOff, Palette, ArrowUp, ArrowDown, LayoutTemplate, ChevronDown, ChevronRight, Columns2, RefreshCw, Monitor, Smartphone, X, PanelRightOpen, Undo2, Redo2, GitCompare, Download, Upload, FileJson, Clock, CalendarClock } from "lucide-react";
import { useAuth } from "@/lib/auth";
import {
  useSiteConfig,
  updateSiteConfig,
  generateSiteContent,
  generateSiteImage,
  verifyApiKey,
  writePreviewDraft,
  fetchSchedule,
  setSchedule,
  cancelSchedule,
  COLOR_PALETTES,
  SECTION_TEMPLATE_OPTIONS,
  FOOTER_TEMPLATE_OPTIONS,
  type SiteConfig,
  type SectionTemplateKey,
} from "@/lib/siteConfig";
import { MediaField } from "@/components/MediaField";
import { TemplateThumb } from "@/components/TemplateThumb";

type Form = Partial<SiteConfig> & { geminiApiKey?: string | null };

export default function AdminCustomize() {
  const { token } = useAuth();
  const { config, refetch } = useSiteConfig();
  const [form, setForm] = useState<Form>({});
  const [collegeQuery, setCollegeQuery] = useState("");
  const [hint, setHint] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatingSection, setGeneratingSection] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [imageGenField, setImageGenField] = useState<string | null>(null);
  const [imagePrompt, setImagePrompt] = useState("");
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [verifyingKey, setVerifyingKey] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const draftTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [scheduleDateTime, setScheduleDateTime] = useState("");
  const [scheduledInfo, setScheduledInfo] = useState<{ scheduledAt: string | null } | null>(null);
  const [schedulingInProgress, setSchedulingInProgress] = useState(false);

  function handleExport() {
    const { geminiApiKey, geminiApiKeySet, id, updatedAt, ...exportable } =
      form as Form & { geminiApiKey?: unknown; geminiApiKeySet?: unknown; id?: unknown; updatedAt?: unknown };
    void geminiApiKey; void geminiApiKeySet; void id; void updatedAt;
    const json = JSON.stringify(exportable, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const date = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `aeh-config-${date}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage({ type: "ok", text: "Config exported. Keep this file as a backup." });
  }

  function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith(".json")) {
      setMessage({ type: "err", text: "Please select a .json file exported from this admin panel." });
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const raw = JSON.parse(ev.target?.result as string) as Record<string, unknown>;
        const KNOWN_KEYS: (keyof SiteConfig)[] = [
          "collegeName", "shortName", "tagline", "heroTitle", "heroSubtitle",
          "phone", "email", "address", "aboutText", "schools", "facilities",
        ];
        const hasKnownKey = KNOWN_KEYS.some((k) => k in raw);
        if (!hasKnownKey) {
          setMessage({ type: "err", text: "File doesn't look like a valid AEH config export." });
          return;
        }
        const { geminiApiKey, geminiApiKeySet, id, updatedAt, ...safe } = raw as Record<string, unknown>;
        void geminiApiKey; void geminiApiKeySet; void id; void updatedAt;
        const imported = safe as Form;
        setForm((prev) => {
          const next = { ...prev, ...imported };
          pushHistory(next);
          return next;
        });
        setMessage({ type: "ok", text: `Config imported from "${file.name}". Review the changes, then click Save.` });
      } catch {
        setMessage({ type: "err", text: "Could not parse the file. Make sure it's a valid JSON config export." });
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  // Fetch current schedule on mount
  useEffect(() => {
    if (!token) return;
    fetchSchedule(token).then(setScheduledInfo).catch(() => {});
  }, [token]);

  async function handleSchedule() {
    if (!token || !scheduleDateTime) return;
    setSchedulingInProgress(true);
    setMessage(null);
    try {
      const { geminiApiKey, geminiApiKeySet, id, updatedAt, scheduledAt, scheduledData, ...safe } =
        form as Form & Record<string, unknown>;
      void geminiApiKey; void geminiApiKeySet; void id; void updatedAt; void scheduledAt; void scheduledData;
      await setSchedule(token, safe as Record<string, unknown>, scheduleDateTime);
      const info = await fetchSchedule(token);
      setScheduledInfo(info);
      setMessage({ type: "ok", text: `Your current draft has been scheduled to go live on ${new Date(scheduleDateTime).toLocaleString()}.` });
      setScheduleDateTime("");
    } catch (err) {
      setMessage({ type: "err", text: (err as Error).message });
    } finally {
      setSchedulingInProgress(false);
    }
  }

  async function handleCancelSchedule() {
    if (!token) return;
    setSchedulingInProgress(true);
    setMessage(null);
    try {
      await cancelSchedule(token);
      setScheduledInfo({ scheduledAt: null });
      setMessage({ type: "ok", text: "Scheduled publish cancelled." });
    } catch (err) {
      setMessage({ type: "err", text: (err as Error).message });
    } finally {
      setSchedulingInProgress(false);
    }
  }

  // Min datetime-local value: 5 minutes from now
  const minScheduleDateTime = new Date(Date.now() + 5 * 60 * 1000).toISOString().slice(0, 16);

  // Undo / Redo history
  const historyRef = useRef<Form[]>([{}]);
  const historyIndexRef = useRef(0);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [showDiff, setShowDiff] = useState(false);

  function pushHistory(next: Form) {
    const trimmed = historyRef.current.slice(0, historyIndexRef.current + 1);
    trimmed.push(next);
    if (trimmed.length > 60) trimmed.shift(); else historyIndexRef.current += 1;
    historyRef.current = trimmed;
    setCanUndo(historyIndexRef.current > 0);
    setCanRedo(false);
  }

  function undo() {
    if (historyIndexRef.current <= 0) return;
    historyIndexRef.current -= 1;
    setForm(historyRef.current[historyIndexRef.current]);
    setCanUndo(historyIndexRef.current > 0);
    setCanRedo(true);
  }

  function redo() {
    if (historyIndexRef.current >= historyRef.current.length - 1) return;
    historyIndexRef.current += 1;
    setForm(historyRef.current[historyIndexRef.current]);
    setCanUndo(true);
    setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
  }

  useEffect(() => {
    if (config) {
      setForm(config);
      historyRef.current = [config as Form];
      historyIndexRef.current = 0;
      setCanUndo(false);
      setCanRedo(false);
      if (!collegeQuery) setCollegeQuery(config.collegeName || "");
    }
  }, [config]);

  // Keyboard shortcuts: Cmd/Ctrl+Z = undo, Cmd/Ctrl+Shift+Z or Ctrl+Y = redo
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!(e.metaKey || e.ctrlKey)) return;
      if (e.key === "z" && !e.shiftKey) { e.preventDefault(); undo(); }
      if (e.key === "z" && e.shiftKey)  { e.preventDefault(); redo(); }
      if (e.key === "y")                { e.preventDefault(); redo(); }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Auto-write preview draft to localStorage whenever form changes (debounced 700ms)
  useEffect(() => {
    if (draftTimerRef.current) clearTimeout(draftTimerRef.current);
    draftTimerRef.current = setTimeout(() => {
      const { geminiApiKeySet, ...safe } = form as Form & { geminiApiKeySet?: boolean };
      void geminiApiKeySet;
      const draft: Partial<SiteConfig> = { ...safe } as Partial<SiteConfig>;
      delete (draft as { geminiApiKey?: unknown }).geminiApiKey;
      writePreviewDraft(draft);
      if (previewOpen && autoRefresh) {
        setPreviewKey((k) => k + 1);
      }
    }, 700);
    return () => { if (draftTimerRef.current) clearTimeout(draftTimerRef.current); };
  }, [form, previewOpen, autoRefresh]);

  const refreshPreview = useCallback(() => setPreviewKey((k) => k + 1), []);

  function update<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      pushHistory(next);
      return next;
    });
  }

  async function handleSaveApiKey(verifyFirst: boolean) {
    if (!token || !apiKeyInput.trim()) return;
    setVerifyingKey(true);
    setMessage(null);
    try {
      if (verifyFirst) {
        const ok = await verifyApiKey(token, apiKeyInput.trim());
        if (!ok) {
          setMessage({ type: "err", text: "That key was rejected by Google. Double-check it and try again." });
          return;
        }
      }
      await updateSiteConfig(token, { geminiApiKey: apiKeyInput.trim() } as Partial<SiteConfig>);
      await refetch();
      setApiKeyInput("");
      setMessage({ type: "ok", text: "Gemini API key saved. You can now generate content." });
    } catch (err) {
      setMessage({ type: "err", text: (err as Error).message });
    } finally {
      setVerifyingKey(false);
    }
  }

  async function handleClearApiKey() {
    if (!token) return;
    if (!confirm("Remove the saved Gemini API key?")) return;
    setSaving(true);
    try {
      await updateSiteConfig(token, { geminiApiKey: "" } as unknown as Partial<SiteConfig>);
      await refetch();
      setMessage({ type: "ok", text: "API key removed." });
    } finally {
      setSaving(false);
    }
  }

  async function handleGenerate() {
    if (!token || !collegeQuery.trim()) return;
    setGenerating(true);
    setMessage(null);
    try {
      const data = await generateSiteContent(token, collegeQuery.trim(), hint.trim() || undefined);
      setForm((prev) => ({ ...prev, ...data }));
      setMessage({ type: "ok", text: "AI suggestions applied. Review, edit, then click Save." });
    } catch (err) {
      setMessage({ type: "err", text: (err as Error).message });
    } finally {
      setGenerating(false);
    }
  }

  async function handleGenerateSection(fields: (keyof SiteConfig)[], label: string) {
    if (!token) return;
    const keySet = config?.geminiApiKeySet === true;
    if (!keySet) {
      setMessage({ type: "err", text: "Add your Gemini API key first (top section)." });
      return;
    }
    if (!collegeQuery.trim()) {
      setMessage({ type: "err", text: "Set a college name in the AI College Builder first." });
      return;
    }
    const sectionKey = fields[0] as string;
    setGeneratingSection(sectionKey);
    setMessage(null);
    try {
      const data = await generateSiteContent(token, collegeQuery.trim(), `focus only on generating realistic data for: ${fields.join(", ")}`);
      setForm((prev) => {
        const updates: Form = { ...prev };
        for (const f of fields) {
          if ((data as Record<string, unknown>)[f as string] !== undefined) {
            (updates as Record<string, unknown>)[f as string] = (data as Record<string, unknown>)[f as string];
          }
        }
        return updates;
      });
      setMessage({ type: "ok", text: `AI filled "${label}". Review and save.` });
    } catch (err) {
      setMessage({ type: "err", text: (err as Error).message });
    } finally {
      setGeneratingSection(null);
    }
  }

  async function handleSave() {
    if (!token) return;
    setSaving(true);
    setMessage(null);
    try {
      const { geminiApiKeySet, ...safe } = form as Form & { geminiApiKeySet?: boolean };
      void geminiApiKeySet;
      const payload: Partial<SiteConfig> = { ...safe } as Partial<SiteConfig>;
      delete (payload as { geminiApiKey?: unknown }).geminiApiKey;
      await updateSiteConfig(token, payload);
      await refetch();
      setMessage({ type: "ok", text: "Saved! The website now reflects your changes." });
    } catch (err) {
      setMessage({ type: "err", text: (err as Error).message });
    } finally {
      setSaving(false);
    }
  }

  function handlePreview() {
    const { geminiApiKeySet, ...safe } = form as Form & { geminiApiKeySet?: boolean };
    void geminiApiKeySet;
    const draft: Partial<SiteConfig> = { ...safe } as Partial<SiteConfig>;
    delete (draft as { geminiApiKey?: unknown }).geminiApiKey;
    writePreviewDraft(draft);
    window.open(`${window.location.origin}/?aehPreview=1`, "_blank");
    setMessage({ type: "ok", text: "Preview opened in a new tab. Saved draft is valid for 30 minutes." });
  }

  async function handleImageGenerate() {
    if (!token || !imageGenField || !imagePrompt.trim()) return;
    setSaving(true);
    setMessage(null);
    try {
      const { dataUrl, field } = await generateSiteImage(
        token,
        imagePrompt.trim(),
        imageGenField as "logoUrl" | "heroImageUrl" | "principalPhotoUrl" | "chairmanPhotoUrl" | "faviconUrl",
      );
      update(field as keyof Form, dataUrl as Form[keyof Form]);
      setImageGenField(null);
      setImagePrompt("");
      setMessage({ type: "ok", text: "Image generated. Click Save to publish." });
    } catch (err) {
      setMessage({ type: "err", text: (err as Error).message });
    } finally {
      setSaving(false);
    }
  }

  const keySet = config?.geminiApiKeySet === true;

  const previewUrl = `/?aehPreview=1&_t=${previewKey}`;

  return (
    <div className={previewOpen ? "fixed inset-0 z-50 flex flex-col bg-background overflow-hidden" : "min-h-screen bg-background"}>
      <header className="text-white px-4 py-3 flex items-center justify-between shrink-0" style={{ backgroundColor: "var(--brand-primary)" }}>
        <div className="flex items-center gap-3">
          <GraduationCap className="h-6 w-6" style={{ color: "var(--brand-accent)" }} />
          <span className="font-bold">AEH Admin · Customize Site</span>
        </div>
        <div className="flex items-center gap-1.5">
          {/* Undo / Redo */}
          <button
            type="button"
            onClick={undo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <Undo2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={redo}
            disabled={!canRedo}
            title="Redo (Ctrl+Shift+Z)"
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <Redo2 className="h-4 w-4" />
          </button>
          <div className="w-px h-5 bg-white/20 mx-0.5" />
          {(() => {
            const changes = computeChanges(config ?? null, form);
            const count = changes.length;
            return (
              <button
                type="button"
                onClick={() => setShowDiff((p) => !p)}
                title="Compare unsaved changes vs saved"
                className={`inline-flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-lg transition ${showDiff ? "bg-white/20 text-white" : "bg-white/10 hover:bg-white/20 text-white/80 hover:text-white"}`}
              >
                <GitCompare className="h-4 w-4" />
                Changes
                {count > 0 && (
                  <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full text-[10px] font-bold bg-amber-400 text-amber-900 leading-none">
                    {count}
                  </span>
                )}
              </button>
            );
          })()}
          <div className="w-px h-5 bg-white/20 mx-0.5" />
          <button
            type="button"
            onClick={() => { setPreviewOpen((p) => !p); if (!previewOpen) refreshPreview(); }}
            className={`inline-flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-lg transition ${previewOpen ? "bg-white/20 text-white" : "bg-white/10 hover:bg-white/20 text-white/80 hover:text-white"}`}
          >
            {previewOpen ? <X className="h-4 w-4" /> : <Columns2 className="h-4 w-4" />}
            {previewOpen ? "Close Preview" : "Live Preview"}
          </button>
          <Link href="/admin" className="flex items-center gap-2 text-white/70 hover:text-white text-sm ml-1">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        </div>
      </header>

      {showDiff && (
        <ChangesPanel
          saved={config ?? null}
          current={form}
          onClose={() => setShowDiff(false)}
          onSave={handleSave}
          saving={saving}
        />
      )}

      <div className={previewOpen ? "flex flex-1 overflow-hidden" : ""}>
      {/* ===== FORM PANEL ===== */}
      <div className={previewOpen ? "w-[500px] shrink-0 flex flex-col overflow-hidden border-r border-border" : ""}>
      <main className={previewOpen ? "flex-1 overflow-y-auto px-4 py-6 space-y-6" : "max-w-5xl mx-auto px-4 py-8 space-y-6"}>
        {/* API Key */}
        <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Key className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-bold">Your Google Gemini API Key</h2>
            {keySet && <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full"><CheckCircle2 className="h-3 w-3" /> Saved</span>}
            {!keySet && <span className="inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full"><AlertCircle className="h-3 w-3" /> Not set</span>}
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            All AI features (content + image generation) use <strong>your own</strong> Gemini key. Get a free key at{" "}
            <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer" className="text-blue-600 inline-flex items-center gap-1 hover:underline">
              aistudio.google.com/apikey <ExternalLink className="h-3 w-3" />
            </a>.
          </p>
          <div className="flex gap-2">
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder={keySet ? "Enter a new key to replace the existing one" : "Paste your Gemini API key"}
              className="flex-1 border border-border rounded-lg px-3 py-2 text-sm font-mono"
            />
            <button
              onClick={() => handleSaveApiKey(true)}
              disabled={verifyingKey || !apiKeyInput.trim()}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-4 py-2 rounded-lg text-sm"
            >
              {verifyingKey ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Verify & Save
            </button>
            {keySet && (
              <button onClick={handleClearApiKey} className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-semibold">Remove</button>
            )}
          </div>
        </section>

        {/* AI generation card */}
        <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <h2 className="text-lg font-bold">AI College Builder</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Enter your college name below. AI fills everything — about, principal, stats, news, testimonials, facilities, contact. Review before saving. You can also use the <strong>Fill with AI</strong> button on each section to fill just that section.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={collegeQuery}
              onChange={(e) => setCollegeQuery(e.target.value)}
              placeholder="e.g. St. Joseph's College, Bangalore"
              className="border border-border rounded-lg px-3 py-2 text-sm w-full"
            />
            <input
              type="text"
              value={hint}
              onChange={(e) => setHint(e.target.value)}
              placeholder="Optional hint (e.g. engineering, arts, autonomous)"
              className="border border-border rounded-lg px-3 py-2 text-sm w-full"
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={generating || !collegeQuery.trim() || !keySet}
            title={!keySet ? "Add your Gemini API key first" : ""}
            className="mt-3 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-lg text-sm transition"
          >
            {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {generating ? "Generating..." : "Generate Full Site with AI"}
          </button>
        </section>

        {/* Backup & Restore */}
        <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <FileJson className="h-5 w-5 text-slate-500" />
            <h2 className="text-lg font-bold">Backup &amp; Restore</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Export your entire site configuration as a JSON file to back it up or copy it to another instance. Import a previously exported file to restore or clone settings.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-800 text-white font-semibold px-4 py-2 rounded-lg text-sm transition"
            >
              <Download className="h-4 w-4" />
              Export Config JSON
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 border border-slate-300 hover:border-slate-500 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2 rounded-lg text-sm transition"
            >
              <Upload className="h-4 w-4" />
              Import Config JSON
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            The export includes all content, colors, and layout settings — but never your Gemini API key. Import loads changes into the editor without saving automatically.
          </p>
        </section>

        {/* Schedule Go-Live */}
        <section className="bg-card border border-indigo-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <CalendarClock className="h-5 w-5 text-indigo-500" />
            <h2 className="text-lg font-bold">Schedule Go-Live</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Prepare your changes in the editor below, then pick a date and time for them to publish automatically — even if you're offline at that moment.
          </p>

          {/* Active schedule status */}
          {scheduledInfo?.scheduledAt && (
            <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-3 mb-4">
              <Clock className="h-4 w-4 text-indigo-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-indigo-800">Publish scheduled</p>
                <p className="text-xs text-indigo-600 mt-0.5">
                  {new Date(scheduledInfo.scheduledAt).toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCancelSchedule}
                disabled={schedulingInProgress}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-800 border border-red-200 hover:border-red-400 bg-white px-3 py-1.5 rounded-lg transition disabled:opacity-50"
              >
                {schedulingInProgress ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <X className="h-3.5 w-3.5" />}
                Cancel Schedule
              </button>
            </div>
          )}

          <div className="flex flex-wrap items-end gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-muted-foreground">Publish date &amp; time</label>
              <input
                type="datetime-local"
                value={scheduleDateTime}
                min={minScheduleDateTime}
                onChange={(e) => setScheduleDateTime(e.target.value)}
                className="border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <button
              type="button"
              onClick={handleSchedule}
              disabled={schedulingInProgress || !scheduleDateTime}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-lg text-sm transition"
            >
              {schedulingInProgress ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarClock className="h-4 w-4" />}
              {schedulingInProgress ? "Saving…" : "Schedule Go-Live"}
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            This schedules the <strong>current state of the editor</strong> (not yet saved changes). The server checks every minute and publishes automatically.
          </p>
        </section>

        {message && (
          <div className={`rounded-lg px-4 py-3 text-sm border ${message.type === "ok" ? "bg-green-50 border-green-300 text-green-800" : "bg-red-50 border-red-300 text-red-800"}`}>
            {message.text}
          </div>
        )}

        {/* Identity */}
        <Section title="Identity & Branding">
          <Field label="College Name" value={form.collegeName ?? ""} onChange={(v) => update("collegeName", v)} />
          <Field label="Short Name (acronym)" value={form.shortName ?? ""} onChange={(v) => update("shortName", v)} />
          <Field label="Tagline" value={form.tagline ?? ""} onChange={(v) => update("tagline", v)} />
          <Field label="Established Year" type="number" value={form.established?.toString() ?? ""} onChange={(v) => update("established", v ? Number(v) : null)} />
          <Field label="Accreditation" value={form.accreditation ?? ""} onChange={(v) => update("accreditation", v)} />
          <ColorField label="Primary Color" value={form.primaryColor ?? "#0a2540"} onChange={(v) => update("primaryColor", v)} />
          <ColorField label="Accent Color" value={form.accentColor ?? "#c9a227"} onChange={(v) => update("accentColor", v)} />
        </Section>

        {/* Color Palette Presets */}
        <Section title="Color Palette Presets" desc="One-click theme presets — applies to Navbar, Hero, Footer, Testimonials, Contact, Courses, all sections. Click any card.">
          <div className="sm:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {COLOR_PALETTES.map((p) => {
              const isActive = (form.primaryColor || "").toLowerCase() === p.primary.toLowerCase() && (form.accentColor || "").toLowerCase() === p.accent.toLowerCase();
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => { update("primaryColor", p.primary); update("accentColor", p.accent); }}
                  className={`text-left rounded-xl border-2 p-3 transition hover:scale-[1.02] ${isActive ? "border-blue-500 ring-2 ring-blue-200" : "border-border hover:border-gray-400"}`}
                >
                  <div className="flex gap-1 mb-2">
                    <div className="h-8 flex-1 rounded" style={{ backgroundColor: p.primary }} />
                    <div className="h-8 w-1/3 rounded" style={{ backgroundColor: p.accent }} />
                  </div>
                  <div className="text-xs font-semibold flex items-center gap-1">
                    {isActive && <CheckCircle2 className="h-3 w-3 text-blue-600" />}
                    {p.name}
                  </div>
                </button>
              );
            })}
          </div>
          <p className="sm:col-span-2 text-xs text-muted-foreground mt-1">
            After picking a palette, click <strong>Save Changes</strong> — the entire site (navbar, hero, footer, CTA buttons, section headings) will update instantly.
          </p>
        </Section>

        {/* Section Visibility */}
        <Section title="Home Page Section Visibility" desc="Show or hide each section on the home page.">
          <div className="sm:col-span-2 grid sm:grid-cols-2 gap-2">
            {([
              ["showTopBar", "Top Bar (phone/email above navbar)"],
              ["showMarquee", "Announcement Marquee"],
              ["showStats", "Hero Stats Counters"],
              ["showSchools", "Schools / Programs Grid"],
              ["showWhyUs", "Why Us / Highlights"],
              ["showLeadership", "Leadership Messages"],
              ["showTestimonials", "Student Testimonials"],
              ["showAchievements", "Achievements"],
              ["showNews", "News & Announcements"],
              ["showGallery", "Gallery"],
              ["showTeam", "Faculty / Team"],
              ["showApplyCta", "Apply Now CTA Banner"],
              ["showFacilities", "Facilities Section"],
            ] as const).map(([key, label]) => {
              const flags = form.featureFlags ?? {};
              const value = flags[key];
              const enabled = value === undefined ? true : !!value;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => update("featureFlags", { ...flags, [key]: !enabled })}
                  className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg border text-sm transition ${enabled ? "bg-green-50 border-green-300 text-green-800" : "bg-gray-50 border-gray-300 text-gray-500"}`}
                >
                  <span className="flex items-center gap-2">
                    {enabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    {label}
                  </span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${enabled ? "bg-green-200" : "bg-gray-200"}`}>
                    {enabled ? "ON" : "OFF"}
                  </span>
                </button>
              );
            })}
          </div>
        </Section>

        {/* Section Templates */}
        <Section title="Section Templates" desc="Pick a layout for each section. Each section has 5 visual templates — click any thumbnail to switch.">
          <div className="sm:col-span-2 space-y-5">
            {(Object.entries(SECTION_TEMPLATE_OPTIONS) as Array<[SectionTemplateKey, typeof SECTION_TEMPLATE_OPTIONS[SectionTemplateKey]]>).map(([sectionKey, options]) => {
              const flags = form.featureFlags ?? {};
              const tpls = flags.sectionTemplates ?? {};
              const current = tpls[sectionKey] || "default";
              const sectionLabel = ({
                hero: "Hero / Banner",
                stats: "Stats Counter Bar",
                schools: "Schools / Programs",
                achievements: "Achievements",
                whyUs: "Why Choose Us",
                testimonials: "Testimonials",
                news: "News & Updates",
                applyCta: "Apply CTA Banner",
                facilities: "Facilities",
              } as Record<SectionTemplateKey, string>)[sectionKey];
              return (
                <div key={sectionKey} className="border border-border rounded-xl p-3 bg-background">
                  <div className="flex items-center gap-2 mb-3">
                    <LayoutTemplate className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold text-sm">{sectionLabel}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{options.length} templates</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                    {options.map((opt) => {
                      const isActive = current === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => update("featureFlags", { ...flags, sectionTemplates: { ...tpls, [sectionKey]: opt.id } })}
                          className={`group relative text-left rounded-lg border-2 overflow-hidden transition ${isActive ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200 hover:border-gray-400"}`}
                        >
                          <div className="aspect-[12/7] bg-slate-50">
                            <TemplateThumb kind={opt.thumb} primary={form.primaryColor || "#0a2540"} accent={form.accentColor || "#c9a227"} />
                          </div>
                          <div className="px-2 py-1.5 bg-white">
                            <div className="flex items-center gap-1">
                              {isActive && <CheckCircle2 className="h-3 w-3 text-blue-600 shrink-0" />}
                              <span className="text-[11px] font-semibold leading-tight truncate">{opt.name}</span>
                            </div>
                            <div className="text-[10px] text-muted-foreground leading-tight truncate">{opt.desc}</div>
                          </div>
                          {isActive && <div className="absolute top-1 right-1 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">ACTIVE</div>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Top Bar */}
        <Section title="Top Bar (above navbar)" desc="The thin strip with phone, email and admission badge.">
          <Field label="Top Bar Phone" value={form.topBar?.phone ?? ""} onChange={(v) => update("topBar", { ...(form.topBar ?? {}), phone: v })} />
          <Field label="Top Bar Email" value={form.topBar?.email ?? ""} onChange={(v) => update("topBar", { ...(form.topBar ?? {}), email: v })} />
          <Field label="Admission Badge Text" value={form.topBar?.badge ?? ""} onChange={(v) => update("topBar", { ...(form.topBar ?? {}), badge: v })} />
          <Field label="Application Deadline" value={form.topBar?.deadline ?? ""} onChange={(v) => update("topBar", { ...(form.topBar ?? {}), deadline: v })} />
        </Section>

        {/* Navbar */}
        <Section title="Navbar Customization" desc="Add/remove/reorder menu items. Each item can have dropdown sub-links. Colors follow your Color Palette setting.">
          <div className="sm:col-span-2 mb-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
            <strong>Tip:</strong> Click <em>Load Default Menu</em> to pre-populate with the full default navigation (Home, About dropdown, Programs dropdown, Placements dropdown, News, Gallery, etc). Then hide, reorder or edit any item.
          </div>
          <NavbarItemsField
            items={form.navbar?.items ?? []}
            onChange={(items) => update("navbar", { ...(form.navbar ?? {}), items })}
          />
          <Field label="Apply Button Text" value={form.navbar?.applyButtonText ?? ""} onChange={(v) => update("navbar", { ...(form.navbar ?? {}), applyButtonText: v })} />
          <div className="sm:col-span-2 flex flex-wrap gap-2">
            <button type="button" onClick={() => update("navbar", { ...(form.navbar ?? {}), showApplyButton: !(form.navbar?.showApplyButton ?? true) })} className={`px-3 py-2 rounded-lg text-xs font-semibold border ${(form.navbar?.showApplyButton ?? true) ? "bg-green-50 border-green-300 text-green-700" : "bg-gray-50 border-gray-300 text-gray-500"}`}>
              {(form.navbar?.showApplyButton ?? true) ? <Eye className="h-3.5 w-3.5 inline mr-1" /> : <EyeOff className="h-3.5 w-3.5 inline mr-1" />} Apply Button
            </button>
            <button type="button" onClick={() => update("navbar", { ...(form.navbar ?? {}), showStudentLogin: !(form.navbar?.showStudentLogin ?? true) })} className={`px-3 py-2 rounded-lg text-xs font-semibold border ${(form.navbar?.showStudentLogin ?? true) ? "bg-green-50 border-green-300 text-green-700" : "bg-gray-50 border-gray-300 text-gray-500"}`}>
              {(form.navbar?.showStudentLogin ?? true) ? <Eye className="h-3.5 w-3.5 inline mr-1" /> : <EyeOff className="h-3.5 w-3.5 inline mr-1" />} Student Login Link
            </button>
            <button type="button" onClick={() => update("navbar", { ...(form.navbar ?? {}), items: defaultNavbarItems() })} className="px-3 py-2 rounded-lg text-xs font-semibold border border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100">
              <Palette className="h-3.5 w-3.5 inline mr-1" /> Load Default Menu
            </button>
            <button type="button" onClick={() => update("navbar", { ...(form.navbar ?? {}), items: [] })} className="px-3 py-2 rounded-lg text-xs font-semibold border border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100">
              <Trash2 className="h-3.5 w-3.5 inline mr-1" /> Clear All
            </button>
          </div>
        </Section>

        {/* Footer */}
        <Section title="Footer Customization" desc="Pick a layout, set the about text, choose link columns and the bottom-bar text.">
          <div className="sm:col-span-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Footer Template</span>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {FOOTER_TEMPLATE_OPTIONS.map((opt) => {
                const current = form.footer?.template || "default";
                const isActive = current === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => update("footer", { ...(form.footer ?? {}), template: opt.id })}
                    className={`relative text-left rounded-lg border-2 overflow-hidden transition ${isActive ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200 hover:border-gray-400"}`}
                  >
                    <div className="aspect-[12/7] bg-slate-50">
                      <TemplateThumb kind={opt.thumb} primary={form.primaryColor || "#0a2540"} accent={form.accentColor || "#c9a227"} />
                    </div>
                    <div className="px-2 py-1.5 bg-white">
                      <div className="flex items-center gap-1">
                        {isActive && <CheckCircle2 className="h-3 w-3 text-blue-600 shrink-0" />}
                        <span className="text-[11px] font-semibold leading-tight truncate">{opt.name}</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground leading-tight truncate">{opt.desc}</div>
                    </div>
                    {isActive && <div className="absolute top-1 right-1 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">ACTIVE</div>}
                  </button>
                );
              })}
            </div>
          </div>
          <Field label="Footer About Text" textarea value={form.footer?.aboutText ?? ""} onChange={(v) => update("footer", { ...(form.footer ?? {}), aboutText: v })} />
          <Field label="Bottom Copyright Text" value={form.footer?.bottomText ?? ""} onChange={(v) => update("footer", { ...(form.footer ?? {}), bottomText: v })} />
          <div className="sm:col-span-2 flex flex-wrap gap-2">
            <button type="button" onClick={() => update("footer", { ...(form.footer ?? {}), showSocial: !(form.footer?.showSocial ?? true) })} className={`px-3 py-2 rounded-lg text-xs font-semibold border ${(form.footer?.showSocial ?? true) ? "bg-green-50 border-green-300 text-green-700" : "bg-gray-50 border-gray-300 text-gray-500"}`}>
              {(form.footer?.showSocial ?? true) ? <Eye className="h-3.5 w-3.5 inline mr-1" /> : <EyeOff className="h-3.5 w-3.5 inline mr-1" />} Social Icons
            </button>
            <button type="button" onClick={() => update("footer", { ...(form.footer ?? {}), showApplyButton: !(form.footer?.showApplyButton ?? true) })} className={`px-3 py-2 rounded-lg text-xs font-semibold border ${(form.footer?.showApplyButton ?? true) ? "bg-green-50 border-green-300 text-green-700" : "bg-gray-50 border-gray-300 text-gray-500"}`}>
              {(form.footer?.showApplyButton ?? true) ? <Eye className="h-3.5 w-3.5 inline mr-1" /> : <EyeOff className="h-3.5 w-3.5 inline mr-1" />} "Apply Now" Button
            </button>
          </div>
          <FooterColumnsField columns={form.footer?.columns ?? []} onChange={(cols) => update("footer", { ...(form.footer ?? {}), columns: cols })} />
        </Section>

        {/* Images */}
        <Section title="Images">
          <MediaField label="Logo" value={form.logoUrl ?? ""} onChange={(v) => update("logoUrl", v)} onAiClick={() => { setImageGenField("logoUrl"); setImagePrompt(`Modern minimalist college logo for ${form.collegeName || "the college"}, clean vector style, blue and gold`); }} keySet={keySet} />
          <MediaField label="Hero Image" value={form.heroImageUrl ?? ""} onChange={(v) => update("heroImageUrl", v)} onAiClick={() => { setImageGenField("heroImageUrl"); setImagePrompt(`Beautiful college campus building photograph, students walking, sunny day, professional`); }} keySet={keySet} />
          <MediaField label="Favicon" value={form.faviconUrl ?? ""} onChange={(v) => update("faviconUrl", v)} onAiClick={() => { setImageGenField("faviconUrl"); setImagePrompt(`Simple square favicon icon for ${form.collegeName || "college"}, single letter monogram`); }} keySet={keySet} />
        </Section>

        {/* Hero */}
        <Section title="Hero Section">
          <Field label="Hero Title" value={form.heroTitle ?? ""} onChange={(v) => update("heroTitle", v)} />
          <Field label="Hero Subtitle" value={form.heroSubtitle ?? ""} onChange={(v) => update("heroSubtitle", v)} textarea />
        </Section>

        {/* Marquee */}
        <Section
          title="Top Announcement Marquee"
          desc="Lines that scroll across the top of the home page."
          aiButton={<AIFillButton loading={generatingSection === "marqueeItems"} keySet={keySet} onClick={() => handleGenerateSection(["marqueeItems"], "Marquee")} />}
        >
          <ListField items={form.marqueeItems ?? []} onChange={(items) => update("marqueeItems", items)} placeholder="e.g. Admissions Open 2026-27" />
        </Section>

        {/* Stats */}
        <Section
          title="Hero Stats"
          desc="Four counters shown on the home page."
          aiButton={<AIFillButton loading={generatingSection === "stats"} keySet={keySet} onClick={() => handleGenerateSection(["stats"], "Stats")} />}
        >
          <ObjectListField
            items={(form.stats ?? []) as Array<Record<string, string>>}
            onChange={(items) => update("stats", items as Array<{ label: string; value: string }>)}
            fields={[{ key: "label", placeholder: "Years of Excellence" }, { key: "value", placeholder: "12+" }]}
          />
        </Section>

        {/* Why Us */}
        <Section
          title="Why Us / Highlights"
          aiButton={<AIFillButton loading={generatingSection === "whyUs"} keySet={keySet} onClick={() => handleGenerateSection(["whyUs"], "Why Us")} />}
        >
          <ObjectListField
            items={(form.whyUs ?? []) as Array<Record<string, string>>}
            onChange={(items) => update("whyUs", items as Array<{ title: string; description: string }>)}
            fields={[{ key: "title", placeholder: "Industry-Ready Curriculum" }, { key: "description", placeholder: "Short description...", textarea: true }]}
          />
        </Section>

        {/* Contact */}
        <Section title="Contact Information">
          <Field label="Phone" value={form.phone ?? ""} onChange={(v) => update("phone", v)} />
          <Field label="Email" type="email" value={form.email ?? ""} onChange={(v) => update("email", v)} />
          <Field label="Address" value={form.address ?? ""} onChange={(v) => update("address", v)} />
          <Field label="City" value={form.city ?? ""} onChange={(v) => update("city", v)} />
          <Field label="State" value={form.state ?? ""} onChange={(v) => update("state", v)} />
          <Field label="Pincode" value={form.pincode ?? ""} onChange={(v) => update("pincode", v)} />
          <Field label="Office Hours" value={form.officeHours ?? ""} onChange={(v) => update("officeHours", v)} />
        </Section>

        {/* Leadership */}
        <Section title="Leadership Messages">
          <Field label="Principal Name" value={form.principalName ?? ""} onChange={(v) => update("principalName", v)} />
          <Field label="Principal Message" textarea value={form.principalMessage ?? ""} onChange={(v) => update("principalMessage", v)} />
          <MediaField label="Principal Photo" value={form.principalPhotoUrl ?? ""} onChange={(v) => update("principalPhotoUrl", v)} onAiClick={() => { setImageGenField("principalPhotoUrl"); setImagePrompt(`Professional portrait of an Indian college principal in formal attire, friendly smile, neutral background`); }} keySet={keySet} />
          <Field label="Chairman Name" value={form.chairmanName ?? ""} onChange={(v) => update("chairmanName", v)} />
          <Field label="Chairman Message" textarea value={form.chairmanMessage ?? ""} onChange={(v) => update("chairmanMessage", v)} />
          <MediaField label="Chairman Photo" value={form.chairmanPhotoUrl ?? ""} onChange={(v) => update("chairmanPhotoUrl", v)} onAiClick={() => { setImageGenField("chairmanPhotoUrl"); setImagePrompt(`Professional portrait of an Indian college chairman in formal suit, distinguished, neutral background`); }} keySet={keySet} />
        </Section>

        {/* About */}
        <Section title="About / Mission / Vision">
          <Field label="About Text" textarea value={form.aboutText ?? ""} onChange={(v) => update("aboutText", v)} />
          <Field label="Mission" textarea value={form.missionText ?? ""} onChange={(v) => update("missionText", v)} />
          <Field label="Vision" textarea value={form.visionText ?? ""} onChange={(v) => update("visionText", v)} />
        </Section>

        {/* Facilities */}
        <Section
          title="Facilities"
          aiButton={<AIFillButton loading={generatingSection === "facilities"} keySet={keySet} onClick={() => handleGenerateSection(["facilities"], "Facilities")} />}
        >
          <ListField items={form.facilities ?? []} onChange={(items) => update("facilities", items)} placeholder="e.g. Smart Classrooms" />
        </Section>

        {/* Achievements */}
        <Section
          title="Achievements"
          aiButton={<AIFillButton loading={generatingSection === "achievements"} keySet={keySet} onClick={() => handleGenerateSection(["achievements"], "Achievements")} />}
        >
          <ListField items={form.achievements ?? []} onChange={(items) => update("achievements", items)} placeholder="e.g. NAAC A+ accredited" />
        </Section>

        {/* Testimonials */}
        <Section
          title="Student Testimonials"
          desc="Real student stories shown on the home page. Each entry supports a photo upload."
          aiButton={<AIFillButton loading={generatingSection === "testimonials"} keySet={keySet} onClick={() => handleGenerateSection(["testimonials"], "Testimonials")} />}
        >
          <ObjectListField
            items={((form.testimonials ?? []) as unknown) as Array<Record<string, string>>}
            onChange={(items) => update("testimonials", (items as unknown) as SiteConfig["testimonials"])}
            fields={[
              { key: "name", placeholder: "Priya Sharma" },
              { key: "course", placeholder: "MBA 2024 Graduate" },
              { key: "company", placeholder: "HDFC Bank — Branch Manager" },
              { key: "text", placeholder: "What this student says…", textarea: true },
              { key: "photoUrl", placeholder: "Student Photo", label: "Student Photo", image: true },
            ]}
          />
        </Section>

        {/* News & Announcements */}
        <Section
          title="News & Announcements"
          desc="Static news items shown on the home page News section. (Different from 'Upcoming Events' which shows live dynamically.)"
          aiButton={<AIFillButton loading={generatingSection === "newsItems"} keySet={keySet} onClick={() => handleGenerateSection(["newsItems"], "News Items")} />}
        >
          <ObjectListField
            items={(form.newsItems ?? []) as Array<Record<string, string>>}
            onChange={(items) => update("newsItems", items as Array<{ title: string; date: string; category: string }>)}
            fields={[
              { key: "title", placeholder: "AEH Students Win State-Level Business Competition" },
              { key: "date", placeholder: "April 10, 2026" },
              { key: "category", placeholder: "Achievement" },
              { key: "summary", placeholder: "Short summary…", textarea: true },
              { key: "imageUrl", placeholder: "News Image", label: "News Image", image: true },
            ]}
          />
        </Section>

        {/* Faculty / Team */}
        <Section title="Faculty / Team (Departments)">
          <DepartmentField items={form.team ?? []} onChange={(items) => update("team", items)} />
        </Section>

        {/* Gallery */}
        <Section title="Gallery">
          <GallerySectionField items={form.gallery ?? []} onChange={(items) => update("gallery", items)} />
        </Section>

        {/* Save bar */}
        <div className="sticky bottom-4 bg-white border-2 border-border shadow-lg rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm text-muted-foreground">Changes are not live until you save. Use Preview to test first.</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handlePreview}
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-brand-primary border-2 border-brand-primary font-semibold px-5 py-2.5 rounded-lg text-sm"
            >
              <Eye className="h-4 w-4" />
              Preview Changes
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-lg text-sm"
              style={{ backgroundColor: "var(--brand-primary)" }}
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </main>
      </div>{/* /form panel */}

      {/* ===== PREVIEW PANEL ===== */}
      {previewOpen && (
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-100 min-w-0">
          {/* Preview toolbar */}
          <div className="bg-white border-b border-border px-3 py-2 flex items-center gap-2 shrink-0 flex-wrap">
            <PanelRightOpen className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">Live Preview</span>
            <span className="text-xs text-muted-foreground bg-amber-50 border border-amber-200 rounded px-2 py-0.5">
              Auto-updates every edit • Unsaved changes
            </span>
            <div className="flex items-center gap-1 ml-auto">
              <button
                type="button"
                onClick={() => setPreviewDevice("desktop")}
                title="Desktop view"
                className={`p-1.5 rounded ${previewDevice === "desktop" ? "bg-brand-primary text-white" : "text-muted-foreground hover:bg-gray-100"}`}
              >
                <Monitor className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice("mobile")}
                title="Mobile view"
                className={`p-1.5 rounded ${previewDevice === "mobile" ? "bg-brand-primary text-white" : "text-muted-foreground hover:bg-gray-100"}`}
              >
                <Smartphone className="h-4 w-4" />
              </button>
              <div className="w-px h-5 bg-border mx-1" />
              <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="rounded"
                />
                Auto-refresh
              </label>
              <button
                type="button"
                onClick={refreshPreview}
                title="Refresh preview"
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50 ml-1"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Refresh
              </button>
              <a
                href={`/?aehPreview=1`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-100"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Open
              </a>
            </div>
          </div>
          {/* Iframe container */}
          <div className="flex-1 overflow-auto flex items-start justify-center p-4">
            <div
              className={`bg-white shadow-xl rounded-lg overflow-hidden transition-all ${previewDevice === "mobile" ? "w-[390px]" : "w-full max-w-[1280px]"}`}
              style={{ height: "calc(100vh - 110px)" }}
            >
              <iframe
                ref={iframeRef}
                key={previewKey}
                src={previewUrl}
                className="w-full h-full border-0"
                title="Live Preview"
              />
            </div>
          </div>
        </div>
      )}
      </div>{/* /flex container */}

      {imageGenField && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4" onClick={() => setImageGenField(null)}>
          <div className="bg-white rounded-xl p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <ImageIcon className="h-5 w-5" /> Generate Image with AI
            </h3>
            <p className="text-sm text-muted-foreground mb-3">Describe the image you want. AI will create it.</p>
            <textarea
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              rows={4}
              className="w-full border border-border rounded-lg p-2 text-sm"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setImageGenField(null)} className="px-4 py-2 text-sm border border-border rounded-lg">Cancel</button>
              <button
                onClick={handleImageGenerate}
                disabled={saving || !imagePrompt.trim()}
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white px-5 py-2 rounded-lg text-sm font-semibold"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                Generate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input for JSON import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        className="hidden"
        onChange={handleImportFile}
      />
    </div>
  );
}

function AIFillButton({ loading, keySet, onClick }: { loading: boolean; keySet: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading || !keySet}
      title={!keySet ? "Add your Gemini API key first" : "Fill this section with AI-generated content"}
      className="inline-flex items-center gap-1 text-xs text-amber-600 hover:text-amber-800 font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
      {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
      {loading ? "Generating..." : "Fill with AI"}
    </button>
  );
}

function Section({ title, desc, children, aiButton }: { title: string; desc?: string; children: React.ReactNode; aiButton?: React.ReactNode }) {
  return (
    <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <div className="flex items-start justify-between gap-2 mb-1">
        <h2 className="text-lg font-bold">{title}</h2>
        {aiButton}
      </div>
      {desc && <p className="text-sm text-muted-foreground mb-3">{desc}</p>}
      <div className="grid sm:grid-cols-2 gap-4 mt-3">{children}</div>
    </section>
  );
}

function Field({
  label, value, onChange, type = "text", textarea = false,
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string; textarea?: boolean;
}) {
  return (
    <label className={`block ${textarea ? "sm:col-span-2" : ""}`}>
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</span>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className="mt-1 w-full border border-border rounded-lg px-3 py-2 text-sm" />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full border border-border rounded-lg px-3 py-2 text-sm" />
      )}
    </label>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</span>
      <div className="mt-1 flex gap-2 items-center">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="h-10 w-14 rounded border border-border" />
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 border border-border rounded-lg px-3 py-2 text-sm font-mono" />
      </div>
    </label>
  );
}

function defaultNavbarItems() {
  return [
    { label: "Home", href: "/", visible: true },
    {
      label: "About", href: "/about", visible: true,
      children: [
        { label: "About AEH", href: "/about" },
        { label: "Core Values", href: "/core-values" },
        { label: "Our Leadership", href: "/leadership" },
        { label: "Academic Council", href: "/academic-council" },
        { label: "Our Team", href: "/team" },
      ],
    },
    {
      label: "Programs", href: "#", visible: true,
      children: [
        { label: "School of Management", href: "/school-of-management", sub: "BBA, MBA" },
        { label: "School of CS & IT", href: "/school-of-cs-it", sub: "BCA, MCA" },
        { label: "School of Commerce", href: "/school-of-commerce", sub: "B.Com, M.Com" },
        { label: "School of Humanities", href: "/school-of-humanities", sub: "BA, MA" },
        { label: "School of Communication", href: "/school-of-communication", sub: "BJMC, MJMC" },
        { label: "School of Law", href: "/school-of-law", sub: "BA LL.B, LL.M" },
        { label: "School of Pharmacy", href: "/school-of-pharmacy", sub: "B.Pharm, D.Pharm" },
        { label: "School of Education", href: "/school-of-education", sub: "B.Ed, M.Ed" },
        { label: "School of Applied Science", href: "/school-of-applied-science", sub: "B.Sc, M.Sc" },
      ],
    },
    { label: "Infrastructure", href: "/infrastructure", visible: true },
    {
      label: "Placements", href: "/placements", visible: true,
      children: [
        { label: "Our Placements", href: "/placements" },
        { label: "Top Recruiters", href: "/top-recruiters" },
      ],
    },
    { label: "News", href: "/news", visible: true },
    { label: "Gallery", href: "/gallery", visible: true },
    { label: "Careers", href: "/careers", visible: true },
    { label: "Contact", href: "/contact", visible: true },
  ];
}

type NavItem = { label: string; href: string; visible?: boolean; children?: Array<{ label: string; href: string; sub?: string }> };

function NavbarItemsField({ items, onChange }: { items: NavItem[]; onChange: (items: NavItem[]) => void }) {
  const [expandedChildren, setExpandedChildren] = useState<Set<number>>(new Set());

  const move = (idx: number, dir: -1 | 1) => {
    const next = [...items];
    const j = idx + dir;
    if (j < 0 || j >= next.length) return;
    [next[idx], next[j]] = [next[j], next[idx]];
    onChange(next);
  };

  const toggleExpand = (idx: number) => {
    setExpandedChildren(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
  };

  return (
    <div className="sm:col-span-2 space-y-2">
      {items.length === 0 && (
        <p className="text-sm text-muted-foreground italic">No custom items yet. Click <strong>Load Default Menu</strong> to start with the full default navigation including dropdowns.</p>
      )}
      {items.map((it, idx) => {
        const visible = it.visible !== false;
        const hasChildren = (it.children || []).length > 0;
        const expanded = expandedChildren.has(idx);
        return (
          <div key={idx} className="border border-border rounded-lg bg-background overflow-hidden">
            <div className="flex flex-wrap gap-2 items-center p-2">
              <button type="button" onClick={() => move(idx, -1)} disabled={idx === 0} className="p-1 text-gray-500 hover:text-blue-600 disabled:opacity-30"><ArrowUp className="h-4 w-4" /></button>
              <button type="button" onClick={() => move(idx, 1)} disabled={idx === items.length - 1} className="p-1 text-gray-500 hover:text-blue-600 disabled:opacity-30"><ArrowDown className="h-4 w-4" /></button>
              <input
                type="text"
                value={it.label}
                onChange={(e) => { const next = [...items]; next[idx] = { ...next[idx], label: e.target.value }; onChange(next); }}
                placeholder="Label (e.g. About)"
                className="flex-1 min-w-[100px] border border-border rounded px-2 py-1.5 text-sm"
              />
              <input
                type="text"
                value={it.href}
                onChange={(e) => { const next = [...items]; next[idx] = { ...next[idx], href: e.target.value }; onChange(next); }}
                placeholder="/about or #"
                className="flex-1 min-w-[100px] border border-border rounded px-2 py-1.5 text-sm font-mono text-xs"
              />
              <button
                type="button"
                onClick={() => toggleExpand(idx)}
                title={`${hasChildren ? `${it.children!.length} dropdown items` : "No dropdown"} — click to ${expanded ? "collapse" : "edit dropdown"}`}
                className={`px-2 py-1.5 rounded border text-xs font-semibold flex items-center gap-1 ${hasChildren ? "bg-blue-50 border-blue-300 text-blue-700" : "bg-gray-50 border-gray-300 text-gray-500"}`}
              >
                {expanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                {hasChildren ? `▾ ${it.children!.length}` : "▾ Dropdown"}
              </button>
              <button type="button" onClick={() => { const next = [...items]; next[idx] = { ...next[idx], visible: !visible }; onChange(next); }} className={`px-2 py-1.5 rounded border text-xs font-semibold ${visible ? "bg-green-50 border-green-300 text-green-700" : "bg-gray-100 border-gray-300 text-gray-500"}`}>
                {visible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
              </button>
              <button type="button" onClick={() => onChange(items.filter((_, i) => i !== idx))} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 className="h-4 w-4" /></button>
            </div>

            {expanded && (
              <div className="border-t border-dashed border-gray-200 bg-blue-50/50 p-2 space-y-1.5">
                <div className="text-xs font-semibold text-blue-700 mb-1">Dropdown sub-items for "{it.label}"</div>
                {(it.children || []).map((child, cIdx) => (
                  <div key={cIdx} className="flex gap-2 items-center pl-2">
                    <input
                      type="text"
                      value={child.label}
                      onChange={(e) => {
                        const next = [...items];
                        const children = [...(next[idx].children || [])];
                        children[cIdx] = { ...children[cIdx], label: e.target.value };
                        next[idx] = { ...next[idx], children };
                        onChange(next);
                      }}
                      placeholder="Sub-link label"
                      className="flex-1 border border-border rounded px-2 py-1 text-sm"
                    />
                    <input
                      type="text"
                      value={child.href}
                      onChange={(e) => {
                        const next = [...items];
                        const children = [...(next[idx].children || [])];
                        children[cIdx] = { ...children[cIdx], href: e.target.value };
                        next[idx] = { ...next[idx], children };
                        onChange(next);
                      }}
                      placeholder="/path"
                      className="flex-1 border border-border rounded px-2 py-1 text-sm font-mono text-xs"
                    />
                    <input
                      type="text"
                      value={child.sub || ""}
                      onChange={(e) => {
                        const next = [...items];
                        const children = [...(next[idx].children || [])];
                        children[cIdx] = { ...children[cIdx], sub: e.target.value };
                        next[idx] = { ...next[idx], children };
                        onChange(next);
                      }}
                      placeholder="subtitle (optional)"
                      className="w-28 border border-border rounded px-2 py-1 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const next = [...items];
                        next[idx] = { ...next[idx], children: (it.children || []).filter((_, i) => i !== cIdx) };
                        onChange(next);
                      }}
                      className="text-red-600 hover:bg-red-50 p-1 rounded"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const next = [...items];
                    next[idx] = { ...next[idx], children: [...(it.children || []), { label: "", href: "/" }] };
                    onChange(next);
                  }}
                  className="text-xs text-blue-600 font-semibold inline-flex items-center gap-1 pl-2"
                >
                  <Plus className="h-3.5 w-3.5" /> Add sub-link
                </button>
              </div>
            )}
          </div>
        );
      })}
      <button type="button" onClick={() => onChange([...items, { label: "", href: "/", visible: true }])} className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-semibold">
        <Plus className="h-4 w-4" /> Add menu item
      </button>
    </div>
  );
}

function ListField({ items, onChange, placeholder }: { items: string[]; onChange: (items: string[]) => void; placeholder: string }) {
  return (
    <div className="sm:col-span-2 space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-2">
          <input type="text" value={item} onChange={(e) => { const next = [...items]; next[idx] = e.target.value; onChange(next); }} placeholder={placeholder} className="flex-1 border border-border rounded-lg px-3 py-2 text-sm" />
          <button type="button" onClick={() => onChange(items.filter((_, i) => i !== idx))} className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="h-4 w-4" /></button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, ""])} className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-semibold"><Plus className="h-4 w-4" /> Add item</button>
    </div>
  );
}

type ObjectFieldDef = { key: string; placeholder: string; textarea?: boolean; image?: boolean; label?: string };

function ObjectListField({
  items, onChange, fields,
}: {
  items: Array<Record<string, string>>;
  onChange: (items: Array<Record<string, string>>) => void;
  fields: Array<ObjectFieldDef>;
}) {
  return (
    <div className="sm:col-span-2 space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="border border-border rounded-lg p-3 space-y-2 bg-background">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-muted-foreground">Item {idx + 1}</span>
            <button type="button" onClick={() => onChange(items.filter((_, i) => i !== idx))} className="text-red-600 hover:bg-red-50 p-1 rounded"><Trash2 className="h-4 w-4" /></button>
          </div>
          {fields.map((f) => (
            f.image ? (
              <MediaField
                key={f.key}
                label={f.label || f.placeholder}
                value={item[f.key] ?? ""}
                onChange={(v) => { const next = [...items]; next[idx] = { ...next[idx], [f.key]: v }; onChange(next); }}
                compact
              />
            ) : f.textarea ? (
              <textarea key={f.key} value={item[f.key] ?? ""} onChange={(e) => { const next = [...items]; next[idx] = { ...next[idx], [f.key]: e.target.value }; onChange(next); }} rows={2} placeholder={f.placeholder} className="w-full border border-border rounded px-2 py-1.5 text-sm" />
            ) : (
              <input key={f.key} type="text" value={item[f.key] ?? ""} onChange={(e) => { const next = [...items]; next[idx] = { ...next[idx], [f.key]: e.target.value }; onChange(next); }} placeholder={f.placeholder} className="w-full border border-border rounded px-2 py-1.5 text-sm" />
            )
          ))}
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, fields.reduce((a, f) => ({ ...a, [f.key]: "" }), {} as Record<string, string>)])} className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-semibold"><Plus className="h-4 w-4" /> Add item</button>
    </div>
  );
}

function DepartmentField({ items, onChange }: {
  items: Array<{ department: string; members: Array<{ name: string; title: string; photoUrl?: string }> }>;
  onChange: (items: Array<{ department: string; members: Array<{ name: string; title: string; photoUrl?: string }> }>) => void;
}) {
  return (
    <div className="sm:col-span-2 space-y-4">
      {items.map((dept, dIdx) => (
        <div key={dIdx} className="border border-border rounded-lg p-3 bg-background space-y-3">
          <div className="flex gap-2 items-center">
            <input type="text" value={dept.department} onChange={(e) => { const next = [...items]; next[dIdx] = { ...next[dIdx], department: e.target.value }; onChange(next); }} placeholder="Department name (e.g. School of Management)" className="flex-1 border border-border rounded px-2 py-1.5 text-sm font-semibold" />
            <button type="button" onClick={() => onChange(items.filter((_, i) => i !== dIdx))} className="text-red-600 hover:bg-red-50 p-1 rounded" title="Delete department"><Trash2 className="h-4 w-4" /></button>
          </div>
          {dept.members.map((m, mIdx) => (
            <div key={mIdx} className="border border-dashed border-gray-300 rounded p-2 space-y-2 bg-white">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Member {mIdx + 1}</span>
                <button type="button" onClick={() => { const next = [...items]; next[dIdx] = { ...next[dIdx], members: dept.members.filter((_, i) => i !== mIdx) }; onChange(next); }} className="text-red-600 hover:bg-red-50 p-1 rounded"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
              <div className="flex gap-2">
                <input type="text" value={m.name} onChange={(e) => { const next = [...items]; const members = [...next[dIdx].members]; members[mIdx] = { ...members[mIdx], name: e.target.value }; next[dIdx] = { ...next[dIdx], members }; onChange(next); }} placeholder="Name" className="flex-1 border border-border rounded px-2 py-1 text-sm" />
                <input type="text" value={m.title} onChange={(e) => { const next = [...items]; const members = [...next[dIdx].members]; members[mIdx] = { ...members[mIdx], title: e.target.value }; next[dIdx] = { ...next[dIdx], members }; onChange(next); }} placeholder="Title (e.g. HOD, Asst. Prof)" className="flex-1 border border-border rounded px-2 py-1 text-sm" />
              </div>
              <MediaField label="Faculty Photo" value={m.photoUrl ?? ""} onChange={(v) => { const next = [...items]; const members = [...next[dIdx].members]; members[mIdx] = { ...members[mIdx], photoUrl: v }; next[dIdx] = { ...next[dIdx], members }; onChange(next); }} compact />
            </div>
          ))}
          <button type="button" onClick={() => { const next = [...items]; next[dIdx] = { ...next[dIdx], members: [...dept.members, { name: "", title: "", photoUrl: "" }] }; onChange(next); }} className="text-xs text-blue-600 font-semibold inline-flex items-center gap-1"><Plus className="h-3.5 w-3.5" /> Add faculty member</button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, { department: "", members: [] }])} className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-semibold"><Plus className="h-4 w-4" /> Add department</button>
    </div>
  );
}

function FooterColumnsField({ columns, onChange }: {
  columns: Array<{ heading: string; links: Array<{ label: string; href: string }> }>;
  onChange: (cols: Array<{ heading: string; links: Array<{ label: string; href: string }> }>) => void;
}) {
  return (
    <div className="sm:col-span-2 space-y-3">
      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Link Columns (leave empty to use defaults)</div>
      {columns.map((col, cIdx) => (
        <div key={cIdx} className="border border-border rounded-lg p-3 bg-background space-y-2">
          <div className="flex gap-2 items-center">
            <input type="text" value={col.heading} onChange={(e) => { const next = [...columns]; next[cIdx] = { ...next[cIdx], heading: e.target.value }; onChange(next); }} placeholder="Column heading (e.g. Quick Links)" className="flex-1 border border-border rounded px-2 py-1.5 text-sm font-semibold" />
            <button type="button" onClick={() => onChange(columns.filter((_, i) => i !== cIdx))} className="text-red-600 hover:bg-red-50 p-1 rounded"><Trash2 className="h-4 w-4" /></button>
          </div>
          {col.links.map((l, lIdx) => (
            <div key={lIdx} className="flex gap-2 pl-2">
              <input type="text" value={l.label} onChange={(e) => { const next = [...columns]; const links = [...next[cIdx].links]; links[lIdx] = { ...links[lIdx], label: e.target.value }; next[cIdx] = { ...next[cIdx], links }; onChange(next); }} placeholder="Label" className="flex-1 border border-border rounded px-2 py-1 text-sm" />
              <input type="text" value={l.href} onChange={(e) => { const next = [...columns]; const links = [...next[cIdx].links]; links[lIdx] = { ...links[lIdx], href: e.target.value }; next[cIdx] = { ...next[cIdx], links }; onChange(next); }} placeholder="/path" className="flex-1 border border-border rounded px-2 py-1 text-sm font-mono text-xs" />
              <button type="button" onClick={() => { const next = [...columns]; next[cIdx] = { ...next[cIdx], links: col.links.filter((_, i) => i !== lIdx) }; onChange(next); }} className="text-red-600 hover:bg-red-50 p-1 rounded"><Trash2 className="h-3.5 w-3.5" /></button>
            </div>
          ))}
          <button type="button" onClick={() => { const next = [...columns]; next[cIdx] = { ...next[cIdx], links: [...col.links, { label: "", href: "/" }] }; onChange(next); }} className="text-xs text-blue-600 font-semibold inline-flex items-center gap-1 ml-2"><Plus className="h-3.5 w-3.5" /> Add link</button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...columns, { heading: "", links: [] }])} className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-semibold"><Plus className="h-4 w-4" /> Add column</button>
    </div>
  );
}

// ─────────────────────────────────────────────
// Diff utilities + ChangesPanel
// ─────────────────────────────────────────────

const FIELD_META: Record<string, { label: string; section: string }> = {
  collegeName:        { label: "College Name",          section: "Identity" },
  shortName:          { label: "Short Name",            section: "Identity" },
  tagline:            { label: "Tagline",               section: "Identity" },
  established:        { label: "Established Year",      section: "Identity" },
  accreditation:      { label: "Accreditation",         section: "Identity" },
  primaryColor:       { label: "Primary Color",         section: "Identity" },
  accentColor:        { label: "Accent Color",          section: "Identity" },
  logoUrl:            { label: "Logo",                  section: "Media" },
  faviconUrl:         { label: "Favicon",               section: "Media" },
  heroTitle:          { label: "Hero Title",            section: "Hero" },
  heroSubtitle:       { label: "Hero Subtitle",         section: "Hero" },
  heroImageUrl:       { label: "Hero Image",            section: "Hero" },
  phone:              { label: "Phone",                 section: "Contact" },
  email:              { label: "Email",                 section: "Contact" },
  address:            { label: "Address",               section: "Contact" },
  city:               { label: "City",                  section: "Contact" },
  state:              { label: "State",                 section: "Contact" },
  pincode:            { label: "Pincode",               section: "Contact" },
  principalName:      { label: "Principal Name",        section: "Leadership" },
  principalMessage:   { label: "Principal Message",     section: "Leadership" },
  principalPhotoUrl:  { label: "Principal Photo",       section: "Leadership" },
  chairmanName:       { label: "Chairman Name",         section: "Leadership" },
  chairmanMessage:    { label: "Chairman Message",      section: "Leadership" },
  chairmanPhotoUrl:   { label: "Chairman Photo",        section: "Leadership" },
  directorName:       { label: "Director Name",         section: "Leadership" },
  directorMessage:    { label: "Director Message",      section: "Leadership" },
  directorPhotoUrl:   { label: "Director Photo",        section: "Leadership" },
  aboutText:          { label: "About Text",            section: "About" },
  missionText:        { label: "Mission",               section: "About" },
  visionText:         { label: "Vision",                section: "About" },
  marqueeItems:       { label: "Marquee Announcements", section: "Home Content" },
  stats:              { label: "Hero Stats",            section: "Home Content" },
  whyUs:              { label: "Why Us Highlights",     section: "Home Content" },
  testimonials:       { label: "Testimonials",          section: "Home Content" },
  newsItems:          { label: "News Items",            section: "Home Content" },
  facilities:         { label: "Facilities",            section: "Home Content" },
  achievements:       { label: "Achievements",          section: "Home Content" },
  schools:            { label: "Schools",               section: "Schools" },
  team:               { label: "Faculty Teams",         section: "Team" },
  gallery:            { label: "Gallery",               section: "Gallery" },
  socialLinks:        { label: "Social Links",          section: "Social" },
  featureFlags:       { label: "Feature Flags",         section: "Settings" },
  navbar:             { label: "Navbar",                section: "Settings" },
  topBar:             { label: "Top Bar",               section: "Settings" },
  footer:             { label: "Footer",                section: "Footer" },
  testimonialsLayout: { label: "Testimonials Layout",   section: "Settings" },
};

const SKIP_KEYS = new Set(["id", "updatedAt", "geminiApiKey", "geminiApiKeySet"]);

function fmtVal(v: unknown): string {
  if (v === null || v === undefined || v === "") return "—";
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (typeof v === "number") return String(v);
  if (typeof v === "string") {
    if (v.startsWith("data:image/")) return "(uploaded image)";
    if (v.length > 80) return v.slice(0, 77) + "…";
    return v;
  }
  if (Array.isArray(v)) {
    if (v.length === 0) return "(empty list)";
    return `${v.length} item${v.length === 1 ? "" : "s"}`;
  }
  if (typeof v === "object" && v !== null) {
    const keys = Object.keys(v).filter(k => {
      const val = (v as Record<string, unknown>)[k];
      return val !== null && val !== undefined && val !== "" && !(Array.isArray(val) && val.length === 0);
    });
    if (keys.length === 0) return "—";
    return `{ ${keys.slice(0, 4).join(", ")}${keys.length > 4 ? ", …" : ""} }`;
  }
  return String(v);
}

function valsEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  const aN = a === null || a === undefined;
  const bN = b === null || b === undefined;
  if (aN && bN) return true;
  if (aN !== bN) {
    const other = aN ? b : a;
    if (other === "" || (Array.isArray(other) && other.length === 0)) return true;
    return false;
  }
  try { return JSON.stringify(a) === JSON.stringify(b); } catch { return false; }
}

interface FieldChange {
  key: string;
  label: string;
  section: string;
  before: string;
  after: string;
}

function computeChanges(saved: Partial<SiteConfig> | null, current: Form): FieldChange[] {
  const changes: FieldChange[] = [];
  const allKeys = new Set([
    ...Object.keys(saved ?? {}),
    ...Object.keys(current),
  ]);
  for (const key of allKeys) {
    if (SKIP_KEYS.has(key)) continue;
    const meta = FIELD_META[key];
    if (!meta) continue;
    const before = (saved as Record<string, unknown> | null)?.[key] ?? null;
    const after  = (current as Record<string, unknown>)[key] ?? null;
    if (!valsEqual(before, after)) {
      changes.push({
        key,
        label: meta.label,
        section: meta.section,
        before: fmtVal(before),
        after:  fmtVal(after),
      });
    }
  }
  return changes;
}

function ChangesPanel({
  saved, current, onClose, onSave, saving,
}: {
  saved: Partial<SiteConfig> | null;
  current: Form;
  onClose: () => void;
  onSave: () => void;
  saving: boolean;
}) {
  const changes = computeChanges(saved, current);

  const bySection: Record<string, FieldChange[]> = {};
  for (const c of changes) {
    (bySection[c.section] ??= []).push(c);
  }

  return (
    <div className="fixed inset-0 z-[60] flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="w-full max-w-lg bg-white shadow-2xl flex flex-col border-l border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50 shrink-0">
          <div className="flex items-center gap-2.5">
            <GitCompare className="h-5 w-5 text-indigo-600" />
            <div>
              <h2 className="font-bold text-gray-900 text-sm leading-none mb-0.5">Unsaved Changes</h2>
              <p className="text-xs text-gray-500">
                {changes.length === 0
                  ? "No changes — everything is up to date."
                  : `${changes.length} field${changes.length === 1 ? "" : "s"} changed since last save`}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
          {changes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <CheckCircle2 className="h-12 w-12 text-green-400 mb-3" />
              <p className="font-semibold text-gray-700">All changes are saved</p>
              <p className="text-sm text-gray-400 mt-1">Your website is up to date.</p>
            </div>
          ) : (
            Object.entries(bySection).map(([section, fields]) => (
              <div key={section}>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">{section}</div>
                <div className="space-y-2">
                  {fields.map((c) => (
                    <div key={c.key} className="rounded-xl border border-gray-200 overflow-hidden text-xs">
                      <div className="px-3 py-1.5 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700">{c.label}</div>
                      <div className="grid grid-cols-2 divide-x divide-gray-200">
                        <div className="px-3 py-2 bg-red-50">
                          <div className="text-[9px] font-bold text-red-400 uppercase tracking-wide mb-1">Before</div>
                          <div className="text-gray-700 break-words leading-relaxed">{c.before}</div>
                        </div>
                        <div className="px-3 py-2 bg-green-50">
                          <div className="text-[9px] font-bold text-green-500 uppercase tracking-wide mb-1">After</div>
                          <div className="text-gray-800 font-medium break-words leading-relaxed">{c.after}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-200 bg-gray-50 shrink-0 flex items-center gap-3">
          <button
            onClick={onSave}
            disabled={saving || changes.length === 0}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-4 py-2.5 rounded-lg text-sm transition"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? "Saving…" : `Save ${changes.length > 0 ? `${changes.length} Change${changes.length === 1 ? "" : "s"}` : ""}`}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-100 text-sm font-medium text-gray-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function GallerySectionField({ items, onChange }: {
  items: Array<{ title: string; description?: string; items: Array<{ label: string; imageUrl: string }> }>;
  onChange: (items: Array<{ title: string; description?: string; items: Array<{ label: string; imageUrl: string }> }>) => void;
}) {
  return (
    <div className="sm:col-span-2 space-y-4">
      {items.map((sec, sIdx) => (
        <div key={sIdx} className="border border-border rounded-lg p-3 bg-background space-y-2">
          <div className="flex gap-2 items-center">
            <input type="text" value={sec.title} onChange={(e) => { const next = [...items]; next[sIdx] = { ...next[sIdx], title: e.target.value }; onChange(next); }} placeholder="Section title (e.g. Campus Life)" className="flex-1 border border-border rounded px-2 py-1.5 text-sm font-semibold" />
            <button type="button" onClick={() => onChange(items.filter((_, i) => i !== sIdx))} className="text-red-600 hover:bg-red-50 p-1 rounded"><Trash2 className="h-4 w-4" /></button>
          </div>
          <input type="text" value={sec.description ?? ""} onChange={(e) => { const next = [...items]; next[sIdx] = { ...next[sIdx], description: e.target.value }; onChange(next); }} placeholder="Section description" className="w-full border border-border rounded px-2 py-1.5 text-sm" />
          {sec.items.map((it, iIdx) => (
            <div key={iIdx} className="border border-dashed border-gray-300 rounded p-2 space-y-2 bg-white">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Image {iIdx + 1}</span>
                <button type="button" onClick={() => { const next = [...items]; next[sIdx] = { ...next[sIdx], items: sec.items.filter((_, i) => i !== iIdx) }; onChange(next); }} className="text-red-600 hover:bg-red-50 p-1 rounded"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
              <input type="text" value={it.label} onChange={(e) => { const next = [...items]; const inner = [...next[sIdx].items]; inner[iIdx] = { ...inner[iIdx], label: e.target.value }; next[sIdx] = { ...next[sIdx], items: inner }; onChange(next); }} placeholder="Label / caption" className="w-full border border-border rounded px-2 py-1 text-sm" />
              <MediaField label="Image" value={it.imageUrl} onChange={(v) => { const next = [...items]; const inner = [...next[sIdx].items]; inner[iIdx] = { ...inner[iIdx], imageUrl: v }; next[sIdx] = { ...next[sIdx], items: inner }; onChange(next); }} compact />
            </div>
          ))}
          <button type="button" onClick={() => { const next = [...items]; next[sIdx] = { ...next[sIdx], items: [...sec.items, { label: "", imageUrl: "" }] }; onChange(next); }} className="text-xs text-blue-600 font-semibold inline-flex items-center gap-1"><Plus className="h-3.5 w-3.5" /> Add image</button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, { title: "", description: "", items: [] }])} className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-semibold"><Plus className="h-4 w-4" /> Add section</button>
    </div>
  );
}
