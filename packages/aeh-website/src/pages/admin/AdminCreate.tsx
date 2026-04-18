import { useState } from "react";
import { Link, useLocation } from "wouter";
import { GraduationCap, Lock, User, ShieldCheck, KeyRound, ArrowLeft, CheckCircle } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

type Step = "secret" | "otp" | "details" | "done";

const ROLES = [
  { value: "admin", label: "Admin (Full Access)" },
  { value: "admissions_officer", label: "Admissions Officer" },
  { value: "content_manager", label: "Content Manager" },
];

export default function AdminCreate() {
  const [step, setStep] = useState<Step>("secret");
  const [secretKey, setSecretKey] = useState("");
  const [otp, setOtp] = useState("");
  const [form, setForm] = useState({ username: "", password: "", name: "", role: "admin" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [createdAdmin, setCreatedAdmin] = useState<{ username: string; name: string; role: string } | null>(null);
  const [, setLocation] = useLocation();

  const handleVerifySecret = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/verify-secret`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secretKey }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid secret key");
      setStep("otp");
    } catch (err: any) {
      setError(err.message || "Invalid secret key");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secretKey, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid OTP");
      setStep("details");
    } catch (err: any) {
      setError(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/create-admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secretKey, otp, ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create admin");
      setCreatedAdmin(data.admin);
      setStep("done");
    } catch (err: any) {
      setError(err.message || "Failed to create admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(219,40%,10%)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-[hsl(43,96%,55%)] rounded-2xl mb-4">
            <ShieldCheck className="h-9 w-9 text-[hsl(219,40%,16%)]" />
          </div>
          <h1 className="text-2xl font-bold text-white">Create New Admin</h1>
          <p className="text-white/60 mt-1 text-sm">Avviare Educational Hub</p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          {(["secret", "otp", "details"] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step === s ? "bg-[hsl(43,96%,55%)] text-[hsl(219,40%,16%)]" :
                (["secret","otp","details"].indexOf(step) > i) ? "bg-green-500 text-white" : "bg-white/20 text-white/50"
              }`}>
                {(["secret","otp","details"].indexOf(step) > i) ? "✓" : i + 1}
              </div>
              {i < 2 && <div className="w-8 h-0.5 bg-white/20" />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>
          )}

          {step === "secret" && (
            <form onSubmit={handleVerifySecret} className="space-y-5">
              <div className="text-center mb-4">
                <Lock className="h-8 w-8 text-[hsl(219,40%,30%)] mx-auto mb-2" />
                <h2 className="text-lg font-semibold text-gray-800">Enter Secret Key</h2>
                <p className="text-sm text-gray-500 mt-1">Enter the admin creation secret key to continue</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Secret Key</label>
                <input
                  type="password"
                  value={secretKey}
                  onChange={e => setSecretKey(e.target.value)}
                  placeholder="Enter secret key"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]"
                />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-[hsl(219,60%,28%)] text-white font-bold py-3 rounded-lg hover:bg-[hsl(219,60%,22%)] transition-colors disabled:opacity-50">
                {loading ? "Verifying..." : "Continue"}
              </button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="text-center mb-4">
                <KeyRound className="h-8 w-8 text-[hsl(219,40%,30%)] mx-auto mb-2" />
                <h2 className="text-lg font-semibold text-gray-800">Enter OTP</h2>
                <p className="text-sm text-gray-500 mt-1">Enter the one-time password to verify your identity</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  required
                  maxLength={6}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)] tracking-widest text-center text-lg font-mono"
                />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-[hsl(219,60%,28%)] text-white font-bold py-3 rounded-lg hover:bg-[hsl(219,60%,22%)] transition-colors disabled:opacity-50">
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
              <button type="button" onClick={() => { setStep("secret"); setError(""); }} className="w-full text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1">
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            </form>
          )}

          {step === "details" && (
            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <div className="text-center mb-4">
                <User className="h-8 w-8 text-[hsl(219,40%,30%)] mx-auto mb-2" />
                <h2 className="text-lg font-semibold text-gray-800">Admin Details</h2>
                <p className="text-sm text-gray-500 mt-1">Fill in the new admin's information</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required placeholder="e.g. John Doe" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
                <input type="text" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} required placeholder="e.g. john.admin" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required placeholder="Minimum 6 characters" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
                <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)]">
                  {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                </select>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-[hsl(219,60%,28%)] text-white font-bold py-3 rounded-lg hover:bg-[hsl(219,60%,22%)] transition-colors disabled:opacity-50 mt-2">
                {loading ? "Creating..." : "Create Admin"}
              </button>
            </form>
          )}

          {step === "done" && createdAdmin && (
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <h2 className="text-xl font-bold text-gray-800">Admin Created!</h2>
              <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Name:</span>
                  <span className="font-semibold text-gray-800">{createdAdmin.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Username:</span>
                  <span className="font-mono font-semibold text-gray-800">{createdAdmin.username}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Role:</span>
                  <span className="font-semibold text-gray-800 capitalize">{createdAdmin.role.replace(/_/g, " ")}</span>
                </div>
              </div>
              <button onClick={() => setLocation("/admin/login")} className="w-full bg-[hsl(219,60%,28%)] text-white font-bold py-3 rounded-lg hover:bg-[hsl(219,60%,22%)] transition-colors">
                Go to Admin Login
              </button>
            </div>
          )}

          {step !== "done" && (
            <div className="mt-5 text-center">
              <Link href="/admin/login" className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1">
                <ArrowLeft className="h-4 w-4" /> Back to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
