import { z } from "zod";

export const PostSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(160),
  slug: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  tags: z.array(z.string()),
  contentMarkdown: z.string(),
  status: z.enum(["published", "draft"]),
});

export type Post = z.infer<typeof PostSchema>;

export const StudyItemSchema = z.object({
  id: z.string(),
  type: z.enum(["book", "course", "specialization", "video"]),
  title: z.string().min(1),
  source: z.enum(["Coursera", "Udemy", "YouTube", "Book", "Other"]),
  url: z.string().url().optional(),
  notes: z.string().optional(),
  startedAt: z.string().optional(),
  completedAt: z.string().optional(),
  progress: z.number().min(0).max(100),
  tags: z.array(z.string()),
});

export type StudyItem = z.infer<typeof StudyItemSchema>;

export const DatabaseSchema = z.object({
  version: z.number(),
  posts: z.array(PostSchema),
  studies: z.array(StudyItemSchema),
});

export type Database = z.infer<typeof DatabaseSchema>;
