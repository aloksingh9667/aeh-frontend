import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateApplication } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { CheckCircle, Phone, Mail, MapPin } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits").regex(/^\d+$/, "Phone must contain only numbers"),
  course: z.string().min(1, "Please select a course"),
  classType: z.enum(["regular", "weekend"], { errorMap: () => ({ message: "Please select a class type" }) }),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const courses = [
  "BBA", "BBA (Marketing)", "BBA (Finance)",
  "MBA", "MBA (Marketing)", "MBA (HR)", "MBA (Finance)",
  "BCA", "BCA (Data Science)", "BCA (Cybersecurity)", "MCA", "MCA (AI & ML)",
  "B.Com", "B.Com (Honours)", "M.Com",
  "BA", "MA",
  "DJMC", "BJMC", "MJMC",
  "BA LL.B", "LL.B", "LL.M",
  "B.Pharm", "D.Pharm",
  "B.Sc", "M.Sc",
  "B.Ed", "M.Ed",
];

export default function Apply() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const createApplication = useCreateApplication();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", course: "", classType: "regular", message: "" },
  });

  const onSubmit = (data: FormData) => {
    createApplication.mutate(
      { data: { name: data.name, email: data.email, phone: data.phone, course: data.course, classType: data.classType, message: data.message } },
      {
        onSuccess: () => {
          setSubmitted(true);
          form.reset();
        },
        onError: () => {
          toast({ title: "Submission failed", description: "Please try again later.", variant: "destructive" });
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-gradient-to-br from-[hsl(219,40%,16%)] to-[hsl(219,40%,22%)] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">Apply Online 2026-27</h1>
          <p className="text-white/70 text-lg">Begin your journey at Avviare Educational Hub</p>
        </div>
      </div>
      <main className="flex-1 max-w-6xl mx-auto px-4 py-12 w-full">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-3">Application Submitted!</h2>
                <p className="text-muted-foreground mb-6">Thank you for applying to Avviare Educational Hub. Our admissions team will contact you within 24-48 hours.</p>
                <button onClick={() => setSubmitted(false)} className="bg-[hsl(219,60%,28%)] text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-[hsl(219,60%,22%)] transition-colors">
                  Apply for Another Program
                </button>
              </div>
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)} className="bg-card border border-border rounded-2xl p-8 space-y-5" data-testid="apply-form">
                <h2 className="text-xl font-bold text-foreground mb-2">Admission Application Form</h2>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Full Name <span className="text-destructive">*</span></label>
                    <input data-testid="input-name" {...form.register("name")} className="w-full border border-input bg-background rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Enter your full name" />
                    {form.formState.errors.name && <p className="text-destructive text-xs mt-1">{form.formState.errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email Address <span className="text-destructive">*</span></label>
                    <input data-testid="input-email" {...form.register("email")} type="email" className="w-full border border-input bg-background rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="your@email.com" />
                    {form.formState.errors.email && <p className="text-destructive text-xs mt-1">{form.formState.errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number <span className="text-destructive">*</span></label>
                  <input data-testid="input-phone" {...form.register("phone")} type="tel" className="w-full border border-input bg-background rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="10-digit mobile number" />
                  {form.formState.errors.phone && <p className="text-destructive text-xs mt-1">{form.formState.errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Select Program <span className="text-destructive">*</span></label>
                  <select data-testid="select-course" {...form.register("course")} className="w-full border border-input bg-background rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="">-- Select a Program --</option>
                    {courses.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {form.formState.errors.course && <p className="text-destructive text-xs mt-1">{form.formState.errors.course.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Class Type <span className="text-destructive">*</span></label>
                  <div className="flex gap-4">
                    {[{ value: "regular", label: "Regular (Weekday)" }, { value: "weekend", label: "Weekend" }].map(opt => (
                      <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                        <input data-testid={`radio-${opt.value}`} type="radio" value={opt.value} {...form.register("classType")} className="accent-[hsl(219,60%,28%)]" />
                        <span className="text-sm text-foreground">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                  {form.formState.errors.classType && <p className="text-destructive text-xs mt-1">{form.formState.errors.classType.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Message (Optional)</label>
                  <textarea data-testid="textarea-message" {...form.register("message")} rows={3} className="w-full border border-input bg-background rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="Any questions or additional information?" />
                </div>

                <button data-testid="button-submit" type="submit" disabled={createApplication.isPending} className="w-full bg-[hsl(219,60%,28%)] text-white font-bold py-3.5 rounded-lg hover:bg-[hsl(219,60%,22%)] transition-colors disabled:opacity-50">
                  {createApplication.isPending ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-5">
            <div className="bg-[hsl(219,40%,16%)] rounded-xl p-6 text-white">
              <h3 className="font-bold text-[hsl(43,96%,55%)] mb-4">Admission Help</h3>
              <ul className="space-y-3">
                {[{ icon: Phone, text: "+91 9876543210" }, { icon: Mail, text: "admissions@avviare.edu.in" }, { icon: MapPin, text: "Bilaspur, Chhattisgarh" }].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex gap-3 text-sm text-white/80">
                    <Icon className="h-4 w-4 text-[hsl(43,96%,55%)] shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-bold text-foreground mb-3">Admission Process</h3>
              <ol className="space-y-3">
                {["Submit online application", "Receive confirmation call", "Document verification", "Fee payment & enrollment", "Get your admission letter"].map((step, i) => (
                  <li key={step} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="h-6 w-6 bg-[hsl(219,60%,28%)] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
