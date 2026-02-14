import React from 'react';
import { Moon, Sun, Terminal, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const themeConfig = {
  midnight: {
    name: 'Midnight Neon',
    icon: Moon,
    color: 'text-cyan-400',
  },
  matrix: {
    name: 'Monochrome Matrix',
    icon: Terminal,
    color: 'text-green-500',
  },
  solaris: {
    name: 'Solaris Light',
    icon: Sun,
    color: 'text-orange-500',
  },
  dracula: {
    name: 'Dracula Pro',
    icon: Sparkles,
    color: 'text-pink-400',
  },
};

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const CurrentIcon = themeConfig[theme].icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative group"
        >
          <CurrentIcon className={`h-5 w-5 ${themeConfig[theme].color} transition-all group-hover:scale-110`} />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-card border-border/50">
        {Object.entries(themeConfig).map(([key, config]) => {
          const Icon = config.icon;
          return (
            <DropdownMenuItem
              key={key}
              onClick={() => setTheme(key as any)}
              className={`cursor-pointer ${theme === key ? 'bg-primary/10' : ''}`}
            >
              <Icon className={`mr-2 h-4 w-4 ${config.color}`} />
              <span>{config.name}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
