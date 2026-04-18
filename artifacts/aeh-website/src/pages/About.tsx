import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { Award, Users, BookOpen, Star, Shield, Heart, MapPin, Calendar, GraduationCap, TrendingUp } from "lucide-react";

const milestones = [
  { year: "2013", event: "Avviare Educational Hub founded in Bilaspur, CG" },
  { year: "2015", event: "First batch of 500+ students graduated" },
  { year: "2017", event: "Launched School of Management with BBA/MBA programs" },
  { year: "2019", event: "New campus with state-of-the-art laboratories inaugurated" },
  { year: "2021", event: "Media & Communication Studio established" },
  { year: "2023", event: "10 Year Platinum Jubilee with 5000+ alumni" },
  { year: "2025", event: "AI & Technology Lab launched for CS students" },
  { year: "2026", event: "Expanded to 9 schools with 25+ programs" },
];

const whyChoose = [
  { icon: Award, title: "Affordable Fees", desc: "Quality education at fees accessible to all socioeconomic backgrounds", color: "from-amber-500 to-orange-500" },
  { icon: Users, title: "Experienced Faculty", desc: "Learn from professors with decades of academic and industry experience", color: "from-blue-500 to-indigo-500" },
  { icon: BookOpen, title: "Industry-Ready Curriculum", desc: "Programs designed with industry input to ensure employability", color: "from-green-500 to-teal-500" },
  { icon: Star, title: "Strong Placement Record", desc: "85%+ placement rate with 100+ recruiting partners across India", color: "from-purple-500 to-violet-500" },
  { icon: Shield, title: "Safe Campus Environment", desc: "AC WiFi campus with CCTV, 24/7 security and hostel facilities", color: "from-red-500 to-rose-500" },
  { icon: Heart, title: "Holistic Development", desc: "Focus on academics, sports, cultural activities and personality development", color: "from-pink-500 to-fuchsia-500" },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[hsl(219,40%,14%)] text-white">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1562774053-701939374585?w=1400&q=70')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(219,40%,10%)]/90 via-[hsl(219,40%,14%)]/80 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[hsl(43,96%,55%)]/20 border border-[hsl(43,96%,55%)]/40 text-[hsl(43,96%,55%)] text-sm font-medium px-4 py-2 rounded-full mb-5">
              <GraduationCap className="h-4 w-4" /> Since 2013 — Bilaspur, CG
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              About Avviare<br />
              <span className="text-[hsl(43,96%,55%)]">Educational Hub</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Shaping leaders through quality, affordable education. A decade of excellence, 10,000+ alumni, and a mission that never stops.
            </p>
            <div className="flex flex-wrap gap-6 mt-8">
              {[{ icon: Users, val: "5000+", lbl: "Students" }, { icon: GraduationCap, val: "10,000+", lbl: "Alumni" }, { icon: TrendingUp, val: "85%+", lbl: "Placement" }].map(({ icon: Icon, val, lbl }) => (
                <div key={lbl} className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-[hsl(43,96%,55%)]/20 flex items-center justify-center">
                    <Icon className="h-4 w-4 text-[hsl(43,96%,55%)]" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{val}</div>
                    <div className="text-white/50 text-xs">{lbl}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 bg-gray-50">

        {/* Our Story */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Avviare Educational Hub was established in 2013 with a singular vision: to provide world-class education to students from all socioeconomic backgrounds in Chhattisgarh and beyond. The word "Avviare" means "to start" in Italian — symbolizing our commitment to being the starting point of every student's journey toward success.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Over the past decade, we have grown from a small institution to a comprehensive educational hub offering undergraduate and postgraduate programs across nine specialized schools. Our campus in Bilaspur serves as a hub of academic excellence, cultural diversity, and personal growth.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                We believe that education is the most powerful tool for transformation. Our programs are designed not just to impart knowledge, but to build character, develop professional skills, and create responsible citizens ready to contribute to society and the economy.
              </p>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <MapPin className="h-4 w-4 text-[hsl(219,60%,35%)]" />
                <span>Bilaspur, Chhattisgarh — Affiliated with CSVTU & BU Bilaspur</span>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=700&q=75"
                alt="Campus life at Avviare"
                className="rounded-2xl shadow-xl w-full object-cover h-80 lg:h-96"
              />
              <div className="absolute -bottom-4 -left-4 bg-[hsl(219,40%,16%)] text-white rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-[hsl(43,96%,55%)]">2013</div>
                <div className="text-white/70 text-xs mt-0.5">Year Founded</div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                <div className="text-2xl font-bold text-[hsl(219,40%,16%)]">9</div>
                <div className="text-gray-500 text-xs mt-0.5">Specialized Schools</div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Facts Strip */}
        <section className="bg-[hsl(219,40%,16%)] py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
              {[
                { label: "Founded", value: "2013", icon: Calendar },
                { label: "Programs", value: "25+ UG & PG", icon: BookOpen },
                { label: "Enrolled Students", value: "5000+", icon: Users },
                { label: "Placement Rate", value: "85%+", icon: TrendingUp },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div className="h-10 w-10 rounded-xl bg-[hsl(43,96%,55%)]/20 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-[hsl(43,96%,55%)]" />
                  </div>
                  <div className="font-bold text-lg text-white">{value}</div>
                  <div className="text-white/50 text-xs">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Avviare */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Why Choose Avviare?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Thousands of students trust us every year. Here's why Avviare stands out.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Campus Gallery Strip */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Campus Life</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=500&q=70", alt: "Classroom" },
              { url: "https://images.unsplash.com/photo-1568792923760-d70635a89fdc?w=500&q=70", alt: "Library" },
              { url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=70", alt: "Lab" },
              { url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&q=70", alt: "Campus event" },
            ].map(({ url, alt }) => (
              <div key={alt} className="aspect-square overflow-hidden rounded-xl shadow-sm">
                <img src={url} alt={alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </section>

        {/* Milestones */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Milestones</h2>
              <p className="text-gray-500">A decade-long journey of growth and achievement</p>
            </div>
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
              <div className="space-y-6">
                {milestones.map(({ year, event }, i) => (
                  <div key={year} className="flex gap-6 pl-14 relative">
                    <div className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center shadow font-bold text-xs ${i % 2 === 0 ? "bg-[hsl(219,40%,16%)] text-white" : "bg-[hsl(43,96%,55%)] text-[hsl(219,40%,16%)]"}`}>
                      {year.slice(2)}
                    </div>
                    <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-4 flex-1 hover:shadow-md transition-shadow">
                      <span className="text-[hsl(43,96%,55%)] font-bold text-sm">{year}</span>
                      <p className="text-gray-700 mt-1 text-sm">{event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="relative overflow-hidden bg-[hsl(219,40%,16%)] rounded-3xl p-10 text-center text-white">
            <div
              className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=50')", backgroundSize: "cover", backgroundPosition: "center" }}
            />
            <div className="relative">
              <h2 className="text-3xl font-bold text-[hsl(43,96%,55%)] mb-3">Join the Avviare Family</h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto">
                Be part of an institution that has shaped thousands of successful careers. Applications are now open for 2026-27.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/apply" className="bg-[hsl(43,96%,55%)] text-[hsl(220,20%,15%)] font-bold px-8 py-3 rounded-xl hover:bg-[hsl(43,96%,45%)] transition-colors">
                  Apply Now — Free
                </Link>
                <Link href="/contact" className="border-2 border-white/40 font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
