import { OpenAPIHono } from '@hono/zod-openapi';
import { Scalar } from '@scalar/hono-api-reference';
import packageJSON from "../../package.json" with { type: "json" };
import type { MeadowApp, MeadowBindings } from './types';


export function mkRouter() {
	return new OpenAPIHono<MeadowBindings>({
		strict: false,
	});
}

export function mkApp() {
	const app = mkRouter();
	return app;
}

export function mkOpenapi(app: MeadowApp) {
	app.get("/docs",
		Scalar({
			layout: "classic",
			theme: "saturn",
			defaultHttpClient: {
				targetKey: "js",
				clientKey: "fetch",
			},
			url: "/openapi",
		}),
	);

	app.get("/openapi", (c) =>
		c.json(
			app.getOpenAPI31Document({
				openapi: '3.1.0',
				info: {
					version: packageJSON.version,
					title: 'Todo API',
				},
			})
		)
	);
}