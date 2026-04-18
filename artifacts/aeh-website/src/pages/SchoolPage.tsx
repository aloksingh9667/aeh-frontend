import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle, ChevronRight, Clock, Award, Users, BookOpen, ArrowRight } from "lucide-react";

interface Program {
  name: string;
  duration: string;
  eligibility: string;
}

interface SchoolPageProps {
  name: string;
  tagline: string;
  intro: string;
  color: string;
  highlights: string[];
  programs: Program[];
  whyChoose: string[];
  careers: string[];
  image?: string;
  stats?: { label: string; value: string }[];
}

const schoolImages: Record<string, string> = {
  "School of Management": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80",
  "School of CS & IT": "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=1200&q=80",
  "School of Commerce": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
  "School of Humanities": "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1200&q=80",
  "School of Communication": "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=1200&q=80",
  "School of Law": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80",
  "School of Pharmacy": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&q=80",
  "School of Education": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80",
  "School of Applied Science": "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1200&q=80",
};

const programColors = [
  "border-l-blue-500 bg-blue-50",
  "border-l-indigo-500 bg-indigo-50",
  "border-l-teal-500 bg-teal-50",
  "border-l-purple-500 bg-purple-50",
  "border-l-rose-500 bg-rose-50",
  "border-l-amber-500 bg-amber-50",
];

export function SchoolPage({ name, tagline, intro, color, highlights, programs, whyChoose, careers, image, stats }: SchoolPageProps) {
  const headerImage = image || schoolImages[name] || "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Header */}
      <div className="relative h-72 md:h-80 overflow-hidden">
        <img src={headerImage} alt={name} className="w-full h-full object-cover" />
        <div className={`absolute inset-0 ${color} opacity-85`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pb-8">
            <nav className="flex items-center gap-2 text-white/60 text-sm mb-3">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/80">{name}</span>
            </nav>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{name}</h1>
            <p className="text-white/85 text-base md:text-lg max-w-2xl">{tagline}</p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      {stats && stats.length > 0 && (
        <div className="bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-100">
              {stats.map(({ label, value }) => (
                <div key={label} className="py-4 px-6 text-center">
                  <div className="text-xl font-bold text-[hsl(219,40%,16%)]">{value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">

            {/* About */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 bg-[hsl(219,40%,16%)] rounded-lg flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">About the School</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">{intro}</p>
            </section>

            {/* Key Highlights */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-8 w-8 bg-[hsl(43,96%,55%)] rounded-lg flex items-center justify-center">
                  <Award className="h-4 w-4 text-[hsl(219,40%,16%)]" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Key Highlights</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {highlights.map(h => (
                  <div key={h} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 leading-relaxed">{h}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Programs */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Programs Offered</h2>
              </div>
              <div className="space-y-3">
                {programs.map((p, i) => (
                  <div key={p.name} className={`border-l-4 rounded-xl p-4 ${programColors[i % programColors.length]}`}>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm">{p.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{p.eligibility}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 text-gray-600 text-xs font-medium bg-white rounded-full px-3 py-1 border self-start">
                        <Clock className="h-3 w-3" /> {p.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link href="/apply" className="inline-flex items-center gap-2 text-[hsl(219,60%,28%)] font-semibold text-sm hover:gap-3 transition-all">
                  Apply for any of these programs <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>

            {/* Career Opportunities */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Career Opportunities</h2>
              <div className="flex flex-wrap gap-2">
                {careers.map(c => (
                  <span key={c} className="bg-[hsl(219,40%,16%)]/8 text-[hsl(219,40%,16%)] border border-[hsl(219,40%,16%)]/20 text-sm px-4 py-2 rounded-full font-medium hover:bg-[hsl(219,40%,16%)] hover:text-white transition-colors cursor-default">
                    {c}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Why Choose */}
            <div className="bg-[hsl(219,40%,16%)] rounded-2xl p-6 text-white">
              <h3 className="font-bold text-[hsl(43,96%,55%)] text-base mb-4">Why Choose Avviare?</h3>
              <ul className="space-y-3">
                {whyChoose.map(w => (
                  <li key={w} className="flex items-start gap-2.5 text-sm text-white/80">
                    <div className="h-5 w-5 bg-[hsl(43,96%,55%)]/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <ChevronRight className="h-3 w-3 text-[hsl(43,96%,55%)]" />
                    </div>
                    {w}
                  </li>
                ))}
              </ul>
            </div>

            {/* Apply Card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="text-center mb-4">
                <div className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
                  ✅ Admissions Open 2026-27
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Ready to Join?</h3>
                <p className="text-gray-500 text-sm mt-1">Apply online and start your journey at Avviare</p>
              </div>
              <Link href="/apply" className="block bg-[hsl(219,40%,16%)] text-white text-center font-bold py-3 rounded-xl hover:bg-[hsl(219,40%,24%)] transition-colors mb-3">
                Apply Online — Free
              </Link>
              <Link href="/contact" className="block border border-gray-200 text-center text-gray-700 font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm">
                Contact Admissions Office
              </Link>
              <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-400">Last Date to Apply: <span className="font-semibold text-red-600">June 30, 2026</span></p>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <h3 className="font-semibold text-amber-800 mb-3 text-sm">📞 Admissions Helpline</h3>
              <a href="tel:+917772156789" className="block text-amber-900 font-bold text-lg mb-1">+91 77721 56789</a>
              <a href="mailto:admissions@avviare.edu.in" className="text-amber-700 text-sm hover:underline">admissions@avviare.edu.in</a>
              <p className="text-amber-600 text-xs mt-2">Mon–Sat, 9:00 AM – 6:00 PM</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
