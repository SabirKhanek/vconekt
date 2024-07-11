ALTER TABLE `blogs` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `blogs` ADD `blog_content_slate` json DEFAULT ('[]');