CREATE TABLE `users_follows` (
	`followed_by_id` text NOT NULL,
	`following_id` text NOT NULL,
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	PRIMARY KEY(`followed_by_id`, `following_id`),
	FOREIGN KEY (`followed_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`following_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
