"use client";

import { useMood } from "../../../../components/MoodContext";
import { ArrowLeft, BookOpen, GraduationCap, Target, Video, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const domainData: Record<string, { title: string, steps: string[], courses: string[], deepDive: string[] }> = {
  "software-engineering": {
    title: "Software Engineering",
    steps: ["Learn JavaScript/Python", "Master Data Structures", "Build Fullstack Apps"],
    courses: ["CS50x by Harvard", "The Odin Project", "Fullstack Open"],
    deepDive: ["Advanced System Design", "Microservices Architecture", "Kubernetes & Docker Mastery"]
  },
  "ui-ux-design": {
    title: "UI/UX Design",
    steps: ["Learn Figma & Design Systems", "Study User Psychology", "Build a Portfolio"],
    courses: ["Google UX Design", "Refactoring UI", "Memorisely Bootcamp"],
    deepDive: ["Advanced Prototyping", "A/B Testing Mastery", "Accessibility Standards"]
  },
  "data-science": {
    title: "Data Science",
    steps: ["Learn Python & SQL", "Master Statistics", "Build ML Models"],
    courses: ["IBM Data Science", "Fast.ai", "Kaggle Micro-courses"],
    deepDive: ["Deep Learning with PyTorch", "Natural Language Processing", "Big Data with Spark"]
  },
  "marketing": {
    title: "Marketing",
    steps: ["Learn SEO/SEM fundamentals", "Master Copywriting", "Understand Analytics"],
    courses: ["Google Digital Garage", "HubSpot Content Marketing", "Meta Blueprint"],
    deepDive: ["Advanced Growth Hacking", "Marketing Automation", "Predictive Analytics"]
  },
  "finance": {
    title: "Finance",
    steps: ["Learn Accounting basics", "Master Excel & Modeling", "Understand Markets"],
    courses: ["CFI Financial Modeling", "Wharton Business Foundations", "Wall Street Prep"],
    deepDive: ["Algorithmic Trading", "Venture Capital Dynamics", "Advanced Derivatives"]
  },
  "government": {
    title: "Government Jobs",
    steps: ["Understand Exam Syllabus", "Master General Knowledge", "Practice Mock Tests"],
    courses: ["UPSC Foundation", "SSC CGL Prep", "State PSC Guides"],
    deepDive: ["Advanced Public Policy", "Constitutional Law deep dive", "International Relations"]
  }
};

export default function DomainDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { mood } = useMood();
  
  const data = domainData[id] || domainData["software-engineering"];
  const isFocused = mood === "FOCUSED";

  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [localToast, setLocalToast] = useState("");

  const handleStepClick = (index: number) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
        setLocalToast(`Step Completed! You're getting closer to your ${data.title} career!`);
        setTimeout(() => setLocalToast(""), 3000);
      }
      return newSet;
    });
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto pb-24 relative">
      {/* Local Toast For Celebration */}
      {localToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 glass-panel border border-emerald-500/30 px-6 py-4 rounded-full flex items-center gap-3 animate-in slide-in-from-top-4 fade-in duration-300 shadow-[0_0_30px_rgba(52,211,153,0.3)]">
          <div className="bg-emerald-500 text-black rounded-full p-1"><CheckCircle className="w-5 h-5"/></div>
          <p className="font-bold text-white whitespace-nowrap">{localToast}</p>
        </div>
      )}
      <Link href="/dashboard" className="inline-flex items-center gap-3 text-slate-400 hover:text-cyan-400 font-bold mb-10 transition-colors group">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Retract to Nexus
      </Link>
      
      <div className="glass-panel rounded-[32px] p-12 relative overflow-hidden mb-8 border border-white/[0.05]">
        {/* Subtle top glare */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

        <div className="flex items-center gap-5 mb-10 relative z-10">
          <div className="relative p-4 rounded-2xl bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(99,102,241,0.15)] group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-indigo-500/20 rounded-2xl blur-md -z-10 group-hover:blur-xl transition-all" />
            <Target className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">{data.title}</h1>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 relative z-10">
          {/* Roadmap */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
              <MapIcon className="w-6 h-6 text-indigo-400" /> Neural Pathway
            </h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[1.4rem] md:before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-indigo-500/50 before:via-cyan-500/20 before:to-transparent">
              {data.steps.map((step, i) => {
                const isCompleted = completedSteps.has(i);
                return (
                <div key={i} onClick={() => handleStepClick(i)} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active cursor-pointer transition-all duration-300 ${isCompleted ? 'opacity-60' : 'opacity-100'}`}>
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border shadow-[0_0_15px_rgba(99,102,241,0.4)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold text-lg transition-all ${isCompleted ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 scale-95' : 'bg-black text-cyan-400 border-indigo-500/50 group-hover:bg-indigo-500 group-hover:text-white group-hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]'}`}>
                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : i + 1}
                  </div>
                  <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] glass-card p-5 rounded-2xl transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)] ${isCompleted ? 'bg-emerald-900/10 border-emerald-500/20' : 'hover:-translate-y-1'}`}>
                    <p className={`font-bold transition-colors ${isCompleted ? 'text-emerald-400 line-through decoration-emerald-500/40' : 'text-slate-200'}`}>{step}</p>
                  </div>
                </div>
              )})}
            </div>
          </div>
          
          {/* Courses */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
              <GraduationCap className="w-6 h-6 text-indigo-400" /> Data Modules
            </h2>
            <div className="grid gap-4">
              {data.courses.map((course, i) => (
                <div key={i} className="flex items-center gap-5 glass-card p-5 rounded-2xl hover:border-cyan-500/50 hover:bg-white/10 transition-all cursor-pointer group">
                  <Video className="w-6 h-6 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-slate-300 group-hover:text-white transition-colors">{course}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* FOCUSED STATE: Box/Gift Deployed and Deep Dive */}
        <div className={`mt-12 pt-12 border-t border-white/5 overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isFocused ? 'max-h-[1000px] opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95 pointer-events-none !mt-0 !pt-0 !border-transparent'}`}>
          <div className="bg-gradient-to-br from-indigo-900/40 to-[#030712] rounded-3xl p-10 border border-indigo-500/30 relative overflow-hidden shadow-[0_0_50px_rgba(99,102,241,0.15)] flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 blur-[80px] pointer-events-none" />
            
            {/* The Gift Icon Box */}
            <div className="w-24 h-24 shrink-0 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-[0_0_40px_rgba(250,204,21,0.4)] animate-bounce duration-1000 relative z-10">
              <span className="text-5xl">🎁</span>
            </div>

            <div className="relative z-10 flex-1 text-center md:text-left">
              <h2 className="text-3xl font-extrabold text-white flex items-center justify-center md:justify-start gap-3 mb-2 tracking-tight">
                Gift Deployed: Deep Dive Unlocked!
              </h2>
              <p className="text-slate-300 mb-6 font-medium text-lg leading-relaxed max-w-2xl">
                We noticed your intense focus. We've automatically extended your curriculum with these highly-classified advanced resources for {data.title}:
              </p>
              <div className="grid sm:grid-cols-3 gap-5">
                {data.deepDive.map((item, i) => (
                  <div key={i} className="bg-black/40 p-6 rounded-2xl border border-yellow-500/30 hover:border-yellow-400 transition-colors backdrop-blur-sm group text-left">
                    <div className="w-10 h-10 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 flex items-center justify-center font-bold mb-4 group-hover:bg-yellow-500/20 group-hover:text-yellow-300 transition-all shadow-[0_0_15px_rgba(250,204,21,0.2)]">★</div>
                    <h3 className="font-bold text-white text-base leading-snug">{item}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* STANDARD FOOTER - Hides in FOCUSED mode */}
      <footer className={`glass-card rounded-[24px] p-8 text-center border-white/5 text-slate-500 font-medium transition-all duration-[800ms] ${isFocused ? 'opacity-0 translate-y-10 scale-95 pointer-events-none absolute w-full' : 'opacity-100 translate-y-0 scale-100 relative'}`}>
        <p className="text-sm">© 2026 MoodSense UI. All access protocols secured.</p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="hover:text-cyan-400 transition-colors">Encryption</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Terminal</a>
        </div>
      </footer>
    </div>
  );
}

function MapIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
    </svg>
  );
}
