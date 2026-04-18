import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ChevronLeft, Search, AlertTriangle, CheckCircle, Clock, IndianRupee, Filter, Download } from "lucide-react";
import { useAuth } from "@/lib/auth";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

interface Student {
  id: number;
  name: string;
  email: string;
  rollNumber: string;
  course: string;
  courseCode: string;
  enrollmentYear: string;
  semester: string | null;
  admissionDate: string | null;
  status: string;
}

interface Payment {
  id: number;
  studentId: number;
  studentName: string;
  rollNumber: string;
  courseCode: string;
  amount: number;
  paymentPlan: string;
  periodLabel: string | null;
  status: string;
  paidAt: string | null;
  isLate: string;
  fineAmount: number;
  dueDate: string | null;
}

interface FeeStructure {
  id: number;
  courseCode: string;
  courseName: string;
  paymentPlan: string;
  amount: number;
  dueDay: number;
  fineAmount: number;
  fineType: string;
}

function getPeriodLabel(plan: string, admDate: string | null, periodNumber: number): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const start = admDate ? new Date(admDate) : new Date();
  const monthsPerPeriod = plan === "quarterly" ? 3 : plan === "semester" ? 6 : 12;
  const periodStart = new Date(start);
  periodStart.setMonth(periodStart.getMonth() + (periodNumber - 1) * monthsPerPeriod);
  const periodEnd = new Date(periodStart);
  periodEnd.setMonth(periodEnd.getMonth() + monthsPerPeriod - 1);
  return `${months[periodStart.getMonth()]} ${periodStart.getFullYear()}–${months[periodEnd.getMonth()]} ${periodEnd.getFullYear()}`;
}

function getCurrentPeriod(plan: string, admDate: string | null): number {
  const start = admDate ? new Date(admDate) : new Date();
  const now = new Date();
  const monthsElapsed = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  const monthsPerPeriod = plan === "quarterly" ? 3 : plan === "semester" ? 6 : 12;
  return Math.floor(monthsElapsed / monthsPerPeriod) + 1;
}

export default function AdminFeeTracker() {
  const { token } = useAuth();
  const authHeaders = { Authorization: `Bearer ${token}` };
  const [students, setStudents] = useState<Student[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [feeStructures, setFeeStructures] = useState<FeeStructure[]>([]);
  const [loading, setLoading] = useState(true);
  const [planFilter, setPlanFilter] = useState("quarterly");
  const [search, setSearch] = useState("");

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/students?status=active&limit=200`, { headers: authHeaders }).then(r => r.json()),
      fetch(`${API_BASE}/payments`, { headers: authHeaders }).then(r => r.json()),
      fetch(`${API_BASE}/fee-structures`, { headers: authHeaders }).then(r => r.json()),
    ]).then(([stu, pay, fees]) => {
      setStudents(stu.data || []);
      setPayments(pay.data || pay || []);
      setFeeStructures(Array.isArray(fees) ? fees : []);
      setLoading(false);
    });
  }, []);

  const filtered = students.filter(s => {
    const q = search.toLowerCase();
    return !q || s.name.toLowerCase().includes(q) || s.rollNumber.toLowerCase().includes(q) || s.courseCode.toLowerCase().includes(q);
  });

  const getPaymentsForStudent = (studentId: number) =>
    payments.filter(p => p.studentId === studentId && p.status === "success");

  const getFeeStructure = (courseCode: string, plan: string) =>
    feeStructures.find(f => f.courseCode === courseCode && f.paymentPlan === plan);

  const getCurrentPeriodLabel = (s: Student) => getPeriodLabel(planFilter, s.admissionDate, getCurrentPeriod(planFilter, s.admissionDate));

  const hasPaidCurrentPeriod = (s: Student) => {
    const currentLabel = getCurrentPeriodLabel(s);
    const paid = getPaymentsForStudent(s.id);
    return paid.some(p =>
      p.paymentPlan === planFilter &&
      (p.periodLabel === currentLabel || p.periodLabel?.includes(currentLabel.split("–")[0]))
    );
  };

  const paidStudents = filtered.filter(s => hasPaidCurrentPeriod(s));
  const unpaidStudents = filtered.filter(s => !hasPaidCurrentPeriod(s));

  const planLabel: Record<string, string> = {
    quarterly: "Quarterly (3 months)",
    semester: "Semester (6 months)",
    yearly: "Yearly",
    full_course: "Full Course",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-[hsl(219,40%,16%)] text-white px-6 py-4"><h1 className="text-lg font-bold">Fee Tracker</h1></div>
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="space-y-3">{[1, 2, 3].map(i => <div key={i} className="h-16 bg-white rounded-xl animate-pulse" />)}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[hsl(219,40%,16%)] text-white px-6 py-4">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-white/70 hover:text-white"><ChevronLeft className="h-5 w-5" /></Link>
          <IndianRupee className="h-5 w-5 text-[hsl(43,96%,55%)]" />
          <h1 className="text-lg font-bold">Fee Payment Tracker</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">{students.length}</div>
            <div className="text-sm text-gray-500">Active Students</div>
          </div>
          <div className="bg-green-50 rounded-xl border border-green-200 p-4 text-center">
            <div className="text-2xl font-bold text-green-700">{paidStudents.length}</div>
            <div className="text-sm text-green-600">Paid (Current Period)</div>
          </div>
          <div className="bg-red-50 rounded-xl border border-red-200 p-4 text-center">
            <div className="text-2xl font-bold text-red-700">{unpaidStudents.length}</div>
            <div className="text-sm text-red-600">Pending / Unpaid</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Payment Plan:</span>
          </div>
          <div className="flex gap-2">
            {["quarterly", "semester", "yearly"].map(plan => (
              <button
                key={plan}
                onClick={() => setPlanFilter(plan)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${planFilter === plan ? "bg-[hsl(219,40%,16%)] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >
                {plan.charAt(0).toUpperCase() + plan.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex-1 relative ml-auto max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search student..." className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Showing fee status for: <strong>{planLabel[planFilter]}</strong> — Current period shown per student based on their admission date.
        </p>

        {/* Unpaid Students */}
        {unpaidStudents.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <h2 className="font-bold text-red-700">Pending / Unpaid ({unpaidStudents.length})</h2>
            </div>
            <div className="bg-white rounded-xl border border-red-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-red-50 border-b border-red-100">
                    <th className="px-4 py-3 text-left font-semibold text-red-800">Student</th>
                    <th className="px-4 py-3 text-left font-semibold text-red-800">Roll No.</th>
                    <th className="px-4 py-3 text-left font-semibold text-red-800">Course</th>
                    <th className="px-4 py-3 text-left font-semibold text-red-800">Current Period</th>
                    <th className="px-4 py-3 text-left font-semibold text-red-800">Amount Due</th>
                    <th className="px-4 py-3 text-left font-semibold text-red-800">Fine</th>
                    <th className="px-4 py-3 text-left font-semibold text-red-800">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-50">
                  {unpaidStudents.map(s => {
                    const feeStr = getFeeStructure(s.courseCode, planFilter);
                    return (
                      <tr key={s.id} className="hover:bg-red-50/50">
                        <td className="px-4 py-3">
                          <p className="font-medium text-gray-800">{s.name}</p>
                          <p className="text-xs text-gray-500">{s.email}</p>
                        </td>
                        <td className="px-4 py-3"><span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">{s.rollNumber}</span></td>
                        <td className="px-4 py-3 text-gray-600">{s.courseCode}</td>
                        <td className="px-4 py-3 text-gray-600 text-xs">{getCurrentPeriodLabel(s)}</td>
                        <td className="px-4 py-3">
                          {feeStr ? <span className="font-semibold text-red-700">₹{feeStr.amount.toLocaleString()}</span> : <span className="text-gray-400">—</span>}
                        </td>
                        <td className="px-4 py-3">
                          {feeStr?.fineAmount ? <span className="text-red-600 font-medium">+₹{feeStr.fineAmount} ({feeStr.fineType === "per_day" ? "/day" : "fixed"})</span> : <span className="text-gray-400">No fine</span>}
                        </td>
                        <td className="px-4 py-3">
                          <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 w-fit">
                            <Clock className="h-3 w-3" /> Unpaid
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Paid Students */}
        {paidStudents.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <h2 className="font-bold text-green-700">Paid — Current Period ({paidStudents.length})</h2>
            </div>
            <div className="bg-white rounded-xl border border-green-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-green-50 border-b border-green-100">
                    <th className="px-4 py-3 text-left font-semibold text-green-800">Student</th>
                    <th className="px-4 py-3 text-left font-semibold text-green-800">Roll No.</th>
                    <th className="px-4 py-3 text-left font-semibold text-green-800">Course</th>
                    <th className="px-4 py-3 text-left font-semibold text-green-800">Period</th>
                    <th className="px-4 py-3 text-left font-semibold text-green-800">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-green-50">
                  {paidStudents.map(s => (
                    <tr key={s.id} className="hover:bg-green-50/50">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-800">{s.name}</p>
                        <p className="text-xs text-gray-500">{s.email}</p>
                      </td>
                      <td className="px-4 py-3"><span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">{s.rollNumber}</span></td>
                      <td className="px-4 py-3 text-gray-600">{s.courseCode}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{getCurrentPeriodLabel(s)}</td>
                      <td className="px-4 py-3">
                        <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 w-fit">
                          <CheckCircle className="h-3 w-3" /> Paid
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No active students found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
