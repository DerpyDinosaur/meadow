import app from './index';
import tasks_route from './routes/tasks/index';
import { hc } from 'hono/client'

export type hcWithType = typeof app;
// export type tasksClient = typeof tasks_route;
export const tasksClient = hc<typeof tasks_route>('/tasks');