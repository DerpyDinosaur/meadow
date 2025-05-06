import { describeRoute } from "hono-openapi";
import { mkroute } from "../lib/mkapp";
import { json_content } from "../lib/openapi";
import { validator as zValidator } from "hono-openapi/zod";
import { z } from 'zod'

const tags = ["index"];

const router = mkroute()
  .get(
    "/:id",
    describeRoute({
      tags,
      description: "Say hello to the user",
      responses: {
        200: json_content(
          z.object({ message: z.string() }),
          "Successful Response",
        ),
      },
    }),
    zValidator('param', z.object({ id: z.number() })),
    (c) => {
      return c.json({ message: "Hello World" });
    },
  );

export default router;
