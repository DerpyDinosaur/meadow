import type { AppType } from "@meadow/api/routes";
import { hc } from "hono/client";

const client = hc<AppType>("");
export type Client = typeof client;

export default (...args: Parameters<typeof hc>): Client => hc<AppType>(...args);