import { SchoolPage } from "@/pages/SchoolPage";

export default function Commerce() {
  return (
    <SchoolPage
      name="School of Commerce"
      tagline="Building the financial leaders and business professionals of tomorrow"
      color="bg-gradient-to-br from-teal-700 to-teal-900"
      image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80"
      stats={[
        { value: "92%", label: "Placement Rate" },
        { value: "5", label: "Programs Offered" },
        { value: "₹4.5L", label: "Avg Package" },
        { value: "200+", label: "Students Enrolled" },
      ]}
      intro="The School of Commerce offers comprehensive B.Com and M.Com programs that build a strong foundation in accounting, finance, taxation, and business law. Our curriculum integrates traditional commerce education with modern financial tools and technologies, preparing graduates for professional certifications such as CA, CMA, and corporate careers in banking, audit, and finance."
      highlights={[
        "Tally ERP, GST & income tax software training",
        "CA and CMA foundation coaching support",
        "Finance and accounting industry internships",
        "Guest lectures by Chartered Accountants",
        "Commerce club activities & competitions",
        "Stock market & investment simulation lab",
        "Banking and insurance sector live projects",
        "Entrepreneurship development workshops",
      ]}
      programs={[
        { name: "B.Com (Bachelor of Commerce)", duration: "3 Years", eligibility: "10+2 Commerce/any stream (Min 45%)" },
        { name: "B.Com (Honours)", duration: "3 Years", eligibility: "10+2 Commerce (Min 50%)" },
        { name: "B.Com (Taxation & Finance)", duration: "3 Years", eligibility: "10+2 Commerce/any stream (Min 45%)" },
        { name: "M.Com (Master of Commerce)", duration: "2 Years", eligibility: "B.Com or equivalent (Min 50%)" },
        { name: "M.Com (Finance & Taxation)", duration: "2 Years", eligibility: "B.Com or equivalent (Min 50%)" },
      ]}
      whyChoose={[
        "CA/CMA exam preparation support built into curriculum",
        "Practical Tally ERP 9 and GST training from day one",
        "Industry visits to banks and financial institutions",
        "Commerce alumni mentorship network",
        "Access to SEBI-registered trading simulators",
        "Strong placement in banking and consulting sector",
      ]}
      careers={["Chartered Accountant", "Cost Accountant", "Financial Analyst", "Bank Officer", "Tax Consultant", "Auditor", "Finance Manager", "Investment Advisor", "GST Practitioner", "Company Secretary"]}
    />
  );
}
