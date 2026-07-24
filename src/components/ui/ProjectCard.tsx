import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProjectPost } from '../../types/project';
import { Badge } from './Badge';
import { ArrowUpRight } from 'lucide-react';

export const ProjectCard: React.FC<{ project: ProjectPost }> = ({ project }) => {
  const { slug, frontmatter } = project;
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      to={`/projects/${slug}`}
      className="group flex flex-col justify-between swiss-border p-6 bg-swiss-white dark:bg-swiss-black hover:border-swiss-black dark:hover:border-swiss-white transition-all duration-200"
    >
      <div>
        <div className="relative aspect-[16/9] w-full overflow-hidden swiss-border mb-6 bg-swiss-gray-100 dark:bg-swiss-gray-900">
          {!imageError && frontmatter.coverImage ? (
            <img
              src={frontmatter.coverImage}
              alt={frontmatter.title}
              loading="lazy"
              onError={() => setImageError(true)}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-4 text-center font-mono text-xs uppercase tracking-widest text-swiss-gray-800 dark:text-swiss-gray-300">
              [SWISS / IMAGE]
            </div>
          )}
        </div>

        <div className="flex items-center justify-between font-mono text-xs text-swiss-gray-800 dark:text-swiss-gray-300 uppercase tracking-wider mb-2">
          <span>{frontmatter.date}</span>
          {frontmatter.featured && <Badge variant="accent">FEATURED</Badge>}
        </div>

        <h3 className="font-sans text-xl font-bold tracking-tight text-swiss-black dark:text-swiss-white group-hover:text-swiss-accent dark:group-hover:text-swiss-accent transition-colors flex items-center justify-between gap-2 mb-3">
          <span>{frontmatter.title}</span>
          <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </h3>

        <p className="font-sans text-sm text-swiss-gray-800 dark:text-swiss-gray-300 line-clamp-3 leading-relaxed mb-6">
          {frontmatter.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 pt-4 swiss-border-t">
        {frontmatter.tags.map(tag => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>
    </Link>
  );
};
