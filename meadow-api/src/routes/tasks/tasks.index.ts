import { mkroute } from "../../lib/mkapp";

import * as docs from "./tasks.docs";
import * as handlers from "./tasks.handlers";

const router = mkroute()
  .basePath('/api')
  .openapi(docs.list, handlers.list)

export default router;