import { Express } from "express";
import userRouter from "./user.route";

const ROUTES = [userRouter];

const registerRoutes = (app: Express) => {
  ROUTES.forEach(router => {
    app.use("/api", router);
  });
};
// equivalent to :
// app.use("/api", userRouter);

export default registerRoutes;
