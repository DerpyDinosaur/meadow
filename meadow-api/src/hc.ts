import { z } from '@hono/zod-openapi';
import { hc } from 'hono/client';
import type { AppType } from './routes';
import type { TasksSchema } from './db/schema/tasks';

// Assign the client to a variable to calculate the type when compiling
const client = hc<AppType>('');
export type Client = typeof client;

export const hcWithType = (...args: Parameters<typeof hc>): Client => hc<AppType>(...args);

// Response Types
export type TaskType = z.infer<typeof TasksSchema>