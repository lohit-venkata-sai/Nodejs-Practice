import fs from "node:fs";

const logTheReq = (req, res, next) => {
  try {
    const log = `\n ${req.method} ${req.url} [${Date.now()}] `;
    fs.appendFileSync("logger.txt", log, "utf-8");
    next();
  } catch (error) {
    res.status(500).send({ error: "internal server error" });
  }
};
export { logTheReq };
