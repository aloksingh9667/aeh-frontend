import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { Building2, Code2, Landmark, Radio, FileText, ChevronRight } from "lucide-react";

const categories = [
  {
    label: "IT & Technology",
    icon: Code2,
    color: "bg-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-200",
    textColor: "text-blue-700",
    companies: ["TCS", "Infosys", "Wipro", "HCL Technologies", "Tech Mahindra", "IBM", "Cognizant", "Accenture", "Amazon", "Flipkart"],
  },
  {
    label: "Banking & Finance",
    icon: Landmark,
    color: "bg-green-500",
    bg: "bg-green-50",
    border: "border-green-200",
    textColor: "text-green-700",
    companies: ["HDFC Bank", "ICICI Bank", "Axis Bank", "State Bank of India", "Bajaj Finance", "Kotak Mahindra", "Yes Bank", "Bank of Baroda"],
  },
  {
    label: "Media & Journalism",
    icon: Radio,
    color: "bg-purple-500",
    bg: "bg-purple-50",
    border: "border-purple-200",
    textColor: "text-purple-700",
    companies: ["NDTV", "Zee News", "Amar Ujala", "Dainik Bhaskar", "Times of India", "ABP News", "India TV", "UMS Media"],
  },
  {
    label: "Consulting & Professional",
    icon: FileText,
    color: "bg-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-200",
    textColor: "text-amber-700",
    companies: ["Deloitte", "KPMG", "Ernst & Young", "PricewaterhouseCoopers", "Grant Thornton", "BDO India"],
  },
  {
    label: "Core Industries",
    icon: Building2,
    color: "bg-rose-500",
    bg: "bg-rose-50",
    border: "border-rose-200",
    textColor: "text-rose-700",
    companies: ["Reliance Industries", "ITC Limited", "Marico", "Airtel", "Jio", "Tata Group", "Adani Group"],
  },
];

const highlights = [
  { value: "120+", label: "Recruiting Partners", icon: "🤝" },
  { value: "15+", label: "Cities Across India", icon: "🌍" },
  { value: "5", label: "Industry Sectors", icon: "🏭" },
  { value: "₹4.2L", label: "Average CTC", icon: "💰" },
];

export default function TopRecruiters() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero */}
      <div className="relative bg-[hsl(219,40%,16%)] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=60')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(219,40%,10%)]/80 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/10 border border-white/20 text-white/80 text-sm px-4 py-1.5 rounded-full mb-4">🏢 Our Placement Network</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Top Recruiters</h1>
            <p className="text-white/70 text-lg leading-relaxed">
              India's leading companies trust Avviare graduates. Our students are placed across technology, banking, media, consulting, and core industry sectors.
            </p>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {highlights.map(h => (
              <div key={h.label} className="py-5 px-6 text-center">
                <div className="text-2xl mb-1">{h.icon}</div>
                <div className="text-2xl font-bold text-[hsl(219,40%,16%)]">{h.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{h.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8">
        <div className="text-center mb-8">
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Over <strong>120 companies</strong> across 5 industry sectors actively recruit from Avviare's campuses.
            Our strong industry relationships, built over 12 years, ensure our students get access to the best opportunities.
          </p>
        </div>

        {categories.map(cat => (
          <div key={cat.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Category Header */}
            <div className={`flex items-center gap-3 px-6 py-4 ${cat.bg} border-b ${cat.border}`}>
              <div className={`h-9 w-9 ${cat.color} rounded-xl flex items-center justify-center`}>
                <cat.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className={`font-bold text-base ${cat.textColor}`}>{cat.label}</h3>
                <p className="text-xs text-gray-500">{cat.companies.length} companies</p>
              </div>
            </div>
            {/* Companies Grid */}
            <div className="p-5">
              <div className="flex flex-wrap gap-2.5">
                {cat.companies.map(company => (
                  <div
                    key={company}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border ${cat.border} ${cat.bg} ${cat.textColor} font-semibold text-sm hover:shadow-sm transition-shadow`}
                  >
                    <div className={`h-6 w-6 ${cat.color} rounded-md flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                      {company[0]}
                    </div>
                    {company}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="bg-gradient-to-br from-[hsl(219,40%,16%)] to-[hsl(219,40%,22%)] rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold text-[hsl(43,96%,55%)] mb-3">Work at Your Dream Company</h2>
          <p className="text-white/70 max-w-xl mx-auto mb-6 leading-relaxed">
            Our placement cell has connections with HR teams at 120+ companies. Join AEH and we'll work to get you placed where you deserve to be.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/apply" className="bg-[hsl(43,96%,55%)] text-[hsl(220,20%,15%)] font-bold px-8 py-3 rounded-lg hover:bg-[hsl(43,96%,45%)] transition-colors">
              Apply Now
            </Link>
            <Link href="/placements" className="flex items-center gap-2 border border-white/30 text-white font-medium px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
              View Placement Stats <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
