import { Request, Response, NextFunction } from "express";
import route from "../common/routeNames";

// Extending Session Data
declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

export const redirectLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.userId) {
    res.redirect(route.auth.login);
  } else {
    next();
  }
};

export const redirectHome = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.userId) {
    res.redirect(route.home.main);
  } else {
    next();
  }
};
