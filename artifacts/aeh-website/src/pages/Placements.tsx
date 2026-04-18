import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { TrendingUp, Award, Building, Users, Star, Briefcase, ChevronRight, CheckCircle2, Target, Phone, Search } from "lucide-react";

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
  { name: "Consulting & Advisory", pct: 15, color: "bg-amber-500", count: "175+ students" },
  { name: "Media & Journalism", pct: 12, color: "bg-purple-500", count: "140+ students" },
  { name: "Others", pct: 10, color: "bg-gray-400", count: "120+ students" },
];

const testimonials = [
  {
    name: "Arjun Khanna",
    course: "MBA 2026",
    company: "Amazon — Operations Manager",
    text: "AEH's placement cell worked tirelessly to prepare us. The mock interviews and negotiation workshops gave me the edge to land Amazon.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    pkg: "₹8 LPA",
  },
  {
    name: "Priyanka Sharma",
    course: "BCA 2025",
    company: "Infosys — Software Engineer",
    text: "Getting placed at Infosys from a city like Bilaspur felt like a dream. AEH made it possible through rigorous technical training.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    pkg: "₹4 LPA",
  },
  {
    name: "Pooja Tiwari",
    course: "MBA Finance 2026",
    company: "Bajaj Finance — Credit Analyst",
    text: "The finance specialization and CA coaching at AEH directly helped me crack the Bajaj Finance recruitment process on the very first attempt.",
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80",
    pkg: "₹5.8 LPA",
  },
];

const processSteps = [
  { icon: Search, title: "Resume Building", desc: "Professional CV workshops and LinkedIn profile optimization", step: "01" },
  { icon: Users, title: "Mock Interviews", desc: "HR & technical rounds simulated by industry professionals", step: "02" },
  { icon: Phone, title: "Campus Drives", desc: "120+ companies visit campus for recruitment drives annually", step: "03" },
  { icon: Target, title: "Offer & Joining", desc: "Placement cell assists with offer negotiation and joining formalities", step: "04" },
];

export default function Placements() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden bg-[hsl(219,40%,14%)] text-white">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=70')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(219,40%,10%)]/90 via-[hsl(219,40%,14%)]/80 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[hsl(43,96%,55%)]/20 border border-[hsl(43,96%,55%)]/40 text-[hsl(43,96%,55%)] text-sm font-medium px-4 py-2 rounded-full mb-5">
              <Star className="h-4 w-4" /> Placement Record 2026
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Our Glorious<br />
              <span className="text-[hsl(43,96%,55%)]">Placement Record</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl leading-relaxed">
              1,100+ students placed in top companies across India. Our placement cell works year-round to ensure every student gets the career they deserve.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="/apply" className="bg-[hsl(43,96%,55%)] text-[hsl(220,20%,15%)] font-bold px-6 py-3 rounded-xl hover:bg-[hsl(43,96%,45%)] transition-colors">
                Join Our Next Batch
              </Link>
              <Link href="/top-recruiters" className="flex items-center gap-2 border border-white/30 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/10 transition-colors">
                View Top Recruiters <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          {/* Floating Stats Cards */}
          <div className="hidden md:grid grid-cols-2 gap-4">
            {stats.map(({ icon: Icon, value, label, color }) => (
              <div key={label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-center">
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-3`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-white/50 text-xs mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Stats Strip */}
      <div className="md:hidden bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 gap-0 divide-x divide-gray-100">
            {stats.map(({ icon: Icon, value, label, color }) => (
              <div key={label} className="py-5 px-4 flex items-center gap-3">
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">{value}</div>
                  <div className="text-xs text-gray-500">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full space-y-14">

        {/* Placement Process */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Placement Process</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Step-by-step support from day one to your first paycheck</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map(({ icon: Icon, title, desc, step }) => (
              <div key={step} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden hover:shadow-md transition-shadow">
                <div className="absolute top-4 right-4 text-6xl font-black text-gray-50">{step}</div>
                <div className="relative">
                  <div className="h-12 w-12 bg-[hsl(219,40%,16%)] rounded-xl flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-[hsl(43,96%,55%)]" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Industry Breakdown */}
        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Industry-Wise Placement</h2>
              <p className="text-gray-500 text-sm mb-6">Where our graduates build their careers</p>
              <div className="space-y-4">
                {industryStats.map(ind => (
                  <div key={ind.name} className="flex items-center gap-4">
                    <div className="w-36 sm:w-44 text-sm text-gray-700 font-medium shrink-0">{ind.name}</div>
                    <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div className={`h-full ${ind.color} rounded-full`} style={{ width: `${ind.pct}%` }} />
                    </div>
                    <div className="w-10 text-right text-sm font-bold text-gray-700">{ind.pct}%</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=70"
                alt="Students collaborating"
                className="rounded-2xl w-full h-64 object-cover shadow-sm"
              />
              <div className="absolute -bottom-4 -right-4 bg-[hsl(219,40%,16%)] text-white rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-[hsl(43,96%,55%)]">1100+</div>
                <div className="text-white/60 text-xs">Students Placed</div>
              </div>
            </div>
          </div>
        </section>

        {/* Recently Placed Students */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recently Placed Students</h2>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">Batch 2025-26</span>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {placed.map(student => (
              <div key={student.name} className="bg-white border border-gray-100 rounded-2xl p-5 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-200 group">
                <img
                  src={student.img}
                  alt={student.name}
                  className="h-16 w-16 rounded-full object-cover mx-auto mb-3 border-2 border-gray-100 group-hover:border-[hsl(43,96%,55%)] transition-colors shadow-sm"
                />
                <h3 className="font-bold text-gray-900 text-sm">{student.name}</h3>
                <p className="text-gray-400 text-xs mt-0.5">{student.program}</p>
                <div className="mt-3 space-y-1.5">
                  <div className="bg-[hsl(219,40%,16%)] text-white text-xs font-medium px-3 py-1.5 rounded-full">{student.company}</div>
                  <div className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">{student.pkg}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Success Stories</h2>
            <p className="text-gray-500">From AEH campus to dream careers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-white text-sm">{t.name}</p>
                        <p className="text-white/70 text-xs">{t.course}</p>
                      </div>
                      <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">{t.pkg}</span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm leading-relaxed italic mb-4">"{t.text}"</p>
                  <div className="flex items-center gap-1.5 text-[hsl(219,60%,35%)] text-xs font-semibold">
                    <Briefcase className="h-3.5 w-3.5" /> {t.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Placement Training Programs */}
        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=70"
                alt="Training session"
                className="rounded-2xl w-full h-64 object-cover shadow-sm"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Placement Training Programs</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                Our dedicated placement cell runs year-round training programs to ensure every student is job-ready before graduation.
              </p>
              <div className="space-y-3">
                {[
                  "Aptitude & Reasoning Training",
                  "Communication & Soft Skills",
                  "Technical Interview Prep",
                  "Group Discussion Practice",
                  "Resume & LinkedIn Optimization",
                  "Industry Expert Guest Lectures",
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-[hsl(43,96%,55%)] to-[hsl(43,96%,48%)] rounded-2xl p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[hsl(219,40%,12%)] mb-3">Your Success Story Starts Here</h2>
          <p className="text-[hsl(219,40%,25%)] mb-8 max-w-xl mx-auto">Join 1100+ placed graduates from Avviare Educational Hub. Admissions open for 2026-27.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/apply" className="bg-[hsl(219,40%,16%)] text-white font-bold px-8 py-3 rounded-xl hover:bg-[hsl(219,40%,10%)] transition-colors">
              Apply Now — Free
            </Link>
            <Link href="/top-recruiters" className="flex items-center gap-2 bg-white text-[hsl(219,40%,16%)] font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors">
              View Recruiters <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
