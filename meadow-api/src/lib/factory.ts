import { OpenAPIHono } from '@hono/zod-openapi';
import { Scalar } from '@scalar/hono-api-reference';
import packageJSON from "../../package.json" with { type: "json" };
import type { MeadowApp, MeadowBindings } from './types';

export function mkRouter(): MeadowApp {
	return new OpenAPIHono<MeadowBindings>({
		strict: false,
	})
	.basePath("/api");
}

export function mkApp(): MeadowApp {
	return new OpenAPIHono<MeadowBindings>({
		strict: false,
	});
	// const app = new OpenAPIHono<MeadowBindings>({
	// 	strict: false,
	// });
	// return app;
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
			sources: [
				{ url: "/open-api", title: "Meadow" },
				{ url: "/api/auth/open-api/generate-schema", title: "Authentication" },
			]
		}),
	);

	app.get("/open-api", (c) =>
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