import { useState } from "react";
import { Link } from "wouter";
import { Plus, Pencil, Trash2, IndianRupee, CheckCircle, XCircle, ChevronLeft, AlertCircle, Clock, Zap, Calculator } from "lucide-react";
import { useAuth } from "@/lib/auth";

const API_BASE = "/api";

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
  feeCategory?: string | null;
  totalCourseAmount?: number | null;
  durationYears?: number | null;
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

const FEE_CATEGORIES: Record<string, { label: string; color: string }> = {
  tuition: { label: "Tuition Fee", color: "bg-blue-100 text-blue-700" },
  registration: { label: "Registration Fee", color: "bg-purple-100 text-purple-700" },
  exam: { label: "Examination Fee", color: "bg-amber-100 text-amber-700" },
  other: { label: "Other Fee", color: "bg-gray-100 text-gray-700" },
};

const DEFAULT_FORM = {
  feeCategory: "tuition",
  courseCode: "", courseName: "", paymentPlan: "semester", amount: "", description: "",
  dueDay: "15", fineAmount: "0", fineType: "fixed", academicYear: "2026-27",
  totalCourseAmount: "", durationYears: "3",
};

function periodsForPlan(plan: string, durationYears: number): number {
  if (plan === "quarterly") return 4 * durationYears;
  if (plan === "semester") return 2 * durationYears;
  if (plan === "yearly") return 1 * durationYears;
  return 1; // full_course
}

export default function AdminFeeStructures() {
  const { token } = useAuth();
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
  const [fees, setFees] = useState<FeeStructure[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showQuickSetup, setShowQuickSetup] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [filterCode, setFilterCode] = useState("");
  const [form, setForm] = useState(DEFAULT_FORM);
  const [quickForm, setQuickForm] = useState({
    courseCode: "", courseName: "", totalCourseAmount: "", durationYears: "3",
    academicYear: "2026-27", dueDay: "15", fineAmount: "100", fineType: "per_day",
  });

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
      feeCategory: f.feeCategory || "tuition",
      courseCode: f.courseCode, courseName: f.courseName, paymentPlan: f.paymentPlan,
      amount: String(f.amount), description: f.description || "",
      dueDay: String(f.dueDay ?? 15), fineAmount: String(f.fineAmount ?? 0),
      fineType: f.fineType || "fixed", academicYear: f.academicYear || "2026-27",
      totalCourseAmount: f.totalCourseAmount ? String(f.totalCourseAmount) : "",
      durationYears: String(f.durationYears ?? 3),
    });
    setEditId(f.id);
    setShowForm(true);
  };

  // Auto-compute amount per period from total
  const isTuition = form.feeCategory === "tuition";
  const totalAmt = parseInt(form.totalCourseAmount) || 0;
  const durYears = parseInt(form.durationYears) || 3;
  const periods = periodsForPlan(form.paymentPlan, durYears);
  const computedPerPeriod = totalAmt > 0 ? Math.round(totalAmt / periods) : 0;

  const useComputed = () => {
    if (computedPerPeriod > 0) setForm(f => ({ ...f, amount: String(computedPerPeriod) }));
  };

  const handleSave = async () => {
    const body: any = {
      feeCategory: form.feeCategory,
      courseCode: form.courseCode,
      courseName: form.courseName,
      paymentPlan: form.paymentPlan,
      amount: parseInt(form.amount),
      description: form.description || undefined,
      dueDay: parseInt(form.dueDay),
      fineAmount: parseInt(form.fineAmount),
      fineType: form.fineType,
      academicYear: form.academicYear,
    };
    if (isTuition) {
      if (form.totalCourseAmount) body.totalCourseAmount = parseInt(form.totalCourseAmount);
      body.durationYears = durYears;
    }
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

  const handleQuickSetup = async () => {
    const total = parseInt(quickForm.totalCourseAmount);
    const years = parseInt(quickForm.durationYears) || 3;
    if (!quickForm.courseCode || !quickForm.courseName || !total) {
      setMsg({ type: "error", text: "Course code, name and total amount are required." });
      return;
    }
    const plansToCreate = ["quarterly", "semester", "yearly", "full_course"];
    let okCount = 0;
    for (const plan of plansToCreate) {
      const p = periodsForPlan(plan, years);
      const amt = plan === "full_course" ? total : Math.round(total / p);
      const body = {
        feeCategory: "tuition",
        courseCode: quickForm.courseCode.toUpperCase(),
        courseName: quickForm.courseName,
        paymentPlan: plan,
        amount: amt,
        description: plan === "full_course" ? `One-time payment for ${years}-year course` : `${p} installments over ${years} years`,
        dueDay: parseInt(quickForm.dueDay) || 15,
        fineAmount: parseInt(quickForm.fineAmount) || 0,
        fineType: quickForm.fineType,
        academicYear: quickForm.academicYear,
        totalCourseAmount: total,
        durationYears: years,
      };
      const r = await fetch(`${API_BASE}/fee-structures`, { method: "POST", headers, body: JSON.stringify(body) });
      if (r.ok) okCount++;
    }
    setShowQuickSetup(false);
    setMsg({ type: okCount > 0 ? "success" : "error", text: `Created ${okCount}/${plansToCreate.length} payment plans for ${quickForm.courseCode}` });
    load();
    setTimeout(() => setMsg(null), 4000);
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
      <div className="bg-brand-primary text-white px-6 py-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-white/70 hover:text-white"><ChevronLeft className="h-5 w-5" /></Link>
          <IndianRupee className="h-5 w-5 text-brand-accent" />
          <h1 className="text-lg font-bold">Fee Structures & Fines</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowQuickSetup(true)} className="flex items-center gap-2 bg-emerald-500 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-600 transition-colors">
            <Zap className="h-4 w-4" /> Quick Setup (Auto-Split)
          </button>
          <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 bg-brand-accent text-[var(--brand-primary)] px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-colors">
            <Plus className="h-4 w-4" /> Add Fee Structure
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {msg && (
          <div className={`mb-4 p-3 rounded-lg text-sm flex items-center gap-2 ${msg.type === "success" ? "bg-green-50 border border-green-200 text-green-700" : "bg-red-50 border border-red-200 text-red-700"}`}>
            {msg.type === "success" ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            {msg.text}
          </div>
        )}

        {/* Quick Setup Modal */}
        {showQuickSetup && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-t-2xl">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  <h2 className="font-bold text-lg">Quick Setup — Auto-Split Total Fee</h2>
                </div>
                <button onClick={() => setShowQuickSetup(false)} className="p-2 hover:bg-white/10 rounded-lg">✕</button>
              </div>
              <div className="px-6 py-5 space-y-4">
                <p className="text-sm text-gray-600 bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
                  Enter the <strong>total course fee</strong> and duration. We'll automatically create all 4 payment plans (Quarterly / Semester / Yearly / Full Course) with the correctly split amounts.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Code *</label>
                    <input value={quickForm.courseCode} onChange={e => setQuickForm(f => ({ ...f, courseCode: e.target.value.toUpperCase() }))} placeholder="e.g. MBA" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Years) *</label>
                    <select value={quickForm.durationYears} onChange={e => setQuickForm(f => ({ ...f, durationYears: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                      <option value="1">1 Year</option>
                      <option value="2">2 Years</option>
                      <option value="3">3 Years</option>
                      <option value="4">4 Years</option>
                      <option value="5">5 Years</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Name *</label>
                  <input value={quickForm.courseName} onChange={e => setQuickForm(f => ({ ...f, courseName: e.target.value }))} placeholder="e.g. Master of Business Administration" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Course Amount (₹) *</label>
                  <input type="number" value={quickForm.totalCourseAmount} onChange={e => setQuickForm(f => ({ ...f, totalCourseAmount: e.target.value }))} placeholder="e.g. 300000" min="1" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>

                {/* Live Preview */}
                {quickForm.totalCourseAmount && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <p className="text-sm font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                      <Calculator className="h-4 w-4" /> Auto-Computed Payment Plans
                    </p>
                    {(() => {
                      const total = parseInt(quickForm.totalCourseAmount);
                      const yrs = parseInt(quickForm.durationYears) || 3;
                      return (
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {["quarterly", "semester", "yearly", "full_course"].map(plan => {
                            const p = periodsForPlan(plan, yrs);
                            const amt = plan === "full_course" ? total : Math.round(total / p);
                            return (
                              <div key={plan} className="bg-white rounded-lg p-2.5 border border-emerald-100">
                                <div className="text-xs text-gray-500">{PLAN_LABELS[plan]}</div>
                                <div className="font-bold text-gray-800">₹{amt.toLocaleString("en-IN")} <span className="text-xs font-normal text-gray-500">× {p} {p === 1 ? "payment" : "payments"}</span></div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })()}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Academic Year</label>
                    <input value={quickForm.academicYear} onChange={e => setQuickForm(f => ({ ...f, academicYear: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Due Day of Month</label>
                    <input type="number" value={quickForm.dueDay} onChange={e => setQuickForm(f => ({ ...f, dueDay: e.target.value }))} min="1" max="28" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Fine Amount (₹)</label>
                    <input type="number" value={quickForm.fineAmount} onChange={e => setQuickForm(f => ({ ...f, fineAmount: e.target.value }))} min="0" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Fine Type</label>
                    <select value={quickForm.fineType} onChange={e => setQuickForm(f => ({ ...f, fineType: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                      <option value="fixed">Fixed</option>
                      <option value="per_day">Per Day</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 pt-3 border-t border-gray-200">
                  <button onClick={handleQuickSetup} className="flex-1 bg-emerald-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors">
                    Create All 4 Payment Plans
                  </button>
                  <button onClick={() => setShowQuickSetup(false)} className="px-6 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Single Fee Add/Edit Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="font-bold text-gray-800 text-lg">{editId ? "Edit Fee Structure" : "Add Fee Structure"}</h2>
                <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">✕</button>
              </div>
              <div className="px-6 py-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fee Category *</label>
                  <div className="grid grid-cols-4 gap-2">
                    {Object.entries(FEE_CATEGORIES).map(([key, cat]) => (
                      <button key={key} type="button" onClick={() => setForm(f => ({ ...f, feeCategory: key }))} className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${form.feeCategory === key ? "bg-brand-primary text-white border-brand-primary" : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"}`}>
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Code *</label>
                    <input value={form.courseCode} onChange={e => setForm(f => ({ ...f, courseCode: e.target.value.toUpperCase() }))} placeholder="e.g. BBA" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
                    <input value={form.academicYear} onChange={e => setForm(f => ({ ...f, academicYear: e.target.value }))} placeholder="e.g. 2026-27" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Name *</label>
                  <input value={form.courseName} onChange={e => setForm(f => ({ ...f, courseName: e.target.value }))} placeholder="e.g. Bachelor of Business Administration" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                </div>

                {isTuition && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="text-sm font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <Calculator className="h-4 w-4" /> Total Course Fee (Auto-Split Helper)
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Total Course Amount (₹)</label>
                        <input type="number" value={form.totalCourseAmount} onChange={e => setForm(f => ({ ...f, totalCourseAmount: e.target.value }))} placeholder="e.g. 300000" min="0" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Course Duration (Years)</label>
                        <select value={form.durationYears} onChange={e => setForm(f => ({ ...f, durationYears: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                          <option value="1">1 Year</option>
                          <option value="2">2 Years</option>
                          <option value="3">3 Years</option>
                          <option value="4">4 Years</option>
                          <option value="5">5 Years</option>
                        </select>
                      </div>
                    </div>
                    {computedPerPeriod > 0 && (
                      <div className="mt-3 flex items-center justify-between bg-white p-2.5 rounded-lg border border-blue-100">
                        <div className="text-xs">
                          <span className="text-gray-500">For <strong>{PLAN_LABELS[form.paymentPlan]}</strong>:</span>
                          {" "}
                          <span className="font-bold text-blue-700">₹{computedPerPeriod.toLocaleString("en-IN")} × {periods} payments = ₹{(computedPerPeriod * periods).toLocaleString("en-IN")}</span>
                        </div>
                        <button type="button" onClick={useComputed} className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded font-medium hover:bg-blue-700">
                          Use ₹{computedPerPeriod.toLocaleString("en-IN")}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Plan *</label>
                    <select value={form.paymentPlan} onChange={e => setForm(f => ({ ...f, paymentPlan: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary">
                      {PLANS.map(p => <option key={p} value={p}>{PLAN_LABELS[p]} ({PLAN_PERIODS[p]})</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹) per period *</label>
                    <input type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} placeholder="e.g. 25000" min="1" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                  </div>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <p className="text-sm font-semibold text-amber-800 mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Due Date & Late Fine Settings
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Due Day of Month</label>
                      <input type="number" value={form.dueDay} onChange={e => setForm(f => ({ ...f, dueDay: e.target.value }))} placeholder="15" min="1" max="28" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Fine Amount (₹)</label>
                      <input type="number" value={form.fineAmount} onChange={e => setForm(f => ({ ...f, fineAmount: e.target.value }))} placeholder="0" min="0" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Fine Type</label>
                      <select value={form.fineType} onChange={e => setForm(f => ({ ...f, fineType: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                        <option value="fixed">Fixed</option>
                        <option value="per_day">Per Day</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
                  <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="e.g. Includes lab fees, hostel excluded" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                </div>
                <div className="flex gap-3 pt-2 border-t border-gray-200">
                  <button onClick={handleSave} className="flex-1 bg-brand-primary text-white py-2.5 rounded-lg text-sm font-semibold hover:opacity-80 transition-colors">
                    {editId ? "Update Fee Structure" : "Add Fee Structure"}
                  </button>
                  <button onClick={resetForm} className="px-6 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-4">
          <input value={filterCode} onChange={e => setFilterCode(e.target.value)} placeholder="Search by course code or name..." className="w-full sm:w-80 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary" />
        </div>

        {loading ? (
          <div className="space-y-4">{[1, 2, 3].map(i => <div key={i} className="bg-white rounded-xl border h-32 animate-pulse" />)}</div>
        ) : filteredGroups.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <IndianRupee className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No fee structures found.</p>
            <p className="text-xs text-gray-400">Use <strong>Quick Setup</strong> to add all payment plans for a course in one click.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredGroups.map(([key, feeList]) => {
              const [code, name] = key.split("|");
              return (
                <div key={key} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="px-5 py-3 bg-brand-primary/5 border-b border-gray-200 flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-bold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded">{code}</span>
                    <span className="font-semibold text-gray-800 text-sm">{name}</span>
                    {(() => {
                      const tuitionFee = feeList.find(f => (f.feeCategory || "tuition") === "tuition" && f.totalCourseAmount);
                      if (tuitionFee?.totalCourseAmount) return (
                        <span className="text-xs bg-blue-50 border border-blue-200 text-blue-700 px-2 py-0.5 rounded">
                          Total: ₹{tuitionFee.totalCourseAmount.toLocaleString("en-IN")} / {tuitionFee.durationYears || 3}yr
                        </span>
                      );
                      return null;
                    })()}
                  </div>
                  <div className="divide-y divide-gray-100">
                    {feeList.map(f => {
                      const cat = FEE_CATEGORIES[f.feeCategory || "tuition"] || FEE_CATEGORIES.tuition;
                      return (
                        <div key={f.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${cat.color}`}>{cat.label}</span>
                              <span className="text-sm font-semibold text-gray-800">{PLAN_LABELS[f.paymentPlan] || f.paymentPlan}</span>
                              {f.academicYear && <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{f.academicYear}</span>}
                            </div>
                            {f.description && <span className="text-xs text-gray-500">{f.description}</span>}
                            <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-500 flex-wrap">
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
                      );
                    })}
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
