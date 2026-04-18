import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Wifi, Monitor, FlaskConical, BookOpen, Utensils, Music, Building, Shield, CheckCircle2 } from "lucide-react";

const facilities = [
  {
    icon: Monitor,
    name: "Smart Classrooms",
    desc: "140+ smart classrooms equipped with projectors, audio systems, and digital whiteboards for interactive learning",
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=70",
    highlights: ["140+ classrooms", "Digital whiteboards", "HD projectors", "Audio systems"],
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: FlaskConical,
    name: "Advanced Laboratories",
    desc: "State-of-the-art labs for Computer Science, Pharmacy, Applied Sciences, and Media & Communication",
    img: "https://images.unsplash.com/photo-1532094349884-543559822cff?w=600&q=70",
    highlights: ["25+ labs", "CS & IT labs", "Pharmacy lab", "Media studio"],
    color: "from-green-500 to-teal-600",
  },
  {
    icon: BookOpen,
    name: "Digital Library",
    desc: "Extensive library with 50,000+ books, journals, e-resources, and dedicated study zones",
    img: "https://images.unsplash.com/photo-1568792923760-d70635a89fdc?w=600&q=70",
    highlights: ["50,000+ books", "E-journals", "Digital resources", "Silent study zones"],
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Wifi,
    name: "Campus-wide WiFi",
    desc: "High-speed internet connectivity across the entire campus — available 24/7 for students and faculty",
    img: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600&q=70",
    highlights: ["High-speed internet", "24/7 availability", "All campus areas", "Secure network"],
    color: "from-purple-500 to-violet-600",
  },
  {
    icon: Utensils,
    name: "Modern Cafeteria",
    desc: "Hygienic, affordable cafeteria serving nutritious meals — a social hub for the Avviare community",
    img: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&q=70",
    highlights: ["Hygienic kitchen", "Affordable pricing", "Multi-cuisine", "Spacious seating"],
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: Music,
    name: "Auditorium",
    desc: "1000-seat auditorium for conferences, cultural programs, guest lectures, and events",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=70",
    highlights: ["1000 seats", "AC facility", "Pro audio/visual", "Events & seminars"],
    color: "from-cyan-500 to-sky-600",
  },
  {
    icon: Building,
    name: "Hostel Facilities",
    desc: "Separate hostel for boys and girls with AC rooms, 24/7 security, mess, and recreational facilities",
    img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=70",
    highlights: ["Boys & girls hostels", "AC rooms", "In-house mess", "Recreational area"],
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: Shield,
    name: "Security & Safety",
    desc: "24/7 CCTV surveillance, security personnel, and a safe campus environment for all students",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=70",
    highlights: ["24/7 CCTV", "Trained security", "Safe campus", "Emergency support"],
    color: "from-slate-500 to-gray-600",
  },
];

const stats = [
  { label: "Campus Area", value: "15+ Acres" },
  { label: "Classrooms", value: "140+" },
  { label: "Labs", value: "25+" },
  { label: "Library Books", value: "50,000+" },
];

export default function Infrastructure() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden bg-[hsl(219,40%,14%)] text-white">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1400&q=70')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(219,40%,10%)]/90 via-[hsl(219,40%,14%)]/80 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[hsl(43,96%,55%)]/20 border border-[hsl(43,96%,55%)]/40 text-[hsl(43,96%,55%)] text-sm font-medium px-4 py-2 rounded-full mb-5">
              <Building className="h-4 w-4" /> World-Class Campus
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Our <span className="text-[hsl(43,96%,55%)]">Infrastructure</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-xl">
              A 15-acre campus in Bilaspur designed to provide students with an environment that fosters learning, creativity, and personal development.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {stats.map(stat => (
              <div key={stat.label} className="py-6 px-6 text-center">
                <div className="text-3xl font-bold text-[hsl(43,96%,55%)]">{stat.value}</div>
                <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Intro */}
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">World-Class Facilities</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Every corner of our campus is designed with student success in mind — from cutting-edge labs to comfortable living spaces.
            </p>
          </div>

          {/* Facilities Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {facilities.map(({ icon: Icon, name, desc, img, highlights, color }) => (
              <div key={name} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={img}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className={`absolute top-4 left-4 h-10 w-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="absolute bottom-4 left-4 font-bold text-white text-lg">{name}</h3>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{desc}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {highlights.map(h => (
                      <div key={h} className="flex items-center gap-1.5 text-xs text-gray-600">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Campus Photo Collage */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">A Glimpse of Our Campus</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 row-span-2">
                <img
                  src="https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=70"
                  alt="Campus building"
                  className="w-full h-full object-cover rounded-2xl shadow-sm"
                  style={{ minHeight: "300px" }}
                />
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=70"
                  alt="Hostel"
                  className="w-full h-full object-cover rounded-2xl shadow-sm"
                  style={{ minHeight: "145px" }}
                />
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=70"
                  alt="Auditorium"
                  className="w-full h-full object-cover rounded-2xl shadow-sm"
                  style={{ minHeight: "145px" }}
                />
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 bg-[hsl(219,40%,16%)] rounded-2xl p-10 text-center text-white">
            <h2 className="text-2xl font-bold text-[hsl(43,96%,55%)] mb-3">Experience It Yourself</h2>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              Visit our campus and see our world-class facilities. Schedule a tour or apply now to be part of the Avviare family.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/apply" className="bg-[hsl(43,96%,55%)] text-[hsl(220,20%,15%)] font-bold px-8 py-3 rounded-xl hover:bg-[hsl(43,96%,45%)] transition-colors">
                Apply Now
              </a>
              <a href="/contact" className="border-2 border-white/40 font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors">
                Schedule a Visit
              </a>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
