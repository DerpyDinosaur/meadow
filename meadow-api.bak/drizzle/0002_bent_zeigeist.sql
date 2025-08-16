PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(80) NOT NULL,
	`description` text(256),
	`done` integer DEFAULT false NOT NULL,
	`priority` integer DEFAULT 0 NOT NULL,
	`created` integer DEFAULT (CURRENT_TIME) NOT NULL,
	`updated` integer
);
--> statement-breakpoint
INSERT INTO `__new_tasks`("id", "name", "description", "done", "priority", "created", "updated") SELECT "id", "name", "description", "done", "priority", "created", "updated" FROM `tasks`;--> statement-breakpoint
DROP TABLE `tasks`;--> statement-breakpoint
ALTER TABLE `__new_tasks` RENAME TO `tasks`;--> statement-breakpoint
PRAGMA foreign_keys=ON;