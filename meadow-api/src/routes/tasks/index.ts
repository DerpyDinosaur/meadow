import { eq, and } from 'drizzle-orm';
import { get_one, get_all, post_one, put_one, delete_one } from './docs';
import { db } from '../../db/index';
import { tasks } from '../../db/schema';
import { mkRouter } from '../../lib/factory';
import { createMiddleware } from 'hono/factory';
import type { MeadowBindings } from '../../lib/types';
import { auth } from '../../lib/auth';

function session() {
	return createMiddleware<MeadowBindings>(async (c, next) => {
		const session = await auth.api.getSession({ headers: c.req.raw.headers });
		c.set("user", session?.user)
		await next()
	})
}

const router = mkRouter()
	.basePath("/tasks")
	.openapi(get_all, session(), async (c) => {
		const userId = c.get("user").id;

		let result = await db
			.select({
				id: tasks.table.id, 
				title: tasks.table.title, 
				text: tasks.table.text, 
				completed: tasks.table.completed
			})
			.from(tasks.table)
			.where(eq(tasks.table.userId, userId));

		return c.json(result);
	})
	.openapi(get_one, async (c) => {
		const userId = c.get("user").id;
		const { id } = c.req.valid('param');
		const result = await db
			.select()
			.from(tasks.table)
			.where(and(eq(tasks.table.id, id), eq(tasks.table.userId, userId)));

		if (!result.length) return c.json({ error: "Task not found" }, 404);
		return c.json(result, 200);
	})
	.openapi(post_one, async (c) => {
		const userId = c.get("user").id;
		const data = c.req.valid('json');
		const task = { ...data, userId }

		const [new_task] = await db.insert(tasks.table).values(task).returning();
		return c.json(new_task, 201);
	})
	.openapi(put_one, async (c) => {
		const userId = c.get("user").id;
		const { id } = c.req.valid('param');
		const data = c.req.valid('json');

		const [updated] = await db
			.update(tasks.table)
			.set(data)
			.where(and(eq(tasks.table.id, id), eq(tasks.table.userId, userId)))
			.returning();

		if (!updated) return c.json({ error: 'Task not found' }, 404);
		return c.json(updated);
	})
	.openapi(delete_one, async (c) => {
		const userId = c.get("user").id;
		const { id } = c.req.valid('param');

		const deleted = await db
			.delete(tasks.table)
			.where(and(eq(tasks.table.id, id), eq(tasks.table.userId, userId)))
			.returning();

		if (!deleted.length) return c.json({ error: "Task not found" }, 404);
		return c.body(null, 204);
	})

export default router;