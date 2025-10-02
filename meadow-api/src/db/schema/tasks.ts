import type { z } from '@hono/zod-openapi';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { user } from './auth';

export const table = sqliteTable('tasks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  text: text('text').notNull(),
  completed: integer('completed', { mode: 'boolean' }).notNull().default(false),
});

export const TasksSchema = createSelectSchema(table);
export const TasksInsertSchema = createInsertSchema(table).omit({ id: true });

export type TaskType = z.infer<typeof TasksSchema>
