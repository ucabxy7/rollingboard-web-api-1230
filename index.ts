import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";
import registerRoutes from "./routes";
import fs from 'fs';

dotenv.config();

const app = express();

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  }),
);
app.use(express.json());
app.get('/', (req, res) => {
  // 判断是否运行在 Docker 容器内（通用方法，不需要环境变量）
  const isDocker = fs.existsSync('/.dockerenv') || fs.existsSync('/run/.containerenv');

  if (isDocker) {
    res.send('我是【Docker 容器】运行的 → 无论是本地还是云端');
  } else {
    res.send('我是【本机 npm run dev】运行的 → 不是容器');
  }
});

registerRoutes(app)

app.use("/health-check", (_req, res) => {
  res.status(200).json({ message: "OK" });
});

app.use(errorHandlerMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});