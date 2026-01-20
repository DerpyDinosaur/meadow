import { eq, and } from "drizzle-orm";
import docs from "./docs";
import { db } from "../../db/index";
import { tasks as tasks_table } from "../../db/schema/tasks";
import { user as users_table } from "../../db/schema/auth";
import { mkRouter } from "../../lib/factory";

const router = mkRouter()
  .basePath("/tasks")
  .openapi(docs.get_all, async (c) => {
    const user = c.get("user");
    if (!user) {
      return c.json({ error: "Tasks not found" }, 404);
    }

    const result = await db
      .select({
        id: tasks_table.id,
        title: tasks_table.title,
        content: tasks_table.content,
        completed: tasks_table.completed,
        created: tasks_table.created,
        due: tasks_table.due,
        priority: tasks_table.priority,
        user: {
          name: users_table.name
        }
      })
      .from(tasks_table)
      .leftJoin(users_table, eq(tasks_table.userId, users_table.id))
      .where(eq(tasks_table.userId, user.id));

    return c.json(result);
  })
  .openapi(docs.get_one, async (c) => {
    const user = c.get("user");
    if (!user) {
      return c.json({ error: "Tasks not found" }, 404);
    }
    const { id } = c.req.valid("param");
    const result = await db
      .select({
        id: tasks_table.id,
        title: tasks_table.title,
        content: tasks_table.content,
        completed: tasks_table.completed,
        created: tasks_table.created,
        due: tasks_table.due,
        priority: tasks_table.priority,
        user: {
          name: users_table.name
        }
      })
      .from(tasks_table)
      .leftJoin(users_table, eq(tasks_table.userId, users_table.id))
      .where(and(eq(tasks_table.id, id), eq(tasks_table.userId, user.id)));

    if (!result.length) return c.json({ error: "Task not found" }, 404);
    return c.json(result, 200);
  })
  .openapi(docs.post_one, async (c) => {
    const user = c.get("user");
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }
    const data = c.req.valid("json");
    const task = { ...data, userId: user.id };

    const [new_task] = await db.insert(tasks_table).values(task).returning();
    return c.json(new_task, 201);
  })
  .openapi(docs.put_one, async (c) => {
    const userId = c.get("user")?.id ?? "";
    const { id } = c.req.valid("param");
    const data = c.req.valid("json");

    const [updated] = await db
      .update(tasks_table)
      .set(data)
      .where(and(eq(tasks_table.id, id), eq(tasks_table.userId, userId)))
      .returning();

    if (!updated) return c.json({ error: "Task not found" }, 404);
    return c.json(updated);
  })
  .openapi(docs.delete_one, async (c) => {
    const userId = c.get("user")?.id ?? "";
    const { id } = c.req.valid("param");

    const deleted = await db
      .delete(tasks_table)
      .where(and(eq(tasks_table.id, id), eq(tasks_table.userId, userId)))
      .returning();

    if (!deleted.length) return c.json({ error: "Task not found" }, 404);
    return c.body(null, 204);
  });

export default router;
