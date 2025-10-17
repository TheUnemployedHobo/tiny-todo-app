CREATE TABLE "directories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(20) NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "unique_user_directory" UNIQUE("user_id","name")
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deadline" timestamp NOT NULL,
	"description" varchar(100) DEFAULT '',
	"directory_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"is_completed" boolean DEFAULT false,
	"is_important" boolean DEFAULT false,
	"title" varchar(35) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"password" text NOT NULL,
	"username" varchar(100) NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "directories" ADD CONSTRAINT "fk_user_directories" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_directory_id_directories_id_fk" FOREIGN KEY ("directory_id") REFERENCES "public"."directories"("id") ON DELETE cascade ON UPDATE cascade;