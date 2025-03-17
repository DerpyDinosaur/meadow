import type { MeadowOpenAPI } from "./types";
import packageJSON from "../../package.json";
import { apiReference } from "@scalar/hono-api-reference";
import type { ZodSchema } from "zod";
import { openAPISpecs } from "hono-openapi";
import { resolver } from "hono-openapi/zod";

export const json_content = <T extends ZodSchema>(
  schema: T,
  description: string,
) => {
  return {
    content: {
      "application/json": { schema: resolver(schema) },
    },
    description,
  };
};

export default function mkOpenAPI(app: MeadowOpenAPI) {
  app.get(
    "/openapi",
    openAPISpecs(app, {
      documentation: {
        info: {
          title: "Meadow API",
          version: packageJSON.version,
          description: "API for Meadow applications",
        },
        servers: [
          { url: "http://localhost:3000", description: "Local Server" },
          // { url: 'https://api.lonetree.xyz', description: 'Production Server' },
        ],
      },
    }),
  );

  app.get(
    "/docs",
    apiReference({
      layout: "classic",
      theme: "saturn",
      defaultHttpClient: {
        targetKey: "js",
        clientKey: "fetch",
      },
      url: "/openapi",
    }),
  );
}
