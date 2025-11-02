import { query, form, getRequestEvent, command } from "$app/server";
import client from '$lib/server/api';
import { redirect, error } from "@sveltejs/kit";
import { z } from 'zod';

// type PatchJsonType = Parameters<typeof client.tasks[":id"]["$put"]>[0]['json'];

const TaskSchema = z.object({
	id: z.string(),
	title: z.string(),
	text: z.string(),
	completed: z.coerce.boolean<string>()
})

export const get = query(async () => {
	const { cookies } = getRequestEvent();
	const sessionToken = cookies.get("meadow.session_token");

	const result = await client.tasks.$get({}, {
		headers: {
			Cookie: `meadow.session_token=${sessionToken}`
		}
	});

	if (!result.ok) {
		console.error("Unable to fetch tasks");
		return []
	}

	const tasks = await result.json();
	return tasks
})

export const create = form(
	TaskSchema.omit({ id: true }),
	async (data) => {
		const { cookies } = getRequestEvent();
		const sessionToken = cookies.get("meadow.session_token");

		const result = await client.tasks.$post(
			{
				json: data
			},
			{
				headers: {
					Cookie: `meadow.session_token=${sessionToken}`
				}
			}
		)

		if (!result.ok) {
			console.log(result)
			error(400, "Request Broke")
		}
		await get().refresh();
		redirect(303, "/");
	}
)

export const patch = form(
	TaskSchema,
	async (data) => {
		const { cookies } = getRequestEvent();
		const sessionToken = cookies.get("meadow.session_token");

		const result = await client.tasks[":id"].$put(
			{
				param: { id: data.id },
				json: data
			},
			{
				headers: {
					Cookie: `meadow.session_token=${sessionToken}`
				}
			}
		)

		if (!result.ok) {
			console.error("Post failed")
			error(400, "Request Broke")
		}
		await get().refresh();
		redirect(303, "/");
	}
);

export const complete = command(
  TaskSchema,
  async (data) => {
    const { cookies } = getRequestEvent();
		const sessionToken = cookies.get("meadow.session_token");

		const toggle_completed = {
		  ...data,
			completed: !data.completed
		}

		console.log(toggle_completed)

		const result = await client.tasks[":id"].$put(
			{
				param: { id: data.id },
				json: toggle_completed
			},
			{
				headers: {
					Cookie: `meadow.session_token=${sessionToken}`
				}
			}
		)

		if (!result.ok) {
			console.error("Post failed")
			error(400, "Request Broke")
		}
		await get().refresh();
  }
);
