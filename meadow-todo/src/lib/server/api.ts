import { hcWithType } from '@meadow/api';

const client = hcWithType('http://localhost:3000', {
	init: {
		credentials: "include", // Required for sending cookies cross-origin
	}
}).api;
export default client;