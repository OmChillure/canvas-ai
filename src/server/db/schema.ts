// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  real,
  boolean
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `canvas-ai_${name}`);

export const user = createTable(
  "user",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    email: varchar("email", { length: 256 }).unique().primaryKey(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
);

// many-to-many relationship with user and art
export const userRelations = relations(user, ({ many }) => ({
  arts: many(art)
}))

export const art = createTable(
  "art",
  {
    id: serial("id").primaryKey(),
    userEmail: serial("user_email").notNull().references(() => user.email),
    title: varchar("title", { length: 256 }).notNull(),
    description: varchar("description", { length: 256 }),
    url: varchar("url", { length: 1024 }).notNull(),
    estimatePrice: real("estimated_price"),
    realPrice: real("real_price"),
    selfArt : boolean("self_art"), // is self_art - True or False (for estimating price)
    onSale : boolean("on_sale"), // is on sale - True or False
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    titleIndex: index("title_idx").on(example.title),
  })
);


// one-to-many relationship with artWork to user
export const artRelations = relations(art, ({ one }) => ({
  artist : one(user, {
    fields: [art.userEmail],
    references: [user.id],
  })
}))
