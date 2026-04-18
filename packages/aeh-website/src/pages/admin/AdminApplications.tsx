import { useState } from "react";
import { Link } from "wouter";
import { useListApplications, useUpdateApplicationStatus } from "@workspace/api-client-react";
import { useAuth } from "@/lib/auth";
import { GraduationCap, LogOut, ArrowLeft, Search, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  reviewed: "bg-blue-100 text-blue-700",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default function AdminApplications() {
  const { user, logout, token } = useAuth();
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const { data, isLoading, refetch } = useListApplications({ page, limit: 20, search: search || undefined, status: statusFilter as "pending" | "reviewed" | "accepted" | "rejected" || undefined });
  const updateStatus = useUpdateApplicationStatus();

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete application from "${name}"?`)) return;
    const r = await fetch(`${API_BASE}/applications/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (r.ok) { toast({ title: "Application deleted" }); refetch(); }
    else toast({ title: "Failed to delete", variant: "destructive" });
  };

  const handleStatusChange = (id: string, status: string) => {
    updateStatus.mutate(
      { id, data: { status: status as "pending" | "reviewed" | "accepted" | "rejected" } },
      {
        onSuccess: () => { refetch(); toast({ title: "Status updated" }); },
        onError: () => toast({ title: "Failed to update status", variant: "destructive" }),
      }
    );
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
          <h1 className="text-2xl font-bold text-foreground">Applications Management</h1>
        </div>

        <div className="flex flex-wrap gap-3 mb-5">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="w-full border border-input bg-background rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Search by name, email, phone..." />
          </div>
          <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50 text-left">
                  <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Name</th>
                  <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Contact</th>
                  <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Course</th>
                  <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Class</th>
                  <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                  <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Action</th>
                  <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {isLoading ? (
                  <tr><td colSpan={6} className="text-center py-10 text-muted-foreground">Loading...</td></tr>
                ) : data?.data?.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-10 text-muted-foreground">No applications found</td></tr>
                ) : data?.data?.map((app: any) => (
                  <tr key={app.id} className="hover:bg-muted/20">
                    <td className="px-4 py-3">
                      <div className="font-medium text-sm text-foreground">{app.name}</div>
                      {app.message && <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{app.message}</div>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs text-foreground">{app.email}</div>
                      <div className="text-xs text-muted-foreground">{app.phone}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground">{app.course}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground capitalize">{app.classType}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${statusColors[app.status] || ""}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={app.status}
                        onChange={e => handleStatusChange(app.id, e.target.value)}
                        className="border border-input bg-background rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleDelete(app.id, app.name)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
