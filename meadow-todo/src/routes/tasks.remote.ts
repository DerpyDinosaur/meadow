import { query, form } from "$app/server";
import client from '$lib/server/api';

export const getTasks = query(async () => {
	const result = await client.tasks.$get();
	if(!result.ok){
		console.error("Unable to fetch tasks");
		return []
	}

	const tasks = await result.json();
	return tasks
})


// export const formTasks = form(async () => {

// })