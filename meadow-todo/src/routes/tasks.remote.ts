import { query, form, command, getRequestEvent } from "$app/server";
import client from '$lib/server/api';
import { fail, redirect, type RequestEvent } from "@sveltejs/kit";
import { z } from 'zod';

// type PatchJsonType = Parameters<typeof client.tasks[":id"]["$put"]>[0]['json'];

export const get = query(async () => {
	const { cookies } = getRequestEvent();
	const sessionToken = cookies.get("better-auth.session_token")
	const result = await client.tasks.$get({}, {
		headers: {
			Cookie: `better-auth.session_token=${sessionToken}`
		}
	});

	if(!result.ok){
		console.error("Unable to fetch tasks");
		return []
	}

	const tasks = await result.json();
	return tasks
})

export const create = form(
	z.object({
		title: z.string(),
		completed: z.coerce.boolean<string>()
	}), 
	async ({ title, completed }) => {
		if (!title) {
			console.error("Text: Undefined")
			fail(400, "Busted")
		}

		const result = await client.tasks.$post({
			json: {
				title,
				completed: false
			}
		})

		if(!result.ok){
			console.log(result)
			fail(400, "Request Broke")
		}
		await get().refresh();
		redirect(303, "/");
	}
)

export const patch = form(
	z.object({
		id: z.string(),
		title: z.string(),
		completed: z.coerce.boolean<string>()
	}),
	async ({ id, title, completed }) => {
		if (!id || !title){
			// fail(400, "ID,Text: Undefined");
			console.error("ID,Text: Undefined")
			fail(400, "Busted")
		}

		const result = await client.tasks[":id"].$put({
			param: { id },
			json: {
				title,
				completed
			}
		})

		if(!result.ok){
			console.error("Post failed")
			fail(400, "Request Broke")
		}
		await get().refresh();
		redirect(303, "/");
	}
);