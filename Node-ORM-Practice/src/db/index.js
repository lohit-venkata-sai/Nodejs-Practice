import { drizzle } from "drizzle-orm/node-postgres";
import "dotenv/config";
console.log("database url ", process.env.DATABASE_URL);
const db = drizzle(process.env.DATABASE_URL);

export default db;
