import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  GraduationCap, LogOut, Menu, X, ChevronRight,
  LayoutDashboard, Users, PhoneCall, Briefcase, BookOpen,
  IndianRupee, Receipt, UserSquare, Calendar, TrendingUp, Sparkles,
} from "lucide-react";
import { useAuth } from "@/lib/auth";

type NavItem = { href: string; label: string; icon: typeof LayoutDashboard };
type NavGroup = { title: string; items: NavItem[] };

const NAV: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Admissions",
    items: [
      { href: "/admin/applications", label: "Applications", icon: Users },
      { href: "/admin/contacts", label: "Contact Inquiries", icon: PhoneCall },
      { href: "/admin/careers", label: "Careers", icon: Briefcase },
    ],
  },
  {
    title: "Academics",
    items: [
      { href: "/admin/students", label: "Students", icon: UserSquare },
      { href: "/admin/courses", label: "Courses", icon: BookOpen },
      { href: "/admin/events", label: "Events & News", icon: Calendar },
    ],
  },
  {
    title: "Finance",
    items: [
      { href: "/admin/fee-structures", label: "Fee Structures", icon: IndianRupee },
      { href: "/admin/fee-tracker", label: "Fee Tracker", icon: TrendingUp },
      { href: "/admin/payments", label: "Payments", icon: Receipt },
    ],
  },
  {
    title: "Customization",
    items: [
      { href: "/admin/customize", label: "Customize Site", icon: Sparkles },
    ],
  },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => { setMobileOpen(false); }, [location]);

  const isActive = (href: string) => location === href || (href !== "/admin" && location.startsWith(href));

  const sidebar = (
    <nav className="flex flex-col h-full">
      <div className="px-5 py-4 flex items-center gap-2.5 border-b border-white/10">
        <div className="h-9 w-9 bg-brand-accent rounded-lg flex items-center justify-center shrink-0">
          <GraduationCap className="h-5 w-5 text-brand-primary" />
        </div>
        <div className="min-w-0">
          <div className="font-bold text-white text-sm leading-tight truncate">AEH Admin</div>
          <div className="text-white/50 text-[11px] leading-tight">Control Panel</div>
        </div>
        <button onClick={() => setMobileOpen(false)} className="ml-auto lg:hidden text-white/60 hover:text-white">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-3 px-2.5 space-y-4">
        {NAV.map((group) => (
          <div key={group.title}>
            <div className="px-3 mb-1.5 text-[10px] font-bold text-white/40 uppercase tracking-wider">{group.title}</div>
            <div className="space-y-0.5">
              {group.items.map(({ href, label, icon: Icon }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`group flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                      active
                        ? "bg-brand-accent text-brand-primary font-semibold shadow-md"
                        : "text-white/75 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${active ? "" : "opacity-80"}`} />
                    <span className="flex-1 truncate">{label}</span>
                    {active && <ChevronRight className="h-3.5 w-3.5 opacity-70" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 p-3">
        <div className="bg-white/5 rounded-lg px-3 py-2.5 mb-2">
          <div className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Signed in as</div>
          <div className="text-white text-sm font-semibold truncate">{user?.username}</div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-200 hover:text-red-100 text-sm font-semibold transition-colors"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile top bar */}
      <div className="fixed top-0 inset-x-0 z-30 bg-brand-primary text-white px-4 py-3 flex items-center justify-between lg:hidden border-b border-white/10">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-brand-accent" />
          <span className="font-bold text-sm">AEH Admin</span>
        </div>
        <button onClick={() => setMobileOpen(true)} className="p-1.5 hover:bg-white/10 rounded">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar — desktop fixed, mobile drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-brand-primary transform transition-transform duration-200 lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen lg:shrink-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebar}
      </aside>

      {/* Main content area */}
      <main className="flex-1 min-w-0 pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  );
}
