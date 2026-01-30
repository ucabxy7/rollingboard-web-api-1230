import { Express } from "express";
import userRouter from "./user.route";
import projectRouter from "./project.route";

const ROUTES = [userRouter, projectRouter];

const registerRoutes = (app: Express) => {
  ROUTES.forEach(router => {
    app.use("/api", router);
  });
};
// equivalent to :
// app.use("/api", userRouter);

export default registerRoutes;
