import { OpenAPIHono } from '@hono/zod-openapi';
import tasks from './tasks';

const app = new OpenAPIHono();

app.route('/tasks', tasks);

export default app;