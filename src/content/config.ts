import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  // Type indicates that we're loading markdown content
  type: 'content',
  // Schema defines the frontmatter fields for our blog posts
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  blog,
};