import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Eye, Brain, ArrowRight, Github, Code2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ThemeSwitcher } from '../components/ThemeSwitcher';

export const LandingPage: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      
      {/* Scanline overlay */}
      <div className="scanline absolute inset-0 pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SentinelAI
            </span>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button onClick={onGetStarted} className="breathing-border bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent glitch-hover">
                Autonomous Code Review
              </span>
              <br />
              <span className="text-foreground">Powered by AI</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Predict bug risks, detect vulnerabilities, and improve code quality with AI-driven insights in real-time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="text-lg px-8 py-6 breathing-border bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              <Zap className="mr-2 h-5 w-5" />
              Start Scanning
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 glass-card-hover"
            >
              <Code2 className="mr-2 h-5 w-5" />
              View Demo
            </Button>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mt-24"
        >
          <FeatureCard
            icon={<Brain className="h-8 w-8" />}
            title="ML Risk Prediction"
            description="Predict bug density and failure hotspots using advanced machine learning models"
            color="primary"
          />
          <FeatureCard
            icon={<Eye className="h-8 w-8" />}
            title="Vulnerability Detection"
            description="Real-time security smell detection with radar visualization of risk categories"
            color="secondary"
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8" />}
            title="AI Code Chat"
            description="Get instant improvement suggestions and refactored code blocks through AI chat"
            color="accent"
          />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 container mx-auto px-4 py-16">
        <div className="glass-card rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard number="99.8%" label="Detection Rate" />
          <StatCard number="<10ms" label="Scan Speed" />
          <StatCard number="1M+" label="Lines Analyzed" />
          <StatCard number="24/7" label="Monitoring" />
        </div>
      </section>

      {/* Live Vulnerability Ticker */}
      <section className="relative z-10 border-t border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden">
        <div className="py-4 flex items-center gap-8 ticker-scroll">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="flex items-center gap-2 whitespace-nowrap">
              <span className="h-2 w-2 rounded-full bg-destructive pulse-glow"></span>
              <span className="text-sm text-muted-foreground">
                {vulnerabilities[i % vulnerabilities.length]}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'primary' | 'secondary' | 'accent';
}> = ({ icon, title, description, color }) => {
  const colorClasses = {
    primary: 'text-primary border-primary/20',
    secondary: 'text-secondary border-secondary/20',
    accent: 'text-accent border-accent/20',
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="glass-card rounded-xl p-6 border-2 hover:border-current transition-all duration-300"
    >
      <div className={`${colorClasses[color]} mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

const StatCard: React.FC<{ number: string; label: string }> = ({ number, label }) => (
  <div className="text-center">
    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
      {number}
    </div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);

const vulnerabilities = [
  'SQL Injection blocked in auth.py',
  'XSS vulnerability detected in render.js',
  'Unsafe deserialization in api.php',
  'Path traversal caught in upload.ts',
  'CSRF token missing in form.jsx',
  'Hardcoded credentials removed',
  'Buffer overflow prevented',
  'Race condition identified',
];
