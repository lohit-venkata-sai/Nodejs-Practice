import db from "./db/index.js";
import dotEnv from "dotenv";
import usersTable from "../drizzle/schema.js";

dotEnv.config();
async function getAllUsers() {
  const users = await db.select().from(usersTable);
  console.log(users);
  return;
}
async function createUser({ id, name, email }) {
  await db.insert(usersTable).values({ id, name, email });
  return;
}

// await createUser({ id: 1, name: "Lohit", email: "lohit@example.com" });
await getAllUsers();
