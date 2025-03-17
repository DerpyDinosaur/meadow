import mkapp from "./lib/mkapp";
import mkOpenAPI from "./lib/openapi";
import index from "./routes/index.route";

const app = mkapp();

const routes = [index];

mkOpenAPI(app);

routes.forEach((route) => app.route("/", route));

app.get("/version", (c) => c.json({ message: "Hello Hono!" }));

export default app;
