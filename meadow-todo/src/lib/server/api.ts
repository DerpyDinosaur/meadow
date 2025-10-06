import { PUBLIC_API_URI } from '$env/static/public';
import { hcWithType } from '@meadow/api';

const client = hcWithType(PUBLIC_API_URI, {
	init: {
		credentials: "include", // Required for sending cookies cross-origin
	}
}).api;
export default client;