import { pgTable, integer, varchar } from "drizzle-orm/pg-core";

const user = pgTable("user", {
  id: integer().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).unique(),
});
export default user;
