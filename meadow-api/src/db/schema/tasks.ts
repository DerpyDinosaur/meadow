import { z } from '@hono/zod-openapi'
import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { user, UserSchema } from "./auth";

export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull().references(() => user.id),
  title: text('title').notNull(),
  content: text('content').notNull(),
  completed: integer('completed', { mode: 'boolean' }).notNull().default(false),
  created: text('created').notNull().default(sql`(CURRENT_TIMESTAMP)`),
  due: text('due').notNull().default(''),
  priority: integer('priority').notNull().default(5),
});

export const TasksSchema = createSelectSchema(tasks)
  .extend({ user: UserSchema.omit({id:true,email:true,emailVerified:true,createdAt:true,updatedAt:true}) })
  .omit({ userId: true });

export const TasksInsertSchema = createInsertSchema(tasks)
  .omit({ id: true, userId: true });

export type TaskType = z.infer<typeof TasksSchema>;
export type TaskInsertType = z.infer<typeof TasksInsertSchema>;
