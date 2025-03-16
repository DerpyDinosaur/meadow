import mkapp from "./lib/mkapp";

const app = mkapp();

app.get("/", (c) => c.json({ message: "Hello Hono!" }));

export default app;
