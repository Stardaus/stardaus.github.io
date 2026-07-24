import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { ThemeMode } from '../../types/theme';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    const sequence: ThemeMode[] = ['system', 'dark', 'light'];
    const nextIndex = (sequence.indexOf(theme) + 1) % sequence.length;
    setTheme(sequence[nextIndex]);
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4 text-swiss-accent" />;
      case 'dark':
        return <Moon className="h-4 w-4 text-swiss-accent" />;
      default:
        return <Laptop className="h-4 w-4 text-swiss-accent" />;
    }
  };

  return (
    <button
      onClick={cycleTheme}
      className="flex items-center gap-2 px-3 py-1.5 font-mono text-xs uppercase tracking-wider swiss-border hover:bg-swiss-gray-100 hover:text-swiss-black dark:hover:bg-swiss-gray-800 dark:hover:text-swiss-white transition-all duration-150 active:scale-95 swiss-focus"
      aria-label={`Current theme is ${theme}. Click to change theme.`}
    >
      {getIcon()}
      <span>THEME: {theme}</span>
    </button>
  );
};
