import { query, form, prerender } from "$app/server";
import client from '$lib/server/api';

export const get = prerender(async () => {
	const result = await client.tasks.$get();
	if(!result.ok){
		console.error("Unable to fetch tasks");
		return []
	}

	const tasks = await result.json();
	return tasks
})

export const patch = form(async (formData) => {
	console.log(formData)
	const text = formData.get("text");
})


// export const formTasks = form(async () => {

// })