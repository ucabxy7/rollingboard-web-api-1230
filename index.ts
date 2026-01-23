import dotenv from "dotenv";
dotenv.config();
// override only overrides same name variables in .env.local
// dotenv.config({ path: ".env.local", override: true });
import cors from "cors";
import express from "express";
import prisma from "@/prisma";
import registerRoutes from "./routes";

console.log("Actual DATABASE_URL:", process.env.DATABASE_URL);

// await prisma
//   .$connect()
//   .then(() => console.log("✔ Prisma connected to database"))
//   .catch(err => console.error("❌ Prisma failed to connect:", err));

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());

// add all routes to the app
registerRoutes(app);

app.use("/health-check", (_req, res) => {
  res.status(200).json({ message: "OK" });
});

app.get("/", (_req, res) => {
  res.send("Backend is running");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
