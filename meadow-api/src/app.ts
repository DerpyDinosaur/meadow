import mkapp from "./lib/mkapp";
import mkOpenAPI from "./lib/openapi";
import { regroutes } from "./routes";

const app = regroutes(mkapp());
mkOpenAPI(app);

export default app;