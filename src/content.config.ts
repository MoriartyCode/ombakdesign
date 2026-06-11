import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.preprocess(val => (val === '' ? undefined : val), z.coerce.date().optional()),
			heroImage: z.preprocess(val => (val === '' ? undefined : val), z.optional(image())),
			category: z.string().optional().default('Work'),
			year: z.preprocess(val => (val === '' ? undefined : val), z.coerce.string().optional()),
			color: z.string().optional().default('#367689'),
			role: z.string().optional(),
			client: z.string().optional(),
		}),
});

export const collections = { blog };
