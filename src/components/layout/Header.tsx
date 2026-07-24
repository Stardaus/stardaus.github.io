import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ThemeToggle } from '../ui/ThemeToggle';

export const Header: React.FC = () => {
  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'PROJECTS', path: '/projects' },
    { label: 'ABOUT', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-swiss-white/90 dark:bg-swiss-black/90 backdrop-blur-sm swiss-border-b transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-mono text-sm font-bold tracking-tighter uppercase text-swiss-black dark:text-swiss-white hover:text-swiss-accent dark:hover:text-swiss-accent transition-colors"
        >
          FIRDAUS MUSTAR
        </Link>

        <div className="flex items-center gap-6 sm:gap-8">
          <nav className="flex items-center gap-4 sm:gap-6 font-mono text-xs uppercase tracking-wider">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `transition-colors duration-150 py-1 border-b-2 ${
                    isActive
                      ? 'border-swiss-accent text-swiss-black dark:text-swiss-white font-bold'
                      : 'border-transparent text-swiss-gray-800 dark:text-swiss-gray-300 hover:text-swiss-black dark:hover:text-swiss-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
