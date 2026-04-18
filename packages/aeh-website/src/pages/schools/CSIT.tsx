import { SchoolPage } from "@/pages/SchoolPage";

export default function CSIT() {
  return (
    <SchoolPage
      name="School of Computer Science & IT"
      tagline="Building the technology leaders of tomorrow"
      color="bg-gradient-to-br from-indigo-700 to-indigo-900"
      intro="The School of Computer Science & IT at Avviare offers BCA and MCA programs with a strong focus on practical programming, modern technologies, and emerging fields like Artificial Intelligence and Machine Learning. Our state-of-the-art labs with the latest hardware and software ensure students get hands-on experience from day one."
      highlights={[
        "State-of-the-art IT labs with 200+ workstations",
        "AI & Machine Learning lab",
        "Industry certifications (AWS, Google, Microsoft)",
        "Internship with top tech companies",
        "Hackathons and coding competitions",
        "Web development and app development projects",
        "Cybersecurity and networking training",
        "Open source project contributions",
      ]}
      programs={[
        { name: "BCA (Bachelor of Computer Applications)", duration: "3 Years", eligibility: "10+2 (Math/CS preferred, Min 45%)" },
        { name: "BCA (Data Science)", duration: "3 Years", eligibility: "10+2 (Math/CS preferred, Min 45%)" },
        { name: "BCA (Cybersecurity)", duration: "3 Years", eligibility: "10+2 (Math/CS preferred, Min 45%)" },
        { name: "MCA (Master of Computer Applications)", duration: "2 Years", eligibility: "BCA/B.Sc (CS/IT) or equivalent (Min 50%)" },
        { name: "MCA (AI & Machine Learning)", duration: "2 Years", eligibility: "BCA/B.Sc (CS/IT) or equivalent (Min 50%)" },
      ]}
      whyChoose={[
        "Industry partnerships with top tech firms",
        "Regular hackathons and coding contests",
        "Cloud computing and DevOps labs",
        "Placement in MNCs and startups",
        "Active coding clubs and communities",
        "Guest lectures by industry professionals",
      ]}
      careers={["Software Developer", "Web Developer", "AI Engineer", "Data Analyst", "Cybersecurity Analyst", "Cloud Architect", "App Developer", "Database Administrator"]}
    />
  );
}
