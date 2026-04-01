import { createRoute, z } from "@hono/zod-openapi";
import {
  createProjectSchema,
  updateProjectSchema,
  projectResponseSchema,
} from "./models";

const tags = ["Projects"];

export const listRoute = createRoute({
  method: "get",
  path: "/",
  tags,
  summary: "List all projects",
  responses: {
    200: {
      description: "List of projects",
      content: {
        "application/json": {
          schema: z.array(projectResponseSchema),
        },
      },
    },
  },
});
export const getRoute = createRoute({
  method: "get",
  path: "/{id}",
  tags,
  summary: "Get a project by ID",
  request: {
    params: z.object({
      id: z.string().openapi({
        param: { description: "Project ID" },
        example: "1",
      }),
    }),
  },
  responses: {
    200: {
      description: "Project found",
      content: {
        "application/json": {
          schema: projectResponseSchema,
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

export const createRouteDef = createRoute({
  method: "post",
  path: "/",
  tags,
  summary: "Create a new project",
  request: {
    body: {
      description: "Project data",
      content: {
        "application/json": {
          schema: createProjectSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Project created",
      content: {
        "application/json": {
          schema: projectResponseSchema,
        },
      },
    },
  },
});

export const updateRoute = createRoute({
  method: "patch",
  path: "/{id}",
  tags,
  summary: "Update a project",
  request: {
    params: z.object({
      id: z.string().openapi({
        param: { description: "Project ID" },
        example: "1",
      }),
    }),
    body: {
      description: "Updated project data",
      content: {
        "application/json": {
          schema: updateProjectSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Project updated",
      content: {
        "application/json": {
          schema: projectResponseSchema,
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

export const deleteRoute = createRoute({
  method: "delete",
  path: "/{id}",
  tags,
  summary: "Delete a project",
  request: {
    params: z.object({
      id: z.string().openapi({
        param: { description: "Project ID" },
        example: "1",
      }),
    }),
  },
  responses: {
    200: {
      description: "Project deleted",
      content: {
        "application/json": {
          schema: z.object({ message: z.string() }),
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
