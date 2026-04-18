import { Link } from "wouter";
import { GraduationCap, MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[hsl(219,40%,12%)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-7 w-7 text-[hsl(43,96%,55%)]" />
              <span className="font-bold text-lg"><span className="text-[hsl(43,96%,55%)]">Avviare</span> Educational Hub</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Providing quality, affordable education since 2013. Shaping leaders of tomorrow through academic excellence and holistic development.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-[hsl(43,96%,55%)] hover:text-black transition-colors"><Facebook className="h-4 w-4" /></a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-[hsl(43,96%,55%)] hover:text-black transition-colors"><Instagram className="h-4 w-4" /></a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-[hsl(43,96%,55%)] hover:text-black transition-colors"><Twitter className="h-4 w-4" /></a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-[hsl(43,96%,55%)] hover:text-black transition-colors"><Youtube className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-[hsl(43,96%,55%)] mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/about" },
                { label: "Our Programs", href: "/school-of-management" },
                { label: "Placements", href: "/placements" },
                { label: "Our Team", href: "/team" },
                { label: "Infrastructure", href: "/infrastructure" },
                { label: "News & Events", href: "/news" },
                { label: "Gallery", href: "/gallery" },
                { label: "Careers", href: "/careers" },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/70 hover:text-[hsl(43,96%,55%)] text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[hsl(43,96%,55%)] mb-4 text-sm uppercase tracking-wider">Programs</h3>
            <ul className="space-y-2">
              {[
                { label: "BBA / MBA", href: "/school-of-management" },
                { label: "BCA / MCA", href: "/school-of-cs-it" },
                { label: "B.Com / M.Com", href: "/school-of-commerce" },
                { label: "BA / MA", href: "/school-of-humanities" },
                { label: "BJMC / MJMC", href: "/school-of-communication" },
                { label: "B.Pharm / D.Pharm", href: "/school-of-pharmacy" },
                { label: "BA LL.B / LL.M", href: "/school-of-law" },
                { label: "B.Ed / M.Ed", href: "/school-of-education" },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/70 hover:text-[hsl(43,96%,55%)] text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[hsl(43,96%,55%)] mb-4 text-sm uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-white/70 text-sm">
                <MapPin className="h-4 w-4 text-[hsl(43,96%,55%)] shrink-0 mt-0.5" />
                <span>Avviare Educational Hub, Bilaspur, Chhattisgarh - 495001</span>
              </li>
              <li className="flex gap-3 text-white/70 text-sm">
                <Phone className="h-4 w-4 text-[hsl(43,96%,55%)] shrink-0" />
                <span>+91 9876543210</span>
              </li>
              <li className="flex gap-3 text-white/70 text-sm">
                <Mail className="h-4 w-4 text-[hsl(43,96%,55%)] shrink-0" />
                <span>info@avviare.edu.in</span>
              </li>
            </ul>
            <Link href="/apply" className="mt-6 block bg-[hsl(43,96%,55%)] text-center text-[hsl(220,20%,15%)] font-semibold px-4 py-2.5 rounded-md text-sm hover:bg-[hsl(43,96%,45%)] transition-colors">
              Apply Now 2026-27
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/50 text-sm">&copy; 2013-2026 Avviare Educational Hub. All rights reserved.</p>
          <p className="text-white/50 text-sm">Bilaspur, Chhattisgarh</p>
        </div>
      </div>
    </footer>
  );
}
