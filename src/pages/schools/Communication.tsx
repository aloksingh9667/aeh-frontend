import { SchoolPage } from "@/pages/SchoolPage";

export default function Communication() {
  return (
    <SchoolPage
      name="School of Journalism & Mass Communication"
      tagline="Storytellers, journalists, and media professionals in the making"
      color="bg-gradient-to-br from-rose-700 to-rose-900"
      intro="The School of Journalism & Mass Communication offers DJMC, BJMC, and MJMC programs in a dedicated media studio environment. Students learn the art and science of storytelling across print, television, radio, and digital media. With a curriculum built on real-world practice and industry internships, our graduates are equipped to shape public discourse and lead in the ever-evolving media landscape."
      highlights={[
        "Professional TV and radio studio",
        "Digital journalism and new media lab",
        "Internships with leading media houses",
        "Industry certifications in media production",
        "National media competition participation",
        "Campus media — newspaper and magazine",
        "Documentary and film production",
        "Social media management and content creation",
      ]}
      programs={[
        { name: "DJMC (Diploma in Journalism & Mass Communication)", duration: "1 Year", eligibility: "10+2 from any stream (Min 45%)" },
        { name: "BJMC (Bachelor of Journalism & Mass Communication)", duration: "3 Years", eligibility: "10+2 from any stream (Min 45%)" },
        { name: "MJMC (Master of Journalism & Mass Communication)", duration: "2 Years", eligibility: "Graduation from any stream (Min 50%)" },
      ]}
      whyChoose={[
        "State-of-the-art media production studio",
        "Industry connections with TV channels and newspapers",
        "Hands-on experience from semester one",
        "Experienced faculty from media industry",
        "Portfolio development support",
        "Excellent placement in media companies",
      ]}
      careers={["TV Journalist", "Print Journalist", "Digital Content Creator", "PR Manager", "Video Producer", "Radio Jockey", "Media Planner", "Social Media Manager"]}
    />
  );
}
