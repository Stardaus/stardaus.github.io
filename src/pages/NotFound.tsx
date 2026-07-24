import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 border-1 border-swiss-gray-200 dark:border-swiss-gray-800 my-8">
      <span className="font-mono text-xs uppercase tracking-widest text-swiss-accent font-bold mb-4">
        // ERROR 404
      </span>

      <h1 className="font-mono text-7xl sm:text-9xl font-extrabold tracking-tighter text-swiss-black dark:text-swiss-white mb-6">
        404
      </h1>

      <h2 className="font-sans text-xl font-bold tracking-tight text-swiss-black dark:text-swiss-white uppercase mb-2">
        PROJECT NOT FOUND
      </h2>

      <p className="max-w-md font-sans text-sm text-swiss-gray-800 dark:text-swiss-gray-300 leading-relaxed mb-8">
        The route or project case study you requested could not be located in the repository catalog.
      </p>

      <Link to="/projects">
        <Button variant="primary" size="md" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>RETURN TO PROJECTS</span>
        </Button>
      </Link>
    </div>
  );
};
