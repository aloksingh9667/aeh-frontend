import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/lib/auth";
import { StudentAuthProvider } from "@/lib/studentAuth";
import { setBaseUrl, setAuthTokenGetter } from "@workspace/api-client-react";
import { useEffect } from "react";
import NotFound from "@/pages/not-found";

import Home from "@/pages/Home";
import About from "@/pages/About";
import CoreValues from "@/pages/CoreValues";
import Leadership from "@/pages/Leadership";
import AcademicCouncil from "@/pages/AcademicCouncil";
import Team from "@/pages/Team";
import Infrastructure from "@/pages/Infrastructure";
import Placements from "@/pages/Placements";
import TopRecruiters from "@/pages/TopRecruiters";
import News from "@/pages/News";
import Gallery from "@/pages/Gallery";
import Apply from "@/pages/Apply";
import Contact from "@/pages/Contact";
import Careers from "@/pages/Careers";

import Management from "@/pages/schools/Management";
import CSIT from "@/pages/schools/CSIT";
import Commerce from "@/pages/schools/Commerce";
import Humanities from "@/pages/schools/Humanities";
import Communication from "@/pages/schools/Communication";
import Law from "@/pages/schools/Law";
import Pharmacy from "@/pages/schools/Pharmacy";
import AppliedScience from "@/pages/schools/AppliedScience";
import Education from "@/pages/schools/Education";

import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminApplications from "@/pages/admin/AdminApplications";
import AdminContacts from "@/pages/admin/AdminContacts";
import AdminCareers from "@/pages/admin/AdminCareers";
import AdminCourses from "@/pages/admin/AdminCourses";
import AdminFeeStructures from "@/pages/admin/AdminFeeStructures";
import AdminStudents from "@/pages/admin/AdminStudents";
import AdminPayments from "@/pages/admin/AdminPayments";

import StudentLogin from "@/pages/student/StudentLogin";
import StudentRegister from "@/pages/student/StudentRegister";
import StudentDashboard from "@/pages/student/StudentDashboard";
import StudentFees from "@/pages/student/StudentFees";
import StudentReceipts from "@/pages/student/StudentReceipts";
import StudentForgotPassword from "@/pages/student/StudentForgotPassword";
import AdminCreate from "@/pages/admin/AdminCreate";

setBaseUrl(import.meta.env.VITE_API_URL || null);
setAuthTokenGetter(() => localStorage.getItem("aeh_admin_token"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000 },
  },
});

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/admin/login");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  }

  if (!user) return null;

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/core-values" component={CoreValues} />
      <Route path="/leadership" component={Leadership} />
      <Route path="/academic-council" component={AcademicCouncil} />
      <Route path="/team" component={Team} />
      <Route path="/infrastructure" component={Infrastructure} />

      <Route path="/school-of-management" component={Management} />
      <Route path="/school-of-cs-it" component={CSIT} />
      <Route path="/school-of-commerce" component={Commerce} />
      <Route path="/school-of-humanities" component={Humanities} />
      <Route path="/school-of-communication" component={Communication} />
      <Route path="/school-of-law" component={Law} />
      <Route path="/school-of-pharmacy" component={Pharmacy} />
      <Route path="/school-of-applied-science" component={AppliedScience} />
      <Route path="/school-of-education" component={Education} />

      <Route path="/placements" component={Placements} />
      <Route path="/top-recruiters" component={TopRecruiters} />
      <Route path="/news" component={News} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/apply" component={Apply} />
      <Route path="/contact" component={Contact} />
      <Route path="/careers" component={Careers} />

      <Route path="/student/login" component={StudentLogin} />
      <Route path="/student/register" component={StudentRegister} />
      <Route path="/student/forgot-password" component={StudentForgotPassword} />
      <Route path="/student/dashboard" component={StudentDashboard} />
      <Route path="/student/fees" component={StudentFees} />
      <Route path="/student/receipts" component={StudentReceipts} />

      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/create" component={AdminCreate} />
      <Route path="/admin" component={() => <ProtectedRoute component={AdminDashboard} />} />
      <Route path="/admin/applications" component={() => <ProtectedRoute component={AdminApplications} />} />
      <Route path="/admin/contacts" component={() => <ProtectedRoute component={AdminContacts} />} />
      <Route path="/admin/careers" component={() => <ProtectedRoute component={AdminCareers} />} />
      <Route path="/admin/courses" component={() => <ProtectedRoute component={AdminCourses} />} />
      <Route path="/admin/fee-structures" component={() => <ProtectedRoute component={AdminFeeStructures} />} />
      <Route path="/admin/students" component={() => <ProtectedRoute component={AdminStudents} />} />
      <Route path="/admin/payments" component={() => <ProtectedRoute component={AdminPayments} />} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <AuthProvider>
          <StudentAuthProvider>
            <TooltipProvider>
              <Router />
              <Toaster />
            </TooltipProvider>
          </StudentAuthProvider>
        </AuthProvider>
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
