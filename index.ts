import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import prisma from "@/prisma";
import registerRoutes from "./routes";

dotenv.config();
// override only overrides same name variables in .env.local
dotenv.config({ path: ".env.local", override: true });

// await prisma
//   .$connect()
//   .then(() => console.log("✔ Prisma connected to database"))
//   .catch(err => console.error("❌ Prisma failed to connect:", err));

const app = express();

app.use(cors());
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
