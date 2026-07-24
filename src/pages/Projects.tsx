import React, { useState, useEffect } from 'react';
import { getAllProjects } from '../content/loader';
import { ProjectPost } from '../types/project';
import { ProjectCard } from '../components/ui/ProjectCard';

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectPost[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const all = await getAllProjects();
      setProjects(all);
      setLoading(false);
    }
    load();
  }, []);

  const tags = ['ALL', ...Array.from(new Set(projects.flatMap(p => p.frontmatter.tags)))];

  const filteredProjects =
    selectedTag === 'ALL'
      ? projects
      : projects.filter(p => p.frontmatter.tags.includes(selectedTag));

  return (
    <div className="flex flex-col gap-12 pt-4">
      {/* Header section */}
      <div className="flex flex-col gap-4 swiss-border-b pb-8">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-swiss-accent font-bold">
          <span>//</span>
          <span>PROJECT ARCHIVE</span>
        </div>
        <h1 className="font-sans text-4xl sm:text-5xl font-extrabold tracking-tight text-swiss-black dark:text-swiss-white">
          ALL CASE STUDIES & PROJECTS
        </h1>
        <p className="max-w-2xl font-sans text-base text-swiss-gray-800 dark:text-swiss-gray-300">
          A comprehensive record of software engineering projects, design systems, and technical case studies.
        </p>
      </div>

      {/* Monospaced Tag Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase">
        <span className="text-swiss-gray-800 dark:text-swiss-gray-300 mr-2 font-bold">FILTER BY TAG:</span>
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1.5 swiss-border transition-all duration-150 active:scale-95 ${
              selectedTag === tag
                ? 'bg-swiss-black text-swiss-white border-swiss-black dark:bg-swiss-white dark:text-swiss-black dark:border-swiss-white font-bold'
                : 'bg-transparent text-swiss-black dark:text-swiss-white hover:bg-swiss-gray-100 dark:hover:bg-swiss-gray-800'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="p-12 text-center font-mono text-xs uppercase tracking-widest text-swiss-gray-800 dark:text-swiss-gray-300 swiss-border">
          LOADING CASE STUDIES...
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map(project => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center font-mono text-xs uppercase tracking-widest text-swiss-gray-800 dark:text-swiss-gray-300 swiss-border">
          NO PROJECTS FOUND FOR TAG: "{selectedTag}".
        </div>
      )}
    </div>
  );
};
