import { error } from "console";
import express from "express";

const app = express();
const books = [
  { id: 1, title: "Book One", author: "Author One" },
  { id: 2, title: "Book Two", author: "Author Two" },
];
//middlewares
app.use(express.json());
app.get("/books", (req, res) => {
  try {
    res.status(200).send(JSON.stringify(books));
  } catch (error) {
    console.log(error.message);
    res.status(500).send(JSON.stringify({ error: "internal server error" }));
  }
});

app.get("/books/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).send({ error: "Bad Request" });

    const book = books.find((item) => item.id === id);
    if (!book)
      res.status(404).send(JSON.stringify({ error: "Book not found" }));
    res.status(200).send(JSON.stringify(book));
  } catch (e) {
    res.status(500).send(JSON.stringify({ error: "internal server error" }));
  }
});
app.post("/books", (req, res) => {
  try {
    const { title, author } = req.body;
    if (!title || !author)
      return res
        .status(400)
        .send(JSON.stringify({ error: "both author and title are required" }));
    const id = books.length + 1;
    books.push({ id, title, author });
    return res
      .status(201)
      .send(
        JSON.stringify({ message: `book saved successfully with id : ${id}` })
      );
  } catch (error) {
    res.send(500).send(JSON.stringify({ error: error.msg }));
  }
});

app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id))
    return res.status(400).send(JSON.stringify({ error: "Bad Request" }));
  const index = books.findIndex((book) => book.id == id);
  if (index == -1)
    return res.status(404).send(JSON.stringify({ error: "id not found" }));
  books.pop(index);
  return res
    .status(201)
    .send(JSON.stringify({ message: "Book deleted successfully" }));
});
app.listen(3010, () => console.log("server is up and running at PORT:3010 "));
