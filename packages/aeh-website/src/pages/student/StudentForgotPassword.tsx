import { useState } from "react";
import { Link, useLocation } from "wouter";
import { GraduationCap, ArrowLeft, CheckCircle, Eye, EyeOff } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

type Step = "email" | "reset" | "done";

export default function StudentForgotPassword() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/student/check-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Email not found");
      setStep("reset");
    } catch (err: any) {
      setError(err.message || "No account found with this email");
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/student/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to reset password");
      setStep("done");
    } catch (err: any) {
      setError(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-[hsl(219,40%,16%)] px-8 py-8 text-center">
              <GraduationCap className="h-12 w-12 text-[hsl(43,96%,55%)] mx-auto mb-3" />
              <h1 className="text-2xl font-bold text-white">Forgot Password</h1>
              <p className="text-white/70 text-sm mt-1">Reset your student portal password</p>
            </div>
            <div className="px-8 py-8">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>
              )}

              {step === "email" && (
                <form onSubmit={handleEmailSubmit} className="space-y-5">
                  <p className="text-sm text-gray-600 text-center">
                    Enter your registered email address to reset your password.
                  </p>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)] text-sm"
                    />
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-[hsl(219,40%,16%)] text-white py-3 rounded-lg font-semibold hover:bg-[hsl(219,40%,24%)] transition-colors disabled:opacity-60">
                    {loading ? "Checking..." : "Continue"}
                  </button>
                </form>
              )}

              {step === "reset" && (
                <form onSubmit={handleResetSubmit} className="space-y-5">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700 text-center">
                      Account found for <span className="font-semibold">{email}</span>. Please set a new password.
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
                    <div className="relative">
                      <input
                        type={showPwd ? "text" : "password"}
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        placeholder="Minimum 6 characters"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)] text-sm pr-12"
                      />
                      <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPwd ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)] text-sm"
                    />
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-[hsl(219,40%,16%)] text-white py-3 rounded-lg font-semibold hover:bg-[hsl(219,40%,24%)] transition-colors disabled:opacity-60">
                    {loading ? "Resetting..." : "Reset Password"}
                  </button>
                  <button type="button" onClick={() => { setStep("email"); setError(""); }} className="w-full text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                </form>
              )}

              {step === "done" && (
                <div className="text-center space-y-4 py-4">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                  <h2 className="text-xl font-bold text-gray-800">Password Reset!</h2>
                  <p className="text-sm text-gray-600">Your password has been reset successfully. You can now login with your new password.</p>
                  <button onClick={() => setLocation("/student/login")} className="w-full bg-[hsl(219,40%,16%)] text-white py-3 rounded-lg font-semibold hover:bg-[hsl(219,40%,24%)] transition-colors">
                    Go to Login
                  </button>
                </div>
              )}

              {step !== "done" && (
                <div className="mt-5 text-center">
                  <Link href="/student/login" className="text-sm text-[hsl(219,40%,40%)] hover:underline flex items-center justify-center gap-1">
                    <ArrowLeft className="h-4 w-4" /> Back to Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
