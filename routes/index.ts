import { Express } from "express";
import userRouter from "./user.route";
import projectRouter from "./project.route";
import membershipRouter from "./membership.route";
import columnRouter from "./column.route";

const ROUTES = [userRouter, projectRouter, membershipRouter, columnRouter];

const registerRoutes = (app: Express) => {
  ROUTES.forEach(router => {
    app.use("/api", router);
  });
};
// equivalent to :
// app.use("/api", userRouter);

export default registerRoutes;
