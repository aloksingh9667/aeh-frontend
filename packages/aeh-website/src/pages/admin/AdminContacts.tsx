import { useState } from "react";
import { Link } from "wouter";
import { useListContacts } from "@workspace/api-client-react";
import { useAuth } from "@/lib/auth";
import { GraduationCap, LogOut, ArrowLeft, Search, ChevronLeft, ChevronRight, Mail, Phone, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

export default function AdminContacts() {
  const { user, logout, token } = useAuth();
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, refetch } = useListContacts({ page, limit: 20, search: search || undefined });

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete inquiry from "${name}"?`)) return;
    const r = await fetch(`${API_BASE}/contacts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (r.ok) { toast({ title: "Inquiry deleted" }); refetch(); }
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
          <h1 className="text-2xl font-bold text-foreground">Contact Inquiries</h1>
        </div>

        <div className="flex gap-3 mb-5">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="w-full border border-input bg-background rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Search by name, email..." />
          </div>
        </div>

        <div className="grid gap-4">
          {isLoading ? (
            <div className="text-center py-10 text-muted-foreground">Loading...</div>
          ) : data?.data?.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">No inquiries found</div>
          ) : data?.data?.map((contact: any) => (
            <div key={contact.id} className="bg-card border border-border rounded-xl p-5">
              <div className="flex flex-wrap justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{contact.name}</h3>
                  <div className="flex gap-4 mt-1">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Mail className="h-3.5 w-3.5" />{contact.email}</span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Phone className="h-3.5 w-3.5" />{contact.phone}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  {contact.course && (
                    <span className="bg-[hsl(219,60%,28%)]/10 text-[hsl(219,60%,28%)] text-xs font-semibold px-3 py-1 rounded-full">
                      {contact.course} {contact.classType ? `(${contact.classType})` : ""}
                    </span>
                  )}
                  <button onClick={() => handleDelete(contact.id, contact.name)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{contact.message}</p>
            </div>
          ))}
        </div>

        {data?.pagination && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <span className="text-xs text-muted-foreground">Total: {data.pagination.total} inquiries</span>
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
      </main>
    </div>
  );
}
