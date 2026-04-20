"use client";

import { useMood } from "../../components/MoodContext";
import { LayoutDashboard, Compass, Map, Settings, Zap, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { mood, theme, toggleTheme } = useMood();
  const pathname = usePathname();

  const isConfused = mood === "CONFUSED";

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Skills", icon: Compass, href: "/dashboard/skills" },
    { name: "Atlas", icon: Map, href: "/dashboard/atlas" },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-[#030712] flex overflow-hidden">
      {/* Decorative dark mode lightpools for dashboard */}
      <div className="fixed top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-indigo-900/10 blur-[180px] pointer-events-none z-0 mix-blend-screen" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-900/10 blur-[150px] pointer-events-none z-0 mix-blend-screen" />

      {/* Sidebar - Hides on CONFUSED mode */}
      <div className={`fixed md:relative z-20 h-screen w-64 glass-panel border-l-0 border-t-0 border-b-0 rounded-none p-6 flex flex-col transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isConfused ? '-ml-64 opacity-0 pointer-events-none' : 'ml-0 opacity-100'}`}>
        <div className="flex items-center gap-3 px-2 mb-12 mt-2">
          <div className="bg-gradient-to-br from-cyan-400 to-indigo-500 p-2 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.4)]">
            <LayoutDashboard className="w-5 h-5 text-black" />
          </div>
          <span className="font-extrabold text-2xl text-white tracking-tight">MoodSense</span>
        </div>

        <nav className="flex-1 space-y-3">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all font-semibold ${
                  active 
                    ? "bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/5" 
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent"
                }`}
              >
                <item.icon className={`w-5 h-5 ${active ? 'text-cyan-400' : ''}`} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto p-5 glass-card rounded-[24px] overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
            Nexus Pro <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          </h4>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed font-medium">Unlock unconstrained metrics.</p>
          <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-xl shadow-sm border border-white/10 transition-all backdrop-blur-md">
            Upgrade Now
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-10 ${isConfused ? 'mx-auto max-w-6xl w-full' : ''}`}>
        <header className="p-8 pb-6 flex items-center justify-between z-20 sticky top-0 bg-[#030712]/60 backdrop-blur-xl border-b border-white/[0.03]">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Where to, <span className="neon-text">Explorer?</span>
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-5 py-2.5 glass-card rounded-full border-white/10 group/tooltip relative cursor-default">
              <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] ${
                mood === 'CONFUSED' ? 'bg-orange-500 text-orange-500' :
                mood === 'FOCUSED' ? 'bg-cyan-400 text-cyan-400' :
                mood === 'BORED' ? 'bg-purple-500 text-purple-500' :
                'bg-indigo-500 text-indigo-500'
              } animate-pulse`} />
              <span className="text-xs font-bold text-slate-300 tracking-wider uppercase">
                {mood === 'CONFUSED' ? 'Low-Cognitive Load Mode Activated' : `System: ${mood}`}
              </span>
              {mood === 'CONFUSED' && (
                <>
                  <div className="w-4 h-4 rounded-full border border-slate-500 flex items-center justify-center text-[10px] text-slate-400 hover:text-white hover:border-white transition-colors cursor-help">i</div>
                  <div className="absolute right-0 top-full mt-2 w-64 p-3 bg-black/98 backdrop-blur-md border border-white/10 rounded-xl text-xs text-slate-300 opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity shadow-[0_0_20px_rgba(0,0,0,0.5)] z-50 text-center font-medium leading-relaxed">
                    UI simplified for better accessibility and focus.
                  </div>
                </>
              )}
            </div>
            <button 
              onClick={toggleTheme} 
              className="p-3 rounded-full hover:bg-white/10 transition-colors border border-white/10 glass-card"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-indigo-400" />}
            </button>
          </div>
        </header>
        
        <main className="flex-1 p-8 pt-6 z-10">
          {children}
        </main>
        
        {/* Floating Help Button on CONFUSED mode */}
        {isConfused && (
          <button className="fixed bottom-10 right-10 bg-white text-black p-4 px-6 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all z-40 flex items-center gap-3 animate-fade-in font-bold">
            <Zap className="w-5 h-5 text-indigo-600" />
            <span>Recalibrate</span>
          </button>
        )}
      </div>
    </div>
  );
}

