import { useState } from "react";
import { Link } from "wouter";
import { Receipt, Trash2, Search, ChevronLeft, CheckCircle, XCircle, IndianRupee } from "lucide-react";
import { useAuth } from "@/lib/auth";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

interface Payment {
  id: number;
  receiptNumber: string;
  studentName: string;
  studentEmail: string;
  rollNumber: string;
  courseName: string;
  courseCode: string;
  paymentPlan: string;
  amount: number;
  status: string;
  razorpayPaymentId: string | null;
  paidAt: string | null;
  createdAt: string;
}

const PLAN_LABELS: Record<string, string> = {
  quarterly: "Quarterly", semester: "Per Semester", yearly: "Yearly", full_course: "Full Course",
};

const STATUS_COLORS: Record<string, string> = {
  success: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  failed: "bg-red-100 text-red-700",
  refunded: "bg-blue-100 text-blue-700",
};

export default function AdminPayments() {
  const { token } = useAuth();
  const headers = { Authorization: `Bearer ${token}` };
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const load = async () => {
    setLoading(true);
    const r = await fetch(`${API_BASE}/payments`, { headers });
    const data = await r.json();
    setPayments(Array.isArray(data) ? data : []);
    setLoaded(true);
    setLoading(false);
  };

  if (!loaded && !loading) load();

  const handleDelete = async (id: number, receipt: string) => {
    if (!confirm(`Delete payment record "${receipt}"? This cannot be undone.`)) return;
    const r = await fetch(`${API_BASE}/payments/${id}`, { method: "DELETE", headers: { ...headers, "Content-Type": "application/json" } });
    if (r.ok) { setMsg({ type: "success", text: "Payment record deleted" }); load(); }
    else setMsg({ type: "error", text: "Failed to delete" });
    setTimeout(() => setMsg(null), 3000);
  };

  const filtered = payments.filter(p =>
    !search || p.studentName.toLowerCase().includes(search.toLowerCase()) ||
    p.rollNumber.toLowerCase().includes(search.toLowerCase()) ||
    p.receiptNumber.toLowerCase().includes(search.toLowerCase())
  );

  const totalSuccess = payments.filter(p => p.status === "success").reduce((s, p) => s + p.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[hsl(219,40%,16%)] text-white px-6 py-4 flex items-center gap-3">
        <Link href="/admin" className="text-white/70 hover:text-white"><ChevronLeft className="h-5 w-5" /></Link>
        <Receipt className="h-5 w-5 text-[hsl(43,96%,55%)]" />
        <h1 className="text-lg font-bold">Fee Payments</h1>
        <span className="ml-auto text-sm text-white/70">Total Collected: <span className="font-bold text-[hsl(43,96%,55%)]">₹{totalSuccess.toLocaleString("en-IN")}</span></span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {msg && (
          <div className={`mb-4 p-3 rounded-lg text-sm flex items-center gap-2 ${msg.type === "success" ? "bg-green-50 border border-green-200 text-green-700" : "bg-red-50 border border-red-200 text-red-700"}`}>
            {msg.type === "success" ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            {msg.text}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by student name, roll number, or receipt..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="bg-white rounded-xl border h-20 animate-pulse" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Receipt className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No payment records found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Receipt No.</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Student</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Course</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Plan</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Amount</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-[hsl(219,40%,16%)] font-semibold">{p.receiptNumber}</td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-800">{p.studentName}</p>
                        <p className="text-xs text-gray-400">{p.rollNumber}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{p.courseCode}</td>
                      <td className="px-4 py-3 text-gray-600">{PLAN_LABELS[p.paymentPlan] || p.paymentPlan}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-0.5 font-bold text-gray-800">
                          <IndianRupee className="h-3.5 w-3.5" />{p.amount.toLocaleString("en-IN")}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[p.status] || "bg-gray-100 text-gray-600"}`}>{p.status}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">
                        {p.paidAt ? new Date(p.paidAt).toLocaleDateString("en-IN") : new Date(p.createdAt).toLocaleDateString("en-IN")}
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => handleDelete(p.id, p.receiptNumber)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
