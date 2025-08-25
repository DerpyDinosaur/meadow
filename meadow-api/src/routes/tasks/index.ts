import { OpenAPIHono } from '@hono/zod-openapi';
import { get_one, get_all, post_one, put_one, delete_one } from './docs';
import { eq } from 'drizzle-orm';
import { db } from '../../db/index';
import { tasks } from '../../db/schema';
import type { MeadowBindings } from '../../lib/types';

const app = new OpenAPIHono<MeadowBindings>()
	.openapi(get_all, async (c) => {
		const result = await db.select().from(tasks.table);
		return c.json(result);
	})
	.openapi(get_one, async (c) => {
		const { id } = c.req.valid('param');
		const result = await db
			.select()
			.from(tasks.table)
			.where(eq(tasks.table.id, id));

		if (!result.length) return c.json({error: "Task not found"}, 404);
		return c.json(result);
	})
	.openapi(post_one, async (c) => {
		const data = c.req.valid('json');
		const [new_task] = await db.insert(tasks.table).values(data).returning();
		return c.json(new_task, 201);
	})
	.openapi(put_one, async (c) => {
		const { id } = c.req.valid('param');
		const data = c.req.valid('json');

		const [updated] = await db
			.update(tasks.table)
			.set(data)
			.where(eq(tasks.table.id, id))
			.returning();

		if (!updated) return c.json({ error: 'Task not found' }, 404);
		return c.json(updated);
	})
	.openapi(delete_one, async (c) => {
		const { id } = c.req.valid('param');

		const deleted = await db
			.delete(tasks.table)
			.where(eq(tasks.table.id, id))
			.returning();

		console.log(deleted)
		if (!deleted.length) return c.json({error: "Task not found"}, 404);
		return c.body(null, 204);
	})

export default app;