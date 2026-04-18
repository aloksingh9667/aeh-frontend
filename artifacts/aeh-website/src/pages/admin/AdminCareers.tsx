import { useState } from "react";
import { Link } from "wouter";
import { useListCareers } from "@workspace/api-client-react";
import { useAuth } from "@/lib/auth";
import { GraduationCap, LogOut, ArrowLeft, Search, ChevronLeft, ChevronRight, Mail, Phone, ExternalLink, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

export default function AdminCareers() {
  const { user, logout, token } = useAuth();
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, refetch } = useListCareers({ page, limit: 20, search: search || undefined });

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete career application from "${name}"?`)) return;
    const r = await fetch(`${API_BASE}/careers/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (r.ok) { toast({ title: "Career application deleted" }); refetch(); }
    else toast({ title: "Failed to delete", variant: "destructive" });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-[hsl(219,40%,16%)] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-7 w-7 text-[hsl(43,96%,55%)]" />
          <span className="font-bold text-lg">AEH Admin Portal</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/70 text-sm">Welcome, {user?.username}</span>
          <button onClick={logout} className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Career Applications</h1>
        </div>

        <div className="flex gap-3 mb-5">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="w-full border border-input bg-background rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Search by name, position..." />
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50 text-left">
                  <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Applicant</th>
                  <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Contact</th>
                  <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Position</th>
                  <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">CV</th>
                  <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {isLoading ? (
                  <tr><td colSpan={5} className="text-center py-10 text-muted-foreground">Loading...</td></tr>
                ) : data?.data?.length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-10 text-muted-foreground">No career applications found</td></tr>
                ) : data?.data?.map((career: any) => (
                  <tr key={career.id} className="hover:bg-muted/20">
                    <td className="px-4 py-3">
                      <div className="font-medium text-sm text-foreground">{career.name}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-xs text-foreground"><Mail className="h-3.5 w-3.5" />{career.email}</div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5"><Phone className="h-3.5 w-3.5" />{career.phone}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{career.position || "—"}</td>
                    <td className="px-4 py-3">
                      {career.cvUrl ? (
                        <a href={career.cvUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[hsl(219,60%,28%)] text-xs font-medium hover:underline">
                          <ExternalLink className="h-3.5 w-3.5" /> View CV
                        </a>
                      ) : (
                        <span className="text-muted-foreground text-xs">Not provided</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleDelete(career.id, career.name)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data?.pagination && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-border">
              <span className="text-xs text-muted-foreground">Total: {data.pagination.total} applications</span>
              <div className="flex gap-2">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 rounded border border-border disabled:opacity-40 hover:bg-muted transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-xs text-foreground px-2 flex items-center">Page {page} of {data.pagination.totalPages}</span>
                <button onClick={() => setPage(p => Math.min(data.pagination.totalPages, p + 1))} disabled={page === data.pagination.totalPages} className="p-1.5 rounded border border-border disabled:opacity-40 hover:bg-muted transition-colors">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
