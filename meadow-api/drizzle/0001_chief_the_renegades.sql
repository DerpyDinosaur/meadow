CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(80) NOT NULL,
	`description` text(256),
	`done` integer DEFAULT false NOT NULL,
	`priority` integer DEFAULT 0 NOT NULL,
	`created` integer,
	`updated` integer
);
