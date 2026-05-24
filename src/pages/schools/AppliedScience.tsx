import { SchoolPage } from "@/pages/SchoolPage";

export default function AppliedScience() {
  return (
    <SchoolPage
      name="School of Applied Science"
      tagline="Exploring the world through science and research"
      color="bg-gradient-to-br from-cyan-700 to-cyan-900"
      intro="The School of Applied Science offers B.Sc and M.Sc programs in Physics, Chemistry, Mathematics, Biotechnology, and Environmental Science. With fully equipped research laboratories and a strong research culture, students engage in scientific inquiry that contributes to real-world solutions."
      highlights={[
        "Research-grade laboratory equipment",
        "Faculty with PhD and research experience",
        "Inter-university research collaborations",
        "Science exhibitions and project fairs",
        "NET/SET examination coaching",
        "Environmental and field study programs",
        "Biotechnology and molecular biology labs",
        "Applied mathematics and statistics workshops",
      ]}
      programs={[
        { name: "B.Sc (Physics, Chemistry, Math)", duration: "3 Years", eligibility: "10+2 Science (Min 45%)" },
        { name: "B.Sc (Biotechnology)", duration: "3 Years", eligibility: "10+2 Science with Biology (Min 50%)" },
        { name: "B.Sc (Environmental Science)", duration: "3 Years", eligibility: "10+2 Science (Min 45%)" },
        { name: "M.Sc (Chemistry)", duration: "2 Years", eligibility: "B.Sc with Chemistry (Min 50%)" },
        { name: "M.Sc (Mathematics)", duration: "2 Years", eligibility: "B.Sc with Math (Min 50%)" },
        { name: "M.Sc (Biotechnology)", duration: "2 Years", eligibility: "B.Sc in Life Sciences (Min 50%)" },
      ]}
      whyChoose={[
        "Advanced research laboratories",
        "PhD faculty with publication records",
        "UGC/NET coaching and support",
        "Research paper publication guidance",
        "Industry internships in R&D labs",
        "Access to digital science resources",
      ]}
      careers={["Research Scientist", "Lab Technician", "Environmental Consultant", "Biotechnologist", "Science Teacher", "Quality Analyst", "Data Scientist", "Patent Analyst"]}
    />
  );
}
