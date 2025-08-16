import { mkroute } from "../lib/mkapp";
import type { MeadowOpenAPI } from "../lib/types";

import index from './index.route';
import tasks from './tasks/tasks.index';

export function regroutes(app: MeadowOpenAPI){
    return app
        .route('/', index)
        .route('/', tasks)
}

export const router = regroutes(mkroute())
export type router = typeof router;