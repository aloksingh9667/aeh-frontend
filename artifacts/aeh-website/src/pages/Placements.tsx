import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { TrendingUp, Award, Building, Users, Star, Briefcase, ChevronRight } from "lucide-react";

const stats = [
  { icon: TrendingUp, value: "85%+", label: "Overall Placement Rate", color: "from-green-500 to-emerald-600" },
  { icon: Building, value: "120+", label: "Recruiting Companies", color: "from-blue-500 to-indigo-600" },
  { icon: Award, value: "₹12 LPA", label: "Highest Package", color: "from-amber-500 to-orange-600" },
  { icon: Users, value: "₹4.2 LPA", label: "Average Package", color: "from-purple-500 to-violet-600" },
];

const placed = [
  { name: "Anurag Pandey", program: "MBA", company: "UMS Media", pkg: "₹5.4 LPA", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80" },
  { name: "Priyanka Sharma", program: "BCA", company: "Infosys", pkg: "₹4.0 LPA", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80" },
  { name: "Rahul Singh", program: "BBA", company: "HDFC Bank", pkg: "₹3.8 LPA", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80" },
  { name: "Kavita Gupta", program: "BJMC", company: "Zee News", pkg: "₹3.5 LPA", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&q=80" },
  { name: "Amit Kumar", program: "B.Com", company: "Deloitte", pkg: "₹6.2 LPA", img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&q=80" },
  { name: "Sunita Verma", program: "MCA", company: "TCS", pkg: "₹4.2 LPA", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80" },
  { name: "Deepak Patel", program: "MBA", company: "Tech Mahindra", pkg: "₹5.0 LPA", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80" },
  { name: "Ritu Jha", program: "BCA", company: "Wipro", pkg: "₹3.6 LPA", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80" },
  { name: "Mukesh Yadav", program: "BBA", company: "Airtel", pkg: "₹3.9 LPA", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80" },
  { name: "Anjali Singh", program: "MJMC", company: "Amar Ujala", pkg: "₹3.2 LPA", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=80" },
  { name: "Rohit Chandel", program: "MCA", company: "HCL Tech", pkg: "₹4.5 LPA", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&q=80" },
  { name: "Pooja Tiwari", program: "MBA", company: "Bajaj Finance", pkg: "₹5.8 LPA", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&q=80" },
  { name: "Vikram Mehta", program: "B.Com", company: "ICICI Bank", pkg: "₹4.1 LPA", img: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&q=80" },
  { name: "Neha Dubey", program: "BCA", company: "IBM", pkg: "₹5.1 LPA", img: "https://images.unsplash.com/photo-1521310192545-4ac7951413f0?w=80&q=80" },
  { name: "Arjun Khanna", program: "MBA", company: "Amazon", pkg: "₹8.0 LPA", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80" },
  { name: "Divya Mishra", program: "BJMC", company: "NDTV", pkg: "₹3.8 LPA", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80" },
];

const industryStats = [
  { name: "IT & Technology", pct: 35, color: "bg-blue-500", count: "400+ students" },
  { name: "Banking & Finance", pct: 28, color: "bg-green-500", count: "320+ students" },
  { name: "Media & Journalism", pct: 12, color: "bg-purple-500", count: "140+ students" },
  { name: "Consulting & Advisory", pct: 15, color: "bg-amber-500", count: "175+ students" },
  { name: "Others", pct: 10, color: "bg-gray-400", count: "120+ students" },
];

const testimonials = [
  {
    name: "Arjun Khanna",
    course: "MBA 2026",
    company: "Amazon — Operations Manager",
    text: "AEH's placement cell worked tirelessly to prepare us. The mock interviews and negotiation workshops gave me the edge to land Amazon.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    pkg: "₹8 LPA",
  },
  {
    name: "Priyanka Sharma",
    course: "BCA 2025",
    company: "Infosys — Software Engineer",
    text: "Getting placed at Infosys from a city like Bilaspur felt like a dream. AEH made it possible through rigorous technical training.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    pkg: "₹4 LPA",
  },
  {
    name: "Pooja Tiwari",
    course: "MBA Finance 2026",
    company: "Bajaj Finance — Credit Analyst",
    text: "The finance specialization and CA coaching at AEH directly helped me crack the Bajaj Finance recruitment process on the very first attempt.",
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&q=80",
    pkg: "₹5.8 LPA",
  },
];

export default function Placements() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden bg-[hsl(219,40%,16%)] text-white">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=60')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(219,40%,10%)]/90 to-[hsl(219,40%,20%)]/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[hsl(43,96%,55%)]/20 border border-[hsl(43,96%,55%)]/40 text-[hsl(43,96%,55%)] text-sm font-medium px-4 py-2 rounded-full mb-5">
              <Star className="h-4 w-4" /> Placement Record 2026
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Our Glorious<br />Placement Record</h1>
            <p className="text-white/70 text-lg max-w-xl leading-relaxed">
              1,100+ students placed in top companies across India. Our placement cell works year-round to ensure every student gets the career they deserve.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="/apply" className="bg-[hsl(43,96%,55%)] text-[hsl(220,20%,15%)] font-bold px-6 py-3 rounded-lg hover:bg-[hsl(43,96%,45%)] transition-colors">
                Join Our Next Batch
              </Link>
              <Link href="/top-recruiters" className="flex items-center gap-2 border border-white/30 text-white font-medium px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
                View Top Recruiters <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-gray-100">
            {stats.map(({ icon: Icon, value, label, color }) => (
              <div key={label} className="py-6 px-6 flex items-center gap-4">
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full space-y-12">

        {/* Industry Breakdown */}
        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Industry-Wise Placement</h2>
          <div className="space-y-4">
            {industryStats.map(ind => (
              <div key={ind.name} className="flex items-center gap-4">
                <div className="w-36 sm:w-48 text-sm text-gray-700 font-medium shrink-0">{ind.name}</div>
                <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                  <div className={`h-full ${ind.color} rounded-full transition-all duration-700`} style={{ width: `${ind.pct}%` }} />
                </div>
                <div className="w-16 text-right text-sm font-bold text-gray-700">{ind.pct}%</div>
                <div className="hidden sm:block w-24 text-xs text-gray-400">{ind.count}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Recently Placed Students */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recently Placed Students</h2>
            <span className="text-sm text-gray-400">Batch 2025-26</span>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {placed.map(student => (
              <div key={student.name} className="bg-white border border-gray-100 rounded-xl p-4 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
                <img
                  src={student.img}
                  alt={student.name}
                  className="h-14 w-14 rounded-full object-cover mx-auto mb-3 border-2 border-gray-100 group-hover:border-[hsl(43,96%,55%)] transition-colors"
                />
                <h3 className="font-semibold text-gray-900 text-sm">{student.name}</h3>
                <p className="text-gray-400 text-xs mt-0.5">{student.program}</p>
                <div className="mt-2 flex flex-col gap-1.5">
                  <span className="bg-[hsl(219,40%,16%)] text-white text-xs font-medium px-3 py-1 rounded-full">{student.company}</span>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">{student.pkg}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-[hsl(219,40%,16%)] rounded-2xl p-6 md:p-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Success Stories</h2>
          <p className="text-white/60 mb-8">From AEH campus to dream careers</p>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="bg-white/8 rounded-xl p-5 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <img src={t.img} alt={t.name} className="h-12 w-12 rounded-full object-cover border-2 border-[hsl(43,96%,55%)]" />
                  <div>
                    <p className="font-bold text-white text-sm">{t.name}</p>
                    <p className="text-white/50 text-xs">{t.course}</p>
                    <span className="inline-block bg-green-500/20 text-green-400 text-xs font-bold px-2 py-0.5 rounded-full mt-1">{t.pkg}</span>
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed italic">"{t.text}"</p>
                <p className="text-[hsl(43,96%,55%)] text-xs font-medium mt-3 flex items-center gap-1">
                  <Briefcase className="h-3 w-3" /> {t.company}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-[hsl(43,96%,55%)] to-[hsl(43,96%,48%)] rounded-2xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[hsl(219,40%,12%)] mb-3">Your Success Story Starts Here</h2>
          <p className="text-[hsl(219,40%,25%)] mb-6 max-w-xl mx-auto">Join 1100+ placed graduates from Avviare Educational Hub. Admissions open for 2026-27.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/apply" className="bg-[hsl(219,40%,16%)] text-white font-bold px-8 py-3 rounded-lg hover:bg-[hsl(219,40%,10%)] transition-colors">
              Apply Now — Free
            </Link>
            <Link href="/top-recruiters" className="flex items-center gap-2 bg-white text-[hsl(219,40%,16%)] font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              View Recruiters <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
