import React, { useState, useEffect } from 'react';

export const Footer: React.FC = () => {
  const [utcTime, setUtcTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('en-US', {
        timeZone: 'UTC',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);
      setUtcTime(`${formatted} UTC`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="swiss-border-t bg-swiss-white dark:bg-swiss-black text-swiss-black dark:text-swiss-white transition-colors duration-200 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs uppercase tracking-wider">
        <div className="flex items-center gap-4 text-swiss-gray-800 dark:text-swiss-gray-300">
          <span>© {new Date().getFullYear()} MUHAMMAD FIRDAUS BIN MUSTAR</span>
          <span>//</span>
          <span>BANTING, SELANGOR</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-swiss-accent font-bold">{utcTime}</span>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/stardaus"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-swiss-accent transition-colors"
            >
              GITHUB
            </a>
            <a
              href="mailto:firdausmustar@gmail.com"
              className="hover:text-swiss-accent transition-colors"
            >
              EMAIL
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
