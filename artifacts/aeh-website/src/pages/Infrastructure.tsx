import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Wifi, Monitor, FlaskConical, BookOpen, Utensils, Music, Building, Shield } from "lucide-react";

const facilities = [
  { icon: Monitor, name: "Smart Classrooms", desc: "140+ smart classrooms equipped with projectors, audio systems, and digital whiteboards for interactive learning" },
  { icon: FlaskConical, name: "Advanced Laboratories", desc: "State-of-the-art labs for Computer Science, Pharmacy, Applied Sciences, and Media & Communication" },
  { icon: BookOpen, name: "Digital Library", desc: "Extensive library with 50,000+ books, journals, e-resources, and dedicated study zones" },
  { icon: Wifi, name: "Campus-wide WiFi", desc: "High-speed internet connectivity across the entire campus — available 24/7 for students and faculty" },
  { icon: Utensils, name: "Modern Cafeteria", desc: "Hygienic, affordable cafeteria serving nutritious meals — a social hub for the Avviare community" },
  { icon: Music, name: "Auditorium", desc: "1000-seat auditorium for conferences, cultural programs, guest lectures, and events" },
  { icon: Building, name: "Hostel Facilities", desc: "Separate hostel for boys and girls with AC rooms, 24/7 security, mess, and recreational facilities" },
  { icon: Shield, name: "Security & Safety", desc: "24/7 CCTV surveillance, security personnel, and a safe campus environment for all students" },
];

export default function Infrastructure() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-gradient-to-br from-[hsl(219,40%,16%)] to-[hsl(219,40%,22%)] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">Our Infrastructure</h1>
          <p className="text-white/70 text-lg">World-class facilities for an exceptional learning experience</p>
        </div>
      </div>
      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        <p className="text-muted-foreground text-lg mb-10 text-center max-w-3xl mx-auto">
          Our campus in Bilaspur is designed to provide students with an environment that fosters learning, creativity, and personal development. Every facility reflects our commitment to excellence.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Campus Area", value: "15+ Acres" },
            { label: "Classrooms", value: "140+" },
            { label: "Labs", value: "25+" },
            { label: "Library Books", value: "50,000+" },
          ].map(stat => (
            <div key={stat.label} className="bg-[hsl(219,40%,16%)] text-white rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-[hsl(43,96%,55%)]">{stat.value}</div>
              <div className="text-white/70 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map(({ icon: Icon, name, desc }) => (
            <div key={name} className="bg-card border border-border rounded-xl p-6">
              <div className="h-12 w-12 bg-[hsl(219,60%,28%)]/10 rounded-xl flex items-center justify-center mb-4">
                <Icon className="h-6 w-6 text-[hsl(219,60%,28%)]" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
