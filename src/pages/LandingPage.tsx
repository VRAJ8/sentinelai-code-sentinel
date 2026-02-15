import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Terminal, Upload, Search, ChevronRight, CheckCircle2, FileCode, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ThemeSwitcher } from '../components/ThemeSwitcher';

export const LandingPage: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="min-h-screen bg-background relative font-mono flex flex-col">
      <div className="scanline-overlay"></div>
      
      <header className="relative z-50 border-b border-border/40 p-4 bg-background/50 backdrop-blur-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-bold tracking-tighter uppercase text-sm">SentinelAI</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <Button variant="outline" size="sm" onClick={onGetStarted} className="text-[10px] uppercase border-primary/20 hover:bg-primary/5">Launch_Console</Button>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black tracking-tighter mb-4 uppercase"
          >
            Audit Code <span className="text-primary italic">Instantly.</span>
          </motion.h1>
          <p className="text-muted-foreground text-[10px] uppercase tracking-[0.3em]">No Registration • Anonymous Access • AI Logic Engine</p>
        </div>

        <div className={`w-full max-w-4xl terminal-window transition-all duration-500 ${isHovering ? 'border-primary shadow-[0_0_40px_rgba(0,255,255,0.1)]' : ''}`}>
          <div className="terminal-header">
            <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-border"></div><div className="w-2 h-2 rounded-full bg-border"></div></div>
            <span>terminal::upload_handler.sh</span>
            <div className="w-4"></div>
          </div>
          
          <div 
            className="p-10 md:p-20 flex flex-col items-center gap-8 relative overflow-hidden" 
            onMouseEnter={() => setIsHovering(true)} 
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-[10%] bg-primary/5 animate-scan-fast absolute top-0"></div>
            </div>

            <div className="p-6 rounded-lg border border-dashed border-primary/30 bg-primary/5 z-10">
              <Upload className="h-10 w-10 text-primary" />
            </div>

            <div className="w-full max-w-sm space-y-4 z-10">
              <Button onClick={onGetStarted} className="w-full py-7 text-lg bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all">
                INITIALIZE SCAN
              </Button>
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input type="text" placeholder="Paste GitHub Repository URL" className="w-full bg-background/50 border border-border rounded p-3 pl-10 text-xs focus:border-primary/50 focus:outline-none font-mono" />
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-hover:text-primary cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 w-full max-w-4xl">
          {[
            { icon: <CheckCircle2 className="h-4 w-4 text-primary" />, label: "Sentinel Score", desc: "Real-time Rating" },
            { icon: <FileCode className="h-4 w-4 text-primary" />, label: "Deep Logic", desc: "Contextual Audit" },
            { icon: <Zap className="h-4 w-4 text-primary" />, label: "Auto-Patch", desc: "AI Refactoring" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 terminal-window bg-card/10">
              {item.icon}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-tight">{item.label}</p>
                <p className="text-[9px] text-muted-foreground uppercase">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-border/40 bg-card/80 py-2 h-8 flex items-center overflow-hidden z-50">
        <div className="ticker-scroll">
          {["System: Operational", "Session: Anonymous", "Database: Synced", "Engine: v4.2", "Latency: 14ms", "Uptime: 99.9%"].map((text, i) => (
            <div key={i} className="flex items-center gap-2 px-10">
              <span className="h-1 w-1 rounded-full bg-primary shadow-[0_0_4px_rgba(0,255,255,0.8)]"></span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-muted-foreground">{text}</span>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
};