import { createRoute, z } from '@hono/zod-openapi';
import { TasksSchema, TasksInsertSchema } from '../../db/schema/tasks';

const tags = ['tasks']

/* GET */
export const get_all = createRoute({
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
      description: 'Tasks found',
    },
  },
});

export const get_one = createRoute({
  method: 'get',
  path: '/{id}',
  tags,
  request: {
    params: z.object({
      id: z.string().openapi({
        param: { name: 'id', in: 'path' },
        type: 'integer',
        example: '1',
      }),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: TasksSchema,
        },
      },
      description: 'Task found',
    },
    404: {
      description: 'Task not found',
    },
  },
});

/* POST */
export const post_one = createRoute({
  method: 'post',
  path: '/',
  tags,
  request: {
    body: {
      content: {
        'application/json': {
          schema: TasksInsertSchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: TasksSchema,
        },
      },
      description: 'Task created',
    },
  },
});

/* PUT */
export const put_one = createRoute({
  method: 'put',
  path: '/{id}',
  tags,
  request: {
    params: z.object({
      id: z.string().openapi({
        param: { name: 'id', in: 'path' },
        type: 'integer',
        example: '1',
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: TasksInsertSchema.partial(), // Allow partial updates
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: TasksSchema,
        },
      },
      description: 'Task updated',
    },
    404: {
      description: 'Task not found',
    },
  },
});

/* DELETE */
export const delete_one = createRoute({
  method: 'delete',
  path: '/{id}',
  tags,
  request: {
    params: z.object({
      id: z.string().openapi({
        param: { name: 'id', in: 'path' },
        type: 'integer',
        example: '1',
      }),
    }),
  },
  responses: {
    204: {
      description: 'Todo deleted',
    },
    404: {
      description: 'Todo not found',
    },
  },
});