import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProjects } from '../content/loader';
import { ProjectPost } from '../types/project';
import { ProjectCard } from '../components/ui/ProjectCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ArrowRight, Github, MapPin, CheckCircle2 } from 'lucide-react';

export const Home: React.FC = () => {
  const [featuredProjects, setFeaturedProjects] = useState<ProjectPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const all = await getAllProjects();
      const featured = all.filter(p => p.frontmatter.featured);
      setFeaturedProjects(featured);
      setLoading(false);
    }
    load();
  }, []);

  const coreSkills = [
    'Clinical Operations',
    'Custom App Building',
    'Local-First PWAs',
    'FastAPI',
    'React & Vite',
    'TypeScript',
    'PostgreSQL & Supabase',
    'Workflow Automation',
    'Public Health Research',
  ];

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {/* Hero Section with Profile Card */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 pb-12 swiss-border-b items-start">
        {/* Left Column: Bio & Info */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="flex flex-wrap items-center gap-4 font-mono text-xs uppercase tracking-widest text-swiss-accent font-bold">
            <span>// MOH REGISTERED PHARMACIST & SOFTWARE BUILDER</span>
            <span className="flex items-center gap-1 text-swiss-gray-800 dark:text-swiss-gray-300 font-normal">
              <MapPin className="h-3.5 w-3.5 text-swiss-accent" />
              BANTING, SELANGOR, MALAYSIA
            </span>
          </div>

          <h1 className="font-sans text-4xl sm:text-6xl lg:text-6xl font-extrabold tracking-tight text-swiss-black dark:text-swiss-white leading-none">
            MUHAMMAD FIRDAUS <br />
            BIN MUSTAR.
          </h1>

          <p className="font-sans text-lg text-swiss-gray-800 dark:text-swiss-gray-300 leading-relaxed">
            Government pharmacist with 10+ years of MOH public healthcare experience in Selangor. I design and develop practical application tools, local-first PWAs, and database solutions to solve workflow friction for clinical operations, organizations, and custom projects.
          </p>

          <div className="flex flex-wrap gap-2 py-1">
            {coreSkills.map(skill => (
              <Badge key={skill} variant="default">
                {skill}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link to="/projects">
              <Button variant="primary" size="lg" className="gap-2">
                <span>TECHNICAL PROJECTS</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Link to="/about">
              <Button variant="secondary" size="lg">
                CURRICULUM VITAE
              </Button>
            </Link>

            <a href="https://github.com/stardaus" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg" className="gap-2">
                <Github className="h-4 w-4" />
                <span>GITHUB</span>
              </Button>
            </a>
          </div>
        </div>

        {/* Right Column: Profile Picture Frame */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="swiss-border bg-swiss-white dark:bg-swiss-black p-3 flex flex-col gap-3">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-swiss-gray-800 dark:text-swiss-gray-300 border-b border-swiss-gray-200 dark:border-swiss-gray-800 pb-2 px-1">
              <span>[REF: PORTRAIT_01]</span>
              <span className="text-swiss-accent font-bold flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> VERIFIED PHARMACIST
              </span>
            </div>

            <div className="relative aspect-square w-full overflow-hidden swiss-border bg-swiss-gray-100 dark:bg-swiss-gray-900 group">
              <img
                src="/profile.jpg"
                alt="Muhammad Firdaus bin Mustar"
                className="h-full w-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-col gap-1 p-2 font-mono text-xs uppercase bg-swiss-gray-50 dark:bg-swiss-gray-900 border border-swiss-gray-200 dark:border-swiss-gray-800">
              <span className="font-bold text-swiss-black dark:text-swiss-white">
                MUHAMMAD FIRDAUS BIN MUSTAR
              </span>
              <span className="text-[11px] text-swiss-gray-800 dark:text-swiss-gray-300">
                B.PHARM (HONS) OTAGO // MOH MALAYSIA
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-xl font-bold uppercase tracking-wider text-swiss-black dark:text-swiss-white flex items-center gap-3">
            <span className="text-swiss-accent">[01]</span>
            <span>FEATURED CLINICAL & TECHNICAL PROJECTS</span>
          </h2>

          <Link
            to="/projects"
            className="font-mono text-xs uppercase tracking-wider text-swiss-gray-800 dark:text-swiss-gray-300 hover:text-swiss-accent dark:hover:text-swiss-accent transition-colors flex items-center gap-1"
          >
            <span>VIEW ALL</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="p-12 text-center font-mono text-xs uppercase tracking-widest text-swiss-gray-800 dark:text-swiss-gray-300 swiss-border">
            LOADING FEATURED PROJECTS...
          </div>
        ) : featuredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map(project => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center font-mono text-xs uppercase tracking-widest text-swiss-gray-800 dark:text-swiss-gray-300 swiss-border">
            NO FEATURED PROJECTS FOUND.
          </div>
        )}
      </section>
    </div>
  );
};
