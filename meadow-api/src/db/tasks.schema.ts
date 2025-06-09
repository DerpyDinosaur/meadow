import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';

export const tasks = sqliteTable("tasks", {
	id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
	name: text({ length: 80 })
		.notNull(),
	description: text("description", { length: 256 }),
	done: integer({ mode: "boolean" })
		.notNull()
		.default(false),
	priority: integer({ mode: "number" })
		.notNull()
		.default(0),
	created: integer({ mode: "timestamp" })
		.$defaultFn(() => new Date()),
	updated: integer({ mode: "timestamp" })
		.$defaultFn(() => new Date())
		.$onUpdate(() => new Date())
})

export const tasksSelectSchema = createSelectSchema(tasks);

export const tasksInsertSchema = createInsertSchema(
	tasks
).required({
	done: true,
}).omit({
	id: true,
	created: true,
	updated: true
});

// export const tasksUpdateSchema = createUpdateSchema(tasks);
