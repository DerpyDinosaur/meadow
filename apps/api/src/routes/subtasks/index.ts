import { OpenAPIHono } from "@hono/zod-openapi";
import type { Logger } from "pino";
import { eq, and } from "drizzle-orm";
import { db } from "../../db/index.js";
import { subtasks, projects } from "../../db/schema.js";
import {
  listRoute,
  createRouteDef,
  deleteRoute,
  getRoute,
  updateRoute,
} from "./docs.js";

declare module "hono" {
  interface ContextVariableMap {
    logger: Logger;
  }
}

const app = new OpenAPIHono();

app.openapi(listRoute, (c) => {
  const logger = c.get("logger");
  const { projectId } = c.req.valid("param");
  const projectIdNum = Number(projectId);
  logger.info({ projectId: projectIdNum }, "Fetching subtasks");

  const project = db
    .select()
    .from(projects)
    .where(eq(projects.id, projectIdNum))
    .get();
  if (!project) {
    return c.json({ error: "Project not found" }, 404);
  }

  const allSubtasks = db
    .select()
    .from(subtasks)
    .where(eq(subtasks.projectId, projectIdNum))
    .all();
  return c.json(allSubtasks, 200);
});

app.openapi(getRoute, (c) => {
  const logger = c.get("logger");
  const { projectId, id } = c.req.valid("param");
  const projectIdNum = Number(projectId);
  const subtaskId = Number(id);
  logger.info({ projectId: projectIdNum, subtaskId }, "Fetching subtask");

  const subtask = db
    .select()
    .from(subtasks)
    .where(
      and(eq(subtasks.id, subtaskId), eq(subtasks.projectId, projectIdNum)),
    )
    .get();

  if (!subtask) {
    return c.json({ error: "Subtask not found" }, 404);
  }
  return c.json(subtask, 200);
});

app.openapi(createRouteDef, (c) => {
  const logger = c.get("logger");
  const { projectId } = c.req.valid("param");
  const data = c.req.valid("json");
  const projectIdNum = Number(projectId);
  logger.info(
    { projectId: projectIdNum, title: data.title },
    "Creating subtask",
  );

  const project = db
    .select()
    .from(projects)
    .where(eq(projects.id, projectIdNum))
    .get();
  if (!project) {
    return c.json({ error: "Project not found" }, 404);
  }

  const result = db
    .insert(subtasks)
    .values({
      projectId: projectIdNum,
      title: data.title,
      completed: data.completed ?? false,
    })
    .returning()
    .get();

  return c.json(result, 201);
});

app.openapi(updateRoute, (c) => {
  const logger = c.get("logger");
  const { projectId, id } = c.req.valid("param");
  const data = c.req.valid("json");
  const projectIdNum = Number(projectId);
  const subtaskId = Number(id);
  logger.info(
    { projectId: projectIdNum, subtaskId, ...data },
    "Updating subtask",
  );

  const existing = db
    .select()
    .from(subtasks)
    .where(
      and(eq(subtasks.id, subtaskId), eq(subtasks.projectId, projectIdNum)),
    )
    .get();

  if (!existing) {
    return c.json({ error: "Subtask not found" }, 404);
  }

  const result = db
    .update(subtasks)
    .set({
      ...data,
      updatedAt: new Date().toISOString(),
    })
    .where(
      and(eq(subtasks.id, subtaskId), eq(subtasks.projectId, projectIdNum)),
    )
    .returning()
    .get();

  return c.json(result, 200);
});

app.openapi(deleteRoute, (c) => {
  const logger = c.get("logger");
  const { projectId, id } = c.req.valid("param");
  const projectIdNum = Number(projectId);
  const subtaskId = Number(id);
  logger.info({ projectId: projectIdNum, subtaskId }, "Deleting subtask");

  const existing = db
    .select()
    .from(subtasks)
    .where(
      and(eq(subtasks.id, subtaskId), eq(subtasks.projectId, projectIdNum)),
    )
    .get();

  if (!existing) {
    return c.json({ error: "Subtask not found" }, 404);
  }

  db.delete(subtasks)
    .where(
      and(eq(subtasks.id, subtaskId), eq(subtasks.projectId, projectIdNum)),
    )
    .run();

  return c.json({ message: "Subtask deleted" }, 200);
});

export { app as subtasksRouter };
export type SubtasksApp = typeof app;
