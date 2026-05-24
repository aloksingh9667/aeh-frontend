import { useEffect, useState, useCallback } from "react";

const API_BASE = "/api";

export interface SiteConfig {
  id: number;
  collegeName: string;
  shortName: string;
  tagline: string;
  established: number | null;
  accreditation: string | null;
  logoUrl: string | null;
  faviconUrl: string | null;
  heroImageUrl: string | null;
  heroTitle: string | null;
  heroSubtitle: string | null;
  primaryColor: string;
  accentColor: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  officeHours: string | null;
  mapEmbedUrl: string | null;
  principalName: string | null;
  principalMessage: string | null;
  principalPhotoUrl: string | null;
  chairmanName: string | null;
  chairmanMessage: string | null;
  chairmanPhotoUrl: string | null;
  aboutText: string | null;
  missionText: string | null;
  visionText: string | null;
  facilities: string[] | null;
  achievements: string[] | null;
  schools: Array<{ name: string; description?: string }> | null;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
  } | null;
  geminiApiKeySet?: boolean;
  marqueeItems: string[] | null;
  stats: Array<{ label: string; value: string }> | null;
  whyUs: Array<{ title: string; description: string }> | null;
  testimonials: Array<{ name: string; course?: string; company?: string; text: string; photoUrl?: string; rating?: number }> | null;
  team: Array<{ department: string; members: Array<{ name: string; title: string; photoUrl?: string }> }> | null;
  gallery: Array<{ title: string; description?: string; items: Array<{ label: string; imageUrl: string }> }> | null;
  newsItems: Array<{ title: string; date: string; category: string; summary?: string; body?: string; imageUrl?: string }> | null;
  featureFlags: {
    showTopBar?: boolean;
    showMarquee?: boolean;
    showStats?: boolean;
    showWhyUs?: boolean;
    showTestimonials?: boolean;
    showNews?: boolean;
    showLeadership?: boolean;
    showGallery?: boolean;
    showTeam?: boolean;
    showSchools?: boolean;
    showAchievements?: boolean;
    showApplyCta?: boolean;
    showFacilities?: boolean;
    sectionTemplates?: SectionTemplates;
  } | null;
  navbar: {
    items?: Array<{
      label: string;
      href: string;
      visible?: boolean;
      children?: Array<{ label: string; href: string; sub?: string }>;
    }>;
    showStudentLogin?: boolean;
    showApplyButton?: boolean;
    applyButtonText?: string;
  } | null;
  topBar: {
    phone?: string;
    email?: string;
    badge?: string;
    deadline?: string;
  } | null;
  footer: {
    template?: string;
    aboutText?: string;
    columns?: Array<{ heading: string; links: Array<{ label: string; href: string }> }>;
    bottomText?: string;
    showSocial?: boolean;
    showApplyButton?: boolean;
  } | null;
  testimonialsLayout: string | null;
  updatedAt: string;
}

export type SectionTemplateKey =
  | "hero" | "stats" | "schools" | "achievements"
  | "whyUs" | "testimonials" | "news" | "applyCta" | "facilities";

export type SectionTemplates = Partial<Record<SectionTemplateKey, string>>;

// Mini SVG thumbnails (rendered as React for visual template selector). Each is a tiny mock-up of the layout.
export type TemplateOption = { id: string; name: string; desc: string; thumb: string };

export const SECTION_TEMPLATE_OPTIONS: Record<SectionTemplateKey, Array<TemplateOption>> = {
  hero: [
    { id: "default",   name: "Split with Image",     desc: "Text left, photo right",          thumb: "split" },
    { id: "centered",  name: "Centered Big Headline",desc: "Centered text on gradient",       thumb: "center" },
    { id: "imageBg",   name: "Full-Image Background",desc: "Photo background, overlay text",  thumb: "bg" },
    { id: "minimal",   name: "Minimal Light",        desc: "White minimalist hero",           thumb: "minimal" },
    { id: "videoCard", name: "Card with Quick Apply",desc: "Centered card + apply form chip", thumb: "card" },
  ],
  stats: [
    { id: "default",  name: "Yellow Banner Cards",  desc: "Bright yellow band, icon cards",   thumb: "yellow" },
    { id: "minimal",  name: "Minimal White Strip",  desc: "Clean counter strip",              thumb: "stripe" },
    { id: "dark",     name: "Dark Counter Bar",     desc: "Dark band, accent numbers",        thumb: "dark" },
    { id: "split",    name: "Split 2x2 Grid",       desc: "Large 2x2 grid with borders",      thumb: "grid2" },
    { id: "circles",  name: "Circle Stats",         desc: "Round stat circles, soft bg",      thumb: "circles" },
  ],
  schools: [
    { id: "default",  name: "Image Cards 3-col",    desc: "Photo cards with overlay",         thumb: "cards3" },
    { id: "compact",  name: "Compact Icon List",    desc: "2-col icon list, no images",       thumb: "list2" },
    { id: "tiles",    name: "4-col Tile Grid",      desc: "Square colored tiles",             thumb: "tiles" },
    { id: "feature",  name: "Featured + Side List", desc: "Big featured + small list",        thumb: "feature" },
    { id: "carousel", name: "Horizontal Strip",     desc: "Wide horizontal scroll feel",      thumb: "strip" },
  ],
  achievements: [
    { id: "default",  name: "Dark Bar 4-col",       desc: "Dark bar, circular icons",         thumb: "darkBar" },
    { id: "light",    name: "Light Cards",          desc: "White cards, light bg",            thumb: "lightC" },
    { id: "timeline", name: "Timeline Style",       desc: "Vertical/horizontal timeline",     thumb: "timeline" },
    { id: "trophy",   name: "Trophy Showcase",      desc: "Centered trophy + list",           thumb: "trophy" },
    { id: "stats",    name: "Big Numbers Grid",     desc: "Huge stat numbers + label",        thumb: "bignum" },
  ],
  whyUs: [
    { id: "default",  name: "Two Column + Image",   desc: "Highlights + photo + apply card",  thumb: "twoCol" },
    { id: "grid",     name: "3-col Highlight Grid", desc: "Simple 3-col grid",                thumb: "grid3" },
    { id: "iconRow",  name: "Icon Row + Bullets",   desc: "Top icon row + bullets",           thumb: "iconRow" },
    { id: "alt",      name: "Alternating Rows",     desc: "Zig-zag image+text rows",          thumb: "alt" },
    { id: "checks",   name: "Checklist Card",       desc: "Simple checklist on light card",   thumb: "check" },
  ],
  testimonials: [
    { id: "default",  name: "Featured + Avatars",   desc: "Big quote + avatar picker",        thumb: "featQ" },
    { id: "grid",     name: "3-col Card Grid",      desc: "All cards side-by-side",           thumb: "grid3" },
    { id: "carousel", name: "Carousel Slider",      desc: "Centered single card slider",      thumb: "slider" },
    { id: "wall",     name: "Quote Wall",           desc: "Masonry wall of short quotes",     thumb: "wall" },
    { id: "compact",  name: "Compact Strip",        desc: "Horizontal compact strip",         thumb: "stripT" },
  ],
  news: [
    { id: "default",  name: "Image Cards Grid",     desc: "3-col cards with photos",          thumb: "cards3" },
    { id: "list",     name: "Compact List",         desc: "Simple title + date list",         thumb: "list" },
    { id: "feature",  name: "Featured + Sidebar",   desc: "Big lead + small list",            thumb: "feature" },
    { id: "magazine", name: "Magazine Style",       desc: "Magazine-style 2-col mix",         thumb: "mag" },
    { id: "tiles",    name: "Tile Grid 4-col",      desc: "Square tile grid w/ overlay",      thumb: "tiles" },
  ],
  applyCta: [
    { id: "default",  name: "Full-Width Banner",    desc: "Dark banner with buttons",         thumb: "banner" },
    { id: "card",     name: "Floating Card",        desc: "Centered glass card",              thumb: "card" },
    { id: "split",    name: "Split with Image",     desc: "Photo left, CTA right",            thumb: "split" },
    { id: "gradient", name: "Bold Gradient",        desc: "Multi-color gradient banner",      thumb: "grad" },
    { id: "minimal",  name: "Minimal Light Strip",  desc: "Light strip, single button",       thumb: "minStrip" },
  ],
  facilities: [
    { id: "default",  name: "Icon Grid 4-col",      desc: "Icon + label grid",                thumb: "iconGrid" },
    { id: "list",     name: "Two-column List",      desc: "Bullet list 2 columns",            thumb: "list2" },
    { id: "cards",    name: "Photo Cards",          desc: "Card per facility w/ image",       thumb: "cards3" },
    { id: "feature",  name: "Featured Showcase",    desc: "1 big + small grid",               thumb: "feature" },
    { id: "compact",  name: "Compact Tags",         desc: "Pill / tag chips",                 thumb: "tags" },
  ],
};

export const FOOTER_TEMPLATE_OPTIONS: Array<TemplateOption> = [
  { id: "default",  name: "4-Column Dark",       desc: "About + 3 columns of links (current)", thumb: "ftrDef" },
  { id: "minimal",  name: "Simplified 2-Column", desc: "About + contact only",                 thumb: "ftrMin" },
  { id: "centered", name: "Centered Brand",      desc: "Centered logo, links inline",          thumb: "ftrCtr" },
  { id: "light",    name: "Light Mode",          desc: "Light footer, dark text",              thumb: "ftrLite" },
  { id: "strip",    name: "Brand Strip",         desc: "Single-row compact strip",             thumb: "ftrStrip" },
];

export function getTemplate(
  flags: SiteConfig["featureFlags"] | null | undefined,
  key: SectionTemplateKey,
): string {
  return flags?.sectionTemplates?.[key] || "default";
}

export function getFooterTemplate(footer: SiteConfig["footer"] | null | undefined): string {
  return footer?.template || "default";
}

export const COLOR_PALETTES: Array<{ id: string; name: string; primary: string; accent: string }> = [
  { id: "navy-gold", name: "Navy & Gold (Classic)", primary: "#0a2540", accent: "#c9a227" },
  { id: "emerald", name: "Emerald & Cream", primary: "#0e6b4f", accent: "#f5e6c8" },
  { id: "royal-purple", name: "Royal Purple & Amber", primary: "#3c1361", accent: "#f59e0b" },
  { id: "crimson", name: "Crimson & Sand", primary: "#8b1538", accent: "#d4af37" },
  { id: "ocean", name: "Ocean Blue & Coral", primary: "#0369a1", accent: "#fb923c" },
  { id: "forest", name: "Forest & Mustard", primary: "#1e3a2f", accent: "#eab308" },
  { id: "midnight", name: "Midnight & Rose", primary: "#1e1b4b", accent: "#fb7185" },
  { id: "terracotta", name: "Terracotta & Teal", primary: "#9a3412", accent: "#0d9488" },
];

export function isFlagEnabled(flags: SiteConfig["featureFlags"] | null | undefined, key: keyof NonNullable<SiteConfig["featureFlags"]>, defaultValue = true): boolean {
  if (!flags) return defaultValue;
  const v = flags[key];
  return v === undefined ? defaultValue : !!v;
}

let cachedConfig: SiteConfig | null = null;
const subscribers = new Set<(c: SiteConfig | null) => void>();

const PREVIEW_KEY = "aehDraftConfig";
const PREVIEW_TTL_MS = 30 * 60 * 1000; // 30 minutes

export function isPreviewMode(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("aehPreview") === "1";
}

function readPreviewDraft(): Partial<SiteConfig> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PREVIEW_KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw) as { ts: number; data: Partial<SiteConfig> };
    if (!obj?.ts || Date.now() - obj.ts > PREVIEW_TTL_MS) {
      localStorage.removeItem(PREVIEW_KEY);
      return null;
    }
    return obj.data;
  } catch {
    return null;
  }
}

export function writePreviewDraft(data: Partial<SiteConfig>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PREVIEW_KEY, JSON.stringify({ ts: Date.now(), data }));
}

export async function fetchSiteConfig(): Promise<SiteConfig> {
  const res = await fetch(`${API_BASE}/site-config`);
  if (!res.ok) throw new Error("Failed to load site config");
  let data = (await res.json()) as SiteConfig;
  if (isPreviewMode()) {
    const draft = readPreviewDraft();
    if (draft) data = { ...data, ...draft } as SiteConfig;
  }
  cachedConfig = data;
  subscribers.forEach((cb) => cb(data));
  return data;
}

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig | null>(cachedConfig);
  const [loading, setLoading] = useState(!cachedConfig);

  useEffect(() => {
    const cb = (c: SiteConfig | null) => setConfig(c);
    subscribers.add(cb);
    if (!cachedConfig) {
      fetchSiteConfig()
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
    return () => {
      subscribers.delete(cb);
    };
  }, []);

  return { config, loading, refetch: fetchSiteConfig };
}

export async function updateSiteConfig(token: string, patch: Partial<SiteConfig>): Promise<SiteConfig> {
  const res = await fetch(`${API_BASE}/site-config`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(patch),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Update failed");
  }
  const data = (await res.json()) as SiteConfig;
  cachedConfig = data;
  subscribers.forEach((cb) => cb(data));
  return data;
}

export async function generateSiteContent(
  token: string,
  collegeName: string,
  hint?: string,
): Promise<Partial<SiteConfig>> {
  const res = await fetch(`${API_BASE}/site-config/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ collegeName, hint }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "AI generation failed");
  }
  const json = await res.json();
  return json.data as Partial<SiteConfig>;
}

export async function verifyApiKey(token: string, apiKey: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/site-config/verify-key`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ apiKey }),
  });
  if (!res.ok) return false;
  const j = await res.json();
  return !!j.valid;
}

export async function generateSiteImage(
  token: string,
  prompt: string,
  field: "logoUrl" | "heroImageUrl" | "principalPhotoUrl" | "chairmanPhotoUrl" | "faviconUrl",
): Promise<{ dataUrl: string; field: string }> {
  const res = await fetch(`${API_BASE}/site-config/generate-image`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ prompt, field }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Image generation failed");
  }
  return res.json();
}

export async function fetchSchedule(token: string): Promise<{ scheduledAt: string | null }> {
  try {
    const res = await fetch(`${API_BASE}/site-config/schedule`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return { scheduledAt: null };
    return res.json();
  } catch {
    return { scheduledAt: null };
  }
}

export async function setSchedule(
  token: string,
  data: Record<string, unknown>,
  scheduledAt: string,
): Promise<void> {
  const res = await fetch(`${API_BASE}/site-config/schedule`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ data, scheduledAt }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || "Could not save schedule");
  }
}

export async function cancelSchedule(token: string): Promise<void> {
  const res = await fetch(`${API_BASE}/site-config/schedule`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Could not cancel schedule");
}

export function useApplyBranding() {
  const { config } = useSiteConfig();
  useEffect(() => {
    if (!config) return;
    const root = document.documentElement;
    if (config.primaryColor) {
      root.style.setProperty("--brand-primary", config.primaryColor);
      root.style.setProperty("--primary-color", config.primaryColor);
    }
    if (config.accentColor) {
      root.style.setProperty("--brand-accent", config.accentColor);
      root.style.setProperty("--accent-color", config.accentColor);
    }
    if (config.collegeName) document.title = config.collegeName;
    if (config.faviconUrl) {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = config.faviconUrl;
    }
  }, [config]);
}
