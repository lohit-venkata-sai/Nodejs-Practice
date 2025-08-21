import { Router } from "express";
import {
  getAllAuthors,
  getAuthorByID,
  createAuthor,
  deleteAuthorById,
  getBooksByAuthor,
} from "../controllers/authors.controller.js";
const router = Router();
router.get("/", getAllAuthors);
router.get("/:id", getAuthorByID);
router.get("/:id/books", getBooksByAuthor);
router.post("/", createAuthor);
router.delete("/:id", deleteAuthorById);

export default router;
