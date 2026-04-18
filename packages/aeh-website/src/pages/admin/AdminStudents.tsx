import { useState } from "react";
import { Link } from "wouter";
import { Users, Trash2, Search, ChevronLeft, CheckCircle, XCircle, User, BookOpen } from "lucide-react";
import { useAuth } from "@/lib/auth";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  rollNumber: string;
  course: string;
  courseCode: string;
  enrollmentYear: string;
  semester: string | null;
  status: string;
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-gray-100 text-gray-600",
  graduated: "bg-blue-100 text-blue-700",
  suspended: "bg-red-100 text-red-700",
};

export default function AdminStudents() {
  const { token } = useAuth();
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
  const [students, setStudents] = useState<Student[]>([]);
  const [total, setTotal] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [editStatus, setEditStatus] = useState("");

  const load = async (q?: string, s?: string) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (q) params.set("search", q);
    if (s) params.set("status", s);
    const r = await fetch(`${API_BASE}/students?${params}`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await r.json();
    setStudents(data.data || []);
    setTotal(data.total || 0);
    setLoaded(true);
    setLoading(false);
  };

  if (!loaded && !loading) load();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    load(search, statusFilter);
  };

  const handleStatusChange = async (id: number) => {
    if (!editStatus) return;
    const r = await fetch(`${API_BASE}/students/${id}`, {
      method: "PATCH", headers,
      body: JSON.stringify({ status: editStatus }),
    });
    if (r.ok) {
      setMsg({ type: "success", text: "Status updated" });
      setEditId(null);
      load(search, statusFilter);
    } else {
      setMsg({ type: "error", text: "Failed to update" });
    }
    setTimeout(() => setMsg(null), 3000);
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Delete student "${name}"? All their data will be permanently removed.`)) return;
    const r = await fetch(`${API_BASE}/students/${id}`, { method: "DELETE", headers });
    if (r.ok) {
      setMsg({ type: "success", text: "Student deleted" });
      load(search, statusFilter);
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
          <Users className="h-5 w-5 text-[hsl(43,96%,55%)]" />
          <h1 className="text-lg font-bold">Manage Students</h1>
          <span className="text-white/60 text-sm">({total} total)</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {msg && (
          <div className={`mb-4 p-3 rounded-lg text-sm flex items-center gap-2 ${msg.type === "success" ? "bg-green-50 border border-green-200 text-green-700" : "bg-red-50 border border-red-200 text-red-700"}`}>
            {msg.type === "success" ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            {msg.text}
          </div>
        )}

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email or roll number..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
          </div>
          <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); load(search, e.target.value); }} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="graduated">Graduated</option>
            <option value="suspended">Suspended</option>
          </select>
          <button type="submit" className="bg-[hsl(219,40%,16%)] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[hsl(219,40%,24%)] transition-colors">Search</button>
        </form>

        {loading ? (
          <div className="space-y-3">{[1,2,3,4].map(i => <div key={i} className="bg-white rounded-xl border h-20 animate-pulse" />)}</div>
        ) : students.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No students found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Student</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Roll No.</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Course</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Year</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {students.map(s => (
                    <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[hsl(219,40%,16%)]/10 flex items-center justify-center shrink-0">
                            <User className="h-4 w-4 text-[hsl(219,40%,16%)]" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{s.name}</p>
                            <p className="text-xs text-gray-400">{s.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">{s.rollNumber}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <BookOpen className="h-3.5 w-3.5 text-gray-400" />
                          <span>{s.courseCode}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">{s.phone}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{s.enrollmentYear}</td>
                      <td className="px-4 py-3">
                        {editId === s.id ? (
                          <div className="flex items-center gap-2">
                            <select value={editStatus} onChange={e => setEditStatus(e.target.value)} className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none">
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                              <option value="graduated">Graduated</option>
                              <option value="suspended">Suspended</option>
                            </select>
                            <button onClick={() => handleStatusChange(s.id)} className="text-xs text-green-600 font-medium">Save</button>
                            <button onClick={() => setEditId(null)} className="text-xs text-gray-400">✕</button>
                          </div>
                        ) : (
                          <button onClick={() => { setEditId(s.id); setEditStatus(s.status); }} className={`text-xs px-2 py-1 rounded-full font-medium cursor-pointer ${STATUS_COLORS[s.status] || "bg-gray-100 text-gray-600"}`}>
                            {s.status}
                          </button>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => handleDelete(s.id, s.name)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
