import { blob, int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const screenshots = sqliteTable("screenshots", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  data: blob().notNull(),
});
