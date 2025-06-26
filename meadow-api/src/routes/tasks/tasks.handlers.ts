import type { MeadowRouteHandler } from "../../lib/types";
import type { TasksListRoute } from "./tasks.docs";

import db from '../../db'
import { tasks as taskTable } from '../../db/tasks.schema'

export const list: MeadowRouteHandler<TasksListRoute> = async (c) => {
	const tasks = await db.select().from(taskTable);
	return c.json([...tasks])
}