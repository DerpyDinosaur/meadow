import { createRoute, z } from '@hono/zod-openapi';
import { TasksSchema } from '../../db/schema/tasks';

const tags = ['tasks']

export const list = createRoute({
  method: 'get',
  path: '/',
  tags,
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.array(TasksSchema),
        },
      },
      description: 'List all tasks',
    },
  },
});