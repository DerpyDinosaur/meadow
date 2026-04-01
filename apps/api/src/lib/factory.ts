import { Scalar } from "@scalar/hono-api-reference";
import packageJSON from "../../package.json" with { type: "json" };
import type { MeadowApp } from "./types";

export function mkOpenapi(app: MeadowApp) {
  app.get(
    "/",
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
      ],
    }),
  );

  app.get("/open-api", (c) =>
    c.json(
      app.getOpenAPI31Document({
        openapi: "3.1.0",
        info: {
          version: packageJSON.version,
          title: "Todo API",
        },
      }),
    ),
  );
}
