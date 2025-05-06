import { auth } from "../lib/auth";
import { mkroute } from "../lib/mkapp";
import { cors } from "hono/cors";

const router = mkroute()
	.use(
		"/api/auth/*", // or replace with "*" to enable cors for all routes
		cors({
			origin: ["http://localhost:3000", "http://localhost:5173"],
			allowHeaders: ["Content-Type", "Authorization"],
			allowMethods: ["POST", "GET", "OPTIONS"],
			exposeHeaders: ["Content-Length"],
			maxAge: 600,
			credentials: true,
		}),
	)
	.on(["POST", "GET"], "/api/auth/*", (c) => {
		return auth.handler(c.req.raw);
	});

export default router;