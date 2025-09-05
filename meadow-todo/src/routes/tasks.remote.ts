import { query, form } from "$app/server";
import client from '$lib/server/api';

export const getTasks = query(async () => {
	const result = await client.tasks.$get()

	console.log(result)
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

	return []
})


// export const formTasks = form(async () => {

// })