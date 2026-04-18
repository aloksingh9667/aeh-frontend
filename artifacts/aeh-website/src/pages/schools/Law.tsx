import { SchoolPage } from "@/pages/SchoolPage";

export default function Law() {
  return (
    <SchoolPage
      name="School of Law"
      tagline="Justice, advocacy, and legal excellence"
      color="bg-gradient-to-br from-amber-700 to-amber-900"
      intro="The School of Law at Avviare offers BA LL.B and LL.M programs with a strong emphasis on practical legal education. Our moot court facility, legal aid clinic, and connections with practicing attorneys ensure that students graduate with both theoretical knowledge and courtroom-ready skills."
      highlights={[
        "Dedicated moot court facility",
        "Legal aid clinic for community service",
        "Internships with law firms and courts",
        "Visits to high courts and sessions courts",
        "Debate and legal reasoning competitions",
        "Bar council examination preparation",
        "Criminal and civil law specializations",
        "Constitutional law seminars",
      ]}
      programs={[
        { name: "BA LL.B (5-Year Integrated)", duration: "5 Years", eligibility: "10+2 from any stream (Min 45%)" },
        { name: "LL.B (3-Year)", duration: "3 Years", eligibility: "Graduation from any stream (Min 45%)" },
        { name: "LL.M (Master of Laws)", duration: "2 Years", eligibility: "LL.B or equivalent (Min 50%)" },
      ]}
      whyChoose={[
        "Affiliated with Bar Council of India",
        "Mock trials and moot court competitions",
        "Legal internships from Year 2",
        "Specialized criminal and civil law tracks",
        "Experienced practicing advocates on faculty",
        "Strong placement in law firms and judiciary",
      ]}
      careers={["Advocate", "Judge (after qualifying)", "Corporate Legal Counsel", "Legal Consultant", "Public Prosecutor", "Law Professor", "Legal Journalist", "Policy Maker"]}
    />
  );
}
