import { z } from 'zod';

export const ProjectFrontmatterSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be formatted as YYYY-MM-DD'),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  featured: z.boolean().default(false),
  coverImage: z.string().default('/og-image.png'),
  githubUrl: z.string().url('Invalid GitHub URL').optional(),
  liveUrl: z.string().url('Invalid Live URL').optional(),
});

export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatterSchema>;

export interface ProjectPost {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: any; // React.ComponentType or string
}
