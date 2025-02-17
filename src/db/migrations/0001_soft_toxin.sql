CREATE TABLE `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`text` text,
	`owner_id` text NOT NULL,
	`reply_to_post_id` text,
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`reply_to_post_id`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `created_at_idx` ON `posts` (`created_at`);