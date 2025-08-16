import { mkroute } from "../../lib/mkapp";

import * as docs from "./tasks.docs";
import * as handlers from "./tasks.handlers";

const router = mkroute()
  .basePath('/api')
  .openapi(docs.list, handlers.list)
  .openapi(docs.create, handlers.create)
  // .openapi(docs.fetch, handlers.fetch)
  // .openapi(docs.delete, handlers.delete)

export default router;