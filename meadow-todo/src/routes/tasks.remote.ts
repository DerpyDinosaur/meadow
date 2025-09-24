import { query, form, command } from "$app/server";
import client from '$lib/server/api';
import { fail } from "@sveltejs/kit";
import { z } from 'zod';

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

export const create = form(
	z.object({
		text: z.string(),
		completed: z.coerce.boolean<string>()
	}), 
	async ({ text, completed }) => {
		if (!text) {
			console.error("Text: Undefined")
			fail(400, "Busted")
		}

		console.log(completed)

		const result = await client.tasks.$post({
			json: {
				text,
				completed: false
			}
		})

		if(!result.ok){
			console.log(result)
			fail(400, "Request Broke")
		}
		await get().refresh();
	}
)

export const patch = form(
	z.object({
		id: z.string(),
		text: z.string(),
		completed: z.coerce.boolean<string>()
	}),
	async ({ id, text, completed }) => {
		console.log(completed)
		if (!id || !text){
			// fail(400, "ID,Text: Undefined");
			console.error("ID,Text: Undefined")
			fail(400, "Busted")
		}

		const result = await client.tasks[":id"].$put({
			param: { id },
			json: {
				text,
				completed
			}
		})

		if(!result.ok){
			console.error("Post failed")
			fail(400, "Request Broke")
		}
		await get().refresh();
	}
);