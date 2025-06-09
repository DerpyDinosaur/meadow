import type { MeadowRouteHandler } from "../../lib/types";
import type { TasksListRoute } from "./tasks.docs";

export const list: MeadowRouteHandler<TasksListRoute> = (c) => {
	return c.json({message: "hello world"})
}