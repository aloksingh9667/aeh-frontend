import { useState } from "react";
import { Link } from "wouter";
import { Plus, Pencil, Trash2, IndianRupee, CheckCircle, XCircle, ChevronLeft, AlertCircle, Clock } from "lucide-react";
import { useAuth } from "@/lib/auth";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

interface FeeStructure {
  id: number;
  courseCode: string;
  courseName: string;
  paymentPlan: string;
  amount: number;
  description: string | null;
  dueDay: number | null;
  fineAmount: number | null;
  fineType: string | null;
  academicYear: string | null;
  isActive: string;
}

const PLAN_LABELS: Record<string, string> = {
  quarterly: "Quarterly (3 months)",
  semester: "Semester (6 months)",
  yearly: "Yearly",
  full_course: "Full Course",
};

const PLAN_PERIODS: Record<string, string> = {
  quarterly: "3 months",
  semester: "6 months",
  yearly: "12 months",
  full_course: "Full course",
};

const PLANS = ["quarterly", "semester", "yearly", "full_course"];

const DEFAULT_FORM = {
  courseCode: "", courseName: "", paymentPlan: "semester", amount: "", description: "",
  dueDay: "15", fineAmount: "0", fineType: "fixed", academicYear: "2026-27",
};

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
  const [form, setForm] = useState(DEFAULT_FORM);

  const load = async () => {
    setLoading(true);
    const r = await fetch(`${API_BASE}/fee-structures`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await r.json();
    setFees(Array.isArray(data) ? data : []);
    setLoaded(true);
    setLoading(false);
  };

  if (!loaded && !loading) load();

  const resetForm = () => { setForm(DEFAULT_FORM); setEditId(null); setShowForm(false); };

  const startEdit = (f: FeeStructure) => {
    setForm({
      courseCode: f.courseCode, courseName: f.courseName, paymentPlan: f.paymentPlan,
      amount: String(f.amount), description: f.description || "",
      dueDay: String(f.dueDay ?? 15), fineAmount: String(f.fineAmount ?? 0),
      fineType: f.fineType || "fixed", academicYear: f.academicYear || "2026-27",
    });
    setEditId(f.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    const body = {
      ...form,
      amount: parseInt(form.amount),
      dueDay: parseInt(form.dueDay),
      fineAmount: parseInt(form.fineAmount),
    };
    const r = editId
      ? await fetch(`${API_BASE}/fee-structures/${editId}`, { method: "PATCH", headers, body: JSON.stringify(body) })
      : await fetch(`${API_BASE}/fee-structures`, { method: "POST", headers, body: JSON.stringify(body) });
    if (r.ok) {
      setMsg({ type: "success", text: editId ? "Fee structure updated!" : "Fee structure added!" });
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
          <h1 className="text-lg font-bold">Fee Structures & Fines</h1>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 bg-[hsl(43,96%,55%)] text-[hsl(220,20%,15%)] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[hsl(43,96%,45%)] transition-colors">
          <Plus className="h-4 w-4" /> Add Fee Structure
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
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="font-bold text-gray-800 text-lg">{editId ? "Edit Fee Structure" : "Add Fee Structure"}</h2>
                <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">✕</button>
              </div>
              <div className="px-6 py-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Code *</label>
                    <input value={form.courseCode} onChange={e => setForm(f => ({ ...f, courseCode: e.target.value.toUpperCase() }))} placeholder="e.g. BBA" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
                    <input value={form.academicYear} onChange={e => setForm(f => ({ ...f, academicYear: e.target.value }))} placeholder="e.g. 2026-27" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Name *</label>
                  <input value={form.courseName} onChange={e => setForm(f => ({ ...f, courseName: e.target.value }))} placeholder="e.g. Bachelor of Business Administration" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Plan *</label>
                    <select value={form.paymentPlan} onChange={e => setForm(f => ({ ...f, paymentPlan: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]">
                      {PLANS.map(p => <option key={p} value={p}>{PLAN_LABELS[p]} ({PLAN_PERIODS[p]})</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹) per period *</label>
                    <input type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} placeholder="e.g. 25000" min="1" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
                  </div>
                </div>

                {/* Due Date & Fine Settings */}
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <p className="text-sm font-semibold text-amber-800 mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Due Date & Late Fine Settings
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Due Day of Month</label>
                      <input type="number" value={form.dueDay} onChange={e => setForm(f => ({ ...f, dueDay: e.target.value }))} placeholder="15" min="1" max="28" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
                      <p className="text-xs text-gray-400 mt-0.5">e.g. 15 = 15th of each period's first month</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Fine Amount (₹)</label>
                      <input type="number" value={form.fineAmount} onChange={e => setForm(f => ({ ...f, fineAmount: e.target.value }))} placeholder="0" min="0" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
                      <p className="text-xs text-gray-400 mt-0.5">0 = no fine</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Fine Type</label>
                      <select value={form.fineType} onChange={e => setForm(f => ({ ...f, fineType: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]">
                        <option value="fixed">Fixed (one time)</option>
                        <option value="per_day">Per Day (daily fine)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
                  <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="e.g. Includes lab fees, hostel excluded" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
                </div>
                <div className="flex gap-3 pt-2 border-t border-gray-200">
                  <button onClick={handleSave} className="flex-1 bg-[hsl(219,40%,16%)] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[hsl(219,40%,24%)] transition-colors">
                    {editId ? "Update Fee Structure" : "Add Fee Structure"}
                  </button>
                  <button onClick={resetForm} className="px-6 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-4">
          <input value={filterCode} onChange={e => setFilterCode(e.target.value)} placeholder="Search by course code or name..." className="w-full sm:w-80 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
        </div>

        {loading ? (
          <div className="space-y-4">{[1, 2, 3].map(i => <div key={i} className="bg-white rounded-xl border h-32 animate-pulse" />)}</div>
        ) : filteredGroups.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <IndianRupee className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No fee structures found. Add your first one!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredGroups.map(([key, feeList]) => {
              const [code, name] = key.split("|");
              return (
                <div key={key} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="px-5 py-3 bg-[hsl(219,40%,16%)]/5 border-b border-gray-200 flex items-center gap-3">
                    <span className="text-sm font-bold text-[hsl(219,40%,16%)] bg-[hsl(219,40%,16%)]/10 px-2 py-0.5 rounded">{code}</span>
                    <span className="font-semibold text-gray-800 text-sm">{name}</span>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {feeList.map(f => (
                      <div key={f.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-sm font-semibold text-gray-800">{PLAN_LABELS[f.paymentPlan] || f.paymentPlan}</span>
                            {f.academicYear && <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{f.academicYear}</span>}
                          </div>
                          {f.description && <span className="text-xs text-gray-500">{f.description}</span>}
                          <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-500">
                            {f.dueDay && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />Due: {f.dueDay}th of month</span>}
                            {f.fineAmount ? (
                              <span className="flex items-center gap-1 text-red-600">
                                <AlertCircle className="h-3 w-3" />
                                Fine: ₹{f.fineAmount} {f.fineType === "per_day" ? "/day" : "(fixed)"}
                              </span>
                            ) : (
                              <span className="text-gray-400">No late fine</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 ml-4">
                          <span className="font-bold text-gray-800 text-base flex items-center gap-0.5">
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
