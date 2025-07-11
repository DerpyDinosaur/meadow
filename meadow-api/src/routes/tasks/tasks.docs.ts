import { createRoute, z } from "@hono/zod-openapi";
import { json_content } from "../../lib/openapi";
import { tasksSelectSchema, tasksInsertSchema } from "../../db/tasks.schema";

const tags = ["tasks"];

export const list = createRoute({
	path: "/tasks",
	method: "get",
	tags,
	responses: {
		200: json_content(
			z.array(tasksSelectSchema),
			"List of tasks"
		)
	}
})

export const create = createRoute({
	path: "/tasks",
	method: "post",
	tags,
	request: {
		body: {
			content: {
				"application/json":{
					schema: tasksInsertSchema
				}
			}
		}
	},
	responses: {
		200: json_content(
			z.object({success: z.boolean()}),
			"Create a tasks"
		)
	}
})

export type TasksList = typeof list;
export type TasksCreate = typeof create;
// export type TasksFetch = typeof fetch;
// export type TasksDelete = typeof delete;