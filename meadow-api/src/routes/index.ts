import { OpenAPIHono } from '@hono/zod-openapi';
import tasks from './tasks';
import type { MeadowBindings } from '../lib/types';

const app = new OpenAPIHono<MeadowBindings>()
	.route('/tasks', tasks);

export default app;