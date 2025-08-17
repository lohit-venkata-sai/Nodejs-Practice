import { Router } from "express";
import {
  getAllBooks,
  getBookById,
  createBook,
  deleteBookById,
} from "../controllers/books.controller.js";
const router = Router();

router.get("/", getAllBooks);

router.get("/:id", getBookById);

router.post("/", createBook);

router.delete("/:id", deleteBookById);

export default router;
