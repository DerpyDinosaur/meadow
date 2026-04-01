import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string().min(1).max(500),
  completed: z.boolean().optional(),
});

export const updateTodoSchema = z.object({
  title: z.string().min(1).max(500).optional(),
  completed: z.boolean().optional(),
});

export const todoResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
