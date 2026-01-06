import { Express } from "express";

import membershipRouter from "./membership.router";
import projectRouter from "./project.router";
import userRouter from "./user.route";

const ROUTES = [userRouter, projectRouter, membershipRouter];

const registerRoutes = (app: Express) => {
  ROUTES.forEach(router => {
    app.use("/api", router);
  });
};

export default registerRoutes;
