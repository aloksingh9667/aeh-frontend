import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Calendar, Plus, Pencil, Trash2, Eye, EyeOff, Star, StarOff, ChevronLeft, X, MapPin, Image, Check } from "lucide-react";
import { useAuth } from "@/lib/auth";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

interface Event {
  id: number;
  title: string;
  category: string;
  shortDescription?: string;
  description?: string;
  eventDate: string;
  eventDateEnd?: string;
  location?: string;
  imageUrl?: string;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
}

const CATEGORIES = ["Admission", "Placement", "Academic", "Sports", "Cultural", "Infrastructure", "Achievement"];

const CAT_COLORS: Record<string, string> = {
  Admission: "bg-green-100 text-green-700",
  Placement: "bg-blue-100 text-blue-700",
  Academic: "bg-purple-100 text-purple-700",
  Sports: "bg-orange-100 text-orange-700",
  Cultural: "bg-pink-100 text-pink-700",
  Infrastructure: "bg-cyan-100 text-cyan-700",
  Achievement: "bg-amber-100 text-amber-700",
};

const DEFAULT_FORM = {
  title: "", category: "Admission", shortDescription: "", description: "",
  eventDate: "", eventDateEnd: "", location: "", imageUrl: "", isFeatured: false, isPublished: true,
};

export default function AdminEvents() {
  const { token } = useAuth();
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);
  const [form, setForm] = useState(DEFAULT_FORM);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const load = async () => {
    setLoading(true);
    const r = await fetch(`${API_BASE}/events/all`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await r.json();
    setEvents(data.data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(DEFAULT_FORM);
    setShowForm(true);
  };

  const openEdit = (ev: Event) => {
    setEditing(ev);
    setForm({
      title: ev.title, category: ev.category,
      shortDescription: ev.shortDescription || "", description: ev.description || "",
      eventDate: ev.eventDate, eventDateEnd: ev.eventDateEnd || "",
      location: ev.location || "", imageUrl: ev.imageUrl || "",
      isFeatured: ev.isFeatured, isPublished: ev.isPublished,
    });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const body = { ...form };
    const url = editing ? `${API_BASE}/events/${editing.id}` : `${API_BASE}/events`;
    const method = editing ? "PATCH" : "POST";
    const r = await fetch(url, { method, headers, body: JSON.stringify(body) });
    if (r.ok) {
      setMsg({ type: "success", text: editing ? "Event updated!" : "Event created!" });
      setShowForm(false);
      load();
    } else {
      const d = await r.json();
      setMsg({ type: "error", text: d.error || "Failed to save" });
    }
    setSaving(false);
    setTimeout(() => setMsg(null), 3000);
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Delete event "${title}"?`)) return;
    const r = await fetch(`${API_BASE}/events/${id}`, { method: "DELETE", headers });
    if (r.ok) { setMsg({ type: "success", text: "Event deleted" }); load(); }
    else setMsg({ type: "error", text: "Failed to delete" });
    setTimeout(() => setMsg(null), 3000);
  };

  const togglePublish = async (ev: Event) => {
    await fetch(`${API_BASE}/events/${ev.id}`, {
      method: "PATCH", headers,
      body: JSON.stringify({ isPublished: !ev.isPublished }),
    });
    load();
  };

  const toggleFeatured = async (ev: Event) => {
    await fetch(`${API_BASE}/events/${ev.id}`, {
      method: "PATCH", headers,
      body: JSON.stringify({ isFeatured: !ev.isFeatured }),
    });
    load();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[hsl(219,40%,16%)] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-white/70 hover:text-white"><ChevronLeft className="h-5 w-5" /></Link>
          <Calendar className="h-5 w-5 text-[hsl(43,96%,55%)]" />
          <h1 className="text-lg font-bold">Manage Events</h1>
          <span className="text-white/50 text-sm">({events.length} total)</span>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[hsl(43,96%,55%)] text-[hsl(219,40%,16%)] font-bold px-4 py-2 rounded-lg text-sm hover:bg-[hsl(43,96%,45%)] transition-colors">
          <Plus className="h-4 w-4" /> Add Event
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {msg && (
          <div className={`mb-4 p-3 rounded-lg text-sm flex items-center gap-2 ${msg.type === "success" ? "bg-green-50 border border-green-200 text-green-700" : "bg-red-50 border border-red-200 text-red-700"}`}>
            {msg.type === "success" ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
            {msg.text}
          </div>
        )}

        {/* Event Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-800">{editing ? "Edit Event" : "Add New Event"}</h2>
                <button onClick={() => setShowForm(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="h-5 w-5 text-gray-500" /></button>
              </div>
              <form onSubmit={handleSave} className="px-6 py-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Title *</label>
                  <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g., Admission Open Day 2026-27" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]">
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="e.g., Main Campus, Bilaspur" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Date *</label>
                    <input required value={form.eventDate} onChange={e => setForm(f => ({ ...f, eventDate: e.target.value }))} placeholder="e.g., 5 May 2026" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date (optional)</label>
                    <input value={form.eventDateEnd} onChange={e => setForm(f => ({ ...f, eventDateEnd: e.target.value }))} placeholder="e.g., 10 May 2026 (for multi-day)" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                  <textarea rows={2} value={form.shortDescription} onChange={e => setForm(f => ({ ...f, shortDescription: e.target.value }))} placeholder="Brief summary shown on homepage (1-2 lines)" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)] resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
                  <textarea rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Detailed description for the event page" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)] resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <div className="flex gap-2">
                    <input value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} placeholder="https://images.unsplash.com/... or any image URL" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
                    {form.imageUrl && (
                      <img src={form.imageUrl} alt="preview" className="h-10 w-16 rounded-lg object-cover border border-gray-200" onError={e => (e.currentTarget.style.display = "none")} />
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Use Unsplash: https://images.unsplash.com/photo-ID?w=800&q=80</p>
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.isPublished} onChange={e => setForm(f => ({ ...f, isPublished: e.target.checked }))} className="h-4 w-4 rounded" />
                    <span className="text-sm font-medium text-gray-700">Published (visible on website)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.isFeatured} onChange={e => setForm(f => ({ ...f, isFeatured: e.target.checked }))} className="h-4 w-4 rounded" />
                    <span className="text-sm font-medium text-gray-700">Featured (shown first)</span>
                  </label>
                </div>
                <div className="flex gap-3 pt-2 border-t border-gray-200">
                  <button type="submit" disabled={saving} className="flex-1 bg-[hsl(219,40%,16%)] text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-[hsl(219,40%,24%)] disabled:opacity-60 transition-colors">
                    {saving ? "Saving..." : editing ? "Update Event" : "Create Event"}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-6 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Events Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => <div key={i} className="bg-white rounded-xl border h-40 animate-pulse" />)}
          </div>
        ) : events.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No events yet. Add your first event!</p>
            <button onClick={openCreate} className="bg-[hsl(219,40%,16%)] text-white px-6 py-2 rounded-lg text-sm font-semibold">
              <Plus className="h-4 w-4 inline mr-2" />Add Event
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {events.map(ev => (
              <div key={ev.id} className={`bg-white rounded-xl border overflow-hidden transition-all ${!ev.isPublished ? "opacity-60" : ""}`}>
                {ev.imageUrl && (
                  <div className="relative h-36 overflow-hidden">
                    <img src={ev.imageUrl} alt={ev.title} className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = "none")} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      {ev.isFeatured && <span className="bg-[hsl(43,96%,55%)] text-[hsl(219,40%,16%)] text-xs font-bold px-2 py-0.5 rounded-full">★ Featured</span>}
                      {!ev.isPublished && <span className="bg-gray-700 text-white text-xs font-bold px-2 py-0.5 rounded-full">Hidden</span>}
                    </div>
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CAT_COLORS[ev.category] || "bg-gray-100 text-gray-600"}`}>{ev.category}</span>
                      <h3 className="font-semibold text-gray-800 mt-1.5 text-sm leading-snug">{ev.title}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{ev.eventDate}{ev.eventDateEnd ? `–${ev.eventDateEnd}` : ""}</span>
                    {ev.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{ev.location}</span>}
                  </div>
                  {ev.shortDescription && <p className="text-xs text-gray-500 line-clamp-2 mb-3">{ev.shortDescription}</p>}
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                    <button onClick={() => openEdit(ev)} className="flex items-center gap-1 text-xs text-[hsl(219,40%,40%)] hover:text-[hsl(219,40%,16%)] font-medium px-2 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </button>
                    <button onClick={() => toggleFeatured(ev)} className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-800 font-medium px-2 py-1.5 rounded-lg hover:bg-amber-50 transition-colors">
                      {ev.isFeatured ? <StarOff className="h-3.5 w-3.5" /> : <Star className="h-3.5 w-3.5" />}
                      {ev.isFeatured ? "Unfeature" : "Feature"}
                    </button>
                    <button onClick={() => togglePublish(ev)} className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900 font-medium px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                      {ev.isPublished ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      {ev.isPublished ? "Hide" : "Publish"}
                    </button>
                    <button onClick={() => handleDelete(ev.id, ev.title)} className="ml-auto p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
