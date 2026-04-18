import { useState } from "react";
import { Link, useLocation } from "wouter";
import { GraduationCap, Eye, EyeOff, LogIn } from "lucide-react";
import { useStudentAuth } from "@/hooks/useStudentAuth";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useStudentAuth();
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      setLocation("/student/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
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
              <h1 className="text-2xl font-bold text-white">Student Portal</h1>
              <p className="text-white/70 text-sm mt-1">Login to access your student dashboard</p>
            </div>
            <div className="px-8 py-8">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)] focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <Link href="/student/forgot-password" className="text-xs text-[hsl(219,40%,40%)] hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showPwd ? "text" : "password"}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(219,40%,40%)] focus:border-transparent text-sm pr-12"
                    />
                    <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPwd ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[hsl(219,40%,16%)] text-white py-3 rounded-lg font-semibold hover:bg-[hsl(219,40%,24%)] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? "Logging in..." : <><LogIn className="h-5 w-5" /> Login</>}
                </button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  New student?{" "}
                  <Link href="/student/register" className="text-[hsl(219,40%,40%)] font-semibold hover:underline">Register here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
