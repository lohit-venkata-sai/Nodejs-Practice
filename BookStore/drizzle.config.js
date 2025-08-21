import { defineConfig } from "drizzle-kit";
import "dotenv/config";
const config = defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./models/index.js",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});

export default config;
