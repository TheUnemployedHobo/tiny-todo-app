import { relations } from "drizzle-orm"
import { boolean, foreignKey, integer, pgTable, serial, text, timestamp, unique, varchar } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  password: text("password").notNull(),
  username: varchar("username", { length: 100 }).unique().notNull(),
})

export const directories = pgTable(
  "directories",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 20 }).notNull(),
    userId: integer("user_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "fk_user_directories",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    unique("unique_user_directory").on(table.userId, table.name),
  ],
)

export const tasks = pgTable("tasks", {
  createdAt: timestamp("created_at").notNull().defaultNow(),
  deadline: timestamp("deadline").notNull(),
  description: varchar("description", { length: 100 }).default(""),
  directoryId: integer("directory_id")
    .references(() => directories.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  id: serial("id").primaryKey(),
  isCompleted: boolean("is_completed").default(false),
  isImportant: boolean("is_important").default(false),
  title: varchar("title", { length: 35 }).notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  directories: many(directories),
}))

export const directoriesRelations = relations(directories, ({ many, one }) => ({
  tasks: many(tasks),
  user: one(users, {
    fields: [directories.userId],
    references: [users.id],
  }),
}))

export const tasksRelations = relations(tasks, ({ one }) => ({
  directory: one(directories, {
    fields: [tasks.directoryId],
    references: [directories.id],
  }),
}))
