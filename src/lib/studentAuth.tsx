import { useState, useEffect, useCallback } from "react";
import { StudentAuthContext, type StudentUser } from "@/hooks/useStudentAuth";

const API_BASE = import.meta.env.VITE_API_URL || "/api";
const TOKEN_KEY = "aeh_student_token";

export function StudentAuthProvider({ children }: { children: React.ReactNode }) {
  const [student, setStudent] = useState<StudentUser | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    if (!savedToken) { setIsLoading(false); return; }
    fetch(`${API_BASE}/student/me`, { headers: { Authorization: `Bearer ${savedToken}` } })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) {
          setStudent(data);
          setToken(savedToken);
        } else {
          localStorage.removeItem(TOKEN_KEY);
          setToken(null);
        }
      })
      .catch(() => { localStorage.removeItem(TOKEN_KEY); setToken(null); })
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/student/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setStudent(data.student);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setStudent(null);
  }, []);

  return (
    <StudentAuthContext.Provider value={{ student, token, login, logout, isLoading }}>
      {children}
    </StudentAuthContext.Provider>
  );
}
