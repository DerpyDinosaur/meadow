import { createRoute, z } from "@hono/zod-openapi";
import { json_content } from "../../lib/openapi";

const tags = ["tasks"];

export const list = createRoute({
	path: "/tasks",
	method: "get",
	tags,
	responses: {
		200: json_content(
			z.array(),
			"List of tasks"
		)
	}
})