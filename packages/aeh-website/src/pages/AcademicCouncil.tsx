import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const members = [
  { name: "Dr. Mahaveer Jain", role: "Chairman, Academic Council", dept: "Management Studies" },
  { name: "Prof. S.K. Shukla", role: "Member", dept: "Computer Science & IT" },
  { name: "Dr. Anita Verma", role: "Member", dept: "Commerce & Economics" },
  { name: "Prof. R.K. Tiwari", role: "Member", dept: "Humanities & Social Sciences" },
  { name: "Dr. Priya Nair", role: "Member", dept: "Applied Sciences" },
  { name: "Prof. Arun Gupta", role: "Member", dept: "Law" },
  { name: "Dr. Sunita Patel", role: "Member", dept: "Pharmacy" },
  { name: "Prof. Vijay Kumar", role: "Member", dept: "Education" },
  { name: "Dr. Rekha Singh", role: "Member Secretary", dept: "Journalism & Mass Comm." },
  { name: "Shri Deepak Sharma", role: "Nominee - Industry", dept: "Corporate & Industry" },
  { name: "Dr. Kavitha Menon", role: "External Expert", dept: "Distance Education" },
  { name: "Prof. Suresh Bhatt", role: "External Expert", dept: "Research & Development" },
];

export default function AcademicCouncil() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-gradient-to-br from-[hsl(219,40%,16%)] to-[hsl(219,40%,22%)] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">Academic Council</h1>
          <p className="text-white/70 text-lg">The governing body overseeing academic excellence at Avviare</p>
        </div>
      </div>
      <main className="flex-1 max-w-5xl mx-auto px-4 py-12 w-full">
        <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
          The Academic Council of Avviare Educational Hub is the apex body responsible for curriculum development, academic policy, quality assurance, and maintaining the highest standards of education across all programs.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {members.map(({ name, role, dept }) => (
            <div key={name} className="bg-card border border-border rounded-xl p-5 flex gap-4">
              <div className="h-12 w-12 bg-[hsl(219,40%,16%)] text-white rounded-xl flex items-center justify-center text-lg font-bold shrink-0">
                {name.split(" ").filter(w => w !== "Dr." && w !== "Prof." && w !== "Shri")[0][0]}
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">{name}</h3>
                <p className="text-[hsl(219,60%,28%)] text-xs font-medium mt-0.5">{role}</p>
                <p className="text-muted-foreground text-xs mt-1">{dept}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
