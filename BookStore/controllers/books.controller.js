import { authorTable, bookTable } from "../models/index.js";
import { sql } from "drizzle-orm";
import db from "../db/index.js";
import { eq, ilike } from "drizzle-orm";
const getAllBooks = async (req, res) => {
  try {
    const search = req.query.search;
    if (search) {
      const books = await db
        .select()
        .from(bookTable)
        .where(
          sql`to_tsvector('english',${bookTable.title}) @@ to_tsquery('english',${search})`
        );
      return res.status(200).send(JSON.stringify(books));
    }
    const books = await db.select().from(bookTable);
    if (books.length == 0)
      return res
        .status(404)
        .send(JSON.stringify({ error: "book store is empty" }));
    return res.status(200).send(JSON.stringify(books));
  } catch (error) {
    console.log(error.message);
    res.status(500).send(JSON.stringify({ error: "internal server error" }));
  }
};
const getBookById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).send({ error: "Bad Request" });

    const book = await db
      .select()
      .from(bookTable)
      .leftJoin(authorTable, eq(bookTable.authorId, authorTable.id))
      .where(eq(bookTable.id, id));
    if (book.length == 0) {
      res.status(404).send(JSON.stringify({ error: "Book not found" }));
      return;
    }

    res.status(200).send(JSON.stringify(book));
  } catch (e) {
    res.status(500).send(JSON.stringify({ error: "internal server error" }));
  }
};
const createBook = async (req, res) => {
  try {
    const { title, description, authorId } = req.body;

    if (!title || !authorId)
      return res
        .status(400)
        .send(JSON.stringify({ error: "both author and title are required" }));
    const [{ id }] = await db
      .insert(bookTable)
      .values({ title, description, authorId })
      .returning({ id: bookTable.id });
    return res.status(201).send(
      JSON.stringify({
        message: `book saved successfully with id : ${id}`,
      })
    );
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .send(
        JSON.stringify({ error: error.message || "internal server error" })
      );
  }
};
const deleteBookById = async (req, res) => {
  const id = req.params.id;
  if (!id)
    return res.status(400).send(JSON.stringify({ error: "Bad Request" }));
  const book = await db.select().from(bookTable).where(eq(id, bookTable.id));
  if (book.length == 0)
    return res.status(404).send(JSON.stringify({ message: "Book not found" }));
  await db.delete(bookTable).where(eq(bookTable.id, id));
  return res
    .status(200)
    .send(JSON.stringify({ message: "Book deleted successfully" }));
};

export { getAllBooks, getBookById, createBook, deleteBookById };
