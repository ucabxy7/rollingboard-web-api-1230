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

async function testConnection() {
  try {
    await pool.query("SELECT 1");
    console.log("✔ Database connected successfully");
  } catch (error) {
    console.error("❌ Failed to connect to database:", error);
  }
}

// 启动时测试一次连接，但不影响 Prisma 的懒加载特性
// testConnection();
export { pool };
export default prisma;
