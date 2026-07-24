import { ProjectPost, ProjectFrontmatterSchema } from '../types/project';

export async function getAllProjects(
  modulesRecord?: Record<string, { default: any; frontmatter: unknown }>
): Promise<ProjectPost[]> {
  const modules = modulesRecord || import.meta.glob<{ default: any; frontmatter: unknown }>(
    '/content/projects/*.mdx',
    { eager: true }
  );

  const posts: ProjectPost[] = [];

  for (const path in modules) {
    const slug = path.split('/').pop()?.replace('.mdx', '') || '';
    const rawModule = modules[path];
      
    // Validate frontmatter at build/runtime
    const parseResult = ProjectFrontmatterSchema.safeParse(rawModule.frontmatter);
    if (!parseResult.success) {
      console.error(`Invalid frontmatter in ${path}:`, parseResult.error.format());
      continue; // Skip malformed project post
    }

    posts.push({
      slug,
      frontmatter: parseResult.data,
      content: rawModule.default,
    });
  }

  // Return posts sorted descending by publication date
  return posts.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}
