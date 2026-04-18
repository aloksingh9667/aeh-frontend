import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { GraduationCap, BookOpen, CreditCard, Receipt, Phone, LogOut, User, Calendar, Hash } from "lucide-react";
import { useStudentAuth } from "@/hooks/useStudentAuth";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function StudentDashboard() {
  const { student, logout, isLoading } = useStudentAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !student) setLocation("/student/login");
  }, [student, isLoading, setLocation]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-[hsl(219,40%,16%)] border-t-transparent rounded-full" /></div>;
  if (!student) return null;

  const statusColor = student.status === "active" ? "bg-green-100 text-green-700" : student.status === "graduated" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="bg-[hsl(219,40%,16%)] rounded-2xl p-6 sm:p-8 text-white mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[hsl(43,96%,55%)] flex items-center justify-center shrink-0">
              <User className="h-8 w-8 text-[hsl(220,20%,15%)]" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{student.name}</h1>
              <p className="text-white/70 text-sm">{student.email}</p>
              <div className="flex flex-wrap gap-3 mt-2">
                <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${statusColor}`}>{student.status}</span>
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80">{student.course}</span>
              </div>
            </div>
            <button onClick={() => { logout(); setLocation("/"); }} className="flex items-center gap-2 text-sm text-white/70 hover:text-white border border-white/20 hover:border-white/40 px-4 py-2 rounded-lg transition-colors">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <InfoCard icon={<Hash className="h-5 w-5" />} label="Roll Number" value={student.rollNumber} color="blue" />
          <InfoCard icon={<BookOpen className="h-5 w-5" />} label="Course Code" value={student.courseCode} color="purple" />
          <InfoCard icon={<Calendar className="h-5 w-5" />} label="Enrollment Year" value={student.enrollmentYear} color="green" />
          <InfoCard icon={<GraduationCap className="h-5 w-5" />} label="Semester" value={`Semester ${student.semester || "1"}`} color="orange" />
        </div>

        <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ActionCard
            href="/student/fees"
            icon={<CreditCard className="h-8 w-8" />}
            title="Pay Fees"
            description="View fee structure and make payments online via Razorpay"
            color="blue"
          />
          <ActionCard
            href="/student/receipts"
            icon={<Receipt className="h-8 w-8" />}
            title="My Receipts"
            description="Track all your fee payments and download receipts"
            color="green"
          />
          <ActionCard
            href="/contact"
            icon={<Phone className="h-8 w-8" />}
            title="Contact Us"
            description="Reach out to the administration for any queries or support"
            color="purple"
          />
        </div>

        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">My Course Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Program</span>
              <span className="font-medium text-gray-800">{student.course}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Course Code</span>
              <span className="font-medium text-gray-800">{student.courseCode}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Roll Number</span>
              <span className="font-medium text-gray-800">{student.rollNumber}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Enrollment Year</span>
              <span className="font-medium text-gray-800">{student.enrollmentYear}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Current Semester</span>
              <span className="font-medium text-gray-800">Semester {student.semester || "1"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Account Status</span>
              <span className={`font-medium capitalize ${student.status === "active" ? "text-green-600" : "text-red-600"}`}>{student.status}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Phone</span>
              <span className="font-medium text-gray-800">{student.phone}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Email</span>
              <span className="font-medium text-gray-800 truncate ml-4">{student.email}</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function InfoCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
  };
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className={`w-10 h-10 rounded-lg ${colors[color]} flex items-center justify-center mb-3`}>{icon}</div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="font-bold text-gray-800 text-sm">{value}</p>
    </div>
  );
}

function ActionCard({ href, icon, title, description, color }: { href: string; icon: React.ReactNode; title: string; description: string; color: string }) {
  const colors: Record<string, string> = {
    blue: "text-blue-600 bg-blue-50 group-hover:bg-blue-100",
    green: "text-green-600 bg-green-50 group-hover:bg-green-100",
    purple: "text-purple-600 bg-purple-50 group-hover:bg-purple-100",
  };
  return (
    <Link href={href} className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-[hsl(219,40%,40%)] hover:shadow-md transition-all block">
      <div className={`w-14 h-14 rounded-xl ${colors[color]} flex items-center justify-center mb-4 transition-colors`}>{icon}</div>
      <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-[hsl(219,40%,24%)]">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </Link>
  );
}
