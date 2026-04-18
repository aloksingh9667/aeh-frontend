import { SchoolPage } from "@/pages/SchoolPage";

export default function Management() {
  return (
    <SchoolPage
      name="School of Management"
      tagline="Developing business leaders for the global economy"
      color="bg-gradient-to-br from-blue-700 to-blue-900"
      intro="The School of Management at Avviare Educational Hub offers industry-focused BBA and MBA programs designed to develop strategic thinking, leadership capabilities, and business acumen. Our curriculum combines theoretical frameworks with practical case studies, live projects, and industry immersions to ensure graduates are ready to excel in competitive business environments."
      highlights={[
        "Industry-integrated case study methodology",
        "Live projects with corporate partners",
        "Business simulation labs",
        "Expert guest lectures and masterclasses",
        "National & international business competitions",
        "Dedicated placement support team",
        "Entrepreneurship incubation cell",
        "Strong alumni mentorship network",
      ]}
      programs={[
        { name: "BBA (Bachelor of Business Administration)", duration: "3 Years", eligibility: "10+2 from any stream (Min 45%)" },
        { name: "BBA (Marketing)", duration: "3 Years", eligibility: "10+2 from any stream (Min 45%)" },
        { name: "BBA (Finance)", duration: "3 Years", eligibility: "10+2 from any stream (Min 45%)" },
        { name: "MBA (Master of Business Administration)", duration: "2 Years", eligibility: "Graduation from any stream (Min 50%)" },
        { name: "MBA (Marketing Management)", duration: "2 Years", eligibility: "Graduation from any stream (Min 50%)" },
        { name: "MBA (Human Resource Management)", duration: "2 Years", eligibility: "Graduation from any stream (Min 50%)" },
        { name: "MBA (Finance)", duration: "2 Years", eligibility: "Graduation from any stream (Min 50%)" },
      ]}
      whyChoose={[
        "AICTE approved programs",
        "100% placement assistance",
        "Industry mentorship program",
        "International business exposure",
        "Soft skills and personality development",
        "Flexible weekend MBA batches",
      ]}
      careers={["Marketing Manager", "Financial Analyst", "HR Manager", "Business Development Executive", "Operations Manager", "Entrepreneur", "Management Consultant", "Brand Manager"]}
    />
  );
}
