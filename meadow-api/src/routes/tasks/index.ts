import { OpenAPIHono } from '@hono/zod-openapi';
import { db } from '../../db/index';
import { tasks } from '../../db/schema';
import { list } from './docs';

const app = new OpenAPIHono()
	.openapi(list, async (c) => {
		const allTodos = await db.select().from(tasks.table);
		return c.json(allTodos);
	});

export default app;