import type { MeadowRouteHandler } from "../../lib/types";
import type { TasksList, TasksCreate } from "./tasks.docs";

import db from '../../db'
import { tasks as taskTable } from '../../db/tasks.schema'

export const list: MeadowRouteHandler<TasksList> = async (c) => {
	const tasks = await db.select().from(taskTable);
	return c.json([...tasks])
}

export const create: MeadowRouteHandler<TasksCreate> = async (c) => {
	db.insert(taskTable)
	return c.json({success: true})
}