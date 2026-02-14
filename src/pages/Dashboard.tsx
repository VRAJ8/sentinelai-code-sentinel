import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Upload, 
  BarChart3, 
  FileSearch, 
  MessageSquare, 
  Settings,
  Home,
  AlertTriangle,
  ChevronRight,
  Github
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { Card } from '../components/ui/card';
import { Separator } from '../components/ui/separator';

type DashboardView = 'overview' | 'upload' | 'analysis' | 'chat' | 'settings';

export const Dashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<DashboardView>('overview');

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 h-screen flex flex-col border-r border-border/50 bg-card/30 backdrop-blur-sm">
        {/* Logo */}
        <div className="h-16 border-b border-border/50 flex items-center px-6">
          <Shield className="h-6 w-6 text-primary mr-2" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            SentinelAI
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <NavItem
            icon={<Home className="h-4 w-4" />}
            label="Overview"
            active={activeView === 'overview'}
            onClick={() => setActiveView('overview')}
          />
          <NavItem
            icon={<Upload className="h-4 w-4" />}
            label="Upload Code"
            active={activeView === 'upload'}
            onClick={() => setActiveView('upload')}
          />
          <NavItem
            icon={<BarChart3 className="h-4 w-4" />}
            label="Risk Analysis"
            active={activeView === 'analysis'}
            onClick={() => setActiveView('analysis')}
          />
          <NavItem
            icon={<MessageSquare className="h-4 w-4" />}
            label="AI Chat"
            active={activeView === 'chat'}
            onClick={() => setActiveView('chat')}
          />
          
          <Separator className="my-4" />
          
          <NavItem
            icon={<Settings className="h-4 w-4" />}
            label="Settings"
            active={activeView === 'settings'}
            onClick={() => setActiveView('settings')}
          />
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-border/50">
          <div className="glass-card rounded-lg p-3 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold">
              A
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">Admin User</div>
              <div className="text-xs text-muted-foreground">Pro Plan</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 h-screen flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-border/50 flex items-center justify-between px-6 backdrop-blur-sm">
          <div>
            <h1 className="text-2xl font-bold">
              {activeView === 'overview' && 'Dashboard Overview'}
              {activeView === 'upload' && 'Upload Repository'}
              {activeView === 'analysis' && 'Risk Analysis'}
              {activeView === 'chat' && 'AI Code Assistant'}
              {activeView === 'settings' && 'Settings'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {activeView === 'overview' && 'Monitor your code health in real-time'}
              {activeView === 'upload' && 'Upload code via ZIP or GitHub URL'}
              {activeView === 'analysis' && 'View bug density and vulnerability reports'}
              {activeView === 'chat' && 'Get AI-powered code improvement suggestions'}
              {activeView === 'settings' && 'Configure your SentinelAI preferences'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeView === 'overview' && <OverviewContent />}
            {activeView === 'upload' && <UploadContent />}
            {activeView === 'analysis' && <AnalysisContent />}
            {activeView === 'chat' && <ChatContent />}
            {activeView === 'settings' && <SettingsContent />}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
      active
        ? 'bg-primary/10 text-primary border border-primary/20'
        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
    }`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
    {active && <ChevronRight className="h-4 w-4 ml-auto" />}
  </button>
);

const OverviewContent: React.FC = () => (
  <div className="space-y-6">
    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <DashboardCard
        title="Code Health"
        value="87/100"
        change="+5"
        icon={<Shield className="h-5 w-5 text-primary" />}
        trend="up"
      />
      <DashboardCard
        title="Vulnerabilities"
        value="3"
        change="-2"
        icon={<AlertTriangle className="h-5 w-5 text-destructive" />}
        trend="down"
      />
      <DashboardCard
        title="Files Scanned"
        value="1,247"
        change="+124"
        icon={<FileSearch className="h-5 w-5 text-secondary" />}
        trend="up"
      />
      <DashboardCard
        title="Bug Risk Score"
        value="Low"
        change="Stable"
        icon={<BarChart3 className="h-5 w-5 text-accent" />}
        trend="neutral"
      />
    </div>

    {/* Recent Activity */}
    <Card className="glass-card p-6">
      <h2 className="text-lg font-bold mb-4">Recent Scans</h2>
      <div className="space-y-3">
        {[
          { repo: 'frontend-app', time: '2 mins ago', status: 'completed' },
          { repo: 'api-service', time: '1 hour ago', status: 'completed' },
          { repo: 'auth-module', time: '3 hours ago', status: 'completed' },
        ].map((scan, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <Github className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">{scan.repo}</div>
                <div className="text-sm text-muted-foreground">{scan.time}</div>
              </div>
            </div>
            <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              {scan.status}
            </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

const UploadContent: React.FC = () => (
  <div className="max-w-3xl mx-auto space-y-6">
    {/* Drag & Drop Zone */}
    <Card className="glass-card p-12 border-2 border-dashed border-primary/20 hover:border-primary/50 transition-all cursor-pointer breathing-border">
      <div className="text-center">
        <Upload className="h-16 w-16 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Drop your ZIP file here</h3>
        <p className="text-muted-foreground mb-4">or click to browse</p>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Select Files
        </Button>
      </div>
    </Card>

    {/* GitHub URL Input */}
    <div className="relative">
      <div className="text-center text-muted-foreground mb-4">OR</div>
      <Card className="glass-card p-6">
        <h3 className="text-lg font-bold mb-4">Import from GitHub</h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="https://github.com/username/repo"
            className="flex-1 px-4 py-2 rounded-lg bg-background border border-border/50 focus:border-primary focus:outline-none"
          />
          <Button className="neural-scanning">
            <Github className="mr-2 h-4 w-4" />
            Import
          </Button>
        </div>
      </Card>
    </div>
  </div>
);

const AnalysisContent: React.FC = () => (
  <div className="space-y-6">
    <Card className="glass-card p-6">
      <h2 className="text-lg font-bold mb-4">Bug Density Heatmap</h2>
      <div className="h-64 flex items-center justify-center text-muted-foreground border border-border/20 rounded-lg">
        Heatmap visualization will appear here
      </div>
    </Card>
    <Card className="glass-card p-6">
      <h2 className="text-lg font-bold mb-4">Vulnerability Radar</h2>
      <div className="h-64 flex items-center justify-center text-muted-foreground border border-border/20 rounded-lg">
        Radar chart will appear here
      </div>
    </Card>
  </div>
);

const ChatContent: React.FC = () => (
  <Card className="glass-card p-6 h-[calc(100vh-200px)] flex flex-col">
    <h2 className="text-lg font-bold mb-4">AI Code Assistant</h2>
    <div className="flex-1 border border-border/20 rounded-lg p-4 mb-4 overflow-y-auto">
      <p className="text-muted-foreground text-center mt-20">
        Ask me anything about your code...
      </p>
    </div>
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="How do I fix the security risk in auth.py?"
        className="flex-1 px-4 py-2 rounded-lg bg-background border border-border/50 focus:border-primary focus:outline-none"
      />
      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
        Send
      </Button>
    </div>
  </Card>
);

const SettingsContent: React.FC = () => (
  <Card className="glass-card p-6 max-w-2xl">
    <h2 className="text-lg font-bold mb-4">Settings</h2>
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Theme Preference</label>
        <p className="text-sm text-muted-foreground">Select your preferred theme from the theme switcher in the header</p>
      </div>
      <Separator />
      <div>
        <label className="text-sm font-medium mb-2 block">Notification Preferences</label>
        <p className="text-sm text-muted-foreground">Configure how you want to be notified about vulnerabilities</p>
      </div>
    </div>
  </Card>
);

const DashboardCard: React.FC<{
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'neutral';
}> = ({ title, value, change, icon, trend }) => (
  <Card className="glass-card-hover p-6">
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm text-muted-foreground">{title}</span>
      {icon}
    </div>
    <div className="text-3xl font-bold mb-2">{value}</div>
    <div className={`text-sm ${
      trend === 'up' ? 'text-accent' : 
      trend === 'down' ? 'text-destructive' : 
      'text-muted-foreground'
    }`}>
      {change} from last scan
    </div>
  </Card>
);
