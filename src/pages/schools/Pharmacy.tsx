import { SchoolPage } from "@/pages/SchoolPage";

export default function Pharmacy() {
  return (
    <SchoolPage
      name="School of Pharmacy"
      tagline="Advancing healthcare through pharmaceutical excellence"
      color="bg-gradient-to-br from-green-700 to-green-900"
      intro="The School of Pharmacy offers B.Pharm and D.Pharm programs in state-of-the-art pharmaceutical laboratories. Our curriculum covers pharmacology, pharmaceutical chemistry, drug design, and clinical pharmacy. Regular industry visits and projects with pharmaceutical companies ensure our graduates are ready for both research and clinical roles."
      highlights={[
        "PCI-approved pharmaceutical laboratories",
        "Drug design and synthesis labs",
        "Industry visits to pharma companies",
        "Research projects with pharma MNCs",
        "Clinical pharmacy internships",
        "Pharmacovigilance training",
        "Regulatory affairs and documentation",
        "Community pharmacy programs",
      ]}
      programs={[
        { name: "D.Pharm (Diploma in Pharmacy)", duration: "2 Years", eligibility: "10+2 with Science (PCM/PCB) Min 45%" },
        { name: "B.Pharm (Bachelor of Pharmacy)", duration: "4 Years", eligibility: "10+2 with Science (PCB/PCM) Min 50%" },
      ]}
      whyChoose={[
        "Pharmacy Council of India approved",
        "Fully equipped pharmaceutical labs",
        "Industry-connected research projects",
        "Placement in top pharma companies",
        "Pharmacovigilance and regulatory training",
        "Entrepreneurship in pharma retail",
      ]}
      careers={["Pharmacist", "Drug Inspector", "Pharmaceutical Researcher", "Clinical Research Associate", "Regulatory Affairs Manager", "Quality Control Analyst", "Pharmacy Manager", "Medical Representative"]}
    />
  );
}
