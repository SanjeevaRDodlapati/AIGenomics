import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Dr. Sanjeeva Dodlapati'),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    readingTime: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  })
});

export const collections = { blog };