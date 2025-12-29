import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import pg from "pg";

const requiresSsl =
  process.env.ENV === "staging" || process.env.ENV === "production";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ...(requiresSsl
    ? {
        ssl: { rejectUnauthorized: false },
      }
    : undefined),
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default prisma;
