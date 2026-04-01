import { z } from "zod";

export const createSubtaskSchema = z.object({
  title: z.string().min(1).max(500),
  completed: z.boolean().optional(),
});

export const updateSubtaskSchema = z.object({
  title: z.string().min(1).max(500).optional(),
  completed: z.boolean().optional(),
});

export const subtaskResponseSchema = z.object({
  id: z.number(),
  projectId: z.number(),
  title: z.string(),
  completed: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
