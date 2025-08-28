import { query, form } from "$app/server";
import client from '$lib/server/api';

export const getTasks = query(async () => {
	// const result = await client.tasks[":id"].$get({
	// 	param: {
	// 		id: "1"
	// 	}
	// })

	return ["Heading", "Heading", "Heading", "Heading", "Heading", "Heading", "Heading","Heading", "Heading", "Heading", "Heading", "Heading", "Heading", "Heading", "Heading", "Heading", "Heading", "Heading","Heading", "Heading", "Heading", "Heading"]
})


// export const formTasks = form(async () => {

// })