import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAllProjects } from '../content/loader';
import { ProjectPost } from '../types/project';
import { NotFound } from './NotFound';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ExternalLink, Github, ArrowLeft } from 'lucide-react';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<ProjectPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const all = await getAllProjects();
      const match = all.find(p => p.slug === slug);
      setProject(match || null);
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="p-12 text-center font-mono text-xs uppercase tracking-widest text-swiss-gray-800 dark:text-swiss-gray-300 swiss-border my-8">
        LOADING CASE STUDY...
      </div>
    );
  }

  if (!project) {
    return <NotFound />;
  }

  const { frontmatter, content: Content } = project;

  return (
    <article className="flex flex-col gap-12 pt-4">
      {/* Back button */}
      <div>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-swiss-gray-800 dark:text-swiss-gray-300 hover:text-swiss-accent dark:hover:text-swiss-accent transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>BACK TO ALL PROJECTS</span>
        </Link>
      </div>

      {/* Header Info */}
      <header className="flex flex-col gap-6 swiss-border-b pb-8">
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-swiss-gray-800 dark:text-swiss-gray-300">
          <span>PUBLISHED: {frontmatter.date}</span>
          {frontmatter.featured && <Badge variant="accent">FEATURED CASE STUDY</Badge>}
        </div>

        <h1 className="font-sans text-4xl sm:text-6xl font-extrabold tracking-tight text-swiss-black dark:text-swiss-white leading-tight">
          {frontmatter.title}
        </h1>

        <p className="font-sans text-lg text-swiss-gray-800 dark:text-swiss-gray-300 leading-relaxed max-w-3xl">
          {frontmatter.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {frontmatter.tags.map(tag => (
            <Badge key={tag} variant="default">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap gap-4 pt-4">
          {frontmatter.githubUrl && (
            <a href={frontmatter.githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="md" className="gap-2">
                <Github className="h-4 w-4" />
                <span>VIEW SOURCE CODE</span>
              </Button>
            </a>
          )}

          {frontmatter.liveUrl && (
            <a href={frontmatter.liveUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="md" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                <span>LIVE DEMO</span>
              </Button>
            </a>
          )}
        </div>
      </header>

      {/* Cover Image */}
      {frontmatter.coverImage && (
        <div className="relative aspect-[21/9] w-full overflow-hidden swiss-border bg-swiss-gray-100 dark:bg-swiss-gray-900">
          <img
            src={frontmatter.coverImage}
            alt={frontmatter.title}
            loading="eager"
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* MDX Body Content */}
      <section className="prose dark:prose-invert max-w-none font-sans leading-relaxed text-swiss-black dark:text-swiss-white">
        {typeof Content === 'function' ? <Content /> : Content}
      </section>
    </article>
  );
};
