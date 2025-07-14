import type { PageServerLoad } from './$types';
import client from '$lib/api-client'

export const load: PageServerLoad = async () => {
	const result = await client.api.tasks.$get()
	if(!result.ok){
		return []
	}

	const tasks = await result.json()
	return { tasks };
}