import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useElysiaClient } from "@/providers/Eden";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Zap,
  Globe,
  Shield,
  BarChart3,
  Code2,
  Layers,
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "200+ Models",
    description:
      "Access GPT-4, Claude, Llama, Gemini, and hundreds more through a single endpoint.",
  },
  {
    icon: Layers,
    title: "Unified API",
    description:
      "One integration, every model. Switch providers without changing your code.",
  },
  {
    icon: BarChart3,
    title: "Usage Analytics",
    description:
      "Track spending, monitor usage, and optimize costs across all your API keys.",
  },
  {
    icon: Shield,
    title: "Secure by design",
    description:
      "JWT-based sessions, HTTP-only cookies, and least-privilege API keys out of the box.",
  },
  {
    icon: Code2,
    title: "Developer First",
    description:
      "OpenAI-compatible API. Drop-in replacement — just change the base URL.",
  },
  {
    icon: Zap,
    title: "Instant Routing",
    description:
      "Automatic failover and smart routing finds the fastest, cheapest provider.",
  },
];

export function LandingPage() {
  const elysiaClient = useElysiaClient();

  const modelsQuery = useQuery({
    queryKey: ["models"],
    queryFn: async () => {
      const response = await elysiaClient.models.get();
      if (response.error) return null;
      return response.data;
    },
  });

  const modelCount = modelsQuery.data?.models?.length ?? 200;

  return (
    <div className="dark min-h-screen bg-[#050509] text-foreground">
      {/* Navigation */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-zinc-800/70 bg-[#050509]/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center size-8 rounded-lg bg-zinc-900 border border-zinc-700">
              <Zap className="size-3.5 text-zinc-100" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-zinc-50">
              OpenRouter
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/signin">Sign in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/signup">
                Get started
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background effects */}
        <div
          className="pointer-events-none absolute w-[800px] h-[800px] rounded-full opacity-[0.10] blur-[160px]"
          style={{
            background:
              "radial-gradient(circle, rgba(244,244,245,0.35) 0%, transparent 70%)",
            top: "-20%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(63,63,70,0.65) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/70 backdrop-blur-sm text-xs font-medium text-zinc-300 mb-8">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {modelCount}+ models available
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] max-w-4xl mx-auto text-zinc-50">
            One API for{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #fafafa, #e4e4e7, #a1a1aa)",
              }}
            >
              every AI model
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Route to the best models from OpenAI, Anthropic, Google, Meta, and more.
            One integration, infinite possibilities — managed from your own dashboard.
          </p>

          <div className="flex items-center justify-center gap-4 mt-10">
            <Button size="lg" asChild className="h-12 px-8 text-base">
              <Link to="/signup">
                Start building
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="h-12 px-8 text-base border-zinc-700 text-zinc-100 hover:bg-zinc-900"
            >
              <Link to="/dashboard">View dashboard</Link>
            </Button>
          </div>

          {/* Code snippet */}
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm overflow-hidden shadow-2xl text-left">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
                <span className="size-3 rounded-full bg-red-500/70" />
                <span className="size-3 rounded-full bg-yellow-500/70" />
                <span className="size-3 rounded-full bg-green-500/70" />
                <span className="ml-2 text-xs text-zinc-500 font-mono">
                  request.ts
                </span>
              </div>
              <pre className="p-5 text-sm font-mono leading-relaxed overflow-x-auto text-zinc-100">
                <code>
                  <span className="text-zinc-500">
                    {"// Just change the base URL — that's it\n"}
                  </span>
                  <span className="text-sky-400">{"const "}</span>
                  <span className="text-zinc-100">{"response "}</span>
                  <span className="text-zinc-500">{"= "}</span>
                  <span className="text-sky-400">{"await "}</span>
                  <span className="text-emerald-300">{"fetch"}</span>
                  <span className="text-zinc-100">{"(\n"}</span>
                  <span className="text-emerald-300">
                    {'  "https://openrouter.ai/api/v1/chat"'}
                  </span>
                  <span className="text-zinc-100">
                    {",\n  { method: "}
                  </span>
                  <span className="text-emerald-300">{'"POST"'}</span>
                  <span className="text-zinc-100">
                    {",\n    body: JSON."}
                  </span>
                  <span className="text-emerald-300">{"stringify"}</span>
                  <span className="text-zinc-100">{"({\n"}</span>
                  <span className="text-zinc-100">{"      model: "}</span>
                  <span className="text-emerald-300">
                    {'"anthropic/claude-3.5-sonnet"'}
                  </span>
                  <span className="text-zinc-100">
                    {",\n      messages: [{ role: "}
                  </span>
                  <span className="text-emerald-300">{'"user"'}</span>
                  <span className="text-zinc-100">{", content: "}</span>
                  <span className="text-emerald-300">{'"Hello!"'}</span>
                  <span className="text-zinc-100">
                    {" }]\n    })\n  }\n)"}
                  </span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 border-t border-zinc-800/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50">
              Everything you need to ship AI
            </h2>
            <p className="mt-4 text-zinc-400 text-lg max-w-xl mx-auto">
              Built for developers who want to move fast without being locked into a single
              provider.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-zinc-800 bg-zinc-950/70 p-6 hover:border-zinc-500 hover:bg-zinc-900/80 transition-all duration-300"
              >
                <div className="flex items-center justify-center size-10 rounded-lg bg-zinc-900 border border-zinc-700 mb-4 group-hover:bg-zinc-800 transition-colors">
                  <feature.icon className="size-5 text-zinc-400 group-hover:text-zinc-100 transition-colors" />
                </div>
                <h3 className="font-semibold text-sm mb-2 text-zinc-50">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Models preview */}
      {modelsQuery.data?.models && modelsQuery.data.models.length > 0 && (
        <section className="py-24 border-t border-zinc-800/60">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50">
                Popular models
              </h2>
              <p className="mt-4 text-zinc-400 text-lg">
                Access the latest and greatest from every major provider.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {modelsQuery.data.models.slice(0, 9).map((model) => (
                <div
                  key={model.id}
                  className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950/80 px-4 py-3 hover:border-zinc-500 transition-colors"
                >
                  <div className="size-8 rounded-md bg-zinc-900 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-300">
                    {model.company.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate text-zinc-50">
                      {model.name}
                    </p>
                    <p className="text-xs text-zinc-400">{model.company.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 border-t border-zinc-800/60">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50">
            Ready to start building?
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-xl mx-auto">
            Create a free account and start making API calls in minutes.
          </p>
          <Button size="lg" asChild className="mt-8 h-12 px-8 text-base">
            <Link to="/signup">
              Create free account
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/60 py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="size-3.5 text-zinc-500" />
            <span className="text-xs text-zinc-500">OpenRouter</span>
          </div>
          <p className="text-xs text-zinc-500">
            &copy; 2026 OpenRouter. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}