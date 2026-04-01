import { createRoute, z } from "@hono/zod-openapi";
import {
  createTodoSchema,
  updateTodoSchema,
  todoResponseSchema,
} from "./models";

const tags = ["Todos"];

export const listRoute = createRoute({
  method: "get",
  path: "/",
  tags,
  summary: "List all todos",
  responses: {
    200: {
      description: "List of todos",
      content: {
        "application/json": {
          schema: z.array(todoResponseSchema),
        },
      },
    },
  },
});

export const getRoute = createRoute({
  method: "get",
  path: "/{id}",
  tags,
  summary: "Get a todo by ID",
  request: {
    params: z.object({
      id: z.string().openapi({
        param: { description: "Todo ID" },
        example: "1",
      }),
    }),
  },
  responses: {
    200: {
      description: "Todo found",
      content: {
        "application/json": {
          schema: todoResponseSchema,
        },
      },
    },
    404: {
      description: "Todo not found",
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
  summary: "Create a new todo",
  request: {
    body: {
      description: "Todo data",
      content: {
        "application/json": {
          schema: createTodoSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Todo created",
      content: {
        "application/json": {
          schema: todoResponseSchema,
        },
      },
    },
  },
});

export const updateRoute = createRoute({
  method: "patch",
  path: "/{id}",
  tags,
  summary: "Update a todo",
  request: {
    params: z.object({
      id: z.string().openapi({
        param: { description: "Todo ID" },
        example: "1",
      }),
    }),
    body: {
      description: "Updated todo data",
      content: {
        "application/json": {
          schema: updateTodoSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Todo updated",
      content: {
        "application/json": {
          schema: todoResponseSchema,
        },
      },
    },
    404: {
      description: "Todo not found",
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
  summary: "Delete a todo",
  request: {
    params: z.object({
      id: z.string().openapi({
        param: { description: "Todo ID" },
        example: "1",
      }),
    }),
  },
  responses: {
    200: {
      description: "Todo deleted",
      content: {
        "application/json": {
          schema: z.object({ message: z.string() }),
        },
      },
    },
    404: {
      description: "Todo not found",
      content: {
        "application/json": {
          schema: z.object({ error: z.string() }),
        },
      },
    },
  },
});
