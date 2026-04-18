import React, { createContext, useContext, useEffect } from "react";
import { useGetMe, getGetMeQueryKey, type AdminUser } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";

interface AuthContextType {
  user: AdminUser | null;
  isLoading: boolean;
  logout: () => void;
  login: (token: string) => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("aeh_admin_token");
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  const { data: user, isLoading, isError } = useGetMe({
    query: {
      enabled: !!token,
      retry: false,
    },
    request: {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    }
  });

  const logout = () => {
    localStorage.removeItem("aeh_admin_token");
    queryClient.setQueryData(getGetMeQueryKey(), null);
    setLocation("/admin/login");
  };

  const login = (newToken: string) => {
    localStorage.setItem("aeh_admin_token", newToken);
    queryClient.invalidateQueries({ queryKey: getGetMeQueryKey() });
    setLocation("/admin");
  };

  useEffect(() => {
    if (isError) {
      logout();
    }
  }, [isError]);

  return (
    <AuthContext.Provider value={{ user: user || null, isLoading: isLoading && !!token, logout, login, token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
