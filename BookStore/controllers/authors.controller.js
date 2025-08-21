import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { authorTable, bookTable } from "../models/index.js";

const getAllAuthors = async (req, res) => {
  try {
    const authors = await db.select().from(authorTable);
    if (!authors || authors.length < 1)
      return res.status(404).send({ error: "no authors available right now" });
    return res.status(200).send(authors);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "internal server error" });
  }
};

const getAuthorByID = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const [author] = await db
      .select()
      .from(authorTable)
      .where(eq(authorTable.id, id));

    if (!author) return res.status(404).send({ error: "author not found" });
    return res.status(200).send(author);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "internal server error" });
  }
};

const createAuthor = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    if (!firstName || !lastName || !email)
      return res
        .status(400)
        .send({ error: "first name, last name, email are required fields" });
    const [{ id }] = await db
      .insert(authorTable)
      .values({ firstName, lastName, email })
      .returning({ id: authorTable.id });
    return res.status(201).send(`author created with id ${id}`);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "internal server error" });
  }
};

const deleteAuthorById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const [author] = await db
      .select()
      .from(authorTable)
      .where(eq(authorTable.id, id));

    if (!author) return res.status(404).send({ error: "author not found" });
    await db.delete(authorTable).where(eq(authorTable.id, id));
    res.status(200).send("author deleted successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "internal server error" });
  }
};

const getBooksByAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).send(JSON.stringify({ error: "Bad Request" }));
    const books = await db
      .select()
      .from(bookTable)
      .where(eq(bookTable.authorId, id));
    if (books.length == 0)
      return res
        .status(404)
        .send(JSON.stringify({ message: "Book not found" }));
    res.status(200).send(JSON.stringify(books));
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "internal server error" });
  }
};

export {
  getAllAuthors,
  getAuthorByID,
  createAuthor,
  deleteAuthorById,
  getBooksByAuthor,
};
