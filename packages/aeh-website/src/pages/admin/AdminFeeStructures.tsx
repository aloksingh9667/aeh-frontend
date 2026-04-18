import { useState } from "react";
import { Link } from "wouter";
import { Plus, Pencil, Trash2, IndianRupee, CheckCircle, XCircle, ChevronLeft } from "lucide-react";
import { useAuth } from "@/lib/auth";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

interface FeeStructure {
  id: number;
  courseCode: string;
  courseName: string;
  paymentPlan: string;
  amount: number;
  description: string | null;
  isActive: string;
}

const PLAN_LABELS: Record<string, string> = {
  quarterly: "Quarterly",
  semester: "Per Semester",
  yearly: "Yearly",
  full_course: "Full Course",
};

const PLANS = ["quarterly", "semester", "yearly", "full_course"];

export default function AdminFeeStructures() {
  const { token } = useAuth();
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
  const [fees, setFees] = useState<FeeStructure[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [filterCode, setFilterCode] = useState("");
  const [form, setForm] = useState({ courseCode: "", courseName: "", paymentPlan: "semester", amount: "", description: "" });

  const load = async () => {
    setLoading(true);
    const r = await fetch(`${API_BASE}/fee-structures`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await r.json();
    setFees(Array.isArray(data) ? data : []);
    setLoaded(true);
    setLoading(false);
  };

  if (!loaded && !loading) load();

  const resetForm = () => { setForm({ courseCode: "", courseName: "", paymentPlan: "semester", amount: "", description: "" }); setEditId(null); setShowForm(false); };

  const startEdit = (f: FeeStructure) => {
    setForm({ courseCode: f.courseCode, courseName: f.courseName, paymentPlan: f.paymentPlan, amount: String(f.amount), description: f.description || "" });
    setEditId(f.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    const body = { ...form, amount: parseInt(form.amount) };
    const r = editId
      ? await fetch(`${API_BASE}/fee-structures/${editId}`, { method: "PATCH", headers, body: JSON.stringify(body) })
      : await fetch(`${API_BASE}/fee-structures`, { method: "POST", headers, body: JSON.stringify(body) });
    if (r.ok) {
      setMsg({ type: "success", text: editId ? "Fee updated!" : "Fee added!" });
      resetForm();
      load();
    } else {
      const d = await r.json();
      setMsg({ type: "error", text: d.error || "Failed to save" });
    }
    setTimeout(() => setMsg(null), 3000);
  };

  const handleDelete = async (id: number, name: string, plan: string) => {
    if (!confirm(`Delete ${PLAN_LABELS[plan]} fee for "${name}"?`)) return;
    const r = await fetch(`${API_BASE}/fee-structures/${id}`, { method: "DELETE", headers });
    if (r.ok) { setMsg({ type: "success", text: "Fee structure deleted" }); load(); }
    else setMsg({ type: "error", text: "Failed to delete" });
    setTimeout(() => setMsg(null), 3000);
  };

  const grouped = fees.reduce<Record<string, FeeStructure[]>>((acc, f) => {
    const key = `${f.courseCode}|${f.courseName}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(f);
    return acc;
  }, {});

  const filteredGroups = Object.entries(grouped).filter(([key]) =>
    !filterCode || key.toLowerCase().includes(filterCode.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[hsl(219,40%,16%)] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-white/70 hover:text-white"><ChevronLeft className="h-5 w-5" /></Link>
          <IndianRupee className="h-5 w-5 text-[hsl(43,96%,55%)]" />
          <h1 className="text-lg font-bold">Fee Structures</h1>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-[hsl(43,96%,55%)] text-[hsl(220,20%,15%)] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[hsl(43,96%,45%)] transition-colors">
          <Plus className="h-4 w-4" /> Add Fee
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
            <h2 className="font-semibold text-gray-800 mb-4">{editId ? "Edit Fee Structure" : "Add Fee Structure"}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Code *</label>
                <input value={form.courseCode} onChange={e => setForm(f => ({ ...f, courseCode: e.target.value.toUpperCase() }))} placeholder="e.g. BBA" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Name *</label>
                <input value={form.courseName} onChange={e => setForm(f => ({ ...f, courseName: e.target.value }))} placeholder="e.g. Bachelor of Business Administration" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Plan *</label>
                <select value={form.paymentPlan} onChange={e => setForm(f => ({ ...f, paymentPlan: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]">
                  {PLANS.map(p => <option key={p} value={p}>{PLAN_LABELS[p]}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹) *</label>
                <input type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} placeholder="e.g. 25000" min="1" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
                <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="e.g. Includes lab fees" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={handleSave} className="bg-[hsl(219,40%,16%)] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-[hsl(219,40%,24%)] transition-colors">
                {editId ? "Update" : "Add Fee"}
              </button>
              <button onClick={resetForm} className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">Cancel</button>
            </div>
          </div>
        )}

        <div className="mb-4">
          <input value={filterCode} onChange={e => setFilterCode(e.target.value)} placeholder="Search by course code or name..." className="w-full sm:w-80 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
        </div>

        {loading ? (
          <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="bg-white rounded-xl border h-32 animate-pulse" />)}</div>
        ) : filteredGroups.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <IndianRupee className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No fee structures found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredGroups.map(([key, feeList]) => {
              const [code, name] = key.split("|");
              return (
                <div key={key} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="px-5 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
                    <span className="text-sm font-bold text-[hsl(219,40%,16%)] bg-[hsl(219,40%,16%)]/10 px-2 py-0.5 rounded">{code}</span>
                    <span className="font-semibold text-gray-800 text-sm">{name}</span>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {feeList.map(f => (
                      <div key={f.id} className="px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div>
                          <span className="text-sm font-medium text-gray-700">{PLAN_LABELS[f.paymentPlan] || f.paymentPlan}</span>
                          {f.description && <span className="text-xs text-gray-400 ml-2">({f.description})</span>}
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-gray-800 flex items-center gap-0.5">
                            <IndianRupee className="h-4 w-4" />{f.amount.toLocaleString("en-IN")}
                          </span>
                          <div className="flex gap-1">
                            <button onClick={() => startEdit(f)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Pencil className="h-4 w-4" /></button>
                            <button onClick={() => handleDelete(f.id, f.courseName, f.paymentPlan)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
