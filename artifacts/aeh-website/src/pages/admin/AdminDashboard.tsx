import { Link } from "wouter";
import { useGetDashboardStats, useListApplications, useListContacts } from "@workspace/api-client-react";
import { useAuth } from "@/lib/auth";
import { GraduationCap, Users, Briefcase, PhoneCall, LogOut, BarChart2, ChevronRight, BookOpen, IndianRupee, Receipt, UserSquare, Clock } from "lucide-react";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { data: stats } = useGetDashboardStats();
  const { data: applications } = useListApplications({ limit: 5 });
  const { data: contacts } = useListContacts({ limit: 3 });

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
        <h1 className="text-2xl font-bold text-foreground mb-4">Dashboard Overview</h1>

        {stats?.pendingStudents > 0 && (
          <Link href="/admin/students" className="block mb-6">
            <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 flex items-center justify-between hover:border-amber-400 hover:bg-amber-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-amber-400 rounded-xl flex items-center justify-center">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-amber-800">
                    {stats.pendingStudents} Student Registration{stats.pendingStudents > 1 ? "s" : ""} Awaiting Approval
                  </p>
                  <p className="text-amber-600 text-sm">New students cannot log in until you review and approve their accounts.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shrink-0">
                Review Now <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users, label: "Total Applications", value: stats?.totalApplications ?? "—", color: "bg-blue-600" },
            { icon: PhoneCall, label: "Contact Inquiries", value: stats?.totalContacts ?? "—", color: "bg-teal-600" },
            { icon: Briefcase, label: "Career Applications", value: stats?.totalCareers ?? "—", color: "bg-purple-600" },
            { icon: BarChart2, label: "Pending Reviews", value: stats?.pendingApplications ?? "—", color: "bg-amber-500" },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-card border border-border rounded-xl p-5">
              <div className={`h-10 w-10 ${color} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-foreground">{String(value)}</div>
              <div className="text-muted-foreground text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="font-semibold text-foreground">Recent Applications</h2>
              <Link href="/admin/applications" className="text-sm text-[hsl(219,60%,28%)] flex items-center gap-1 hover:gap-2 transition-all">
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="divide-y divide-border">
              {applications?.data?.slice(0, 5).map((app: any) => (
                <div key={app.id} className="flex justify-between items-center px-5 py-3">
                  <div>
                    <div className="font-medium text-sm text-foreground">{app.name}</div>
                    <div className="text-muted-foreground text-xs">{app.course} — {app.phone}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${app.status === "pending" ? "bg-amber-100 text-amber-700" : app.status === "reviewed" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
                    {app.status}
                  </span>
                </div>
              ))}
              {(!applications?.data || applications.data.length === 0) && (
                <div className="px-5 py-8 text-center text-muted-foreground text-sm">No applications yet</div>
              )}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="font-semibold text-foreground">Recent Inquiries</h2>
              <Link href="/admin/contacts" className="text-sm text-[hsl(219,60%,28%)] flex items-center gap-1 hover:gap-2 transition-all">
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="divide-y divide-border">
              {contacts?.data?.slice(0, 5).map((contact: any) => (
                <div key={contact.id} className="px-5 py-3">
                  <div className="font-medium text-sm text-foreground">{contact.name}</div>
                  <div className="text-muted-foreground text-xs mt-0.5">{contact.email} — {contact.phone}</div>
                  <p className="text-muted-foreground text-xs mt-1 line-clamp-1">{contact.message}</p>
                </div>
              ))}
              {(!contacts?.data || contacts.data.length === 0) && (
                <div className="px-5 py-8 text-center text-muted-foreground text-sm">No inquiries yet</div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-base font-semibold text-foreground mb-3">Admissions & Communications</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              { href: "/admin/applications", label: "Manage Applications", icon: Users },
              { href: "/admin/contacts", label: "Manage Inquiries", icon: PhoneCall },
              { href: "/admin/careers", label: "Career Applications", icon: Briefcase },
            ].map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className="flex items-center gap-4 bg-card border border-border rounded-xl p-5 hover:shadow-md hover:border-[hsl(219,60%,28%)] transition-all">
                <div className="h-10 w-10 bg-[hsl(219,60%,28%)]/10 rounded-xl flex items-center justify-center">
                  <Icon className="h-5 w-5 text-[hsl(219,60%,28%)]" />
                </div>
                <span className="font-medium text-foreground">{label}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
              </Link>
            ))}
          </div>
          <h2 className="text-base font-semibold text-foreground mb-3">Student & Academic Management</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: "/admin/students", label: "Manage Students", icon: UserSquare, color: "bg-green-50 text-green-700" },
              { href: "/admin/courses", label: "Manage Courses", icon: BookOpen, color: "bg-purple-50 text-purple-700" },
              { href: "/admin/fee-structures", label: "Fee Structures", icon: IndianRupee, color: "bg-orange-50 text-orange-700" },
              { href: "/admin/payments", label: "Fee Payments", icon: Receipt, color: "bg-blue-50 text-blue-700" },
            ].map(({ href, label, icon: Icon, color }) => (
              <Link key={href} href={href} className="flex items-center gap-4 bg-card border border-border rounded-xl p-5 hover:shadow-md hover:border-[hsl(219,60%,28%)] transition-all">
                <div className={`h-10 w-10 ${color} rounded-xl flex items-center justify-center`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-medium text-foreground text-sm">{label}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
