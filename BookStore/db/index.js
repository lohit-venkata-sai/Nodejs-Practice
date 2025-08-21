import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import "dotenv/config";
console.log("from env file ", process.env.DATABASE_URL);
const db = drizzle(process.env.DATABASE_URL);

export default db;
