import express from "express";
import BookRouter from "../routes/books.route.js";
import { logTheReq } from "../middlewares/logger.js";
const app = express();

//middlewares
app.use(express.json());
app.use(logTheReq);
app.use("/books", BookRouter);
app.listen(3010, () => console.log("server is up and running at PORT:3010 "));
