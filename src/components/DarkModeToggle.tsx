'use client';

import * as React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DarkModeToggleProps {
  minimal?: boolean;
  className?: string;
}

export const DarkModeToggle = ({ 
  minimal = false,
  className
}: DarkModeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  if (minimal) {
    return (
      <div className={cn(
        "flex items-center justify-center p-2 rounded-md transition-all cursor-pointer hover:bg-accent relative", 
        isDark ? "ring-2 ring-blue-400/30" : "ring-2 ring-amber-400/30",
        className
      )}>
        <Switch
          checked={isDark}
          onCheckedChange={toggleTheme}
          className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-amber-500 h-[24px] w-[42px]"
          aria-label="Toggle dark mode"
        />
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "flex items-center justify-between bg-muted/80 hover:bg-muted px-3 py-3 rounded-md transition-all cursor-pointer border border-border shadow-sm",
        isDark ? "ring-1 ring-blue-400/30" : "ring-1 ring-amber-400/30", 
        className
      )} 
      onClick={toggleTheme}
    >
      <div className="flex items-center justify-center w-6 h-6">
        {isDark ? (
          <Moon className="h-5 w-5 text-blue-400 animate-fadeIn" />
        ) : (
          <Sun className="h-5 w-5 text-amber-500 animate-fadeIn" />
        )}
      </div>
      <div className="flex items-center">
        <span className={cn(
          "text-sm font-medium mr-3 transition-colors",
          isDark ? "text-blue-400" : "text-amber-500"
        )}>
          {isDark ? "تاریک" : "روشن"}
        </span>
        <Switch
          checked={isDark}
          onCheckedChange={toggleTheme}
          className={cn(
            "h-[24px] w-[42px]",
            isDark ? "bg-blue-600" : "bg-amber-500"
          )}
          aria-label="Toggle dark mode"
        />
      </div>
    </div>
  );
};

export default DarkModeToggle; 