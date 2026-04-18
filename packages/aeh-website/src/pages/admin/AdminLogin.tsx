import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAdminLogin } from "@workspace/api-client-react";
import { useAuth } from "@/lib/auth";
import { GraduationCap, Lock, User, UserPlus } from "lucide-react";
import { Link } from "wouter";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

export default function AdminLogin() {
  const { login } = useAuth();
  const loginMutation = useAdminLogin();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = (data: FormData) => {
    loginMutation.mutate(
      { data: { username: data.username, password: data.password } },
      {
        onSuccess: (response) => {
          if (response.token) {
            login(response.token);
          }
        },
        onError: () => {
          form.setError("password", { message: "Invalid username or password" });
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-[hsl(219,40%,10%)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-[hsl(43,96%,55%)] rounded-2xl mb-4">
            <GraduationCap className="h-9 w-9 text-[hsl(219,40%,16%)]" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
          <p className="text-white/60 mt-1 text-sm">Avviare Educational Hub</p>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-2xl p-8 shadow-2xl space-y-5" data-testid="login-form">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input data-testid="input-username" {...form.register("username")} className="w-full border border-input bg-background rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Enter username" autoComplete="username" />
            </div>
            {form.formState.errors.username && <p className="text-destructive text-xs mt-1">{form.formState.errors.username.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input data-testid="input-password" {...form.register("password")} type="password" className="w-full border border-input bg-background rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Enter password" autoComplete="current-password" />
            </div>
            {form.formState.errors.password && <p className="text-destructive text-xs mt-1">{form.formState.errors.password.message}</p>}
          </div>
          <button data-testid="button-login" type="submit" disabled={loginMutation.isPending} className="w-full bg-[hsl(219,60%,28%)] text-white font-bold py-3 rounded-lg hover:bg-[hsl(219,60%,22%)] transition-colors disabled:opacity-50">
            {loginMutation.isPending ? "Signing in..." : "Sign In"}
          </button>
          <div className="pt-2 border-t text-center">
            <Link href="/admin/create" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <UserPlus className="h-4 w-4" />
              Create New Admin Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
