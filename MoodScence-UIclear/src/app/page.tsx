"use client";

import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Brain, Zap, Compass } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex bg-[#030712] overflow-hidden">
      {/* Left Sidebar / Hero Image Area */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden border-r border-white/5">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero-bg.png" 
            alt="MoodSense Hero" 
            fill
            className="object-cover opacity-50 mix-blend-screen"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/30 via-transparent to-[#030712]" />
        </div>

        {/* Top Branding Content */}
        <div className="relative z-10 flex flex-col pt-4">
          <div className="flex items-center gap-3 mb-12">
            <div className="glass-card p-3 rounded-xl ring-1 ring-white/10 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              <Sparkles className="w-6 h-6 text-cyan-400" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">MoodSense</span>
          </div>
          
          <h1 className="text-5xl xl:text-6xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight drop-shadow-2xl">
            Navigate your <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-500">
              Tech Career.
            </span>
          </h1>
          <p className="text-lg xl:text-xl text-slate-300 max-w-md leading-relaxed font-medium drop-shadow-md">
            Harness the power of AI to map out your optimal career trajectory, optimize your cognitive load, and master the skills that matter.
          </p>
        </div>

        {/* Bottom Feature List */}
        <div className="relative z-10 space-y-6 pb-4">
          <div className="flex items-start gap-5 glass-panel bg-black/40 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
            <div className="p-3.5 rounded-xl bg-indigo-500/20 border border-indigo-500/30 shrink-0">
              <Brain className="w-6 h-6 text-indigo-400" />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-white font-semibold text-lg">Cognitive Optimization</h3>
              <p className="text-sm text-slate-400 mt-0.5">Adaptive learning paths based on your current focus state.</p>
            </div>
          </div>
          <div className="flex items-start gap-5 glass-panel bg-black/40 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
            <div className="p-3.5 rounded-xl bg-cyan-500/20 border border-cyan-500/30 shrink-0">
              <Zap className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-white font-semibold text-lg">Dynamic Skill Matrix</h3>
              <p className="text-sm text-slate-400 mt-0.5">Real-time gap analysis and personalized curriculum generation.</p>
            </div>
          </div>
          <div className="flex items-start gap-5 glass-panel bg-black/40 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
            <div className="p-3.5 rounded-xl bg-violet-500/20 border border-violet-500/30 shrink-0">
              <Compass className="w-6 h-6 text-violet-400" />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-white font-semibold text-lg">Trajectory Navigation</h3>
              <p className="text-sm text-slate-400 mt-0.5">Clear roadmaps from your current role to your dream position.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Login Area */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative p-6">
        {/* Darkened Lightpools */}
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none animate-pulse duration-[5000ms]" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-cyan-600/10 blur-[100px] pointer-events-none animate-pulse duration-[7000ms]" />

        <div className="w-full max-w-md z-10 animate-fade-in">
          {/* Mobile Branding Logo */}
          <div className="flex lg:hidden justify-center items-center gap-3 mb-10">
            <div className="glass-card p-3 rounded-xl ring-1 ring-white/10 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
              <Sparkles className="w-6 h-6 text-cyan-400" />
            </div>
            <span className="text-2xl font-bold text-white">MoodSense</span>
          </div>

          <div className="glass-panel p-8 sm:p-10 rounded-[32px] relative overflow-hidden group border border-white/5 bg-black/50 backdrop-blur-xl">
            <div className="absolute -inset-[1px] bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude", WebkitMaskComposite: "destination-out", padding: "1px" }} />
            
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h2>
              <p className="text-slate-400">Ready to resume your journey?</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-1.5 focus-within:text-cyan-400 transition-colors">
                  <label className="text-sm font-medium text-slate-300 ml-1 transition-colors">Email Address</label>
                  <input
                    type="email"
                    required
                    suppressHydrationWarning
                    className="w-full bg-black/60 border border-white/10 px-5 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-white placeholder-slate-600 shadow-inner"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="space-y-1.5 focus-within:text-cyan-400 transition-colors">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-sm font-medium text-slate-300 transition-colors">Password</label>
                    <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Forgot password?</a>
                  </div>
                  <input
                    type="password"
                    required
                    suppressHydrationWarning
                    className="w-full bg-black/60 border border-white/10 px-5 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-white placeholder-slate-600 shadow-inner"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                suppressHydrationWarning
                className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold flex items-center justify-center gap-2 py-4 rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:scale-[1.01] transition-all active:scale-95 mt-8 group/btn relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center gap-2">
                  Enter the Nexus
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </span>
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/5 text-center">
              <p className="text-sm text-slate-500">
                Don't have an account?{" "}
                <a href="#" className="text-cyan-400 font-medium hover:text-cyan-300 hover:underline underline-offset-4 transition-colors">
                  Request Access
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
