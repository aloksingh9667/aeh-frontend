import { SchoolPage } from "@/pages/SchoolPage";

export default function Education() {
  return (
    <SchoolPage
      name="School of Education"
      tagline="Training the teachers who will shape tomorrow"
      color="bg-gradient-to-br from-violet-700 to-violet-900"
      intro="The School of Education offers B.Ed and M.Ed programs for aspiring teachers and educational leaders. Our practical training includes school internships, teaching labs, lesson planning workshops, and educational psychology sessions. We prepare educators who are compassionate, skilled, and ready to inspire a new generation of learners."
      highlights={[
        "School internship from Semester 1",
        "Modern teaching methodology workshops",
        "Educational psychology labs",
        "Lesson planning and assessment training",
        "Special education modules",
        "Digital classroom and EdTech training",
        "CTET/STET examination coaching",
        "Inclusive education programs",
      ]}
      programs={[
        { name: "B.Ed (Bachelor of Education)", duration: "2 Years", eligibility: "Graduation from any stream (Min 50%)" },
        { name: "M.Ed (Master of Education)", duration: "2 Years", eligibility: "B.Ed or equivalent (Min 50%)" },
      ]}
      whyChoose={[
        "NCTE approved B.Ed program",
        "School internship with reputed institutions",
        "CTET/STET coaching included",
        "Experienced teacher educators on faculty",
        "Practical teaching labs and demo classes",
        "Strong placement in private and govt schools",
      ]}
      careers={["Primary School Teacher", "Secondary School Teacher", "Special Educator", "Educational Administrator", "School Principal", "Curriculum Developer", "Educational Counselor", "EdTech Professional"]}
    />
  );
}
