import { z } from "zod";

export const projectStatusEnum = z.enum([
  "backlog",
  "todo",
  "in-progress",
  "done",
]);
export const projectPriorityEnum = z.enum(["low", "medium", "high", "urgent"]);

export const createProjectSchema = z.object({
  title: z.string().min(1).max(500),
  description: z.string().max(5000).optional(),
  status: projectStatusEnum.optional(),
  priority: projectPriorityEnum.optional(),
  category: z.string().max(200).optional(),
  dueDate: z.iso.datetime().optional(),
  assignees: z.array(z.string()).optional(),
});

export const updateProjectSchema = z.object({
  title: z.string().min(1).max(500).optional(),
  description: z.string().max(5000).optional().nullable(),
  status: projectStatusEnum.optional(),
  priority: projectPriorityEnum.optional(),
  category: z.string().max(200).optional().nullable(),
  dueDate: z.iso.datetime().optional().nullable(),
  assignees: z.array(z.string()).optional(),
});

export const projectResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  status: z.string(),
  priority: z.string(),
  category: z.string().nullable(),
  dueDate: z.string().nullable(),
  assignees: z.array(z.string()).nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
