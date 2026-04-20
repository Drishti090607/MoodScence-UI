"use client";

import { useMood } from "../../components/MoodContext";
import { Code2, MonitorPlay, BrainCircuit, Megaphone, Landmark, Briefcase, Zap, Target, Brain } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const domains = [
  { id: "software-engineering", title: "Software Engineering", icon: Code2, desc: "Build the robust systems that power the internet." },
  { id: "ui-ux-design", title: "UI/UX Design", icon: MonitorPlay, desc: "Craft beautiful and highly usable interfaces." },
  { id: "data-science", title: "Data Science", icon: BrainCircuit, desc: "Analyze data to uncover deep insights." },
  { id: "marketing", title: "Marketing", icon: Megaphone, desc: "Connect products with people at scale." },
  { id: "finance", title: "Finance", icon: Landmark, desc: "Understand money, markets, and growth." },
  { id: "government", title: "Government Jobs", icon: Briefcase, desc: "Serve the public with stability and impact." },
];

export default function DashboardPage() {
  const { mood } = useMood();
  const isConfused = mood === "CONFUSED";

  const visibleDomains = isConfused ? domains.slice(0, 3) : domains;

  return (
    <div className="animate-fade-in relative z-10 w-full space-y-8">
      {/* UPDATE 3: Impact Stats overlay */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-5xl mx-auto">
         <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.05)] transition-all flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]"><Brain className="w-6 h-6"/></div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Cognitive Load</p>
              <h4 className="text-lg font-extrabold text-white tracking-tight">Reduced: 42%</h4>
            </div>
         </div>
         <div className="glass-panel p-5 rounded-2xl border border-indigo-500/20 hover:border-indigo-400/50 shadow-[0_0_20px_rgba(99,102,241,0.05)] transition-all flex items-center gap-4">
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]"><Zap className="w-6 h-6"/></div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Engagement Score</p>
              <h4 className="text-lg font-extrabold text-white tracking-tight">High</h4>
            </div>
         </div>
         <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 hover:border-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.05)] transition-all flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]"><Target className="w-6 h-6"/></div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Session Clarity</p>
              <h4 className="text-lg font-extrabold text-white tracking-tight">Optimized</h4>
            </div>
         </div>
      </div>

      {/* Trending Section */}
      <div className="mb-10 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <h3 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span className="text-orange-500 text-2xl">🔥</span> Trending Career Paths
          </h3>
          <div className="h-[1px] bg-white/5 flex-1 ml-4 rounded-full"></div>
        </div>
        <div className="flex flex-wrap gap-4">
          {["AI Engineer", "Cybersecurity", "Product Manager"].map((role) => (
            <div key={role} className="group glass-panel px-6 py-3.5 rounded-full border border-orange-500/30 hover:border-orange-500/60 bg-gradient-to-r from-orange-500/10 to-rose-500/5 text-orange-400 font-bold hover:shadow-[0_0_25px_rgba(249,115,22,0.2)] transition-all cursor-pointer flex items-center gap-3 hover:-translate-y-1">
              <span className="tracking-wide">{role}</span> 
              <span className="text-xs opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"><Target className="w-3.5 h-3.5" /></span>
            </div>
          ))}
        </div>
      </div>
      <motion.div layout className={`grid gap-6 ${isConfused ? 'grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto mt-12' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
        <AnimatePresence mode="popLayout">
          {visibleDomains.map((domain, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              key={domain.id}
            >
              <Link 
                href={`/dashboard/domain/${domain.id}`}
                className={`block h-full group glass-card rounded-[32px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] hover:border-cyan-500/30 hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden ${isConfused ? 'py-14' : ''}`}
              >
            {/* Hover ambient light */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="w-14 h-14 bg-white/5 border border-white/10 text-slate-300 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-cyan-400 group-hover:to-indigo-500 group-hover:text-black group-hover:border-transparent group-hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all duration-500 z-10 relative">
              <domain.icon className="w-7 h-7" />
            </div>
            
            <h3 className={`font-extrabold text-white mb-3 tracking-tight z-10 relative ${isConfused ? 'text-3xl' : 'text-xl'}`}>{domain.title}</h3>
            <p className="text-slate-400 font-medium leading-relaxed z-10 relative">{domain.desc}</p>
            
            <div className="mt-8 flex items-center text-sm font-bold text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0 z-10 relative neon-text">
              Initialize Sequence →
            </div>
          </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

