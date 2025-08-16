import type { MeadowRouteHandler } from "../../lib/types";
import type { TasksList, TasksCreate } from "./tasks.docs";

import db from '../../db'
import { tasks as taskTable } from '../../db/schema/tasks'

export const list: MeadowRouteHandler<TasksList> = async (c) => {
	const tasks = await db.select().from(taskTable);
	return c.json([...tasks])
}

export const create: MeadowRouteHandler<TasksCreate> = async (c) => {
	const task = c.req.valid('json')
	const [inserted] = await db.insert(taskTable).values(task).returning();
	return c.json({inserted, success: true})
}