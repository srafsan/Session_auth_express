import express, { Express, Request, Response, NextFunction } from "express";
import { redirectLogin } from "../middleware/sessionMiddleware";
import { users } from "../models/db";
import route from "../common/routeNames";

export const homeRouter: Express = express();
// Home page route.
homeRouter.get(
  route.home.main,
  redirectLogin,
  (req: Request, res: Response) => {
    const user = users.find((user) => user.id === req.session.userId);
    res.send(`
      <h1>Home</h1>
      <a href='/'>Main</a>
      <ul>
        <li>Name: ${user?.name}</li>
        <li>Email: ${user?.email}</li>
      </ul>
    `);
  }
);
