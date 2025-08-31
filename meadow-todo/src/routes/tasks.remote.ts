import { query, form } from "$app/server";
import { tasksClient } from "@meadow/api";

export const getTasks = query(async () => {
	// const result = await tasksClient[":id"].$get({
	// 	param: {
	// 		id: "1"
	// 	}
	// })
	// console.log(result)
	// const result = await client.tasks[":id"].$get({
	// 	param: {
	// 		id: "1"
	// 	}
	// })

	return ["Heading", "Heading", "Heading", "Heading", "Heading", "Heading", "Heading","Heading", "Heading", "Heading", "Heading", "Heading", "Heading", "Heading", "Heading", "Heading", "Heading", "Heading","Heading", "Heading", "Heading", "Heading"]
})


// export const formTasks = form(async () => {

// })