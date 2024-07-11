CREATE TABLE `blogs` (
	`id` int NOT NULL,
	`slug` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`blog_title` text NOT NULL,
	`blog_content` text NOT NULL,
	`blog_thumbnail` text NOT NULL,
	CONSTRAINT `blogs_id` PRIMARY KEY(`id`),
	CONSTRAINT `blogs_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`author_name` text NOT NULL,
	`author_title` text NOT NULL,
	`review` text NOT NULL,
	`cover_thumbnail` text,
	CONSTRAINT `testimonials_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `uploads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`key` text,
	`timestamp` timestamp DEFAULT (now()),
	CONSTRAINT `uploads_id` PRIMARY KEY(`id`)
);
