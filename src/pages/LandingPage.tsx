// src/pages/LandingPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Terminal, 
  Upload, 
  Github, 
  Search, 
  ChevronRight, 
  FileCode, 
  CheckCircle2,
  Cpu,
  Lock
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { ThemeSwitcher } from '../components/ThemeSwitcher';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden font-mono selection:bg-primary/30">
      {/* Visual background layers */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="hero-gradient absolute inset-0 pointer-events-none"></div>
      <div className="scanline absolute inset-0 pointer-events-none opacity-10"></div>

      {/* Navigation */}
      <header className="relative z-50 border-b border-border/40 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded border border-primary/20">
              <Shield className="h-5 w-5 text-primary pulse-glow" />
            </div>
            <span className="text-lg font-bold tracking-tight uppercase">
              Sentinel<span className="text-primary">AI</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4 md:gap-8">
            <nav className="hidden md:flex items-center gap-6 text-[10px] uppercase tracking-widest text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">
                <Lock className="h-3 w-3" /> Security_DB
              </a>
              <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">
                <Cpu className="h-3 w-3" /> Core_Engine
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <ThemeSwitcher />
              <Button variant="outline" size="sm" className="hidden sm:flex border-primary/20 hover:bg-primary/5 text-xs">
                <Github className="h-3.5 w-3.5 mr-2" />
                Source
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-6 pt-16 pb-24">
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-3 py-1 rounded border border-primary/30 bg-primary/5 text-[10px] text-primary mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            LOGS: ANONYMOUS_ACCESS_GRANTED
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
            AUDIT YOUR CODE<br />
            <span className="text-primary glitch-hover italic">IN REALTIME.</span>
          </h1>
          <p className="text-muted-foreground max-w-xl text-sm md:text-base leading-relaxed mb-10 font-sans">
            Drop your project folder or paste a repository URL. No login, no friction. 
            Receive a detailed security report and your <span className="text-primary">Sentinel Score</span> in seconds.
          </p>
        </div>

        {/* Central Terminal / Scanner UI */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-5xl mx-auto"
        >
          <div 
            className={`relative transition-all duration-700 rounded-lg border ${
              isHovering 
                ? 'border-primary shadow-[0_0_60px_rgba(0,255,255,0.15)] bg-primary/[0.02]' 
                : 'border-border bg-card/40'
            } backdrop-blur-xl overflow-hidden`}
            onDragOver={() => setIsHovering(true)}
            onDragLeave={() => setIsHovering(false)}
          >
            {/* Terminal Top Bar */}
            <div className="bg-muted/40 border-b border-border p-3 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-border"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-border"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-border"></div>
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Terminal className="h-3 w-3" />
                Scanner_Session:0x4F2A
              </div>
              <div className="w-12"></div>
            </div>

            {/* Terminal Body / Drop Zone */}
            <div className="p-10 md:p-20 relative flex flex-col items-center justify-center min-h-[450px]">
              {/* The "Scanning Beam" animation */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="w-full h-[15%] bg-gradient-to-b from-primary/20 to-transparent animate-scan-fast absolute top-0 opacity-40"></div>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-10 w-full max-w-md">
                <motion.div 
                  animate={isHovering ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                  className="p-8 rounded-2xl bg-primary/5 border border-dashed border-primary/40"
                >
                  <Upload className="h-16 w-16 text-primary" />
                </motion.div>
                
                <div className="space-y-6 w-full text-center">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold tracking-tight uppercase">Analyze Local Files</h3>
                    <p className="text-xs text-muted-foreground">Supports .ZIP or individual source files</p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <Button 
                      onClick={onGetStarted}
                      className="w-full py-7 text-lg bg-primary text-primary-foreground hover:opacity-90 font-bold transition-all"
                    >
                      CHOOSE DIRECTORY
                    </Button>
                    
                    <div className="flex items-center gap-4 py-2">
                      <div className="h-[1px] flex-1 bg-border/50"></div>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">Remote Import</span>
                      <div className="h-[1px] flex-1 bg-border/50"></div>
                    </div>

                    <div className="relative group/input">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within/input:text-primary transition-colors" />
                      <input 
                        type="text" 
                        placeholder="https://github.com/user/repository"
                        className="w-full bg-background/50 border border-border rounded-md py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all font-mono"
                      />
                      <Button variant="ghost" className="absolute right-2 top-1/2 -translate-y-1/2 hover:text-primary">
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Value Props / Stats Post-Scan */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 px-4">
            <div className="flex items-center gap-4 group">
              <div className="p-3 rounded bg-primary/5 border border-primary/10 group-hover:border-primary/40 transition-colors">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">Sentinel Score</h4>
                <p className="text-[11px] text-muted-foreground font-sans">0-100 rating based on bug density.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="p-3 rounded bg-primary/5 border border-primary/10 group-hover:border-primary/40 transition-colors">
                <FileCode className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">Logic Analysis</h4>
                <p className="text-[11px] text-muted-foreground font-sans">Contextual reviews, not just linting.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="p-3 rounded bg-primary/5 border border-primary/10 group-hover:border-primary/40 transition-colors">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">Auto-Fixes</h4>
                <p className="text-[11px] text-muted-foreground font-sans">One-click refactor code blocks.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* System Status Footer Ticker */}
      <div className="fixed bottom-0 w-full border-t border-border/40 bg-background/95 backdrop-blur-md py-2.5 z-50 overflow-hidden">
        <div className="ticker-scroll">
           {statusMessages.map((msg, i) => (
            <div key={i} className="flex items-center gap-2 whitespace-nowrap px-8">
              <span className="h-1 w-1 rounded-full bg-primary shadow-[0_0_4px_rgba(0,255,255,1)]"></span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">{msg}</span>
            </div>
          ))}
          {/* Duplicate for infinite loop */}
          {statusMessages.map((msg, i) => (
            <div key={`dup-${i}`} className="flex items-center gap-2 whitespace-nowrap px-8">
              <span className="h-1 w-1 rounded-full bg-primary"></span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">{msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const statusMessages = [
  'Sentinel_Engine: Operational',
  'Vulnerability_Scan: Listening',
  'Cloud_Node: Asia-South-1',
  'Last_Scan: 4s ago',
  'Security_Patch: v2.4.1',
  'Threat_Level: Minimal',
  'Database: Indexed',
  'Uptime: 99.99%'
];