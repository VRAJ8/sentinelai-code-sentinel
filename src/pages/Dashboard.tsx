import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  LayoutDashboard, 
  Upload, 
  MessageSquare, 
  Settings, 
  Terminal, 
  Cpu, 
  AlertTriangle, 
  Activity, 
  BarChart3, 
  Search, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Globe,
  Clock
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  Radar as RadarArea, 
  ResponsiveContainer 
} from 'recharts';
import JSZip from 'jszip';
import { Button } from '../components/ui/button';
import { ThemeSwitcher } from '../components/ThemeSwitcher';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<{name: string, risk: number}[]>([]);
  const [radarData, setRadarData] = useState<any[]>([]);
  const [logs, setLogs] = useState<string[]>(["[SYSTEM] Initializing Sentinel Core...", "[AUTH] Identity: Anonymous_0x22F"]);

  // Functional: Handle ZIP Upload and generate scan data
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    const zip = new JSZip();
    
    try {
      const content = await zip.loadAsync(file);
      const files = Object.keys(content.files).filter(path => !content.files[path].dir);
      
      const mockResults = files.map(f => ({
        name: f.split('/').pop() || f,
        risk: Math.random() * 100
      }));

      const mockRadar = [
        { subject: 'Injection', A: Math.random() * 150 },
        { subject: 'Auth', A: Math.random() * 150 },
        { subject: 'Logic', A: Math.random() * 150 },
        { subject: 'Data Leak', A: Math.random() * 150 },
        { subject: 'Config', A: Math.random() * 150 },
      ];

      setTimeout(() => {
        setScanResults(mockResults);
        setRadarData(mockRadar);
        setIsScanning(false);
        setActiveTab('analysis');
        setLogs(prev => [`[SUCCESS] Analysis complete for ${file.name}`, ...prev]);
      }, 2000);
    } catch (e) {
      setLogs(prev => [`[ERROR] Decryption failed for payload`, ...prev]);
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-mono flex flex-col">
      <div className="scanline-overlay"></div>

      <header className="border-b border-border/40 p-4 flex justify-between items-center bg-background/50 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="font-bold tracking-tighter uppercase text-sm">SentinelAI <span className="text-primary">/ System</span></span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:block text-[9px] text-muted-foreground uppercase tracking-widest">
            Identity: <span className="text-primary">ANON_USER_0x22F</span>
          </div>
          <ThemeSwitcher />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-16 md:w-60 border-r border-border/40 bg-card/10 flex flex-col">
          <nav className="flex-1 p-3 space-y-3">
            <NavBtn id="overview" icon={<LayoutDashboard className="h-4 w-4" />} label="Overview" active={activeTab} onClick={setActiveTab} />
            <NavBtn id="analysis" icon={<Activity className="h-4 w-4" />} label="Risk_Map" active={activeTab} onClick={setActiveTab} />
            <NavBtn id="upload" icon={<Upload className="h-4 w-4" />} label="Scanner" active={activeTab} onClick={setActiveTab} />
            <NavBtn id="chat" icon={<MessageSquare className="h-4 w-4" />} label="AI_Chat" active={activeTab} onClick={setActiveTab} />
          </nav>
        </aside>

        <main className="flex-1 p-6 overflow-y-auto bg-background/20">
          <div className="terminal-window h-full flex flex-col max-w-6xl mx-auto">
            <div className="terminal-header">
              <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-border"></div><div className="w-2 h-2 rounded-full bg-border"></div></div>
              <span>exec::{activeTab}.bin</span>
              <Cpu className={`h-3 w-3 text-primary ${isScanning ? 'animate-spin' : 'animate-pulse'}`} />
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Overview Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <StatBox label="Sentinel Score" value={scanResults.length ? "84/100" : "N/A"} icon={<ShieldCheck className="h-4 w-4" />} color="text-primary" />
                    <StatBox label="Files Scanned" value={scanResults.length.toString()} icon={<Zap className="h-4 w-4" />} color="text-yellow-500" />
                    <StatBox label="System Health" value="Optimal" icon={<Activity className="h-4 w-4" />} color="text-green-500" />
                    <StatBox label="Active Node" value="Global-V1" icon={<Globe className="h-4 w-4" />} color="text-blue-500" />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Live System Log */}
                    <div className="lg:col-span-2 terminal-window p-4 bg-black/40 h-64 flex flex-col">
                      <div className="flex justify-between mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        <span>Live_System_Log</span>
                        <Clock className="h-3 w-3" />
                      </div>
                      <div className="flex-1 overflow-y-auto font-mono text-[11px] space-y-1 scrollbar-thin">
                        {logs.map((log, i) => (
                          <div key={i} className={log.includes('[ERROR]') ? 'text-destructive' : 'text-primary/80'}>
                            {`> ${log}`}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Action Box */}
                    <div className="terminal-window p-6 flex flex-col justify-center items-center text-center bg-primary/5">
                      <Upload className="h-10 w-10 text-primary mb-4 opacity-50" />
                      <h3 className="text-xs font-bold uppercase mb-2">Instant Scan</h3>
                      <p className="text-[10px] text-muted-foreground mb-4 uppercase leading-relaxed">No login required. Start a new code audit session.</p>
                      <Button onClick={() => setActiveTab('upload')} size="sm" className="w-full text-[10px] h-10 font-bold tracking-widest uppercase">
                        Open Scanner
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'upload' && (
                <div className="h-full flex flex-col items-center justify-center">
                  <div className="terminal-window p-12 w-full max-w-xl text-center space-y-8 bg-primary/5">
                    <Upload className={`h-16 w-16 mx-auto ${isScanning ? 'animate-bounce text-primary' : 'text-muted-foreground'}`} />
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold uppercase tracking-widest">{isScanning ? 'Decrypting Source...' : 'Awaiting Payload'}</h2>
                      <input type="file" id="zip-upload" accept=".zip" className="hidden" onChange={handleFileUpload} />
                      <Button asChild className="w-full py-8 text-lg font-bold">
                        <label htmlFor="zip-upload" className="cursor-pointer uppercase">Upload Archive (.zip)</label>
                      </Button>
                      <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input type="text" placeholder="github.com/user/repo" className="w-full bg-background border border-border rounded p-3 pl-10 text-xs focus:border-primary/50 focus:outline-none" />
                        <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-hover:text-primary cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'analysis' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="terminal-window p-6">
                    <div className="flex justify-between mb-4">
                      <span className="text-[10px] font-bold uppercase flex items-center gap-2"><BarChart3 className="h-3 w-3" /> Risk_Hotspots</span>
                      <span className="text-[9px] text-primary">{scanResults.length} Files Indexed</span>
                    </div>
                    <div className="grid grid-cols-10 gap-1">
                      {(scanResults.length > 0 ? scanResults : [...Array(100)]).map((res, i) => (
                        <div 
                          key={i} 
                          className="aspect-square rounded-sm transition-all duration-300 hover:scale-125 hover:z-10 cursor-help"
                          style={{ 
                            backgroundColor: `hsl(var(--primary) / ${res?.risk ? res.risk / 100 : 0.1})`,
                            boxShadow: res?.risk > 80 ? '0 0 8px hsl(var(--primary))' : 'none'
                          }}
                          title={res?.name || "System_Idle"}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div className="terminal-window p-6 h-[400px]">
                    <span className="text-[10px] font-bold uppercase flex items-center gap-2 mb-4"><AlertTriangle className="h-3 w-3" /> Threat_Radar</span>
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData.length > 0 ? radarData : initialRadarData}>
                        <PolarGrid stroke="hsl(var(--border))" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                        <RadarArea name="Security" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.4} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <footer className="border-t border-border/40 bg-card/80 py-2 h-8 flex items-center overflow-hidden z-50">
        <div className="ticker-scroll">
          {["System: Optimal", "Scan_Core: Active", `Session_Logs: ${logs.length}`, "Mode: Anonymous"].map((text, i) => (
            <div key={i} className="flex items-center gap-2 px-10">
              <span className="h-1 w-1 rounded-full bg-primary"></span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-muted-foreground">{text}</span>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
};

const NavBtn = ({ id, icon, label, active, onClick }: any) => (
  <button
    onClick={() => onClick(id)}
    className={`w-full flex items-center gap-3 p-3 rounded transition-all ${
      active === id ? 'bg-primary/10 text-primary border-l-2 border-primary' : 'text-muted-foreground hover:bg-muted/30'
    }`}
  >
    {icon}
    <span className="hidden md:block text-[10px] uppercase tracking-widest font-bold">{label}</span>
  </button>
);

const StatBox = ({ label, value, icon, color }: any) => (
  <div className="terminal-window p-4 flex flex-col bg-card/10">
    <div className={`flex items-center gap-2 mb-2 text-[10px] uppercase tracking-widest font-bold ${color}`}>
      {icon} {label}
    </div>
    <div className="text-2xl font-black tracking-tighter">{value}</div>
  </div>
);

const initialRadarData = [
  { subject: 'Injection', A: 0 }, { subject: 'Auth', A: 0 }, { subject: 'Logic', A: 0 }, { subject: 'Data Leak', A: 0 }, { subject: 'Config', A: 0 },
];