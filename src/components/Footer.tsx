import { Link } from "wouter";
import { GraduationCap, MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useSiteConfig, getFooterTemplate } from "@/lib/siteConfig";

export function Footer() {
  const { config } = useSiteConfig();
  const collegeName = config?.collegeName || "Our College";
  const shortName = config?.shortName || collegeName;
  const tagline = config?.footer?.aboutText || config?.tagline || "Providing quality, affordable education. Shaping leaders of tomorrow through academic excellence and holistic development.";
  const phone = config?.phone || "+91 9876543210";
  const email = config?.email || "info@college.edu.in";
  const addressLine = [config?.address, config?.city, config?.state, config?.pincode].filter(Boolean).join(", ") || "Your City, State - 000000";
  const cityLine = [config?.city, config?.state].filter(Boolean).join(", ") || "Your City, State";
  const social = config?.socialLinks || {};
  const established = config?.established || 2013;
  const year = new Date().getFullYear();
  const showSocial = config?.footer?.showSocial !== false;
  const showApply = config?.footer?.showApplyButton !== false;
  const tpl = getFooterTemplate(config?.footer);
  const bottomText = config?.footer?.bottomText || `© ${established}-${year} ${collegeName}. All rights reserved.`;

  const defaultColumns: Array<{ heading: string; links: Array<{ label: string; href: string }> }> = [
    { heading: "Quick Links", links: [
      { label: "About Us", href: "/about" },
      { label: "Our Programs", href: "/school-of-management" },
      { label: "Placements", href: "/placements" },
      { label: "Our Team", href: "/team" },
      { label: "Infrastructure", href: "/infrastructure" },
      { label: "News & Events", href: "/news" },
      { label: "Gallery", href: "/gallery" },
      { label: "Careers", href: "/careers" },
    ]},
    { heading: "Programs", links: [
      { label: "BBA / MBA", href: "/school-of-management" },
      { label: "BCA / MCA", href: "/school-of-cs-it" },
      { label: "B.Com / M.Com", href: "/school-of-commerce" },
      { label: "BA / MA", href: "/school-of-humanities" },
      { label: "BJMC / MJMC", href: "/school-of-communication" },
      { label: "B.Pharm / D.Pharm", href: "/school-of-pharmacy" },
      { label: "BA LL.B / LL.M", href: "/school-of-law" },
      { label: "B.Ed / M.Ed", href: "/school-of-education" },
    ]},
  ];
  const customColumns = config?.footer?.columns;
  const columns = (customColumns && customColumns.length > 0) ? customColumns : defaultColumns;

  const Logo = () => (
    <div className="flex items-center gap-2 mb-4">
      {config?.logoUrl ? (
        <img src={config.logoUrl} alt={shortName} className="h-7 w-7 object-cover rounded" />
      ) : (
        <GraduationCap className="h-7 w-7" style={{ color: "var(--accent-color, #c9a227)" }} />
      )}
      <span className="font-bold text-lg"><span style={{ color: "var(--accent-color, #c9a227)" }}>{shortName}</span></span>
    </div>
  );

  const Socials = ({ inverted = false }: { inverted?: boolean }) => showSocial ? (
    <div className="flex gap-3">
      {[
        [social.facebook, Facebook],
        [social.instagram, Instagram],
        [social.twitter, Twitter],
        [social.youtube, Youtube],
      ].map(([href, Icon], i) => {
        const I = Icon as typeof Facebook;
        return (
          <a key={i} href={(href as string) || "#"} className={`p-2 rounded-full ${inverted ? "bg-black/10 hover:bg-brand-accent hover:text-black text-current" : "bg-white/10 hover:bg-brand-accent hover:text-black"} transition-colors`}>
            <I className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  ) : null;

  // ---------- Template: minimal (2-col) ----------
  if (tpl === "minimal") {
    return (
      <footer className="bg-brand-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Logo />
            <p className="text-white/70 text-sm leading-relaxed mb-4">{tagline}</p>
            <Socials />
          </div>
          <div>
            <h3 className="font-semibold text-brand-accent mb-4 text-sm uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex gap-3"><MapPin className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" /><span>{collegeName}, {addressLine}</span></li>
              <li className="flex gap-3"><Phone className="h-4 w-4 text-brand-accent shrink-0" /><span>{phone}</span></li>
              <li className="flex gap-3"><Mail className="h-4 w-4 text-brand-accent shrink-0" /><span>{email}</span></li>
            </ul>
            {showApply && (
              <Link href="/apply" className="mt-5 inline-block bg-brand-accent text-[var(--brand-primary)] font-semibold px-4 py-2 rounded-md text-sm">Apply Now</Link>
            )}
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-3 text-center text-white/50 text-sm">{bottomText}</div>
        </div>
      </footer>
    );
  }

  // ---------- Template: centered ----------
  if (tpl === "centered") {
    return (
      <footer className="bg-brand-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 text-center">
          <div className="flex justify-center"><Logo /></div>
          <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-2xl mx-auto">{tagline}</p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-6 text-sm">
            {columns.flatMap(c => c.links).slice(0, 8).map((l, i) => (
              <Link key={i} href={l.href} className="text-white/70 hover:text-brand-accent">{l.label}</Link>
            ))}
          </div>
          <div className="flex justify-center mb-4"><Socials /></div>
          <div className="text-white/50 text-xs">{bottomText} · {cityLine}</div>
        </div>
      </footer>
    );
  }

  // ---------- Template: light ----------
  if (tpl === "light") {
    return (
      <footer className="bg-slate-100 text-slate-700 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                {config?.logoUrl ? <img src={config.logoUrl} alt={shortName} className="h-7 w-7 rounded" /> : <GraduationCap className="h-7 w-7" style={{ color: "var(--primary-color, #0a2540)" }} />}
                <span className="font-bold text-lg" style={{ color: "var(--primary-color, #0a2540)" }}>{shortName}</span>
              </div>
              <p className="text-sm leading-relaxed mb-4 text-slate-600">{tagline}</p>
              <Socials inverted />
            </div>
            {columns.map((col, i) => (
              <div key={i}>
                <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider" style={{ color: "var(--primary-color, #0a2540)" }}>{col.heading}</h3>
                <ul className="space-y-2">
                  {col.links.slice(0, 8).map((l, j) => (
                    <li key={j}><Link href={l.href} className="text-sm text-slate-600 hover:text-slate-900">{l.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider" style={{ color: "var(--primary-color, #0a2540)" }}>Contact</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 mt-0.5" /><span>{addressLine}</span></li>
                <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0" /><span>{phone}</span></li>
                <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0" /><span>{email}</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 py-3 text-center text-slate-500 text-sm">{bottomText}</div>
        </div>
      </footer>
    );
  }

  // ---------- Template: strip ----------
  if (tpl === "strip") {
    return (
      <footer className="bg-brand-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <Logo />
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {columns.flatMap(c => c.links).slice(0, 6).map((l, i) => (
              <Link key={i} href={l.href} className="text-white/70 hover:text-brand-accent">{l.label}</Link>
            ))}
          </div>
          {showApply && (
            <Link href="/apply" className="bg-brand-accent text-[var(--brand-primary)] font-semibold px-3 py-1.5 rounded text-sm">Apply Now</Link>
          )}
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between text-xs text-white/50 flex-wrap gap-2">
            <span>{bottomText}</span>
            <span>{cityLine}</span>
          </div>
        </div>
      </footer>
    );
  }

  // ---------- Template: default (4-col dark) ----------
  return (
    <footer className="bg-brand-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="text-white/70 text-sm leading-relaxed mb-4">{tagline}</p>
            <Socials />
          </div>

          {columns.map((col, i) => (
            <div key={i}>
              <h3 className="font-semibold text-brand-accent mb-4 text-sm uppercase tracking-wider">{col.heading}</h3>
              <ul className="space-y-2">
                {col.links.slice(0, 8).map((l, j) => (
                  <li key={j}>
                    <Link href={l.href} className="text-white/70 hover:text-brand-accent text-sm transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-semibold text-brand-accent mb-4 text-sm uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-white/70 text-sm"><MapPin className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" /><span>{collegeName}, {addressLine}</span></li>
              <li className="flex gap-3 text-white/70 text-sm"><Phone className="h-4 w-4 text-brand-accent shrink-0" /><span>{phone}</span></li>
              <li className="flex gap-3 text-white/70 text-sm"><Mail className="h-4 w-4 text-brand-accent shrink-0" /><span>{email}</span></li>
            </ul>
            {showApply && (
              <Link href="/apply" className="mt-6 block bg-brand-accent text-center text-[var(--brand-primary)] font-semibold px-4 py-2.5 rounded-md text-sm hover:opacity-90 transition-colors">
                Apply Now 2026-27
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/50 text-sm">{bottomText}</p>
          <p className="text-white/50 text-sm">{cityLine}</p>
        </div>
      </div>
    </footer>
  );
}
