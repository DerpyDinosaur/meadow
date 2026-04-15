import { createRoute, z } from "@hono/zod-openapi";
import {
  createSubtaskSchema,
  updateSubtaskSchema,
  subtaskResponseSchema,
} from "./models";

const tags = ["Subtasks"];

const projectIdParam = z.object({
  projectId: z.string().openapi({
    param: { description: "Project ID" },
    example: "1",
  }),
});

export const listRoute = createRoute({
  method: "get",
  path: "/:projectId/subtasks",
  tags,
  summary: "List all subtasks for a project",
  request: {
    params: projectIdParam,
  },
  responses: {
    200: {
      description: "List of subtasks",
      content: {
        "application/json": {
          schema: z.object({ subtasks: z.array(subtaskResponseSchema) }),
        },
      },
    },
    404: {
      description: "Project not found",
      content: {
        "application/json": {
          schema: z.object({ error: z.string() }),
        },
      },
    },
  },
});

export const getRoute = createRoute({
  method: "get",
  path: "/:projectId/subtasks/:id",
  tags,
  summary: "Get a subtask by ID",
  request: {
    params: projectIdParam.extend({
      id: z.string().openapi({
        param: { description: "Subtask ID" },
        example: "1",
      }),
    }),
  },
  responses: {
    200: {
      description: "Subtask found",
      content: {
        "application/json": {
          schema: subtaskResponseSchema,
        },
      },
    },
    404: {
      description: "Subtask not found",
      content: {
        "application/json": {
          schema: z.object({ error: z.string() }),
        },
      },
    },
  },
});

export const createRouteDef = createRoute({
  method: "post",
  path: "/:projectId/subtasks",
  tags,
  summary: "Create a new subtask",
  request: {
    params: projectIdParam,
    body: {
      description: "Subtask data",
      content: {
        "application/json": {
          schema: createSubtaskSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Subtask created",
      content: {
        "application/json": {
          schema: subtaskResponseSchema,
        },
      },
    },
    404: {
      description: "Project not found",
      content: {
        "application/json": {
          schema: z.object({ error: z.string() }),
        },
      },
    },
  },
});

export const updateRoute = createRoute({
  method: "patch",
  path: "/:projectId/subtasks/:id",
  tags,
  summary: "Update a subtask",
  request: {
    params: projectIdParam.extend({
      id: z.string().openapi({
        param: { description: "Subtask ID" },
        example: "1",
      }),
    }),
    body: {
      description: "Updated subtask data",
      content: {
        "application/json": {
          schema: updateSubtaskSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Subtask updated",
      content: {
        "application/json": {
          schema: subtaskResponseSchema,
        },
      },
    },
    404: {
      description: "Subtask not found",
      content: {
        "application/json": {
          schema: z.object({ error: z.string() }),
        },
      },
    },
  },
});

export const deleteRoute = createRoute({
  method: "delete",
  path: "/:projectId/subtasks/:id",
  tags,
  summary: "Delete a subtask",
  request: {
    params: projectIdParam.extend({
      id: z.string().openapi({
        param: { description: "Subtask ID" },
        example: "1",
      }),
    }),
  },
  responses: {
    200: {
      description: "Subtask deleted",
      content: {
        "application/json": {
          schema: z.object({ message: z.string() }),
        },
      },
    },
    404: {
      description: "Subtask not found",
      content: {
        "application/json": {
          schema: z.object({ error: z.string() }),
        },
      },
    },
  },
});
