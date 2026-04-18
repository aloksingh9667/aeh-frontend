import { useState } from "react";
import { Link } from "wouter";
import { Plus, Pencil, Trash2, BookOpen, CheckCircle, XCircle, ChevronLeft } from "lucide-react";
import { useAuth } from "@/lib/auth";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

interface Course {
  id: number;
  name: string;
  code: string;
  school: string;
  duration: string;
  totalSemesters: number;
  eligibility: string | null;
  description: string | null;
  isActive: string;
}

const SCHOOLS = [
  "School of Management", "School of CS & IT", "School of Commerce",
  "School of Humanities", "School of Communication", "School of Law",
  "School of Pharmacy", "School of Applied Science", "School of Education",
];

function useAdminFetch(token: string | null) {
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
  const get = (url: string) => fetch(`${API_BASE}${url}`, { headers: { Authorization: `Bearer ${token}` } });
  const post = (url: string, body: any) => fetch(`${API_BASE}${url}`, { method: "POST", headers, body: JSON.stringify(body) });
  const patch = (url: string, body: any) => fetch(`${API_BASE}${url}`, { method: "PATCH", headers, body: JSON.stringify(body) });
  const del = (url: string) => fetch(`${API_BASE}${url}`, { method: "DELETE", headers });
  return { get, post, patch, del };
}

export default function AdminCourses() {
  const { token } = useAuth();
  const api = useAdminFetch(token);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [form, setForm] = useState({ name: "", code: "", school: "", duration: "", totalSemesters: 6, eligibility: "", description: "" });

  const load = async () => {
    setLoading(true);
    const r = await api.get("/courses");
    const data = await r.json();
    setCourses(Array.isArray(data) ? data : []);
    setLoaded(true);
    setLoading(false);
  };

  if (!loaded && !loading) load();

  const resetForm = () => { setForm({ name: "", code: "", school: "", duration: "", totalSemesters: 6, eligibility: "", description: "" }); setEditId(null); setShowForm(false); };

  const startEdit = (c: Course) => {
    setForm({ name: c.name, code: c.code, school: c.school, duration: c.duration, totalSemesters: c.totalSemesters, eligibility: c.eligibility || "", description: c.description || "" });
    setEditId(c.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    const body = { ...form, totalSemesters: Number(form.totalSemesters) };
    const r = editId
      ? await api.patch(`/courses/${editId}`, body)
      : await api.post("/courses", body);
    if (r.ok) {
      setMsg({ type: "success", text: editId ? "Course updated!" : "Course added!" });
      resetForm();
      load();
    } else {
      const d = await r.json();
      setMsg({ type: "error", text: d.error || "Failed to save" });
    }
    setTimeout(() => setMsg(null), 3000);
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    const r = await api.del(`/courses/${id}`);
    if (r.ok) {
      setMsg({ type: "success", text: "Course deleted" });
      load();
    } else {
      setMsg({ type: "error", text: "Failed to delete" });
    }
    setTimeout(() => setMsg(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[hsl(219,40%,16%)] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-white/70 hover:text-white"><ChevronLeft className="h-5 w-5" /></Link>
          <BookOpen className="h-5 w-5 text-[hsl(43,96%,55%)]" />
          <h1 className="text-lg font-bold">Manage Courses</h1>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-[hsl(43,96%,55%)] text-[hsl(220,20%,15%)] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[hsl(43,96%,45%)] transition-colors">
          <Plus className="h-4 w-4" /> Add Course
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {msg && (
          <div className={`mb-4 p-3 rounded-lg text-sm flex items-center gap-2 ${msg.type === "success" ? "bg-green-50 border border-green-200 text-green-700" : "bg-red-50 border border-red-200 text-red-700"}`}>
            {msg.type === "success" ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            {msg.text}
          </div>
        )}

        {showForm && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h2 className="font-semibold text-gray-800 mb-4">{editId ? "Edit Course" : "Add New Course"}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Name *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Bachelor of Business Administration" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Code *</label>
                <input value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))} placeholder="e.g. BBA" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">School *</label>
                <select value={form.school} onChange={e => setForm(f => ({ ...f, school: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]">
                  <option value="">Select School</option>
                  {SCHOOLS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
                <input value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} placeholder="e.g. 3 Years" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Semesters *</label>
                <input type="number" value={form.totalSemesters} onChange={e => setForm(f => ({ ...f, totalSemesters: Number(e.target.value) }))} min="1" max="12" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility</label>
                <input value={form.eligibility} onChange={e => setForm(f => ({ ...f, eligibility: e.target.value }))} placeholder="e.g. 10+2 in any stream" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} placeholder="Brief description of the course..." className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)] resize-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={handleSave} className="bg-[hsl(219,40%,16%)] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-[hsl(219,40%,24%)] transition-colors">
                {editId ? "Update Course" : "Add Course"}
              </button>
              <button onClick={resetForm} className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">Cancel</button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3].map(i => <div key={i} className="bg-white rounded-xl border h-40 animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map(c => (
              <div key={c.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-all">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-bold text-[hsl(219,40%,40%)] bg-[hsl(219,40%,16%)]/10 px-2 py-1 rounded-full">{c.code}</span>
                  <div className="flex gap-1">
                    <button onClick={() => startEdit(c)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => handleDelete(c.id, c.name)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{c.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{c.school}</p>
                <div className="flex gap-2 text-xs text-gray-400">
                  <span>{c.duration}</span>
                  <span>•</span>
                  <span>{c.totalSemesters} Semesters</span>
                </div>
                {c.eligibility && <p className="text-xs text-gray-400 mt-1">Eligibility: {c.eligibility}</p>}
              </div>
            ))}
          </div>
        )}
        {!loading && courses.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No courses found. Add your first course!</p>
          </div>
        )}
      </div>
    </div>
  );
}
