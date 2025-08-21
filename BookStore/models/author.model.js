import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

const author = pgTable("author", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: varchar({ length: 55 }).notNull(),
  lastName: varchar({ length: 55 }),
  email: varchar({ length: 255 }).notNull().unique(),
});

export default author;
