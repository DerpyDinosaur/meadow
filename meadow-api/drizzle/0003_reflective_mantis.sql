PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(80),
	`description` text(256),
	`done` integer DEFAULT false,
	`priority` integer DEFAULT 0,
	`created` integer DEFAULT (CURRENT_TIME),
	`updated` integer
);
--> statement-breakpoint
INSERT INTO `__new_tasks`("id", "name", "description", "done", "priority", "created", "updated") SELECT "id", "name", "description", "done", "priority", "created", "updated" FROM `tasks`;--> statement-breakpoint
DROP TABLE `tasks`;--> statement-breakpoint
ALTER TABLE `__new_tasks` RENAME TO `tasks`;--> statement-breakpoint
PRAGMA foreign_keys=ON;