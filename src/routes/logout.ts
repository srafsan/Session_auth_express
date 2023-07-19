import express, { Express, Request, Response, NextFunction } from "express";
import { redirectLogin } from "../middleware/sessionMiddleware";
import { users } from "../models/db";
import { appConfig } from "../config/appConfig";
import route from "../common/routeNames";

export const logoutRouter: Express = express();
// Home page route.
logoutRouter.post(
  route.home.main,
  redirectLogin,
  (req: Request, res: Response) => {
    const user = users.find((user) => user.id === req.session.userId);

    req.session.destroy((err) => {
      if (err) {
        return res.redirect(route.home.home);
      }

      res.clearCookie(appConfig.sessionName);
      res.redirect(route.auth.login);
    });
  }
);
