import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, GraduationCap, User, LogOut, Phone, Mail } from "lucide-react";
import { useStudentAuth } from "@/hooks/useStudentAuth";

const programs = [
  { label: "School of Management", sub: "BBA, MBA", href: "/school-of-management" },
  { label: "School of CS & IT", sub: "BCA, MCA", href: "/school-of-cs-it" },
  { label: "School of Commerce", sub: "B.Com, M.Com", href: "/school-of-commerce" },
  { label: "School of Humanities", sub: "BA, MA", href: "/school-of-humanities" },
  { label: "School of Communication", sub: "BJMC, MJMC, DJMC", href: "/school-of-communication" },
  { label: "School of Law", sub: "BA LL.B, LL.M", href: "/school-of-law" },
  { label: "School of Pharmacy", sub: "B.Pharm, D.Pharm", href: "/school-of-pharmacy" },
  { label: "School of Education", sub: "B.Ed, M.Ed", href: "/school-of-education" },
  { label: "School of Applied Science", sub: "B.Sc, M.Sc", href: "/school-of-applied-science" },
];

const aboutLinks = [
  { label: "About Avviare", href: "/about" },
  { label: "Core Values", href: "/core-values" },
  { label: "Our Leadership", href: "/leadership" },
  { label: "Academic Council", href: "/academic-council" },
  { label: "Our Team", href: "/team" },
];

const placementLinks = [
  { label: "Our Placements", href: "/placements" },
  { label: "Top Recruiters", href: "/top-recruiters" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const { student, logout } = useStudentAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => { setMobileOpen(false); setMobileSection(null); }, [location]);

  const toggle = (name: string) => setOpenDropdown(prev => prev === name ? null : name);
  const closeMobile = () => { setMobileOpen(false); setMobileSection(null); };

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-[hsl(219,40%,12%)] text-white/60 text-xs px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-8">
          <div className="flex items-center gap-6">
            <a href="tel:+917772156789" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="h-3 w-3" /> +91 77721 56789
            </a>
            <a href="mailto:info@avviare.edu.in" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="h-3 w-3" /> info@avviare.edu.in
            </a>
          </div>
          <div className="flex items-center gap-4 text-white/50">
            <span>Admissions Open 2026-27</span>
            <span className="text-[hsl(43,96%,55%)] font-medium">Last Date: June 30, 2026</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        ref={dropdownRef}
        className={`bg-[hsl(219,40%,16%)] text-white sticky top-0 z-50 transition-shadow duration-200 ${scrolled ? "shadow-2xl" : "shadow-lg"}`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 font-bold shrink-0 group">
              <div className="h-9 w-9 bg-[hsl(43,96%,55%)] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <GraduationCap className="h-5 w-5 text-[hsl(219,40%,16%)]" />
              </div>
              <div className="leading-tight">
                <span className="text-[hsl(43,96%,55%)] font-extrabold text-base hidden sm:block">Avviare</span>
                <span className="text-white/80 text-xs font-medium hidden sm:block">Educational Hub</span>
                <span className="text-[hsl(43,96%,55%)] font-extrabold text-base sm:hidden">AEH</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden xl:flex items-center gap-0.5">
              <NavLink href="/" active={location === "/"}>Home</NavLink>
              <DropdownNav label="About" isOpen={openDropdown === "about"} onToggle={() => toggle("about")}>
                {aboutLinks.map(l => <DropdownItem key={l.href} href={l.href} label={l.label} onClick={() => setOpenDropdown(null)} />)}
              </DropdownNav>
              <DropdownNav label="Programs" isOpen={openDropdown === "programs"} onToggle={() => toggle("programs")} wide>
                <div className="grid grid-cols-2 gap-0.5 p-1">
                  {programs.map(l => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpenDropdown(null)}
                      className="flex flex-col px-4 py-2.5 rounded-lg hover:bg-blue-50 group transition-colors"
                    >
                      <span className="text-sm text-gray-800 font-medium group-hover:text-[hsl(219,60%,28%)]">{l.label}</span>
                      <span className="text-xs text-gray-400">{l.sub}</span>
                    </Link>
                  ))}
                </div>
              </DropdownNav>
              <NavLink href="/infrastructure">Infrastructure</NavLink>
              <DropdownNav label="Placements" isOpen={openDropdown === "placements"} onToggle={() => toggle("placements")}>
                {placementLinks.map(l => <DropdownItem key={l.href} href={l.href} label={l.label} onClick={() => setOpenDropdown(null)} />)}
              </DropdownNav>
              <NavLink href="/news">News</NavLink>
              <NavLink href="/gallery">Gallery</NavLink>
              <NavLink href="/careers">Careers</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </div>

            {/* CTA Buttons */}
            <div className="hidden xl:flex items-center gap-2 ml-1">
              {student ? (
                <div className="relative">
                  <button
                    onClick={() => toggle("student")}
                    className="flex items-center gap-1.5 bg-emerald-600 text-white text-sm font-semibold px-3 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <div className="h-6 w-6 bg-emerald-500 rounded-full flex items-center justify-center text-xs font-bold">
                      {student.name[0]}
                    </div>
                    <span className="max-w-[80px] truncate">{student.name.split(" ")[0]}</span>
                    <ChevronDown className={`h-3 w-3 transition-transform ${openDropdown === "student" ? "rotate-180" : ""}`} />
                  </button>
                  {openDropdown === "student" && (
                    <div className="absolute right-0 top-full mt-2 bg-white shadow-xl rounded-xl border border-gray-100 min-w-[200px] py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100 mb-1">
                        <p className="font-semibold text-gray-800 text-sm">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.courseCode} · {student.rollNumber}</p>
                      </div>
                      <Link href="/student/dashboard" onClick={() => setOpenDropdown(null)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[hsl(219,60%,28%)]">
                        <User className="h-4 w-4" /> My Dashboard
                      </Link>
                      <Link href="/student/fees" onClick={() => setOpenDropdown(null)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[hsl(219,60%,28%)]">
                        💳 Fee Payment
                      </Link>
                      <Link href="/student/receipts" onClick={() => setOpenDropdown(null)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[hsl(219,60%,28%)]">
                        🧾 My Receipts
                      </Link>
                      <hr className="my-1 border-gray-100" />
                      <button onClick={() => { logout(); setOpenDropdown(null); }} className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
                        <LogOut className="h-4 w-4" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/student/login" className="flex items-center gap-1.5 border border-white/30 text-white/90 text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">
                  <User className="h-4 w-4" /> Student Login
                </Link>
              )}
              <Link href="/apply" className="bg-[hsl(43,96%,55%)] text-[hsl(220,20%,15%)] font-bold px-4 py-2 rounded-lg hover:bg-[hsl(43,96%,45%)] transition-colors text-sm">
                Apply Now
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="xl:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="xl:hidden border-t border-white/10 bg-[hsl(219,40%,11%)]">
            <div className="max-h-[80vh] overflow-y-auto">
              {/* Student info bar in mobile */}
              {student && (
                <div className="flex items-center gap-3 px-4 py-3 bg-emerald-800/40 border-b border-white/10">
                  <div className="h-8 w-8 bg-emerald-500 rounded-full flex items-center justify-center text-sm font-bold">{student.name[0]}</div>
                  <div>
                    <p className="text-sm font-medium text-white">{student.name}</p>
                    <p className="text-xs text-white/50">{student.courseCode} · {student.rollNumber}</p>
                  </div>
                </div>
              )}

              <div className="px-3 py-2 space-y-0.5">
                <MobileNavLink href="/" onClick={closeMobile}>Home</MobileNavLink>

                <MobileSection label="About" isOpen={mobileSection === "about"} onToggle={() => setMobileSection(p => p === "about" ? null : "about")}>
                  {aboutLinks.map(l => <MobileNavLink key={l.href} href={l.href} onClick={closeMobile} indent>{l.label}</MobileNavLink>)}
                </MobileSection>

                <MobileSection label="Programs" isOpen={mobileSection === "programs"} onToggle={() => setMobileSection(p => p === "programs" ? null : "programs")}>
                  {programs.map(l => (
                    <Link key={l.href} href={l.href} onClick={closeMobile}
                      className="flex items-center justify-between pl-8 pr-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg">
                      <span>{l.label}</span>
                      <span className="text-white/30 text-xs">{l.sub}</span>
                    </Link>
                  ))}
                </MobileSection>

                <MobileNavLink href="/infrastructure" onClick={closeMobile}>Infrastructure</MobileNavLink>

                <MobileSection label="Placements" isOpen={mobileSection === "placements"} onToggle={() => setMobileSection(p => p === "placements" ? null : "placements")}>
                  {placementLinks.map(l => <MobileNavLink key={l.href} href={l.href} onClick={closeMobile} indent>{l.label}</MobileNavLink>)}
                </MobileSection>

                <MobileNavLink href="/news" onClick={closeMobile}>News</MobileNavLink>
                <MobileNavLink href="/gallery" onClick={closeMobile}>Gallery</MobileNavLink>
                <MobileNavLink href="/careers" onClick={closeMobile}>Careers</MobileNavLink>
                <MobileNavLink href="/contact" onClick={closeMobile}>Contact</MobileNavLink>
              </div>

              <div className="px-4 py-3 border-t border-white/10 space-y-2">
                {student ? (
                  <>
                    <Link href="/student/dashboard" onClick={closeMobile} className="flex items-center gap-2 py-2.5 px-3 text-sm text-white/80 hover:bg-white/10 rounded-lg">
                      <User className="h-4 w-4" /> My Dashboard
                    </Link>
                    <Link href="/student/fees" onClick={closeMobile} className="flex items-center gap-2 py-2.5 px-3 text-sm text-white/80 hover:bg-white/10 rounded-lg">
                      💳 Fee Payment
                    </Link>
                    <Link href="/student/receipts" onClick={closeMobile} className="flex items-center gap-2 py-2.5 px-3 text-sm text-white/80 hover:bg-white/10 rounded-lg">
                      🧾 My Receipts
                    </Link>
                    <button onClick={() => { logout(); closeMobile(); }} className="w-full flex items-center gap-2 py-2.5 px-3 text-sm text-red-400 hover:bg-white/5 rounded-lg">
                      <LogOut className="h-4 w-4" /> Logout
                    </button>
                  </>
                ) : (
                  <Link href="/student/login" onClick={closeMobile} className="flex items-center justify-center gap-2 py-2.5 text-sm text-[hsl(43,96%,55%)] border border-[hsl(43,96%,55%)]/50 rounded-lg hover:bg-[hsl(43,96%,55%)]/10 transition-colors">
                    <User className="h-4 w-4" /> Student Login
                  </Link>
                )}
                <Link href="/apply" onClick={closeMobile} className="block bg-[hsl(43,96%,55%)] text-center text-[hsl(220,20%,15%)] font-bold px-4 py-3 rounded-lg text-sm">
                  Apply Now — Admissions Open 2026-27
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active?: boolean }) {
  return (
    <Link href={href} className={`px-2.5 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${active ? "bg-white/15 text-white" : "text-white/75 hover:text-white hover:bg-white/10"}`}>
      {children}
    </Link>
  );
}

function DropdownNav({ label, isOpen, onToggle, children, wide }: { label: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`flex items-center gap-1 px-2.5 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${isOpen ? "bg-white/15 text-white" : "text-white/75 hover:text-white hover:bg-white/10"}`}
      >
        {label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className={`absolute left-0 top-full mt-1.5 bg-white shadow-2xl rounded-xl border border-gray-100 py-1.5 z-50 ${wide ? "w-[440px]" : "min-w-[220px]"}`}>
          {children}
        </div>
      )}
    </div>
  );
}

function DropdownItem({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[hsl(219,60%,28%)] transition-colors">
      {label}
    </Link>
  );
}

function MobileNavLink({ href, children, onClick, indent }: { href: string; children: React.ReactNode; onClick: () => void; indent?: boolean }) {
  return (
    <Link href={href} onClick={onClick} className={`block py-2.5 text-sm text-white/75 hover:text-white hover:bg-white/10 rounded-lg transition-colors ${indent ? "pl-8 pr-3" : "px-3"}`}>
      {children}
    </Link>
  );
}

function MobileSection({ label, isOpen, onToggle, children }: { label: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div>
      <button onClick={onToggle} className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-white/75 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
        <span>{label}</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="ml-3 mt-0.5 border-l-2 border-[hsl(43,96%,55%)]/30 space-y-0.5">
          {children}
        </div>
      )}
    </div>
  );
}
