import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, Star, Heart, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Shield,
    name: "Integrity",
    color: "bg-blue-600",
    desc: "We uphold the highest standards of honesty, transparency, and ethical conduct in all our academic and administrative dealings. We believe that integrity forms the bedrock of true education — it shapes not just what students learn, but who they become.",
    points: ["Ethical academic practices", "Transparent admission process", "Honest faculty-student relationships", "Zero tolerance for malpractice"],
  },
  {
    icon: Star,
    name: "Excellence",
    color: "bg-amber-500",
    desc: "Excellence is not just a goal — it is our daily practice. From curriculum design to classroom teaching, from campus facilities to placement support, we continuously strive to raise the bar and deliver the best for our students.",
    points: ["Rigorous academic standards", "Continuous faculty development", "Industry-aligned curriculum", "Outstanding placement outcomes"],
  },
  {
    icon: Heart,
    name: "Compassion",
    color: "bg-rose-600",
    desc: "We recognize that every student comes with their own unique journey, challenges, and aspirations. Our approach is rooted in empathy — we listen, we support, and we care deeply about the personal and professional growth of each individual.",
    points: ["Student-first approach", "Mental health support programs", "Need-based scholarship schemes", "Inclusive learning environment"],
  },
  {
    icon: Lightbulb,
    name: "Innovation",
    color: "bg-green-600",
    desc: "The world is changing rapidly, and education must evolve with it. We embrace new ideas, technologies, and teaching methodologies to ensure our students are equipped with skills that are relevant, future-ready, and impactful.",
    points: ["Cutting-edge labs and technology", "Industry mentorship programs", "Entrepreneurship incubation", "Research and innovation culture"],
  },
];

export default function CoreValues() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-gradient-to-br from-[hsl(219,40%,16%)] to-[hsl(219,40%,22%)] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">Core Values</h1>
          <p className="text-white/70 text-lg">The principles that guide everything we do at Avviare</p>
        </div>
      </div>
      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="text-center mb-12">
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            At Avviare Educational Hub, our core values are not simply words on paper — they are the living principles that shape our culture, guide our decisions, and define our identity as an institution.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {values.map(({ icon: Icon, name, color, desc, points }) => (
            <div key={name} className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className={`${color} p-6 text-white flex items-center gap-4`}>
                <div className="h-14 w-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Icon className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold">{name}</h2>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground leading-relaxed mb-5">{desc}</p>
                <ul className="space-y-2">
                  {points.map(point => (
                    <li key={point} className="flex items-center gap-3 text-sm text-foreground">
                      <div className="h-2 w-2 rounded-full bg-[hsl(219,60%,28%)] shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
