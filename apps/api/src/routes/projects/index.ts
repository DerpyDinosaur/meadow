import { OpenAPIHono } from "@hono/zod-openapi";
import type { Logger } from "pino";
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { projects } from "../../db/schema";
import {
  listRoute,
  getRoute,
  createRouteDef,
  updateRoute,
  deleteRoute,
} from "./docs";

declare module "hono" {
  interface ContextVariableMap {
    logger: Logger;
  }
}

const app = new OpenAPIHono();

app.openapi(listRoute, (c) => {
  const logger = c.get("logger");
  logger.info("Fetching all projects");
  const allProjects = db.select().from(projects).all();
  return c.json(allProjects, 200);
});

app.openapi(getRoute, (c) => {
  const logger = c.get("logger");
  const { id } = c.req.valid("param");
  const projectId = Number(id);
  logger.info({ projectId }, "Fetching project");

  const project = db
    .select()
    .from(projects)
    .where(eq(projects.id, projectId))
    .get();
  if (!project) {
    return c.json({ error: "Project not found" }, 404);
  }
  return c.json(project, 200);
});

app.openapi(createRouteDef, (c) => {
  const logger = c.get("logger");
  const data = c.req.valid("json");
  logger.info({ title: data.title }, "Creating project");

  const result = db
    .insert(projects)
    .values({
      title: data.title,
      description: data.description ?? null,
      status: data.status ?? "todo",
      priority: data.priority ?? "medium",
      category: data.category ?? null,
      dueDate: data.dueDate ?? null,
      assignees: data.assignees ?? null,
    })
    .returning()
    .get();

  return c.json(result, 201);
});

app.openapi(updateRoute, (c) => {
  const logger = c.get("logger");
  const { id } = c.req.valid("param");
  const data = c.req.valid("json");
  const projectId = Number(id);
  logger.info({ projectId, ...data }, "Updating project");

  const existing = db
    .select()
    .from(projects)
    .where(eq(projects.id, projectId))
    .get();
  if (!existing) {
    return c.json({ error: "Project not found" }, 404);
  }

  const result = db
    .update(projects)
    .set({
      ...data,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(projects.id, projectId))
    .returning()
    .get();

  return c.json(result, 200);
});

app.openapi(deleteRoute, (c) => {
  const logger = c.get("logger");
  const { id } = c.req.valid("param");
  const projectId = Number(id);
  logger.info({ projectId }, "Deleting project");

  const existing = db
    .select()
    .from(projects)
    .where(eq(projects.id, projectId))
    .get();
  if (!existing) {
    return c.json({ error: "Project not found" }, 404);
  }

  db.delete(projects).where(eq(projects.id, projectId)).run();
  return c.json({ message: "Project deleted" }, 200);
});

export { app as projectsRouter };
export type ProjectsApp = typeof app;
