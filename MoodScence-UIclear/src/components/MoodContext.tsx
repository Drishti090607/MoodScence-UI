"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { usePathname } from "next/navigation";

export type Mood = "NORMAL" | "CONFUSED" | "FOCUSED" | "BORED";
export type Theme = "dark" | "light";

interface MoodContextType {
  mood: Mood;
  toastMessage: string | null;
  theme: Theme;
  setModeDirectly: (m: Mood) => void;
  toggleTheme: () => void;
}

const MoodContext = createContext<MoodContextType>({
  mood: "NORMAL",
  toastMessage: null,
  theme: "dark",
  setModeDirectly: () => {},
  toggleTheme: () => {},
});

export const useMood = () => useContext(MoodContext);

export const MoodProvider = ({ children }: { children: ReactNode }) => {
  const [mood, setMood] = useState<Mood>("NORMAL");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>("dark");
  const pathname = usePathname();

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  }, []);

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("theme-light");
    } else {
      document.documentElement.classList.remove("theme-light");
    }
  }, [theme]);

  const handleMoodChange = useCallback((newMood: Mood) => {
    if (newMood === mood) return;
    setMood(newMood);
    
    // Magic Toast
    if (newMood !== "NORMAL" && newMood !== "BORED") {
      setToastMessage(`We noticed you’re ${newMood}—simplifying your view!`);
      setTimeout(() => setToastMessage(null), 4000);
    } else {
      setToastMessage(null);
    }
  }, [mood]);

  // Track BORED (6s inactivity instead of 30s)
  useEffect(() => {
    if (!pathname || !pathname.startsWith("/dashboard")) {
      if (mood === "BORED") {
         handleMoodChange("NORMAL"); // Reset if navigating away
      }
      return;
    }

    let timeout: NodeJS.Timeout;
    
    const startTimer = () => {
      timeout = setTimeout(() => {
        handleMoodChange("BORED");
      }, 6000);
    };

    const handleUserActivity = () => {
      clearTimeout(timeout);
      // Do not automatically clear BORED mode on mouse movement.
      // The user must explicitly dismiss it via buttons inside the Modal itself.
      if (mood !== "BORED") {
        startTimer();
      }
    };

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("click", handleUserActivity);
    window.addEventListener("scroll", handleUserActivity);
    
    // Start the initial countdown
    if (mood !== "BORED") {
      startTimer();
    }
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity);
    };
  }, [mood, handleMoodChange, pathname]);

  // Track CONFUSED (5+ clicks in 10s)
  useEffect(() => {
    let clicks: number[] = [];
    let confusedTimeout: NodeJS.Timeout;

    const handleClick = () => {
      const now = Date.now();
      clicks.push(now);
      
      // Filter clicks in last 10 seconds
      clicks = clicks.filter(t => now - t < 10000);
      
      if (clicks.length >= 5 && mood !== "CONFUSED") {
        handleMoodChange("CONFUSED");
        // Reset after some time
        clearTimeout(confusedTimeout);
        confusedTimeout = setTimeout(() => {
           handleMoodChange("NORMAL");
           clicks = [];
        }, 15000);
      }
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
      clearTimeout(confusedTimeout);
    };
  }, [mood, handleMoodChange]);

  // Track FOCUSED (4s on a domain section)
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (pathname && pathname.includes("/dashboard/domain/")) {
      timeout = setTimeout(() => {
        handleMoodChange("FOCUSED");
      }, 4000);
    } else if (mood === "FOCUSED") {
      handleMoodChange("NORMAL");
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [pathname, mood, handleMoodChange]);

  return (
    <MoodContext.Provider value={{ mood, toastMessage, theme, setModeDirectly: handleMoodChange, toggleTheme }}>
      {children}
      {/* Toast Render */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 glass-panel px-6 py-4 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full p-0.5 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            <div className="bg-black/80 rounded-full w-8 h-8 flex items-center justify-center text-sm">✨</div>
          </div>
          <p className="font-semibold text-white tracking-wide">{toastMessage}</p>
        </div>
      )}
      
      {/* Eye-catching "BORED" Full-Page Takeover */}
      {mood === "BORED" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-2xl animate-in zoom-in-95 fade-in duration-500">
          {/* Neon Lightpools for Bored Mode */}
          <div className="absolute top-1/4 left-1/4 w-[40vh] h-[40vh] bg-orange-600/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[50vh] h-[50vh] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

          <div className="glass-panel border-white/10 rounded-[40px] p-12 max-w-4xl w-full mx-4 text-center relative overflow-hidden shadow-[0_0_80px_rgba(249,115,22,0.15)] group">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-400 via-rose-500 to-blue-500" />
            
            <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-400 to-blue-400 mb-6 tracking-tighter uppercase">
              Try This!
            </h2>
            <p className="text-xl text-slate-300 mb-12 font-medium leading-relaxed max-w-2xl mx-auto">
              System detected a drop in engagement. Recharge your focus instantly by choosing an interactive module below:
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 justify-center z-10 relative">
              {/* Quiz Section */}
              <button 
                onClick={() => handleMoodChange("NORMAL")}
                className="group/btn relative bg-black/50 overflow-hidden border border-white/10 hover:border-orange-500/50 text-white font-extrabold p-8 rounded-3xl transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(249,115,22,0.3)] text-left"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                <div className="text-5xl mb-6 shadow-sm">📝</div>
                <h3 className="text-2xl mb-2 text-orange-400 font-bold tracking-tight">Career Quiz Section</h3>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">Discover hidden talents with a quick 2-minute diagnostic flow.</p>
              </button>
              
              {/* Play Game Section */}
              <button 
                onClick={() => handleMoodChange("NORMAL")}
                className="group/btn relative bg-black/50 overflow-hidden border border-white/10 hover:border-blue-500/50 text-white font-extrabold p-8 rounded-3xl transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(59,130,246,0.3)] text-left"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                <div className="text-5xl mb-6 shadow-sm">🎮</div>
                <h3 className="text-2xl mb-2 text-blue-400 font-bold tracking-tight">Play Game Section</h3>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">Dive into our gamified career simulator to refresh your mind.</p>
              </button>
            </div>

            <button 
                onClick={() => handleMoodChange("NORMAL")}
                className="mt-12 mx-auto glass-card hover:bg-white/10 text-white font-bold text-sm py-4 px-10 rounded-full transition-all block z-10 relative"
              >
                Return to Dashboard
            </button>
          </div>
        </div>
      )}
    </MoodContext.Provider>
  );
};

