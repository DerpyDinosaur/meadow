import { createRoute, z } from '@hono/zod-openapi';
import { TasksSchema, TasksInsertSchema } from '../../db/schema/tasks';

const tags = ['tasks']

const idSchema = z.string()
  .regex(/^\d+$/)
  .transform(Number)
  .openapi({
    param:{ name: 'id', in: 'path', required: true },
    type: "integer",
    example: '1'
  })

/* GET */
export const get_all = createRoute({
  method: 'get',
  path: '/',
  tags,
  responses: {
    200: {
      content: {
        'application/json': {
          schema: TasksSchema.array(),
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
      id: idSchema,
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
      id: idSchema,
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
      id: idSchema,
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