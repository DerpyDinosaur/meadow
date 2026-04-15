import { OpenAPIHono } from "@hono/zod-openapi";
import type { Logger } from "pino";
import {
  listRoute,
  getRoute,
  createRouteDef,
  updateRoute,
  deleteRoute,
} from "./docs";
import { db } from "../../db";
import { todos } from "../../db/schema";
import { eq } from "drizzle-orm";

declare module "hono" {
  interface ContextVariableMap {
    logger: Logger;
  }
}

const app = new OpenAPIHono()
  .openapi(listRoute, (c) => {
    const logger = c.get("logger");
    logger.info("Fetching all todos");
    const allTodos = db.select().from(todos).all();
    return c.json({ todos: allTodos }, 200);
  })
  .openapi(getRoute, (c) => {
    const logger = c.get("logger");
    const { id } = c.req.valid("param");
    const todoId = Number(id);
    logger.info({ todoId }, "Fetching todo");

    const todo = db.select().from(todos).where(eq(todos.id, todoId)).get();
    if (!todo) {
      return c.json({ error: "Todo not found" }, 404);
    }
    return c.json(todo, 200);
  })
  .openapi(createRouteDef, (c) => {
    const logger = c.get("logger");
    const data = c.req.valid("json");
    logger.info({ title: data.title }, "Creating todo");

    const result = db
      .insert(todos)
      .values({
        title: data.title,
        completed: data.completed ?? false,
      })
      .returning()
      .get();

    return c.json(result, 201);
  })
  .openapi(updateRoute, (c) => {
    const logger = c.get("logger");
    const { id } = c.req.valid("param");
    const data = c.req.valid("json");
    const todoId = Number(id);
    logger.info({ todoId, ...data }, "Updating todo");

    const existing = db.select().from(todos).where(eq(todos.id, todoId)).get();
    if (!existing) {
      return c.json({ error: "Todo not found" }, 404);
    }

    const result = db
      .update(todos)
      .set({
        ...data,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(todos.id, todoId))
      .returning()
      .get();

    return c.json(result, 200);
  })
  .openapi(deleteRoute, (c) => {
    const logger = c.get("logger");
    const { id } = c.req.valid("param");
    const todoId = Number(id);
    logger.info({ todoId }, "Deleting todo");

    const existing = db.select().from(todos).where(eq(todos.id, todoId)).get();
    if (!existing) {
      return c.json({ error: "Todo not found" }, 404);
    }

    db.delete(todos).where(eq(todos.id, todoId)).run();
    return c.json({ message: "Todo deleted" }, 200);
  });

export { app as todosRouter };
export type TodoApp = typeof app;
