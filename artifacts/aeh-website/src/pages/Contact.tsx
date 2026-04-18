import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { CheckCircle, Phone, Mail, MapPin, Clock } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  course: z.string().optional(),
  classType: z.enum(["regular", "weekend"]).optional(),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const createContact = useCreateContact();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", message: "", course: "", classType: undefined },
  });

  const onSubmit = (data: FormData) => {
    createContact.mutate(
      { data: { name: data.name, email: data.email, phone: data.phone, message: data.message, course: data.course, classType: data.classType } },
      {
        onSuccess: () => {
          setSubmitted(true);
          form.reset();
        },
        onError: () => {
          toast({ title: "Failed to send message", description: "Please try again later.", variant: "destructive" });
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-gradient-to-br from-[hsl(219,40%,16%)] to-[hsl(219,40%,22%)] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
          <p className="text-white/70 text-lg">Get in touch — we're here to help you</p>
        </div>
      </div>
      <main className="flex-1 max-w-6xl mx-auto px-4 py-12 w-full">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-3">Message Sent!</h2>
                <p className="text-muted-foreground mb-6">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="bg-[hsl(219,60%,28%)] text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-[hsl(219,60%,22%)] transition-colors">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)} className="bg-card border border-border rounded-2xl p-8 space-y-5" data-testid="contact-form">
                <h2 className="text-xl font-bold text-foreground mb-2">Get In Touch</h2>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Full Name <span className="text-destructive">*</span></label>
                    <input data-testid="input-name" {...form.register("name")} className="w-full border border-input bg-background rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Your full name" />
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

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Interested Program (Optional)</label>
                    <select data-testid="select-course" {...form.register("course")} className="w-full border border-input bg-background rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                      <option value="">-- Select Program --</option>
                      {["BBA", "MBA", "BCA", "MCA", "B.Com", "M.Com", "BA", "MA", "BJMC", "MJMC", "BA LL.B", "B.Pharm", "B.Sc", "B.Ed"].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Class Preference (Optional)</label>
                    <select data-testid="select-class-type" {...form.register("classType")} className="w-full border border-input bg-background rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                      <option value="">-- Select --</option>
                      <option value="regular">Regular (Weekday)</option>
                      <option value="weekend">Weekend</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Message <span className="text-destructive">*</span></label>
                  <textarea data-testid="textarea-message" {...form.register("message")} rows={4} className="w-full border border-input bg-background rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="How can we help you?" />
                  {form.formState.errors.message && <p className="text-destructive text-xs mt-1">{form.formState.errors.message.message}</p>}
                </div>

                <button data-testid="button-submit" type="submit" disabled={createContact.isPending} className="w-full bg-[hsl(219,60%,28%)] text-white font-bold py-3.5 rounded-lg hover:bg-[hsl(219,60%,22%)] transition-colors disabled:opacity-50">
                  {createContact.isPending ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-5">
            <div className="bg-[hsl(219,40%,16%)] rounded-xl p-6 text-white">
              <h3 className="font-bold text-[hsl(43,96%,55%)] mb-5">Contact Information</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <MapPin className="h-5 w-5 text-[hsl(43,96%,55%)] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Address</div>
                    <div className="text-white/70 text-sm mt-0.5">Avviare Educational Hub,<br />Bilaspur, Chhattisgarh - 495001</div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Phone className="h-5 w-5 text-[hsl(43,96%,55%)] shrink-0" />
                  <div>
                    <div className="font-medium text-sm">Phone</div>
                    <div className="text-white/70 text-sm mt-0.5">+91 9876543210</div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Mail className="h-5 w-5 text-[hsl(43,96%,55%)] shrink-0" />
                  <div>
                    <div className="font-medium text-sm">Email</div>
                    <div className="text-white/70 text-sm mt-0.5">info@avviare.edu.in</div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Clock className="h-5 w-5 text-[hsl(43,96%,55%)] shrink-0" />
                  <div>
                    <div className="font-medium text-sm">Office Hours</div>
                    <div className="text-white/70 text-sm mt-0.5">Mon-Sat: 9:00 AM - 6:00 PM</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
