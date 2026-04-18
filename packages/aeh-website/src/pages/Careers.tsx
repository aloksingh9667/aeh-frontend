import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateCareer } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { CheckCircle, Heart, Users, TrendingUp, Star } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  position: z.string().optional(),
  cvUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

type FormData = z.infer<typeof schema>;

const culture = [
  { icon: Heart, title: "Collaborative Culture", desc: "Work in a supportive, team-oriented environment" },
  { icon: TrendingUp, title: "Growth Opportunities", desc: "Continuous learning and career advancement" },
  { icon: Star, title: "Performance Recognition", desc: "We celebrate and reward excellence" },
  { icon: Users, title: "Diverse Community", desc: "A rich mix of backgrounds, perspectives, and talent" },
];

export default function Careers() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const createCareer = useCreateCareer();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", position: "", cvUrl: "" },
  });

  const onSubmit = (data: FormData) => {
    createCareer.mutate(
      { data: { name: data.name, email: data.email, phone: data.phone, position: data.position, cvUrl: data.cvUrl || undefined } },
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
          <h1 className="text-4xl font-bold mb-3">Work Culture @ Avviare</h1>
          <p className="text-white/70 text-lg">Join a team that makes a difference every day</p>
        </div>
      </div>
      <main className="flex-1 max-w-6xl mx-auto px-4 py-12 w-full">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {culture.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-card border border-border rounded-xl p-5 text-center">
              <div className="h-12 w-12 mx-auto bg-[hsl(219,60%,28%)]/10 rounded-xl flex items-center justify-center mb-3">
                <Icon className="h-6 w-6 text-[hsl(219,60%,28%)]" />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1">{title}</h3>
              <p className="text-muted-foreground text-xs">{desc}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Why Work With Us?</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              At Avviare, we believe our faculty and staff are our greatest strength. We are committed to providing a rewarding work environment that supports personal and professional growth.
            </p>
            <ul className="space-y-3">
              {[
                "Competitive salary and benefits package",
                "Supportive and collaborative work environment",
                "Opportunities for research and publications",
                "Professional development programs",
                "Health and wellness benefits",
                "EPF and gratuity benefits",
                "Work-life balance focus",
                "Recognition and rewards programs",
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                  <div className="h-2 w-2 rounded-full bg-[hsl(219,60%,28%)] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-3">Application Received!</h2>
                <p className="text-muted-foreground mb-6">Thank you for your interest in working with Avviare. We'll review your application and reach out soon.</p>
                <button onClick={() => setSubmitted(false)} className="bg-[hsl(219,60%,28%)] text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-[hsl(219,60%,22%)] transition-colors">
                  Apply for Another Position
                </button>
              </div>
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)} className="bg-card border border-border rounded-2xl p-8 space-y-5" data-testid="careers-form">
                <h2 className="text-xl font-bold text-foreground mb-2">Upload Your Application</h2>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Full Name <span className="text-destructive">*</span></label>
                    <input data-testid="input-name" {...form.register("name")} className="w-full border border-input bg-background rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Your full name" />
                    {form.formState.errors.name && <p className="text-destructive text-xs mt-1">{form.formState.errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email <span className="text-destructive">*</span></label>
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
                  <label className="block text-sm font-medium text-foreground mb-1.5">Position Applying For (Optional)</label>
                  <input data-testid="input-position" {...form.register("position")} className="w-full border border-input bg-background rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. Assistant Professor - Management" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">CV / Portfolio Link (Optional)</label>
                  <input data-testid="input-cv-url" {...form.register("cvUrl")} type="url" className="w-full border border-input bg-background rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="https://drive.google.com/your-cv-link" />
                  {form.formState.errors.cvUrl && <p className="text-destructive text-xs mt-1">{form.formState.errors.cvUrl.message}</p>}
                </div>

                <button data-testid="button-submit" type="submit" disabled={createCareer.isPending} className="w-full bg-[hsl(219,60%,28%)] text-white font-bold py-3.5 rounded-lg hover:bg-[hsl(219,60%,22%)] transition-colors disabled:opacity-50">
                  {createCareer.isPending ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
