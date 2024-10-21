CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`involvements` json NOT NULL,
	`target_url` text NOT NULL,
	`about` text NOT NULL,
	`main_thumb` json NOT NULL,
	`samples` json NOT NULL,
	`review` json NOT NULL,
	`short_desc` text NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp,
	`metadata` json DEFAULT ('{}'),
	CONSTRAINT `projects_id` PRIMARY KEY(`id`),
	CONSTRAINT `projects_slug_unique` UNIQUE(`slug`)
);