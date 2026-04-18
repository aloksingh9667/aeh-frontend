import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { Award, Users, BookOpen, Star, Shield, Heart, Lightbulb, Target } from "lucide-react";

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

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-gradient-to-br from-[hsl(219,40%,16%)] to-[hsl(219,40%,22%)] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">About Avviare Educational Hub</h1>
          <p className="text-white/70 text-lg">Shaping leaders through quality, affordable education since 2013</p>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Story</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Avviare Educational Hub was established in 2013 with a singular vision: to provide world-class education to students from all socioeconomic backgrounds in Chhattisgarh and beyond. The word "Avviare" means "to start" in Italian — symbolizing our commitment to being the starting point of every student's journey toward success.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Over the past decade, we have grown from a small institution to a comprehensive educational hub offering undergraduate and postgraduate programs across nine specialized schools. Our campus in Bilaspur serves as a hub of academic excellence, cultural diversity, and personal growth.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe that education is the most powerful tool for transformation. Our programs are designed not just to impart knowledge, but to build character, develop professional skills, and create responsible citizens ready to contribute to society and the economy.
              </p>
            </div>
          </div>
          <div className="bg-[hsl(219,40%,16%)] rounded-xl p-6 text-white">
            <h3 className="font-bold text-[hsl(43,96%,55%)] text-lg mb-4">Quick Facts</h3>
            <ul className="space-y-3">
              {[
                { label: "Founded", value: "2013" },
                { label: "Location", value: "Bilaspur, CG" },
                { label: "Schools", value: "9 Specialized Schools" },
                { label: "Programs", value: "25+ UG & PG" },
                { label: "Students", value: "5000+ Enrolled" },
                { label: "Alumni", value: "10,000+" },
                { label: "Placement Rate", value: "85%+" },
                { label: "Affiliation", value: "CSVTU, BU Bilaspur" },
              ].map(({ label, value }) => (
                <li key={label} className="flex justify-between text-sm border-b border-white/10 pb-2">
                  <span className="text-white/60">{label}</span>
                  <span className="font-semibold">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Why Choose Avviare?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Award, title: "Affordable Fees", desc: "Quality education at fees accessible to all socioeconomic backgrounds" },
              { icon: Users, title: "Experienced Faculty", desc: "Learn from professors with decades of academic and industry experience" },
              { icon: BookOpen, title: "Industry-Ready Curriculum", desc: "Programs designed with industry input to ensure employability" },
              { icon: Star, title: "Strong Placement Record", desc: "85%+ placement rate with 100+ recruiting partners" },
              { icon: Shield, title: "Safe Campus Environment", desc: "AC WiFi campus with CCTV, 24/7 security and hostel facilities" },
              { icon: Heart, title: "Holistic Development", desc: "Focus on academics, sports, cultural activities and personality development" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card border border-border rounded-xl p-6">
                <div className="h-12 w-12 bg-[hsl(219,60%,28%)]/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-[hsl(219,60%,28%)]" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Our Milestones</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-6">
              {milestones.map(({ year, event }) => (
                <div key={year} className="flex gap-6 pl-12 relative">
                  <div className="absolute left-0 w-8 h-8 bg-[hsl(219,60%,28%)] text-white text-xs font-bold rounded-full flex items-center justify-center shadow">
                    <div className="text-center leading-none">{year.slice(2)}</div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4 flex-1">
                    <span className="text-[hsl(43,96%,55%)] font-bold text-sm">{year}</span>
                    <p className="text-foreground mt-1">{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[hsl(219,40%,16%)] rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold text-[hsl(43,96%,55%)] mb-3">Join the Avviare Family</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">Be part of an institution that has shaped thousands of successful careers. Applications are now open for 2026-27.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/apply" className="bg-[hsl(43,96%,55%)] text-[hsl(220,20%,15%)] font-bold px-8 py-3 rounded-lg hover:bg-[hsl(43,96%,45%)] transition-colors">Apply Now</Link>
            <Link href="/contact" className="border-2 border-white/40 font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">Contact Us</Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
