import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Calendar, ArrowRight, X, Share2 } from "lucide-react";

const news = [
  {
    title: "AEH Students Win National Business Competition 2026",
    date: "April 10, 2026",
    category: "Achievement",
    desc: "Our BBA students won first place at the National Business Innovation Challenge organized by CII, competing against 200+ teams from across India.",
    full: "Avviare Educational Hub's BBA students have made the institution proud by clinching the first position at the prestigious National Business Innovation Challenge 2026, organized by the Confederation of Indian Industry (CII).\n\nThe 5-member team, led by final-year student Aakash Sharma, presented an innovative sustainability-focused business model for rural e-commerce. Competing against 200+ teams from leading management institutes across India, the AEH team stood out for their grounded approach, financial acumen, and presentation skills.\n\nThe award ceremony was held in New Delhi, where the team received a cash prize of ₹1,00,000 and certificates of merit from industry stalwarts. Faculty mentor Prof. Ramesh Gupta credited the success to the institute's rigorous case-study based curriculum and mock competition sessions.\n\n\"This win is a testament to the quality of business education at AEH. Our students compete with the best in the country and excel,\" said Dr. Priya Malhotra, Dean — School of Management.",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
  },
  {
    title: "Placement Drive 2026: 85% Students Placed",
    date: "March 28, 2026",
    category: "Placements",
    desc: "The 2026 placement season concluded with 85% placement rate. Top recruiters included TCS, Infosys, HDFC Bank, and Amazon, offering packages up to ₹8 LPA.",
    full: "The Placement Season 2026 at Avviare Educational Hub has concluded on a high note, with 85% of eligible students receiving placement offers from leading companies across India.\n\nOver 120 companies participated in campus recruitment drives held between January and March 2026. The highest package offered was ₹8 LPA by Amazon for a Software Development Engineer role, while the average package stood at ₹4.2 LPA — a significant jump from ₹3.8 LPA in 2025.\n\nKey recruiters included TCS, Infosys, Wipro, HCL Technologies, HDFC Bank, ICICI Bank, Bajaj Finance, Deloitte, KPMG, and NDTV. The School of CS & IT led with 92% placement, followed by School of Management at 88%.\n\nThe Placement Cell, led by Coordinator Ms. Sunita Rao, organized 50+ pre-placement workshops, mock interviews, resume-building sessions, and communication skills boot camps throughout the year. \"Our students were better prepared than ever before,\" she said.",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
  },
  {
    title: "New AI Lab Inaugurated by Industry Leaders",
    date: "March 15, 2026",
    category: "Infrastructure",
    desc: "A state-of-the-art Artificial Intelligence lab with 50 high-performance workstations was inaugurated by Shri Sandeep Singh, Chairman, in the presence of industry leaders.",
    full: "Avviare Educational Hub has inaugurated its brand-new Artificial Intelligence and Data Science Laboratory, equipped with 50 high-performance NVIDIA workstations, in a grand ceremony attended by industry leaders and faculty.\n\nThe ₹2.5 crore facility was inaugurated by Shri Sandeep Singh, Chairman of AEH, in the presence of Mr. Rohit Kapoor, CTO of a leading IT firm, and Dr. Meena Joshi from IIT Raipur. The lab features GPU-enabled machines capable of running advanced deep learning models, alongside dedicated areas for robotics, IoT prototyping, and cloud computing exercises.\n\n\"This investment signals our commitment to ensuring AEH students are not just job-ready but future-ready,\" Shri Singh said at the inauguration. The lab will be open for BCA, MCA, and B.Sc students and is already integrated into the revised curriculum for 2026-27.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  },
  {
    title: "Annual Cultural Festival 'Avvifest 2026' Concludes",
    date: "February 20, 2026",
    category: "Events",
    desc: "Three days of cultural extravaganza saw participation from 15 colleges. Over 5000 students attended the event featuring music, dance, and drama performances.",
    full: "Avvifest 2026, the annual cultural festival of Avviare Educational Hub, concluded after three spectacular days of music, dance, drama, and creative competitions that drew over 5000 students from 15 colleges across Chhattisgarh.\n\nThis year's theme — 'Roots & Wings' — celebrated India's cultural heritage while embracing modernity. Highlights included a classical dance competition, stand-up comedy night, street play competition, Battle of Bands, and a fashion show. The festival also featured an art exhibition showcasing works by Fine Arts students.\n\nThe chief guest, renowned Bollywood choreographer Mr. Suresh Kumar, praised the talent on display. \"The energy and creativity I saw here rivals that of any metropolitan college festival,\" he remarked.\n\nThe organizing committee, led by Student Council President Nidhi Sharma, put together 8 months of planning to execute the festival. Winners took home prizes worth over ₹3,00,000 in total.",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
  },
  {
    title: "School of Law Students Win State Moot Court Championship",
    date: "February 10, 2026",
    category: "Achievement",
    desc: "AEH Law students clinched the State-level Moot Court Competition championship, demonstrating exceptional advocacy and legal drafting skills.",
    full: "Students from the School of Law at Avviare Educational Hub have won the State-level Moot Court Competition 2026, held at Hidayatullah National Law University, Raipur.\n\nThe two-member team of Priya Nair and Arjun Pandey argued a complex constitutional case involving data privacy and freedom of expression before a panel of eminent judges, including a retired High Court judge. They beat 24 teams from law colleges across Chhattisgarh to win the championship.\n\nLaw School Dean Dr. Ramakant Sahu attributed the success to the institute's state-of-the-art moot court facility and rigorous weekly moot practice sessions. \"We invest heavily in advocacy training, and this championship validates that effort.\"\n\nBoth students have been offered internship opportunities at reputed law firms as a result of their stellar performance.",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
  },
  {
    title: "4K Media Studio Inaugurated at School of Communication",
    date: "January 25, 2026",
    category: "Infrastructure",
    desc: "The School of Communication's media studio now features 4K cameras, professional editing suites, a green screen room, and an upgraded campus radio station.",
    full: "The School of Communication at AEH has unveiled its fully upgraded 4K Media Studio, featuring professional broadcast cameras, non-linear editing suites running Adobe Premiere Pro and DaVinci Resolve, a green screen room, and a revamped campus radio station — Radio Avviare 90.5 FM.\n\nThe ₹1.8 crore upgrade was made possible through a combination of institution investment and alumni donations. The studio is now on par with facilities at leading media institutes in major cities.\n\n\"Our students will learn on the same equipment used by professional TV channels and production houses. This is a game-changer for journalism and media education in the region,\" said Dr. Kavita Singh, Head of the Communication School.\n\nThe studio has already begun production of AEH's YouTube channel, which will feature student-produced news bulletins, documentaries, and talk shows.",
    img: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80",
  },
  {
    title: "Alumni Meet 2026: 500+ Graduates Reconnect",
    date: "January 15, 2026",
    category: "Events",
    desc: "AEH hosted its annual alumni meet with over 500 graduates reconnecting with their alma mater, sharing success stories and mentoring current students.",
    full: "Avviare Educational Hub's Annual Alumni Meet 2026 saw an overwhelming response, with over 500 graduates from across batches returning to the campus to reconnect, share their journeys, and inspire current students.\n\nThe event, themed 'Homecoming', included panel discussions with successful alumni on topics such as 'From Campus to Corporate', entrepreneurship stories, and advice for fresh graduates. Alumni currently working with companies like Google, Deloitte, BBC, and various government agencies participated in mentoring sessions with final-year students.\n\nA key highlight was the launch of the AEH Alumni Mentorship Program, which will connect current students with alumni professionals for one-on-one guidance sessions throughout the year. Over 80 alumni signed up as mentors on the spot.\n\nFounder Shri Sandeep Singh felicitated 25 distinguished alumni for their exceptional achievements in their respective fields.",
    img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
  },
  {
    title: "Monthly Guest Lecture Series by Industry CXOs Launched",
    date: "December 20, 2025",
    category: "Academic",
    desc: "A monthly guest lecture series featuring CXOs, entrepreneurs, and industry veterans has been launched to provide real-world insights to students across all departments.",
    full: "Avviare Educational Hub has launched 'AEH Leadership Talks' — a monthly guest lecture series that will bring CXOs, serial entrepreneurs, policymakers, and industry veterans to campus throughout the academic year.\n\nThe inaugural session saw Mr. Arun Mehta, CEO of a listed FMCG company and an IIM Ahmedabad alumnus, address over 800 students on 'Building a Career with Purpose in the Digital Age'. The talk was followed by an interactive Q&A session that lasted over an hour.\n\nUpcoming speakers include a former IPS officer turned entrepreneur, a partner at a top-4 consulting firm, a documentary filmmaker who has worked with National Geographic, and a healthcare startup founder.\n\nThe series aims to bridge the gap between classroom learning and industry reality. \"Textbooks give you the theory. These leaders will give you the truth about how the world actually works,\" said Vice-Chancellor Dr. H.P. Verma.",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  },
  {
    title: "Applied Science Students Win State Science Exhibition",
    date: "December 10, 2025",
    category: "Achievement",
    desc: "Applied Science students won first prize at the State Science Exhibition for their innovative water purification project using locally available materials.",
    full: "B.Sc students from the School of Applied Science at AEH bagged the first prize at the Chhattisgarh State Science Exhibition 2025, held at Science Centre Raipur.\n\nThe winning project — 'AquaPure: Low-Cost Water Purification Using Natural Coagulants from Local Biodiversity' — was developed by a team of four third-year students under the guidance of Prof. Kavita Shrivastava. The project uses locally available moringa seeds and activated charcoal derived from agricultural waste to purify groundwater, at a fraction of the cost of conventional systems.\n\nThe project has potential real-world application for villages in water-scarce areas of Chhattisgarh, which caught the attention of the state government's water resource department. The students have been invited to present their research at a national-level conference in Pune.\n\nThe award included ₹50,000 in prize money and an invitation to participate in the National Science Exhibition.",
    img: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&q=80",
  },
  {
    title: "AEH Signs MoU with 10 International Universities",
    date: "November 30, 2025",
    category: "Academic",
    desc: "Avviare Educational Hub has signed Memoranda of Understanding with 10 international universities for student exchange programs, dual degrees, and collaborative research.",
    full: "In a landmark step towards globalization, Avviare Educational Hub has signed Memoranda of Understanding (MoUs) with 10 international universities spanning the UK, Australia, Canada, and Southeast Asia.\n\nThe partner institutions include universities from Birmingham, Melbourne, Vancouver, Singapore, and Kuala Lumpur. The MoUs cover student exchange programs, dual degree offerings, joint research projects, faculty exchange, and online collaborative coursework.\n\nUnder the agreements, AEH students in their final year can opt for a semester abroad at partner institutions. Additionally, select programs will now offer dual degrees — an AEH degree and a degree from the international partner — recognized in both countries.\n\nVice-Chancellor Dr. H.P. Verma signed the agreements during a visit to the UK and Australia. \"This is a transformative moment for our students. A degree from AEH will now carry international recognition and open global career pathways.\"",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
  },
  {
    title: "Pharmacy Students Research Published in International Journal",
    date: "November 15, 2025",
    category: "Achievement",
    desc: "Two pharmacy students' research on herbal formulations for skin care has been published in the International Journal of Pharmaceutical Sciences.",
    full: "Two final-year B.Pharm students at AEH, Ananya Rai and Suresh Patel, have had their research published in the prestigious International Journal of Pharmaceutical Sciences (IJPS) — a first for an undergraduate institution from Chhattisgarh.\n\nThe paper, titled 'Formulation and Evaluation of Herbal Anti-Acne Cream Using Neem and Turmeric Extracts', demonstrates the potential of traditional Indian botanicals in modern dermatological applications. The study passed rigorous peer review by international pharmacology experts.\n\nResearch supervisor Prof. Anjali Desai said, \"This is exceptional work for undergraduate students. The methodology, data analysis, and conclusions are at par with postgraduate-level research.\"\n\nBoth students have received offers for postgraduate studies at reputed institutes as a result of this publication. The research was conducted in AEH's Pharmaceutical Sciences Laboratory, which was upgraded in 2024 with modern analytical instruments.",
    img: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&q=80",
  },
  {
    title: "Sports Week 2025: AEH Wins 12 Gold Medals",
    date: "October 28, 2025",
    category: "Events",
    desc: "The annual inter-college sports week saw AEH students winning 12 gold, 8 silver, and 6 bronze medals across cricket, basketball, athletics, and kabaddi.",
    full: "The Annual Inter-College Sports Week 2025, hosted at Swami Vivekananda Sports Complex in Bilaspur, concluded with Avviare Educational Hub emerging as the overall champion for the third consecutive year.\n\nAEH athletes won 12 gold, 8 silver, and 6 bronze medals across disciplines including cricket, basketball, athletics, kabaddi, badminton, chess, and table tennis. The men's cricket team won the championship final, and the women's kabaddi team defended their title for the second year running.\n\nStar performer Rohan Nair won three gold medals in sprint events (100m, 200m, and 4×100m relay), setting a new inter-college record in the 200m with a time of 21.4 seconds.\n\nSports Director Mr. Anil Kumar attributed the success to AEH's year-round sports development program, daily coaching sessions, and a newly built synthetic athletics track. \"Sports is not an afterthought at AEH — it's integral to our vision of holistic student development.\"",
    img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80",
  },
];

const categories = ["All", "Achievement", "Placements", "Infrastructure", "Events", "Academic"];

const catColors: Record<string, string> = {
  Achievement: "bg-amber-100 text-amber-700",
  Placements: "bg-green-100 text-green-700",
  Infrastructure: "bg-blue-100 text-blue-700",
  Events: "bg-purple-100 text-purple-700",
  Academic: "bg-teal-100 text-teal-700",
};

const catDot: Record<string, string> = {
  Achievement: "bg-amber-500",
  Placements: "bg-green-500",
  Infrastructure: "bg-blue-500",
  Events: "bg-purple-500",
  Academic: "bg-teal-500",
};

export default function News() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState<typeof news[0] | null>(null);

  const filtered = activeCategory === "All" ? news : news.filter(n => n.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <div className="relative bg-[hsl(219,40%,16%)] text-white py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=60')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative max-w-7xl mx-auto">
          <span className="inline-block bg-white/10 border border-white/20 text-white/80 text-sm font-medium px-4 py-1.5 rounded-full mb-4">📰 Stay Updated</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">News & Events</h1>
          <p className="text-white/70 text-lg max-w-xl">The latest from Avviare — achievements, campus updates, and events</p>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-10 w-full">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${activeCategory === cat
                ? "bg-[hsl(219,40%,16%)] text-white border-[hsl(219,40%,16%)] shadow-sm"
                : "bg-white text-gray-600 border-gray-200 hover:border-[hsl(219,40%,40%)] hover:text-[hsl(219,40%,28%)]"
              }`}
            >
              {cat !== "All" && <span className={`inline-block w-2 h-2 rounded-full mr-2 ${catDot[cat] || "bg-gray-400"}`} />}
              {cat}
            </button>
          ))}
        </div>

        {/* Featured */}
        {activeCategory === "All" && filtered[0] && (
          <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden mb-8 hover:shadow-2xl transition-all duration-300 cursor-pointer" onClick={() => setSelected(filtered[0])}>
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-2 relative h-56 md:h-auto overflow-hidden">
                <img src={filtered[0].img} alt={filtered[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
              </div>
              <div className="md:col-span-3 p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-[hsl(43,96%,55%)] text-[hsl(219,40%,16%)] text-xs font-bold px-3 py-1 rounded-full">⭐ Featured</span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${catColors[filtered[0].category] || "bg-gray-100 text-gray-600"}`}>{filtered[0].category}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-snug">{filtered[0].title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{filtered[0].desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400 text-xs">
                    <Calendar className="h-3.5 w-3.5" />{filtered[0].date}
                  </div>
                  <span className="text-[hsl(219,60%,28%)] text-sm font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    Read Full Story <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeCategory === "All" ? filtered.slice(1) : filtered).map(item => (
            <article
              key={item.title}
              className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 duration-300 flex flex-col cursor-pointer"
              onClick={() => setSelected(item)}
            >
              <div className="relative h-48 overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${catColors[item.category] || "bg-gray-100 text-gray-600"}`}>
                  {item.category}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 flex-1 group-hover:text-[hsl(219,60%,28%)] transition-colors">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">{item.desc}</p>
                <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <Calendar className="h-3.5 w-3.5" />{item.date}
                  </div>
                  <span className="text-[hsl(219,60%,28%)] text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />

      {/* Article Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative h-56 overflow-hidden rounded-t-2xl">
              <img src={selected.img} alt={selected.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full p-2 hover:bg-white transition-colors shadow-lg"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 left-5">
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${catColors[selected.category] || "bg-gray-100 text-gray-600"}`}>
                  {selected.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                <Calendar className="h-3.5 w-3.5" /> {selected.date}
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 leading-snug">{selected.title}</h2>
              <div className="prose prose-sm max-w-none">
                {selected.full.split("\n\n").map((para, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed mb-3 text-sm">{para}</p>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-400">Avviare Educational Hub</span>
                <button
                  onClick={() => setSelected(null)}
                  className="text-sm font-semibold text-[hsl(219,60%,28%)] hover:text-[hsl(219,60%,20%)] transition-colors"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
