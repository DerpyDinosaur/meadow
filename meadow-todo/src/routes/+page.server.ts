import { tasks } from './data.js'
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	return { tasks };
}