import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";
import registerRoutes from "./routes";

dotenv.config();

const app = express();

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  }),
);
app.use(express.json());

registerRoutes(app);

app.use("/health-check", (_req, res) => {
  res.status(200).json({ message: "OK" });
});

app.use(errorHandlerMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});