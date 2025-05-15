import { mkroute } from "../lib/mkapp";
import type { MeadowOpenAPI } from "../lib/types";

import indexRoute from './index.route';

export function regroutes(app: MeadowOpenAPI){
    return app
        .route('/', indexRoute)
}

export const router = regroutes(mkroute())
export type router = typeof router;