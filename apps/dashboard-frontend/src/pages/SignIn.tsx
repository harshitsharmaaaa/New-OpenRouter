import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useElysiaClient } from "@/providers/Eden";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

export function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const elysiaClient = useElysiaClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const response = await elysiaClient.auth["sign-in"].post({
        email,
        password,
      });

      if (response.error) {
        const errValue = response.error.value as { message?: string } | undefined;
        throw new Error(errValue?.message || "Failed to sign in");
      }

      return response.data;
    },
    onSuccess: () => {
      setLocalError(null);
      navigate("/dashboard");
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "Incorrect email or password.";
      setLocalError(message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setLocalError("Please enter both email and password.");
      return;
    }

    setLocalError(null);
    mutation.mutate({ email, password });
  };

  const isLoading = mutation.isPending;

  return (
    <div className="min-h-screen bg-[#050509] text-foreground flex items-center justify-center px-4">
      <div className="max-w-5xl w-full grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
        <div className="hidden md:flex flex-col gap-6 text-zinc-50">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700/80 bg-zinc-900/80 px-3 py-1 text-xs font-medium text-zinc-300 shadow-sm backdrop-blur">
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_theme(colors.emerald.400/70%)]" />
            Fast, cookie-based sessions
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-50">
            Welcome back to your console
          </h1>
          <p className="text-sm md:text-base text-zinc-300/80 max-w-md leading-relaxed">
            Sign in to monitor usage, rotate API keys, and manage access to your OpenRouter-powered applications.
          </p>
          <div className="mt-2 grid gap-3 text-xs text-zinc-300/80">
            <div className="flex items-start gap-2">
              <span className="mt-1 h-4 w-4 rounded-full border border-emerald-400/60 bg-emerald-400/10 flex items-center justify-center text-[0.6rem] text-emerald-300">
                ✓
              </span>
              <p>Session tokens are stored in HTTP-only cookies for security.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-1 h-4 w-4 rounded-full border border-sky-400/60 bg-sky-400/10 flex items-center justify-center text-[0.6rem] text-sky-300">
                ✓
              </span>
              <p>Quickly jump back into your projects and experiments.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-1 h-4 w-4 rounded-full border border-violet-400/60 bg-violet-400/10 flex items-center justify-center text-[0.6rem] text-violet-300">
                ✓
              </span>
              <p>Unified view across models, keys, credits, and more.</p>
            </div>
          </div>
        </div>

        <Card className="relative overflow-hidden border-zinc-800/80 bg-zinc-950/95 shadow-xl shadow-black/40 backdrop-blur">
          <CardHeader className="relative">
            <CardTitle className="text-xl font-semibold tracking-tight text-zinc-50">
              Sign in
            </CardTitle>
            <CardDescription className="text-xs text-zinc-300/80">
              Enter your account details to continue.
            </CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-medium text-zinc-200">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="bg-zinc-900/95 border border-zinc-300 text-sm md:text-base text-zinc-100 placeholder:text-zinc-400 focus-visible:ring-white focus-visible:ring-2 focus-visible:border-white shadow-sm h-11"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs font-medium text-zinc-200">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="bg-zinc-900/95 border border-zinc-300 text-sm md:text-base text-zinc-100 placeholder:text-zinc-400 focus-visible:ring-white focus-visible:ring-2 focus-visible:border-white shadow-sm h-11"
                  required
                />
              </div>

              <div className="min-h-[1.5rem] text-xs">
                {localError ? (
                  <p className="text-[0.7rem] font-medium text-red-400">
                    {localError}
                  </p>
                ) : (
                  <p className="text-[0.7rem] text-zinc-400">
                    Your session is secured with HTTP-only cookies. Never share your password with anyone.
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-sm shadow-md shadow-black/40 transition-all hover:shadow-lg hover:shadow-black/50"
                disabled={isLoading}
              >
                {isLoading ? "Signing you in…" : "Sign in"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="relative mt-1 flex flex-col gap-3 border-t border-zinc-800/80 pt-4">
            <div className="flex w-full items-center justify-between text-[0.7rem] text-zinc-400">
              <span>Protected by JWT-based sessions.</span>
              <span className="inline-flex items-center gap-1 text-zinc-300/90">
                <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_theme(colors.emerald.400/70%)]" />
                Live environment
              </span>
            </div>
            <div className="w-full text-center text-[0.75rem] text-zinc-300/80">
              New here?{" "}
              <Link
                to="/signup"
                className="font-medium text-zinc-100 hover:text-white hover:underline underline-offset-4"
              >
                Create an account
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}