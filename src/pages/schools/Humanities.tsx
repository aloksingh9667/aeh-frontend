import { SchoolPage } from "@/pages/SchoolPage";

export default function Humanities() {
  return (
    <SchoolPage
      name="School of Humanities"
      tagline="Cultivating critical thinking and cultural understanding"
      color="bg-gradient-to-br from-purple-700 to-purple-900"
      intro="The School of Humanities offers BA and MA programs in Literature, History, Political Science, Sociology, and more. Our approach combines academic rigor with real-world application through role-plays, workshops, field studies, and government sector career preparation. We believe the humanities build the critical thinking and empathy that every professional needs."
      highlights={[
        "Role-plays and simulation workshops",
        "Government & public sector career preparation",
        "Active debate and literary societies",
        "Field studies and cultural immersions",
        "Psychology and sociology labs",
        "Historical research projects",
        "Creative writing and journalism workshops",
        "Civil services exam coaching",
      ]}
      programs={[
        { name: "BA (Bachelor of Arts)", duration: "3 Years", eligibility: "10+2 from any stream (Min 45%)" },
        { name: "BA (Political Science)", duration: "3 Years", eligibility: "10+2 from any stream (Min 45%)" },
        { name: "BA (History)", duration: "3 Years", eligibility: "10+2 from any stream (Min 45%)" },
        { name: "BA (Sociology)", duration: "3 Years", eligibility: "10+2 from any stream (Min 45%)" },
        { name: "MA (Master of Arts)", duration: "2 Years", eligibility: "BA or equivalent (Min 50%)" },
        { name: "MA (English Literature)", duration: "2 Years", eligibility: "BA (English) or equivalent (Min 50%)" },
      ]}
      whyChoose={[
        "IAS/IPS/IFS exam preparation support",
        "Active student parliament and debates",
        "Cultural exchange and field trips",
        "Research paper publication support",
        "Counseling and psychology support programs",
        "Strong alumni in civil services and academia",
      ]}
      careers={["IAS/IPS Officer", "Social Worker", "Journalist", "Researcher", "Teacher/Professor", "NGO Manager", "Policy Analyst", "Content Creator"]}
    />
  );
}
