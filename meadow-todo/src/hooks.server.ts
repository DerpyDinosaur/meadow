import { PUBLIC_API_URI } from '$env/static/public';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (!event.url.pathname.endsWith("/login")) {
		const session_token = event.cookies.get("meadow.session_token");
		const result = await fetch(`${PUBLIC_API_URI}/api/auth/get-session`, {
			headers:{
				Cookie: `meadow.session_token=${session_token}`
			}
		});
		const session = await result.json();

		if(!session){
			redirect(307, "/login");
		}

		event.locals.session = session.session;
		event.locals.user = session.user;
	}
	return await resolve(event);
};