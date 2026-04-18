import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Quote } from "lucide-react";

const leaders = [
  {
    name: "Shri Sandeep Singh",
    title: "Chairman & Founder",
    message: "Education is not merely the acquisition of knowledge; it is the transformation of character, the awakening of potential, and the building of a nation. At Avviare, we are committed to providing every student with an environment where they can discover their true potential, develop their skills, and emerge as confident, compassionate, and capable individuals ready to contribute to our society and our world. Our journey of twelve years has been one of relentless pursuit of excellence, and the best is yet to come.",
  },
  {
    name: "Dr. Rajendra Prasad",
    title: "Principal",
    message: "Academic excellence at Avviare is built on a foundation of rigorous curriculum, dedicated faculty, and student-centric learning. Our goal is to ensure that every student who walks through our gates receives an education that is not only intellectually stimulating but also practically relevant. We invest heavily in our faculty, our infrastructure, and our programs to ensure that Avviare graduates are among the most sought-after professionals in their respective fields.",
  },
  {
    name: "Prof. Meera Sharma",
    title: "Director - Academics",
    message: "The academic philosophy at Avviare is rooted in the belief that learning is a lifelong journey. We encourage curiosity, critical thinking, creativity, and collaboration — the four pillars of 21st century education. Our faculty members are not just teachers; they are mentors who guide students through their academic and personal growth. We take pride in our track record of producing graduates who are not just job-ready, but life-ready.",
  },
];

export default function Leadership() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-gradient-to-br from-[hsl(219,40%,16%)] to-[hsl(219,40%,22%)] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">Our Leadership</h1>
          <p className="text-white/70 text-lg">Visionary leaders guiding Avviare's mission of excellence</p>
        </div>
      </div>
      <main className="flex-1 max-w-5xl mx-auto px-4 py-12 w-full">
        <div className="space-y-10">
          {leaders.map(({ name, title, message }) => (
            <div key={name} className="bg-card border border-border rounded-2xl p-8 flex gap-6">
              <div className="shrink-0">
                <div className="h-24 w-24 bg-[hsl(219,40%,16%)] rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
                  {name.split(" ").slice(-1)[0][0]}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{name}</h2>
                <p className="text-[hsl(219,60%,28%)] font-medium text-sm mb-4">{title}</p>
                <div className="relative">
                  <Quote className="h-8 w-8 text-[hsl(43,96%,55%)] absolute -top-2 -left-2 opacity-50" />
                  <p className="text-muted-foreground leading-relaxed pl-4 italic">{message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
