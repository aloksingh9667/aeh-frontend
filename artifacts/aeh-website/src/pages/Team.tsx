import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const departments = [
  {
    name: "Dean Academics",
    members: [
      { name: "Dr. Rajendra Prasad", title: "Principal & Dean Academics" },
      { name: "Prof. Meera Sharma", title: "Director - Academics" },
    ],
  },
  {
    name: "School of Management",
    members: [
      { name: "Dr. Arun Mishra", title: "Head of Department" },
      { name: "Prof. Deepika Jha", title: "Associate Professor" },
      { name: "Prof. Ravi Shankar", title: "Assistant Professor" },
      { name: "Dr. Pooja Verma", title: "Assistant Professor" },
    ],
  },
  {
    name: "School of CS & IT",
    members: [
      { name: "Prof. Abhishek Swami", title: "Head of Department" },
      { name: "Dr. Neha Tiwari", title: "Associate Professor" },
      { name: "Prof. Rohit Kumar", title: "Assistant Professor" },
      { name: "Prof. Swati Gupta", title: "Assistant Professor" },
    ],
  },
  {
    name: "School of Commerce",
    members: [
      { name: "Dr. Sunita Agrawal", title: "Head of Department" },
      { name: "Prof. Mukesh Soni", title: "Associate Professor" },
      { name: "Prof. Kavita Patel", title: "Assistant Professor" },
    ],
  },
  {
    name: "Applied Science & Pharmacy",
    members: [
      { name: "Dr. Vinod Kumar", title: "Head of Department" },
      { name: "Prof. Anita Rajput", title: "Associate Professor" },
      { name: "Dr. Suresh Chandel", title: "Associate Professor" },
    ],
  },
  {
    name: "Humanities & Social Sciences",
    members: [
      { name: "Dr. Rita Devi", title: "Head of Department" },
      { name: "Prof. Shyam Lal", title: "Associate Professor" },
      { name: "Prof. Rekha Pandey", title: "Assistant Professor" },
    ],
  },
  {
    name: "School of Journalism & Mass Comm.",
    members: [
      { name: "Prof. Vikram Singh", title: "Head of Department" },
      { name: "Dr. Anjali Dubey", title: "Associate Professor" },
      { name: "Prof. Rahul Shrivas", title: "Assistant Professor" },
    ],
  },
];

export default function Team() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-gradient-to-br from-[hsl(219,40%,16%)] to-[hsl(219,40%,22%)] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">Our Team</h1>
          <p className="text-white/70 text-lg">Meet the dedicated educators shaping the future</p>
        </div>
      </div>
      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="space-y-10">
          {departments.map(dept => (
            <div key={dept.name}>
              <h2 className="text-xl font-bold text-foreground mb-5 pb-2 border-b border-border">{dept.name}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {dept.members.map(member => (
                  <div key={member.name} className="bg-card border border-border rounded-xl p-5 text-center">
                    <div className="h-16 w-16 mx-auto bg-[hsl(219,40%,16%)] text-white rounded-full flex items-center justify-center text-xl font-bold mb-3">
                      {member.name.split(" ").filter(w => !["Dr.", "Prof."].includes(w))[0][0]}
                    </div>
                    <h3 className="font-semibold text-foreground text-sm">{member.name}</h3>
                    <p className="text-muted-foreground text-xs mt-1">{member.title}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
