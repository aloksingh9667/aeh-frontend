import { useState } from "react";
import { Link } from "wouter";
import { GraduationCap, Eye, EyeOff, CheckCircle, Clock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

const COURSES = [
  { name: "Bachelor of Business Administration", code: "BBA" },
  { name: "Master of Business Administration", code: "MBA" },
  { name: "Bachelor of Computer Applications", code: "BCA" },
  { name: "Master of Computer Applications", code: "MCA" },
  { name: "Bachelor of Commerce", code: "BCOM" },
  { name: "Master of Commerce", code: "MCOM" },
  { name: "Bachelor of Arts", code: "BA" },
  { name: "Bachelor of Journalism & Mass Communication", code: "BJMC" },
  { name: "Bachelor of Pharmacy", code: "BPHARM" },
  { name: "Diploma in Pharmacy", code: "DPHARM" },
  { name: "BA LLB", code: "BALLB" },
  { name: "Bachelor of Education", code: "BED" },
];

export default function StudentRegister() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", password: "", confirmPassword: "",
    rollNumber: "", course: "", courseCode: "", enrollmentYear: new Date().getFullYear().toString(),
  });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCourse = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = COURSES.find(c => c.code === e.target.value);
    setForm(f => ({ ...f, course: selected?.name || "", courseCode: selected?.code || "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) { setError("Passwords do not match"); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    if (!form.courseCode) { setError("Please select a course"); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/student/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, email: form.email, phone: form.phone,
          password: form.password, rollNumber: form.rollNumber,
          course: form.course, courseCode: form.courseCode,
          enrollmentYear: form.enrollmentYear,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const years = Array.from({ length: 5 }, (_, i) => (new Date().getFullYear() - i).toString());

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden text-center">
              <div className="bg-[hsl(219,40%,16%)] px-8 py-6">
                <CheckCircle className="h-12 w-12 text-[hsl(43,96%,55%)] mx-auto mb-2" />
                <h1 className="text-xl font-bold text-white">Registration Submitted!</h1>
              </div>
              <div className="px-8 py-8">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-amber-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-2">Awaiting Admin Approval</h2>
                <p className="text-sm text-gray-500 mb-4">
                  Your registration request has been submitted successfully. An administrator will review and approve your account shortly.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-left mb-6">
                  <p className="text-sm text-blue-800 font-semibold mb-1">What happens next?</p>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Admin reviews your registration details</li>
                    <li>• Your account is activated upon approval</li>
                    <li>• You can then log in with your email & password</li>
                    <li>• For urgent matters, contact the admissions office</li>
                  </ul>
                </div>
                <p className="text-xs text-gray-400 mb-6">
                  Registered with: <span className="font-medium text-gray-600">{form.email}</span>
                </p>
                <Link href="/student/login" className="block bg-[hsl(219,40%,16%)] text-white py-3 rounded-lg font-semibold hover:bg-[hsl(219,40%,24%)] transition-colors text-sm">
                  Go to Login
                </Link>
                <a href="tel:+917772156789" className="block mt-3 text-sm text-[hsl(219,40%,40%)] hover:underline">
                  Contact Admissions: +91 77721 56789
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-[hsl(219,40%,16%)] px-8 py-6 text-center">
              <GraduationCap className="h-10 w-10 text-[hsl(43,96%,55%)] mx-auto mb-2" />
              <h1 className="text-xl font-bold text-white">Student Registration</h1>
              <p className="text-white/70 text-sm mt-1">Create your student portal account</p>
            </div>
            <div className="px-8 py-6">
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-700 flex items-start gap-2">
                <Clock className="h-4 w-4 shrink-0 mt-0.5" />
                <span>After registration, your account will be <strong>reviewed by an administrator</strong> before you can log in.</span>
              </div>
              {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required placeholder="Your full name" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number *</label>
                    <input type="text" value={form.rollNumber} onChange={e => setForm(f => ({ ...f, rollNumber: e.target.value }))} required placeholder="e.g. BBA23001" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required placeholder="your@email.com" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} required placeholder="10-digit mobile number" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course *</label>
                    <select value={form.courseCode} onChange={handleCourse} required className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]">
                      <option value="">Select Course</option>
                      {COURSES.map(c => <option key={c.code} value={c.code}>{c.code} – {c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Year *</label>
                    <select value={form.enrollmentYear} onChange={e => setForm(f => ({ ...f, enrollmentYear: e.target.value }))} required className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]">
                      {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                  <div className="relative">
                    <input type={showPwd ? "text" : "password"} value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required placeholder="Minimum 6 characters" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)] pr-10" />
                    <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
                  <input type="password" value={form.confirmPassword} onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))} required placeholder="Re-enter password" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-[hsl(219,40%,16%)] text-white py-3 rounded-lg font-semibold hover:bg-[hsl(219,40%,24%)] transition-colors disabled:opacity-60">
                  {loading ? "Submitting..." : "Submit Registration"}
                </button>
              </form>
              <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/student/login" className="text-[hsl(219,40%,40%)] font-semibold hover:underline">Login here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
