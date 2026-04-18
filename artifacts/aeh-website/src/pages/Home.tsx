import { useState } from "react";
import { Link } from "wouter";
import { Award, Users, Building, BookOpen, ChevronRight, Star, TrendingUp, Globe, Quote, Calendar, MapPin, Phone, GraduationCap, Trophy, Lightbulb, Heart } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const stats = [
  { label: "Years of Excellence", value: "12+", icon: Star },
  { label: "Students Enrolled", value: "5000+", icon: Users },
  { label: "Programs Offered", value: "25+", icon: BookOpen },
  { label: "Placement Partners", value: "100+", icon: Building },
];

const programs = [
  { name: "School of Management", courses: "BBA, MBA", desc: "Industry-focused curriculum with case studies and live projects", href: "/school-of-management", color: "from-blue-800/90 to-blue-950/95", icon: "📊", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=70" },
  { name: "School of CS & IT", courses: "BCA, MCA", desc: "Cutting-edge technology education with AI and programming labs", href: "/school-of-cs-it", color: "from-indigo-800/90 to-indigo-950/95", icon: "💻", img: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=600&q=70" },
  { name: "School of Commerce", courses: "B.Com, M.Com", desc: "Comprehensive commerce education with finance specializations", href: "/school-of-commerce", color: "from-teal-700/90 to-teal-950/95", icon: "📈", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=70" },
  { name: "School of Humanities", courses: "BA, MA", desc: "Liberal arts education fostering critical thinking and creativity", href: "/school-of-humanities", color: "from-purple-800/90 to-purple-950/95", icon: "🎭", img: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&q=70" },
  { name: "School of Communication", courses: "DJMC, BJMC, MJMC", desc: "State-of-the-art media studio with industry internships", href: "/school-of-communication", color: "from-rose-700/90 to-rose-950/95", icon: "📺", img: "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=600&q=70" },
  { name: "School of Law", courses: "BA LL.B, LL.M", desc: "Legal education with moot courts and clinical programs", href: "/school-of-law", color: "from-amber-700/90 to-amber-950/95", icon: "⚖️", img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=70" },
  { name: "School of Pharmacy", courses: "B.Pharm, D.Pharm", desc: "Pharmaceutical sciences with modern lab infrastructure", href: "/school-of-pharmacy", color: "from-green-700/90 to-green-950/95", icon: "💊", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=70" },
  { name: "School of Education", courses: "B.Ed, M.Ed", desc: "Training future educators with modern pedagogical approaches", href: "/school-of-education", color: "from-cyan-700/90 to-cyan-950/95", icon: "🎓", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=70" },
  { name: "School of Applied Science", courses: "B.Sc, M.Sc", desc: "Pure and applied sciences with research-oriented curriculum", href: "/school-of-applied-science", color: "from-orange-700/90 to-orange-950/95", icon: "🔬", img: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&q=70" },
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
    text: "Avviare changed my life completely. The industry exposure, case studies, and placement support helped me land my dream job. The faculty here treats you like family, not just a student.",
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

const upcomingEvents = [
  { title: "Admission Open Day 2026-27", date: "May 5, 2026", type: "Admission", location: "Main Campus, Bilaspur" },
  { title: "Campus Recruitment Drive — TCS & Infosys", date: "May 12, 2026", type: "Placement", location: "Placement Cell" },
  { title: "Annual Sports Week", date: "May 20-25, 2026", type: "Sports", location: "Sports Ground" },
  { title: "National Law Seminar 2026", date: "June 2, 2026", type: "Academic", location: "Auditorium" },
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Announcement Ticker */}
      <div className="bg-[hsl(43,96%,55%)] py-2 overflow-hidden">
        <div className="flex items-center gap-3 animate-none">
          <span className="bg-[hsl(219,40%,16%)] text-white text-xs font-bold px-3 py-1 rounded shrink-0 ml-4">LATEST</span>
          <div className="overflow-hidden flex-1">
            <p className="text-[hsl(219,40%,16%)] text-sm font-medium whitespace-nowrap animate-[marquee_30s_linear_infinite]">
              🎓 Admissions Open 2026-27 for all UG & PG Programs &nbsp;•&nbsp; 🏆 AEH wins Best Educational Institution Award – Chhattisgarh 2026 &nbsp;•&nbsp; 💼 TCS, Infosys Campus Placement Drive on May 12 &nbsp;•&nbsp; 📚 Last date to apply: June 30, 2026 &nbsp;•&nbsp; 🎉 85% Placement Rate Achieved — Batch of 2026
            </p>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-[hsl(219,40%,16%)] via-[hsl(219,40%,20%)] to-[hsl(219,40%,14%)] text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[hsl(43,96%,55%)]/20 border border-[hsl(43,96%,55%)]/30 text-[hsl(43,96%,55%)] text-sm font-medium px-4 py-2 rounded-full mb-6">
                <Star className="h-4 w-4" /> Admissions Open 2026-27
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Welcome to<br />
                <span className="text-[hsl(43,96%,55%)]">Avviare</span><br />
                Educational Hub
              </h1>
              <p className="text-white/80 text-xl mb-8 leading-relaxed">
                Transforming education since 2013. Quality, affordable programs that prepare students for successful careers and meaningful lives in Bilaspur & beyond.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/apply" className="bg-[hsl(43,96%,55%)] text-[hsl(220,20%,15%)] font-bold px-8 py-3.5 rounded-lg hover:bg-[hsl(43,96%,45%)] transition-all text-lg shadow-lg">
                  Apply Now 2026-27
                </Link>
                <Link href="/student/login" className="border-2 border-white/40 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-all text-lg flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" /> Student Login
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 mt-8">
                <div className="flex items-center gap-2 text-white/60 text-sm"><MapPin className="h-4 w-4 text-[hsl(43,96%,55%)]" /> Bilaspur, Chhattisgarh</div>
                <div className="flex items-center gap-2 text-white/60 text-sm"><Phone className="h-4 w-4 text-[hsl(43,96%,55%)]" /> +91 77721 56789</div>
              </div>
            </div>
            {/* Hero Image */}
            <div className="hidden lg:block">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80"
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
                <div className="absolute -top-4 -right-4 bg-[hsl(43,96%,55%)] rounded-xl p-4 shadow-xl">
                  <div className="text-center">
                    <p className="font-bold text-[hsl(219,40%,16%)] text-2xl">12+</p>
                    <p className="text-xs text-[hsl(219,40%,16%)] font-medium">Years of Trust</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[hsl(43,96%,55%)] py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <Icon className="h-8 w-8 mx-auto mb-2 text-[hsl(219,40%,16%)]" />
                <div className="text-3xl font-bold text-[hsl(219,40%,16%)]">{value}</div>
                <div className="text-sm font-medium text-[hsl(219,40%,25%)]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs — All 9 Schools */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-[hsl(219,40%,16%)]/10 text-[hsl(219,40%,16%)] text-sm font-semibold px-4 py-1.5 rounded-full mb-3">9 Schools · 25+ Programs</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Schools & Programs</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Explore our diverse range of undergraduate and postgraduate programs designed for the modern world</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {programs.map(program => (
              <Link key={program.name} href={program.href} className="group block">
                <div className="rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 h-full border border-white/5">
                  {/* Image with gradient overlay */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={program.img}
                      alt={program.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${program.color}`} />
                    <div className="absolute inset-0 flex flex-col justify-end p-5">
                      <span className="text-3xl mb-2 drop-shadow">{program.icon}</span>
                      <h3 className="text-lg font-bold text-white leading-tight drop-shadow">{program.name}</h3>
                      <p className="text-white/80 text-sm font-medium mt-0.5">{program.courses}</p>
                    </div>
                  </div>
                  {/* Card body */}
                  <div className="p-5 bg-white border-t-0">
                    <p className="text-gray-500 text-sm leading-relaxed">{program.desc}</p>
                    <div className="flex items-center gap-1 text-[hsl(219,60%,28%)] font-semibold text-sm mt-4 group-hover:gap-2.5 transition-all">
                      Explore Program <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/apply" className="inline-flex items-center gap-2 bg-[hsl(219,40%,16%)] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[hsl(219,40%,24%)] transition-colors">
              Apply for Admission <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Achievements Row */}
      <section className="py-12 px-4 bg-[hsl(219,40%,16%)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="text-center">
                <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-[hsl(43,96%,55%)]">{value}</div>
                <div className="text-white/70 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-[hsl(219,40%,16%)]/10 text-[hsl(219,40%,16%)] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Why AEH?</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">The Avviare Advantage</h2>
              <div className="space-y-4">
                {[
                  { icon: Award, title: "Affordable Excellence", desc: "World-class education at fees that don't burden your family. Scholarships & easy EMI available." },
                  { icon: Users, title: "Experienced Faculty", desc: "Learn from 80+ industry veterans and distinguished academicians with real-world expertise." },
                  { icon: TrendingUp, title: "100% Placement Assistance", desc: "Dedicated placement cell with 100+ recruiting partners across India. Average package ₹4.2 LPA." },
                  { icon: Building, title: "Modern Infrastructure", desc: "Smart classrooms, AI labs, 4K media studio, moot court, science labs, AC WiFi campus." },
                  { icon: Lightbulb, title: "Industry-Aligned Curriculum", desc: "Curriculum co-designed with industry experts, regularly updated to match market demands." },
                  { icon: Heart, title: "Student-First Culture", desc: "Holistic development through sports, arts, entrepreneurship cell, NCC, NSS, and more." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="h-10 w-10 bg-[hsl(219,60%,28%)] rounded-lg flex items-center justify-center shrink-0">
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
                src="https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80"
                alt="Campus Life"
                className="rounded-2xl w-full h-56 object-cover shadow-lg"
              />
              <div className="bg-[hsl(219,40%,16%)] rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold text-[hsl(43,96%,55%)] mb-4">Admission 2026-27 Open</h3>
                <ul className="space-y-2 mb-5">
                  {["Online & Offline Admission Process", "Merit-based Scholarships Available", "Easy EMI Options for Fees", "Hostel & Transport Facility", "Same-Day Admission Counseling"].map(item => (
                    <li key={item} className="flex items-center gap-3 text-white/80 text-sm">
                      <div className="h-2 w-2 bg-[hsl(43,96%,55%)] rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/apply" className="block bg-[hsl(43,96%,55%)] text-[hsl(220,20%,15%)] font-bold text-center py-3 rounded-lg hover:bg-[hsl(43,96%,45%)] transition-colors">
                  Apply Now — Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-[hsl(43,96%,55%)]/20 text-[hsl(219,40%,16%)] text-sm font-semibold px-4 py-1.5 rounded-full mb-3">Student Success Stories</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Alumni Say</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Real words from students whose lives changed at Avviare Educational Hub</p>
          </div>

          {/* Featured Testimonial */}
          <div className="bg-gradient-to-br from-[hsl(219,40%,16%)] to-[hsl(219,40%,22%)] rounded-2xl p-8 mb-6 text-white relative overflow-hidden">
            <Quote className="absolute top-6 right-6 h-16 w-16 text-white/10" />
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <img
                src={testimonials[activeTestimonial].img}
                alt={testimonials[activeTestimonial].name}
                className="w-20 h-20 rounded-full object-cover border-4 border-[hsl(43,96%,55%)] shrink-0"
              />
              <div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[hsl(43,96%,55%)] text-[hsl(43,96%,55%)]" />
                  ))}
                </div>
                <p className="text-white/90 text-lg leading-relaxed mb-4 italic">"{testimonials[activeTestimonial].text}"</p>
                <div>
                  <p className="font-bold text-[hsl(43,96%,55%)] text-lg">{testimonials[activeTestimonial].name}</p>
                  <p className="text-white/70 text-sm">{testimonials[activeTestimonial].course}</p>
                  <p className="text-white/60 text-sm mt-0.5">🏢 {testimonials[activeTestimonial].company}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Avatars */}
          <div className="flex flex-wrap justify-center gap-3">
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`flex items-center gap-3 px-4 py-2 rounded-full border transition-all ${activeTestimonial === i ? "border-[hsl(219,40%,16%)] bg-[hsl(219,40%,16%)] text-white shadow-md" : "border-gray-200 bg-white hover:border-gray-400 text-gray-700"}`}
              >
                <img src={t.img} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
                <span className="text-sm font-medium">{t.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News with Images */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div>
              <span className="inline-block bg-[hsl(43,96%,55%)]/20 text-[hsl(219,40%,16%)] text-sm font-semibold px-4 py-1.5 rounded-full mb-2">Latest Updates</span>
              <h2 className="text-3xl font-bold text-foreground">News & Events</h2>
            </div>
            <Link href="/news" className="text-[hsl(219,60%,28%)] font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {newsItems.map(item => (
              <div key={item.title} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
                <div className="relative h-44 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-3 left-3 bg-[hsl(43,96%,55%)] text-[hsl(219,40%,16%)] text-xs font-bold px-3 py-1 rounded-full">
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

      {/* Upcoming Events */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <span className="inline-block bg-[hsl(43,96%,55%)]/20 text-[hsl(219,40%,16%)] text-sm font-semibold px-4 py-1.5 rounded-full mb-2">Don't Miss Out</span>
              <h2 className="text-3xl font-bold text-foreground">Upcoming Events</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {upcomingEvents.map(ev => {
              const typeColors: Record<string, string> = {
                Admission: "bg-green-100 text-green-700",
                Placement: "bg-blue-100 text-blue-700",
                Sports: "bg-orange-100 text-orange-700",
                Academic: "bg-purple-100 text-purple-700",
              };
              return (
                <div key={ev.title} className="flex items-center gap-5 bg-card border border-border rounded-xl p-5 hover:border-[hsl(219,40%,40%)] hover:shadow-md transition-all">
                  <div className="bg-[hsl(219,40%,16%)] text-white rounded-xl p-4 text-center shrink-0 min-w-[64px]">
                    <div className="text-xl font-bold leading-none">{ev.date.split(" ")[1]?.replace(",","")}</div>
                    <div className="text-xs text-white/70 mt-1">{ev.date.split(" ")[0]}</div>
                  </div>
                  <div className="flex-1">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${typeColors[ev.type] || "bg-gray-100 text-gray-600"}`}>{ev.type}</span>
                    <h3 className="font-semibold text-foreground mt-1 text-sm">{ev.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><MapPin className="h-3 w-3" />{ev.location}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 bg-gradient-to-br from-[hsl(219,40%,16%)] to-[hsl(219,40%,24%)]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-white/70 text-lg mb-8">Join 5000+ students who chose Avviare Educational Hub for a brighter future. Admissions for 2026-27 are now open.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/apply" className="bg-[hsl(43,96%,55%)] text-[hsl(220,20%,15%)] font-bold px-10 py-4 rounded-xl hover:bg-[hsl(43,96%,45%)] transition-all text-lg shadow-lg">
              Apply Now — Free
            </Link>
            <Link href="/contact" className="border-2 border-white/30 text-white font-semibold px-10 py-4 rounded-xl hover:bg-white/10 transition-all text-lg">
              Talk to Counselor
            </Link>
          </div>
          <p className="text-white/50 text-sm mt-6">No application fee · Same day counseling · Easy admission process</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
