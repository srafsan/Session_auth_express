import express, { Express, Request, Response, NextFunction } from "express";
import { redirectLogin } from "../middleware/sessionMiddleware";
import { users } from "../models/db";
import { appConfig } from "../config/appConfig";

export const logoutRouter: Express = express();
// Home page route.
logoutRouter.post("/", redirectLogin, (req: Request, res: Response) => {
  const user = users.find((user) => user.id === req.session.userId);

  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/home");
    }

    res.clearCookie(appConfig.sessionName);
    res.redirect("/login");
  });
});
