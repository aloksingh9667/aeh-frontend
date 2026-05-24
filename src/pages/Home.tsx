import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Award, Users, Building, BookOpen, ChevronRight, Star, TrendingUp, Globe, Quote, Calendar, MapPin, Phone, GraduationCap, Trophy, Lightbulb, Heart, Scale, FlaskConical, Tv2, Microscope, BookMarked } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useSiteConfig, isFlagEnabled, getTemplate } from "@/lib/siteConfig";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

const stats = [
  { label: "Years of Excellence", value: "12+", icon: Star },
  { label: "Students Enrolled", value: "5000+", icon: Users },
  { label: "Programs Offered", value: "25+", icon: BookOpen },
  { label: "Placement Partners", value: "100+", icon: Building },
];

const programs = [
  { name: "School of Management", code: "SOM", courses: "BBA · MBA", desc: "Industry-focused curriculum with case studies, live projects and corporate exposure.", href: "/school-of-management", Icon: TrendingUp, img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80" },
  { name: "School of CS & IT", code: "CSIT", courses: "BCA · MCA", desc: "Cutting-edge technology education with AI, cloud computing and programming labs.", href: "/school-of-cs-it", Icon: BookOpen, img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80" },
  { name: "School of Commerce", code: "SOC", courses: "B.Com · M.Com", desc: "Comprehensive commerce education with taxation, auditing and finance specializations.", href: "/school-of-commerce", Icon: Building, img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80" },
  { name: "School of Humanities", code: "SOH", courses: "BA · MA", desc: "Liberal arts education fostering critical thinking, creativity and social insight.", href: "/school-of-humanities", Icon: BookMarked, img: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&q=80" },
  { name: "School of Communication", code: "DJMC", courses: "DJMC · BJMC · MJMC", desc: "State-of-the-art media studios with journalism, advertising and film production.", href: "/school-of-communication", Icon: Tv2, img: "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=800&q=80" },
  { name: "School of Law", code: "SOL", courses: "BA LL.B · LL.M", desc: "Legal education with moot courts, trial advocacy and clinical legal programs.", href: "/school-of-law", Icon: Scale, img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80" },
  { name: "School of Pharmacy", code: "SOP", courses: "B.Pharm · D.Pharm", desc: "Pharmaceutical sciences with modern lab infrastructure and industry partnerships.", href: "/school-of-pharmacy", Icon: FlaskConical, img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80" },
  { name: "School of Education", code: "SOE", courses: "B.Ed · M.Ed", desc: "Training future educators with modern pedagogical approaches and teaching practice.", href: "/school-of-education", Icon: GraduationCap, img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80" },
  { name: "School of Applied Science", code: "SAS", courses: "B.Sc · M.Sc", desc: "Pure and applied sciences with research-oriented curriculum and well-equipped labs.", href: "/school-of-applied-science", Icon: Microscope, img: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&q=80" },
];

const newsItems = [
  {
    title: "AEH Students Win State-Level Business Competition",
    date: "April 10, 2026",
    category: "Achievement",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80",
  },
  {
    title: "Placement Drive 2026: 200+ Students Placed in Top Companies",
    date: "March 28, 2026",
    category: "Placements",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=80",
  },
  {
    title: "New AI Lab Inaugurated at School of CS & IT",
    date: "March 15, 2026",
    category: "Infrastructure",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    course: "MBA 2024 Graduate",
    company: "HDFC Bank — Branch Manager",
    text: "This institution changed my life completely. The industry exposure, case studies, and placement support helped me land my dream job. The faculty here treats you like family, not just a student.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    course: "BCA 2023 Graduate",
    company: "TCS — Software Engineer",
    text: "The computer labs and practical training at AEH are world-class. I got placed at TCS in my 3rd year itself, thanks to the coding bootcamps and mock interviews organized by the placement cell.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
  },
  {
    name: "Anjali Patel",
    course: "B.Com 2024 Graduate",
    company: "Deloitte — Audit Associate",
    text: "The commerce faculty at AEH has exceptional industry experience. Their practical approach to teaching GST, taxation, and audit helped me crack the Deloitte interview on my very first attempt.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80",
    rating: 5,
  },
  {
    name: "Amit Sahu",
    course: "BJMC 2023 Graduate",
    company: "ABP News — Reporter",
    text: "The media studio and journalism training at AEH is at par with Delhi colleges. I got an internship in my 2nd year itself and was directly hired after graduation. Best decision of my life!",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    rating: 5,
  },
  {
    name: "Deepika Yadav",
    course: "BA LLB 2024 Graduate",
    company: "High Court — Junior Advocate",
    text: "The moot court facility and experienced law faculty at AEH prepared me for real courtroom challenges. The exposure to legal drafting and advocacy from Day 1 sets AEH Law apart from others.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    course: "BBA 2023 Graduate",
    company: "Amazon — Operations Manager",
    text: "AEH gave me the confidence to compete with graduates from metro colleges. The entrepreneurship cell and business competitions shaped my analytical thinking. Got placed at Amazon with a package I never imagined!",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    rating: 5,
  },
];

const achievements = [
  { icon: Trophy, label: "National Awards", value: "15+", color: "bg-amber-500" },
  { icon: Users, label: "Alumni Network", value: "10,000+", color: "bg-blue-500" },
  { icon: TrendingUp, label: "Avg Placement Package", value: "₹4.2 LPA", color: "bg-green-500" },
  { icon: GraduationCap, label: "PhDs & Doctorates", value: "25+", color: "bg-purple-500" },
];

const CAT_COLORS: Record<string, string> = {
  Admission: "bg-green-100 text-green-700",
  Placement: "bg-blue-100 text-blue-700",
  Academic: "bg-purple-100 text-purple-700",
  Sports: "bg-orange-100 text-orange-700",
  Cultural: "bg-pink-100 text-pink-700",
  Infrastructure: "bg-cyan-100 text-cyan-700",
  Achievement: "bg-amber-100 text-amber-700",
};

interface ApiEvent {
  id: number;
  title: string;
  category: string;
  shortDescription?: string;
  eventDate: string;
  location?: string;
  imageUrl?: string;
  isFeatured: boolean;
}

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [liveEvents, setLiveEvents] = useState<ApiEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const { config } = useSiteConfig();
  const collegeName = config?.collegeName || "Our College";
  const shortName = config?.shortName || collegeName;

  const liveStats = (config?.stats && config.stats.length > 0)
    ? config.stats.map((s, i) => ({ ...stats[i % stats.length], label: s.label, value: s.value }))
    : stats;
  const liveTestimonials = (config?.testimonials && config.testimonials.length > 0)
    ? config.testimonials.map(t => ({ name: t.name, course: t.course || "", company: t.company || "", text: t.text, img: t.photoUrl || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80", rating: t.rating ?? 5 }))
    : testimonials;
  const liveWhyUs = (config?.whyUs && config.whyUs.length > 0)
    ? config.whyUs.map((w, i) => ({ icon: [Award, Users, TrendingUp, Building, Lightbulb, Heart][i % 6], title: w.title, desc: w.description }))
    : null;
  const liveMarquee = (config?.marqueeItems && config.marqueeItems.length > 0)
    ? config.marqueeItems.join("  •  ")
    : null;
  const liveNews = (config?.newsItems && config.newsItems.length > 0)
    ? config.newsItems.map(n => ({ title: n.title, date: n.date, category: n.category, img: n.imageUrl || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80" }))
    : newsItems;

  const flags = config?.featureFlags;
  const showMarquee = isFlagEnabled(flags, "showMarquee");
  const showStats = isFlagEnabled(flags, "showStats");
  const showSchools = isFlagEnabled(flags, "showSchools");
  const showAchievements = isFlagEnabled(flags, "showAchievements");
  const showWhyUs = isFlagEnabled(flags, "showWhyUs");
  const showTestimonials = isFlagEnabled(flags, "showTestimonials");
  const showNews = isFlagEnabled(flags, "showNews");
  const showApplyCta = isFlagEnabled(flags, "showApplyCta");

  const heroTpl = getTemplate(flags, "hero");
  const statsTpl = getTemplate(flags, "stats");
  const schoolsTpl = getTemplate(flags, "schools");
  const achTpl = getTemplate(flags, "achievements");
  const whyTpl = getTemplate(flags, "whyUs");
  const testiTpl = getTemplate(flags, "testimonials");
  const newsTpl = getTemplate(flags, "news");
  const ctaTpl = getTemplate(flags, "applyCta");
  const facilitiesTpl = getTemplate(flags, "facilities");
  const showFacilities = isFlagEnabled(flags, "showFacilities");
  const defaultFacilities = [
    "Smart Classrooms", "AI & Computer Labs", "4K Media Studio", "Library & Research Center",
    "Sports Complex", "Moot Court", "Science Labs", "Cafeteria", "Hostel", "Transport",
    "Wi-Fi Campus", "Medical Room",
  ];
  const liveFacilities = (config?.facilities && config.facilities.length > 0) ? config.facilities : defaultFacilities;
  const liveAchievements = (config?.achievements && config.achievements.length > 0)
    ? config.achievements.map((a, i) => ({ ...achievements[i % achievements.length], label: a }))
    : achievements;
  const heroImg = config?.heroImageUrl || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80";

  useEffect(() => {
    fetch(`${API_BASE}/events?limit=6`)
      .then(r => r.ok ? r.json() : { data: [] })
      .then(d => { setLiveEvents(d.data || []); setEventsLoading(false); })
      .catch(() => setEventsLoading(false));
  }, []);

  // Reset active testimonial if list shrinks
  useEffect(() => {
    if (activeTestimonial >= liveTestimonials.length) setActiveTestimonial(0);
  }, [liveTestimonials.length, activeTestimonial]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Announcement Ticker */}
      {showMarquee && <div className="bg-brand-accent py-2 overflow-hidden">
        <div className="flex items-center gap-3 animate-none">
          <span className="bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded shrink-0 ml-4">LATEST</span>
          <div className="overflow-hidden flex-1">
            <p className="text-brand-primary text-sm font-medium whitespace-nowrap animate-[marquee_30s_linear_infinite]">
              {liveMarquee || "🎓 Admissions Open 2026-27 for all UG & PG Programs  •  🏆 AEH wins Best Educational Institution Award – Chhattisgarh 2026  •  💼 TCS, Infosys Campus Placement Drive on May 12  •  📚 Last date to apply: June 30, 2026  •  🎉 85% Placement Rate Achieved — Batch of 2026"}
            </p>
          </div>
        </div>
      </div>}

      {/* Hero Banner */}
      {heroTpl === "imageBg" ? (
        <section className="relative text-white py-28 px-4 overflow-hidden">
          <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, var(--brand-primary, #0a2540) 0%, rgba(10,37,64,0.7) 60%, transparent 100%)" }} />
          <div className="max-w-5xl mx-auto relative">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-5 drop-shadow-lg">
              {config?.collegeName || "Our College"}
            </h1>
            <p className="text-white/90 text-xl md:text-2xl mb-8 max-w-2xl">{config?.heroSubtitle || "Where ambitious students become tomorrow's leaders."}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/apply" className="font-bold px-8 py-3.5 rounded-lg shadow-lg text-lg" style={{ backgroundColor: "var(--brand-accent, #c9a227)", color: "var(--brand-primary, #0a2540)" }}>Apply Now</Link>
              <Link href="/contact" className="border-2 border-white text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/10 text-lg">Talk to Counselor</Link>
            </div>
          </div>
        </section>
      ) : heroTpl === "minimal" ? (
        <section className="bg-white py-24 px-4 border-b border-gray-100">
          <div className="max-w-5xl mx-auto text-center">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-5" style={{ color: "var(--brand-accent, #c9a227)" }}>Admissions Open · 2026-27</span>
            <h1 className="text-5xl md:text-7xl font-light leading-[1.05] mb-6" style={{ color: "var(--brand-primary, #0a2540)" }}>
              {config?.collegeName || "Our College"}
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">{config?.heroSubtitle || "Quality education, built for tomorrow."}</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/apply" className="text-white font-semibold px-8 py-3 rounded-full shadow" style={{ backgroundColor: "var(--brand-primary, #0a2540)" }}>Begin Application →</Link>
              <Link href="/contact" className="text-gray-700 font-semibold px-8 py-3 underline-offset-4 hover:underline">Get in touch</Link>
            </div>
          </div>
        </section>
      ) : heroTpl === "videoCard" ? (
        <section className="py-16 px-4" style={{ background: "linear-gradient(135deg, var(--brand-primary, #0a2540) 0%, #1a3a5e 100%)" }}>
          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="relative h-56">
              <img src={heroImg} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="bg-white/90 rounded-full p-5"><GraduationCap className="h-10 w-10" style={{ color: "var(--brand-primary, #0a2540)" }} /></div>
              </div>
            </div>
            <div className="p-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "var(--brand-primary, #0a2540)" }}>{config?.collegeName || "Our College"}</h1>
              <p className="text-gray-600 mb-6">{config?.heroSubtitle || "Apply in 60 seconds — no application fee."}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link href="/apply" className="font-bold px-6 py-3 rounded-lg shadow" style={{ backgroundColor: "var(--brand-accent, #c9a227)", color: "var(--brand-primary, #0a2540)" }}>Quick Apply</Link>
                <Link href="/student/login" className="border-2 font-semibold px-6 py-3 rounded-lg" style={{ borderColor: "var(--brand-primary, #0a2540)", color: "var(--brand-primary, #0a2540)" }}>Student Login</Link>
              </div>
            </div>
          </div>
        </section>
      ) : heroTpl === "centered" ? (
        <section className="bg-gradient-to-br from-brand-primary via-brand-primary to-brand-primary text-white py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
          <div className="max-w-4xl mx-auto relative text-center">
            <div className="inline-flex items-center gap-2 bg-brand-accent/20 border border-[var(--brand-accent)]/30 text-brand-accent text-sm font-medium px-4 py-2 rounded-full mb-6">
              <Star className="h-4 w-4" /> Admissions Open 2026-27
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Welcome to <span className="text-brand-accent">{config?.collegeName || "Our College"}</span>
            </h1>
            <p className="text-white/80 text-xl md:text-2xl mb-10 leading-relaxed max-w-3xl mx-auto">
              {config?.heroSubtitle || "Transforming education since 2013. Quality, affordable programs that prepare students for successful careers."}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/apply" className="bg-brand-accent text-brand-primary font-bold px-10 py-4 rounded-lg hover:opacity-90 transition-all text-lg shadow-lg">
                Apply Now 2026-27
              </Link>
              <Link href="/student/login" className="border-2 border-white/40 text-white font-semibold px-10 py-4 rounded-lg hover:bg-white/10 transition-all text-lg flex items-center gap-2">
                <GraduationCap className="h-5 w-5" /> Student Login
              </Link>
            </div>
          </div>
        </section>
      ) : (
      <section className="bg-gradient-to-br from-brand-primary via-brand-primary to-brand-primary text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-brand-accent/20 border border-[var(--brand-accent)]/30 text-brand-accent text-sm font-medium px-4 py-2 rounded-full mb-6">
                <Star className="h-4 w-4" /> Admissions Open 2026-27
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                {config?.heroTitle || config?.collegeName || "Welcome to Our College"}
              </h1>
              <p className="text-white/80 text-xl mb-8 leading-relaxed">
                {config?.heroSubtitle || config?.tagline || "Quality, affordable programs that prepare students for successful careers."}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/apply" className="bg-brand-accent text-brand-primary font-bold px-8 py-3.5 rounded-lg hover:opacity-90 transition-all text-lg shadow-lg">
                  Apply Now 2026-27
                </Link>
                <Link href="/student/login" className="border-2 border-white/40 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-all text-lg flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" /> Student Login
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 mt-8">
                {(config?.city || config?.state) && <div className="flex items-center gap-2 text-white/60 text-sm"><MapPin className="h-4 w-4 text-brand-accent" /> {[config.city, config.state].filter(Boolean).join(", ")}</div>}
                {config?.phone && <div className="flex items-center gap-2 text-white/60 text-sm"><Phone className="h-4 w-4 text-brand-accent" /> {config.phone}</div>}
              </div>
            </div>
            {/* Hero Image */}
            <div className="hidden lg:block">
              <div className="relative">
                <img
                  src={heroImg}
                  alt="Campus"
                  className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                />
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">85% Placement</p>
                      <p className="text-xs text-gray-500">Batch of 2026</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-brand-accent rounded-xl p-4 shadow-xl">
                  <div className="text-center">
                    <p className="font-bold text-brand-primary text-2xl">12+</p>
                    <p className="text-xs text-brand-primary font-medium">Years of Trust</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Stats Bar */}
      {showStats && (statsTpl === "dark" ? (
        <section className="py-10 px-4" style={{ backgroundColor: "var(--brand-primary, #0a2540)" }}>
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {liveStats.map(({ label, value }) => (
              <div key={label} className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold" style={{ color: "var(--brand-accent, #c9a227)" }}>{value}</div>
                <div className="text-white/60 text-xs uppercase tracking-wider mt-1">{label}</div>
              </div>
            ))}
          </div>
        </section>
      ) : statsTpl === "split" ? (
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto grid grid-cols-2 gap-px bg-gray-200 rounded-2xl overflow-hidden border border-gray-200">
            {liveStats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-white p-8 flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "var(--brand-primary, #0a2540)" }}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold" style={{ color: "var(--brand-primary, #0a2540)" }}>{value}</div>
                  <div className="text-gray-500 text-sm">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : statsTpl === "circles" ? (
        <section className="py-14 px-4 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {liveStats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-3 shadow-md" style={{ background: `radial-gradient(circle, var(--brand-accent, #c9a227) 0%, var(--brand-primary, #0a2540) 100%)` }}>
                  <Icon className="h-10 w-10 text-white" />
                </div>
                <div className="text-2xl font-extrabold" style={{ color: "var(--brand-primary, #0a2540)" }}>{value}</div>
                <div className="text-gray-500 text-xs uppercase tracking-wide mt-1">{label}</div>
              </div>
            ))}
          </div>
        </section>
      ) : statsTpl === "minimal" ? (
        <section className="bg-white border-y border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-gray-200">
              {liveStats.map(({ label, value }, i) => (
                <div key={label + i} className="text-center px-2">
                  <div className="text-3xl md:text-4xl font-bold text-brand-primary">{value}</div>
                  <div className="text-xs uppercase tracking-wide text-gray-500 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
      <section className="bg-brand-accent py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {liveStats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <Icon className="h-8 w-8 mx-auto mb-2 text-brand-primary" />
                <div className="text-3xl font-bold text-brand-primary">{value}</div>
                <div className="text-sm font-medium text-brand-primary/80">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      ))}

      {/* Programs — All 9 Schools */}
      {showSchools && (schoolsTpl === "tiles" ? (
        <section className="py-14 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "var(--brand-primary, #0a2540)" }}>Our Schools & Programs</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {programs.map(({ name, code, href, Icon }) => (
                <Link key={name} href={href} className="aspect-square rounded-2xl flex flex-col items-center justify-center text-center p-4 hover:scale-105 transition-transform" style={{ backgroundColor: "var(--brand-primary, #0a2540)" }}>
                  <Icon className="h-10 w-10 mb-2" style={{ color: "var(--brand-accent, #c9a227)" }} />
                  <span className="text-xs font-bold mb-1" style={{ color: "var(--brand-accent, #c9a227)" }}>{code}</span>
                  <span className="text-white text-xs font-medium leading-tight">{name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : schoolsTpl === "feature" ? (
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">
            <Link href={programs[0].href} className="lg:col-span-1 lg:row-span-2 group bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition">
              <div className="relative h-64 lg:h-full">
                <img src={programs[0].img} alt={programs[0].name} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, var(--brand-primary, #0a2540) 0%, transparent 60%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <span className="inline-block text-xs font-bold mb-2 px-2 py-0.5 rounded" style={{ backgroundColor: "var(--brand-accent, #c9a227)", color: "var(--brand-primary, #0a2540)" }}>FEATURED · {programs[0].code}</span>
                  <h3 className="text-2xl font-bold">{programs[0].name}</h3>
                  <p className="text-white/80 text-sm mt-2">{programs[0].desc}</p>
                </div>
              </div>
            </Link>
            <div className="lg:col-span-2 grid grid-cols-2 gap-3">
              {programs.slice(1).map(({ name, code, href, Icon }) => (
                <Link key={name} href={href} className="bg-white rounded-xl p-4 flex items-center gap-3 hover:shadow-md transition">
                  <div className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "var(--brand-primary, #0a2540)" }}><Icon className="h-5 w-5 text-white" /></div>
                  <div className="min-w-0"><div className="font-semibold text-sm truncate" style={{ color: "var(--brand-primary, #0a2540)" }}>{name}</div><div className="text-xs text-gray-500">{code}</div></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : schoolsTpl === "carousel" ? (
        <section className="py-14 px-4 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto mb-6 px-2">
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--brand-primary, #0a2540)" }}>Our Schools & Programs</h2>
          </div>
          <div className="overflow-x-auto px-4 pb-4">
            <div className="flex gap-4" style={{ minWidth: "max-content" }}>
              {programs.map(({ name, code, courses, href, Icon, img }) => (
                <Link key={name} href={href} className="w-64 shrink-0 bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition">
                  <div className="h-32 relative"><img src={img} alt={name} className="w-full h-full object-cover" /><span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: "var(--brand-accent, #c9a227)", color: "var(--brand-primary, #0a2540)" }}>{code}</span></div>
                  <div className="p-3"><Icon className="h-5 w-5 mb-1" style={{ color: "var(--brand-primary, #0a2540)" }} /><div className="font-semibold text-sm" style={{ color: "var(--brand-primary, #0a2540)" }}>{name}</div><div className="text-xs text-gray-500">{courses}</div></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : schoolsTpl === "compact" ? (
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Our Schools & Programs</h2>
              <p className="text-muted-foreground">9 Schools · 25+ Industry-Aligned Programs</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {programs.map(({ name, code, courses, href, Icon }) => (
                <Link key={name} href={href} className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:border-brand-primary hover:shadow-md transition-all group">
                  <div className="h-12 w-12 bg-brand-primary text-white rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold bg-brand-accent text-brand-primary px-2 py-0.5 rounded">{code}</span>
                      <span className="font-semibold text-foreground text-sm truncate">{name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{courses}</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-primary transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : (
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-brand-primary/10 text-brand-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">9 Schools · 25+ Programs</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Schools & Programs</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Explore our diverse undergraduate and postgraduate programs, each designed with industry insight and academic rigor</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map(({ name, code, courses, desc, href, Icon, img }) => (
              <Link key={name} href={href} className="group block">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border border-gray-100 h-full flex flex-col">
                  {/* Image with consistent brand overlay */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={img}
                      alt={name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Consistent brand dark overlay — no per-school colors */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-primary)]/90 via-[var(--brand-primary)]/30 to-transparent" />
                    {/* Top badge */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-brand-accent text-brand-primary text-xs font-bold px-2.5 py-1 rounded-lg tracking-wide">{code}</span>
                    </div>
                    {/* Bottom text */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-1.5">
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-white/80 text-xs font-medium">{courses}</span>
                      </div>
                      <h3 className="text-base font-bold text-white leading-tight">{name}</h3>
                    </div>
                  </div>
                  {/* Card body */}
                  <div className="p-5 flex-1 flex flex-col">
                    <p className="text-gray-500 text-sm leading-relaxed flex-1">{desc}</p>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-1 text-brand-primary font-semibold text-sm group-hover:gap-2 transition-all">
                        Explore Program <ChevronRight className="h-4 w-4" />
                      </div>
                      <div className="w-1 h-1 rounded-full bg-brand-accent" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/apply" className="inline-flex items-center gap-2 bg-brand-primary text-white font-semibold px-8 py-3.5 rounded-xl hover:opacity-80 transition-colors shadow-lg">
              Apply for Admission 2026-27 <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      ))}

      {/* Achievements Row */}
      {showAchievements && (achTpl === "timeline" ? (
        <section className="py-14 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center" style={{ color: "var(--brand-primary, #0a2540)" }}>Our Journey</h3>
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5" style={{ backgroundColor: "var(--brand-accent, #c9a227)" }} />
              {liveAchievements.map(({ icon: Icon, label, value }, idx) => (
                <div key={label} className={`relative flex items-center gap-4 mb-6 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 ml-0 md:mx-auto z-10" style={{ backgroundColor: "var(--brand-primary, #0a2540)" }}><Icon className="h-4 w-4 text-white" /></div>
                  <div className={`flex-1 bg-gray-50 rounded-xl p-4 md:max-w-xs ${idx % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="text-2xl font-bold" style={{ color: "var(--brand-primary, #0a2540)" }}>{value}</div>
                    <div className="text-gray-600 text-sm">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : achTpl === "trophy" ? (
        <section className="py-14 px-4" style={{ background: "linear-gradient(135deg, var(--brand-primary, #0a2540), #0f2e4a)" }}>
          <div className="max-w-5xl mx-auto text-center">
            <Trophy className="h-16 w-16 mx-auto mb-4" style={{ color: "var(--brand-accent, #c9a227)" }} />
            <h3 className="text-3xl font-bold text-white mb-8">Awards & Recognition</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {liveAchievements.map(({ label, value }) => (
                <div key={label} className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
                  <div className="text-3xl font-extrabold" style={{ color: "var(--brand-accent, #c9a227)" }}>{value}</div>
                  <div className="text-white/80 text-xs mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : achTpl === "stats" ? (
        <section className="py-14 px-4 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {liveAchievements.map(({ label, value }) => (
              <div key={label} className="text-center border-l-4 pl-4 py-2" style={{ borderColor: "var(--brand-accent, #c9a227)" }}>
                <div className="text-5xl md:text-6xl font-extrabold leading-none" style={{ color: "var(--brand-primary, #0a2540)" }}>{value}</div>
                <div className="text-gray-600 text-sm mt-2 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </section>
      ) : achTpl === "light" ? (
        <section className="py-14 px-4 bg-white border-y border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-brand-primary">Our Achievements</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-brand-primary">{value}</div>
                  <div className="text-gray-600 text-sm mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
      <section className="py-12 px-4 bg-brand-primary">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="text-center">
                <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-brand-accent">{value}</div>
                <div className="text-white/70 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      ))}

      {/* Why Choose Us */}
      {showWhyUs && (whyTpl === "iconRow" ? (
        <section className="py-14 px-4 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "var(--brand-primary, #0a2540)" }}>The {shortName} Advantage</h2>
            <p className="text-gray-500 mb-10">Why students choose us year after year</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {(liveWhyUs ?? [
                { icon: Award, title: "Affordable", desc: "" }, { icon: Users, title: "Faculty", desc: "" }, { icon: TrendingUp, title: "Placements", desc: "" },
                { icon: Building, title: "Campus", desc: "" }, { icon: Lightbulb, title: "Curriculum", desc: "" }, { icon: Heart, title: "Culture", desc: "" },
              ]).map(({ icon: Icon, title }) => (
                <div key={title} className="flex flex-col items-center p-3">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3" style={{ backgroundColor: "var(--brand-primary, #0a2540)" }}><Icon className="h-7 w-7" style={{ color: "var(--brand-accent, #c9a227)" }} /></div>
                  <div className="text-sm font-semibold text-gray-700">{title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : whyTpl === "alt" ? (
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8" style={{ color: "var(--brand-primary, #0a2540)" }}>The {shortName} Advantage</h2>
            {(liveWhyUs ?? [
              { icon: Award, title: "Affordable Excellence", desc: "World-class education at fees that don't burden your family." },
              { icon: Users, title: "Experienced Faculty", desc: "Learn from 80+ industry veterans and academicians." },
              { icon: TrendingUp, title: "100% Placement Assistance", desc: "100+ recruiting partners. Average package ₹4.2 LPA." },
              { icon: Building, title: "Modern Infrastructure", desc: "Smart classrooms, AI labs, 4K media studio." },
            ]).map(({ icon: Icon, title, desc }, idx) => (
              <div key={title} className={`flex flex-col md:flex-row gap-6 items-center ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                <div className="md:w-1/3 h-32 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "var(--brand-primary, #0a2540)" }}>
                  <Icon className="h-16 w-16" style={{ color: "var(--brand-accent, #c9a227)" }} />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-bold mb-1" style={{ color: "var(--brand-primary, #0a2540)" }}>{title}</h3>
                  <p className="text-gray-600">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : whyTpl === "checks" ? (
        <section className="py-14 px-4 bg-white">
          <div className="max-w-3xl mx-auto bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center" style={{ color: "var(--brand-primary, #0a2540)" }}>Why Choose AEH?</h2>
            <ul className="space-y-3">
              {(liveWhyUs ?? [
                { title: "Affordable Excellence", desc: "" }, { title: "Experienced Faculty", desc: "" }, { title: "100% Placement Assistance", desc: "" },
                { title: "Modern Infrastructure", desc: "" }, { title: "Industry-Aligned Curriculum", desc: "" }, { title: "Holistic Development", desc: "" },
              ]).map(({ title, desc }) => (
                <li key={title} className="flex items-start gap-3 bg-white rounded-lg p-3">
                  <div className="h-6 w-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: "var(--brand-accent, #c9a227)" }}>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "var(--brand-primary, #0a2540)" }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div><div className="font-semibold" style={{ color: "var(--brand-primary, #0a2540)" }}>{title}</div>{desc && <div className="text-sm text-gray-500">{desc}</div>}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : whyTpl === "grid" ? (
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block bg-brand-primary/10 text-brand-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">Why AEH?</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">The {shortName} Advantage</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {(liveWhyUs ?? [
                { icon: Award, title: "Affordable Excellence", desc: "World-class education at fees that don't burden your family." },
                { icon: Users, title: "Experienced Faculty", desc: "Learn from 80+ industry veterans and academicians." },
                { icon: TrendingUp, title: "100% Placement Assistance", desc: "100+ recruiting partners. Average package ₹4.2 LPA." },
                { icon: Building, title: "Modern Infrastructure", desc: "Smart classrooms, AI labs, 4K media studio, AC WiFi campus." },
                { icon: Lightbulb, title: "Industry-Aligned Curriculum", desc: "Curriculum co-designed with industry experts." },
                { icon: Heart, title: "Holistic Development", desc: "Sports, clubs, cultural events for all-round growth." },
              ]).map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-brand-primary transition-all">
                  <div className="bg-brand-accent text-brand-primary w-11 h-11 rounded-lg flex items-center justify-center mb-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-foreground mb-1.5">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/apply" className="inline-flex items-center gap-2 bg-brand-primary text-white font-semibold px-8 py-3.5 rounded-xl hover:opacity-80 transition-colors shadow-lg">
                Apply for Admission 2026-27 <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      ) : (
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-brand-primary/10 text-brand-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Why AEH?</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">The {shortName} Advantage</h2>
              <div className="space-y-4">
                {(liveWhyUs ?? [
                  { icon: Award, title: "Affordable Excellence", desc: "World-class education at fees that don't burden your family. Scholarships & easy EMI available." },
                  { icon: Users, title: "Experienced Faculty", desc: "Learn from 80+ industry veterans and distinguished academicians with real-world expertise." },
                  { icon: TrendingUp, title: "100% Placement Assistance", desc: "Dedicated placement cell with 100+ recruiting partners across India. Average package ₹4.2 LPA." },
                  { icon: Building, title: "Modern Infrastructure", desc: "Smart classrooms, AI labs, 4K media studio, moot court, science labs, AC WiFi campus." },
                  { icon: Lightbulb, title: "Industry-Aligned Curriculum", desc: "Curriculum co-designed with industry experts, regularly updated to match market demands." },
                  { icon: Heart, title: "Student-First Culture", desc: "Holistic development through sports, arts, entrepreneurship cell, NCC, NSS, and more." },
                ]).map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="h-10 w-10 bg-brand-primary rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{title}</h4>
                      <p className="text-muted-foreground text-sm mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <img
                src={heroImg}
                alt="Campus Life"
                className="rounded-2xl w-full h-56 object-cover shadow-lg"
              />
              <div className="bg-brand-primary rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold text-brand-accent mb-4">Admission 2026-27 Open</h3>
                <ul className="space-y-2 mb-5">
                  {["Online & Offline Admission Process", "Merit-based Scholarships Available", "Easy EMI Options for Fees", "Hostel & Transport Facility", "Same-Day Admission Counseling"].map(item => (
                    <li key={item} className="flex items-center gap-3 text-white/80 text-sm">
                      <div className="h-2 w-2 bg-brand-accent rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/apply" className="block bg-brand-accent text-brand-primary font-bold text-center py-3 rounded-lg hover:opacity-90 transition-colors">
                  Apply Now — Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      ))}

      {/* Testimonials */}
      {showTestimonials && (testiTpl === "carousel" ? (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: "var(--brand-primary, #0a2540)" }}>What Our Alumni Say</h2>
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <Quote className="h-10 w-10 mx-auto mb-4" style={{ color: "var(--brand-accent, #c9a227)" }} />
              <p className="text-lg italic text-gray-700 mb-6 leading-relaxed">"{liveTestimonials[activeTestimonial].text}"</p>
              <img src={liveTestimonials[activeTestimonial].img} alt={liveTestimonials[activeTestimonial].name} className="w-16 h-16 rounded-full object-cover mx-auto mb-2 border-4" style={{ borderColor: "var(--brand-accent, #c9a227)" }} />
              <p className="font-bold" style={{ color: "var(--brand-primary, #0a2540)" }}>{liveTestimonials[activeTestimonial].name}</p>
              <p className="text-gray-500 text-sm">{liveTestimonials[activeTestimonial].course}</p>
            </div>
            <div className="flex justify-center gap-2 mt-6">
              {liveTestimonials.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)} className={`h-2 rounded-full transition-all ${activeTestimonial === i ? "w-8" : "w-2 bg-gray-300"}`} style={activeTestimonial === i ? { backgroundColor: "var(--brand-primary, #0a2540)" } : undefined} />
              ))}
            </div>
          </div>
        </section>
      ) : testiTpl === "wall" ? (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ color: "var(--brand-primary, #0a2540)" }}>Voices of {shortName}</h2>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {liveTestimonials.map((t, i) => (
                <div key={i} className="break-inside-avoid bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <img src={t.img} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate" style={{ color: "var(--brand-primary, #0a2540)" }}>{t.name}</p>
                      <p className="text-xs text-gray-500 truncate">{t.course}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-snug italic">"{t.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : testiTpl === "compact" ? (
        <section className="py-12 px-4" style={{ backgroundColor: "var(--brand-primary, #0a2540)" }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6" style={{ color: "var(--brand-accent, #c9a227)" }}>Hear From Our Students</h2>
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-3" style={{ minWidth: "max-content" }}>
                {liveTestimonials.map((t, i) => (
                  <div key={i} className="w-72 shrink-0 bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
                    <p className="text-white/90 text-sm italic line-clamp-3 mb-3">"{t.text}"</p>
                    <div className="flex items-center gap-2">
                      <img src={t.img} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
                      <div><p className="text-white text-xs font-semibold">{t.name}</p><p className="text-white/60 text-xs">{t.course}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : testiTpl === "grid" ? (
        <section className="py-16 px-4 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block bg-brand-accent/20 text-brand-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">Student Success Stories</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Alumni Say</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {liveTestimonials.slice(0, 6).map((t, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow">
                  <Quote className="h-7 w-7 text-brand-accent mb-2" />
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-[var(--brand-accent)] text-brand-accent" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4 italic line-clamp-4">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                    <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                    <div className="min-w-0">
                      <p className="font-bold text-brand-primary text-sm truncate">{t.name}</p>
                      <p className="text-gray-500 text-xs truncate">{t.course}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-brand-accent/20 text-brand-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">Student Success Stories</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Alumni Say</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Real words from students whose lives changed at {collegeName}</p>
          </div>

          {/* Featured Testimonial */}
          <div className="bg-gradient-to-br from-brand-primary to-brand-primary rounded-2xl p-8 mb-6 text-white relative overflow-hidden">
            <Quote className="absolute top-6 right-6 h-16 w-16 text-white/10" />
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <img
                src={liveTestimonials[activeTestimonial].img}
                alt={liveTestimonials[activeTestimonial].name}
                className="w-20 h-20 rounded-full object-cover border-4 border-[var(--brand-accent)] shrink-0"
              />
              <div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(liveTestimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[var(--brand-accent)] text-brand-accent" />
                  ))}
                </div>
                <p className="text-white/90 text-lg leading-relaxed mb-4 italic">"{liveTestimonials[activeTestimonial].text}"</p>
                <div>
                  <p className="font-bold text-brand-accent text-lg">{liveTestimonials[activeTestimonial].name}</p>
                  <p className="text-white/70 text-sm">{liveTestimonials[activeTestimonial].course}</p>
                  <p className="text-white/60 text-sm mt-0.5">🏢 {liveTestimonials[activeTestimonial].company}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Avatars */}
          <div className="flex flex-wrap justify-center gap-3">
            {liveTestimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`flex items-center gap-3 px-4 py-2 rounded-full border transition-all ${activeTestimonial === i ? "border-[var(--brand-primary)] bg-brand-primary text-white shadow-md" : "border-gray-200 bg-white hover:border-gray-400 text-gray-700"}`}
              >
                <img src={t.img} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
                <span className="text-sm font-medium">{t.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      ))}

      {/* News with Images */}
      {showNews && (newsTpl === "feature" ? (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold" style={{ color: "var(--brand-primary, #0a2540)" }}>News & Updates</h2>
              <Link href="/news" className="text-sm font-semibold flex items-center gap-1" style={{ color: "var(--brand-primary, #0a2540)" }}>View All <ChevronRight className="h-4 w-4" /></Link>
            </div>
            <div className="grid lg:grid-cols-3 gap-5">
              {liveNews[0] && (
                <Link href="/news" className="lg:col-span-2 group bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition">
                  <div className="relative h-72"><img src={liveNews[0].img} alt={liveNews[0].title} className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" /><div className="absolute bottom-0 p-6 text-white"><span className="inline-block text-xs font-bold px-2 py-0.5 rounded mb-2" style={{ backgroundColor: "var(--brand-accent, #c9a227)", color: "var(--brand-primary, #0a2540)" }}>{liveNews[0].category}</span><h3 className="text-2xl font-bold leading-snug">{liveNews[0].title}</h3><p className="text-white/70 text-xs mt-1"><Calendar className="h-3 w-3 inline mr-1" />{liveNews[0].date}</p></div></div>
                </Link>
              )}
              <div className="space-y-3">
                {liveNews.slice(1).map(item => (
                  <div key={item.title} className="bg-white rounded-xl p-3 flex gap-3 hover:shadow-md transition">
                    <img src={item.img} alt={item.title} className="w-20 h-20 rounded-lg object-cover shrink-0" />
                    <div className="min-w-0"><span className="text-[10px] font-bold uppercase" style={{ color: "var(--brand-accent, #c9a227)" }}>{item.category}</span><h3 className="font-semibold text-sm line-clamp-2" style={{ color: "var(--brand-primary, #0a2540)" }}>{item.title}</h3><div className="text-xs text-gray-500 mt-1"><Calendar className="h-3 w-3 inline mr-1" />{item.date}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : newsTpl === "magazine" ? (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="border-b-2 pb-3 mb-6 flex justify-between items-end" style={{ borderColor: "var(--brand-primary, #0a2540)" }}>
              <h2 className="text-3xl font-extrabold uppercase tracking-tight" style={{ color: "var(--brand-primary, #0a2540)" }}>The AEH Times</h2>
              <Link href="/news" className="text-xs font-semibold uppercase" style={{ color: "var(--brand-primary, #0a2540)" }}>All Stories →</Link>
            </div>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              {liveNews.map((item, idx) => (
                <article key={item.title} className={`flex gap-4 ${idx === 0 ? "md:col-span-2 flex-col md:flex-row" : ""} pb-6 border-b border-gray-200`}>
                  <img src={item.img} alt={item.title} className={`object-cover rounded ${idx === 0 ? "w-full md:w-1/2 h-56" : "w-28 h-28 shrink-0"}`} />
                  <div className="flex-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--brand-accent, #c9a227)" }}>{item.category}</span>
                    <h3 className={`font-serif font-bold mt-1 leading-tight ${idx === 0 ? "text-3xl" : "text-lg"}`} style={{ color: "var(--brand-primary, #0a2540)" }}>{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-2">{item.date}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : newsTpl === "tiles" ? (
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8" style={{ color: "var(--brand-primary, #0a2540)" }}>Latest News</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {liveNews.map(item => (
                <Link key={item.title} href="/news" className="aspect-square relative rounded-xl overflow-hidden group">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--brand-primary, #0a2540) 0%, transparent 70%)" }} />
                  <div className="absolute bottom-0 p-3 text-white"><span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: "var(--brand-accent, #c9a227)" }}>{item.category}</span><h3 className="text-sm font-semibold leading-tight line-clamp-2 mt-1">{item.title}</h3></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : newsTpl === "list" ? (
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <span className="inline-block bg-brand-accent/20 text-brand-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-2">Latest Updates</span>
                <h2 className="text-3xl font-bold text-foreground">News & Events</h2>
              </div>
              <Link href="/news" className="text-brand-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {liveNews.map(item => (
                <div key={item.title} className="flex gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <img src={item.img} alt={item.title} className="w-24 h-24 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="inline-block bg-brand-accent/20 text-brand-primary text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded">{item.category}</span>
                    <h3 className="font-semibold text-foreground mt-1.5 leading-snug line-clamp-2">{item.title}</h3>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs mt-2">
                      <Calendar className="h-3 w-3" /> {item.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div>
              <span className="inline-block bg-brand-accent/20 text-brand-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-2">Latest Updates</span>
              <h2 className="text-3xl font-bold text-foreground">News & Events</h2>
            </div>
            <Link href="/news" className="text-brand-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {liveNews.map(item => (
              <div key={item.title} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
                <div className="relative h-44 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-3 left-3 bg-brand-accent text-brand-primary text-xs font-bold px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-foreground mb-3 leading-snug">{item.title}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <Calendar className="h-3.5 w-3.5" />
                    {item.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      ))}

      {/* Upcoming Events — Dynamic from Admin */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <span className="inline-block bg-brand-accent/20 text-brand-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-2">Don't Miss Out</span>
              <h2 className="text-3xl font-bold text-foreground">Upcoming Events</h2>
            </div>
          </div>
          {eventsLoading ? (
            <div className="grid md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />)}
            </div>
          ) : liveEvents.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No upcoming events at the moment. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {liveEvents.slice(0, 6).map(ev => (
                <div key={ev.id} className="flex gap-5 bg-card border border-border rounded-xl p-5 hover:border-brand-primary hover:shadow-md transition-all group">
                  {ev.imageUrl ? (
                    <div className="relative shrink-0 w-20 h-20 rounded-xl overflow-hidden">
                      <img src={ev.imageUrl} alt={ev.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-brand-primary/30" />
                    </div>
                  ) : (
                    <div className="bg-brand-primary text-white rounded-xl p-4 text-center shrink-0 min-w-[64px]">
                      <div className="text-base font-bold leading-none">{ev.eventDate.split(" ")[1]?.replace(",", "") || "—"}</div>
                      <div className="text-xs text-white/70 mt-1">{ev.eventDate.split(" ")[0]}</div>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CAT_COLORS[ev.category] || "bg-gray-100 text-gray-600"}`}>{ev.category}</span>
                    <h3 className="font-semibold text-foreground mt-1.5 text-sm leading-snug line-clamp-2">{ev.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1.5">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{ev.eventDate}</span>
                      {ev.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{ev.location}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      {showApplyCta && (ctaTpl === "split" ? (
        <section className="py-0">
          <div className="grid md:grid-cols-2">
            <div className="h-72 md:h-auto"><img src={heroImg} alt="" className="w-full h-full object-cover" /></div>
            <div className="p-12 flex flex-col justify-center text-white" style={{ backgroundColor: "var(--brand-primary, #0a2540)" }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Begin Your Journey</h2>
              <p className="text-white/70 mb-6">Admissions for 2026-27 are now open. Apply free in under 5 minutes.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/apply" className="font-bold px-7 py-3 rounded-lg" style={{ backgroundColor: "var(--brand-accent, #c9a227)", color: "var(--brand-primary, #0a2540)" }}>Apply Now</Link>
                <Link href="/contact" className="border-2 border-white/40 text-white font-semibold px-7 py-3 rounded-lg">Contact</Link>
              </div>
            </div>
          </div>
        </section>
      ) : ctaTpl === "gradient" ? (
        <section className="py-20 px-4 text-center text-white" style={{ background: "linear-gradient(135deg, var(--brand-primary, #0a2540) 0%, #6d28d9 50%, var(--brand-accent, #c9a227) 100%)" }}>
          <div className="max-w-3xl mx-auto">
            <Star className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow">Your Future, Designed Here.</h2>
            <p className="text-xl text-white/90 mb-8">Join 5000+ students transforming their lives at {collegeName}.</p>
            <Link href="/apply" className="inline-block bg-white font-bold px-10 py-4 rounded-full shadow-lg text-lg" style={{ color: "var(--brand-primary, #0a2540)" }}>Start Application — Free</Link>
          </div>
        </section>
      ) : ctaTpl === "minimal" ? (
        <section className="py-12 px-4 bg-white border-t border-gray-200">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: "var(--brand-primary, #0a2540)" }}>Ready to apply?</h2>
              <p className="text-gray-500 text-sm">Admissions open for 2026-27. No application fee.</p>
            </div>
            <Link href="/apply" className="text-white font-semibold px-8 py-3 rounded-full shadow" style={{ backgroundColor: "var(--brand-primary, #0a2540)" }}>Apply Now →</Link>
          </div>
        </section>
      ) : ctaTpl === "card" ? (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-2/5 bg-gradient-to-br from-brand-primary to-brand-primary text-white p-8 flex flex-col justify-center">
                <GraduationCap className="h-10 w-10 text-brand-accent" />
                <h2 className="text-2xl md:text-3xl font-bold mt-3">Ready to Begin?</h2>
                <p className="text-white/70 text-sm mt-2">Admissions for 2026-27 are now open. Free application.</p>
              </div>
              <div className="md:w-3/5 p-8 flex flex-col justify-center">
                <p className="text-gray-700 mb-6 leading-relaxed">Join 5000+ students who chose {collegeName} for a brighter future. No application fee, same-day counseling, and easy admission process.</p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/apply" className="bg-brand-accent text-brand-primary font-bold px-7 py-3 rounded-lg hover:opacity-90 transition-all">
                    Apply Now — Free
                  </Link>
                  <Link href="/contact" className="border-2 border-[var(--brand-primary)] text-brand-primary font-semibold px-7 py-3 rounded-lg hover:bg-brand-primary hover:text-white transition-all">
                    Talk to Counselor
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
      <section className="py-16 px-4 bg-gradient-to-br from-brand-primary to-brand-primary">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-white/70 text-lg mb-8">Join 5000+ students who chose {collegeName} for a brighter future. Admissions for 2026-27 are now open.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/apply" className="bg-brand-accent text-brand-primary font-bold px-10 py-4 rounded-xl hover:opacity-90 transition-all text-lg shadow-lg">
              Apply Now — Free
            </Link>
            <Link href="/contact" className="border-2 border-white/30 text-white font-semibold px-10 py-4 rounded-xl hover:bg-white/10 transition-all text-lg">
              Talk to Counselor
            </Link>
          </div>
          <p className="text-white/50 text-sm mt-6">No application fee · Same day counseling · Easy admission process</p>
        </div>
      </section>
      ))}

      {/* Facilities */}
      {showFacilities && liveFacilities && liveFacilities.length > 0 && (
        facilitiesTpl === "list" ? (
          <section className="py-14 px-4 bg-white">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8" style={{ color: "var(--brand-primary, #0a2540)" }}>Campus Facilities</h2>
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-2">
                {liveFacilities.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-100">
                    <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: "var(--brand-accent, #c9a227)" }} />
                    <span className="text-gray-700">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : facilitiesTpl === "cards" ? (
          <section className="py-14 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8" style={{ color: "var(--brand-primary, #0a2540)" }}>Our Facilities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {liveFacilities.map((f, i) => (
                  <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                    <div className="h-32 flex items-center justify-center" style={{ backgroundColor: "var(--brand-primary, #0a2540)" }}><Building className="h-12 w-12" style={{ color: "var(--brand-accent, #c9a227)" }} /></div>
                    <div className="p-3 text-center font-semibold text-sm" style={{ color: "var(--brand-primary, #0a2540)" }}>{f}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : facilitiesTpl === "feature" ? (
          <section className="py-14 px-4 bg-white">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-5">
              {liveFacilities[0] && (
                <div className="lg:col-span-1 lg:row-span-2 rounded-2xl p-8 text-white flex flex-col justify-end h-72 lg:h-auto" style={{ background: "linear-gradient(135deg, var(--brand-primary, #0a2540), #1a3a5e)" }}>
                  <Building className="h-12 w-12 mb-3" style={{ color: "var(--brand-accent, #c9a227)" }} />
                  <h3 className="text-2xl font-bold mb-1">{liveFacilities[0]}</h3>
                  <p className="text-white/70 text-sm">Featured campus facility</p>
                </div>
              )}
              <div className="lg:col-span-2 grid grid-cols-2 gap-3">
                {liveFacilities.slice(1, 9).map((f, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4 flex items-center gap-3 border border-gray-100">
                    <div className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "var(--brand-accent, #c9a227)" }}><Building className="h-5 w-5" style={{ color: "var(--brand-primary, #0a2540)" }} /></div>
                    <div className="font-medium text-sm" style={{ color: "var(--brand-primary, #0a2540)" }}>{f}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : facilitiesTpl === "compact" ? (
          <section className="py-12 px-4 bg-white">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--brand-primary, #0a2540)" }}>Campus Facilities</h2>
              <div className="flex flex-wrap gap-2 justify-center">
                {liveFacilities.map((f, i) => (
                  <span key={i} className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: "var(--brand-primary, #0a2540)", color: "var(--brand-accent, #c9a227)" }}>{f}</span>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="py-14 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--brand-primary, #0a2540)" }}>World-Class Facilities</h2>
                <p className="text-gray-500 mt-2">Everything you need for a complete student experience</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {liveFacilities.map((f, i) => (
                  <div key={i} className="bg-white rounded-xl p-5 text-center border border-gray-100 hover:border-gray-300 hover:shadow-sm transition">
                    <div className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: "var(--brand-accent, #c9a227)" }}>
                      <Building className="h-6 w-6" style={{ color: "var(--brand-primary, #0a2540)" }} />
                    </div>
                    <div className="text-sm font-semibold" style={{ color: "var(--brand-primary, #0a2540)" }}>{f}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      )}

      <Footer />
    </div>
  );
}
