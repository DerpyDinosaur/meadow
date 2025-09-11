import { query, form } from "$app/server";
import client from '$lib/server/api';
import { fail } from "@sveltejs/kit";

// type PatchJsonType = Parameters<typeof client.tasks[":id"]["$put"]>[0]['json'];

export const get = query(async () => {
	const result = await client.tasks.$get();
	if(!result.ok){
		console.error("Unable to fetch tasks");
		return []
	}

	const tasks = await result.json();
	return tasks
})

export const create = form(async (formData) => {
	const id = formData.get("id") as string;
})

export const patch = form(async (formData) => {
	const id = formData.get("id") as string;
	const text = formData.get("text") as string;
	const completed = formData.get("completed") === "on" ? true : false;

	if (!id || !text || completed === null){
		// fail(400, "ID,Text: Undefined");
		console.error("ID,Text: Undefined")
		fail(400, "Shit broke")
	}

	const result = await client.tasks[":id"].$put({
		param: { id },
		json: {
			text,
			completed
		}
	})

	if(!result.ok){
		// fail(500, "Broke")
		console.error("Post failed")
		fail(400, "Request Shit broke")
	}
	await get().refresh();
})