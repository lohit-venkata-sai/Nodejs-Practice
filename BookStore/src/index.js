import express from "express";
import { bookRouter, authorRouter } from "../routes/index.js";
import { logTheReq } from "../middlewares/logger.js";
const app = express();

//middlewares
app.use(express.json());
app.use(logTheReq);
app.use("/books", bookRouter);
app.use("/authors", authorRouter);
app.listen(3010, () => console.log("server is up and running at PORT:3010 "));
