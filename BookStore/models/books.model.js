import { pgTable, text, uuid, varchar, index,} from "drizzle-orm/pg-core";
import authorTable from "./author.model.js";
import {sql} from 'drizzle-orm'

const BooksTable = pgTable("books", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  authorId: uuid().references(()=>authorTable.id).notNull(),
},(t)=>({
    searchTitleIndex: index("books_title_search_idx").using(
      "gin",
      sql`to_tsvector('english', ${t.title})`
    ),
  })
);

export default BooksTable;
