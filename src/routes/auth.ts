import express, { Express, Request, Response, NextFunction } from "express";
import { redirectHome, redirectLogin } from "../middleware/sessionMiddleware";
import { users } from "../models/db";
import { appConfig } from "../config/appConfig";
import route from "../common/routeNames";

const router: Express = express();

router.get(route.login, redirectHome, (req: Request, res: Response) => {
  res.send(
    `<h1>Login</h1>
        <form method="post" action="/login">
          <input type="email" name="email" placeholder="Email" required/>
          <input type="password" name="password" placeholder="password" required/>
          <input type="submit" />
        </form>
        <a href="/register">Register</a>
        `
  );
});

router.post(route.login, redirectHome, (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      req.session.userId = user.id;
      return res.redirect(route.home);
    }
  }

  res.redirect(route.login);
});

router.get(route.signup, redirectHome, (req: Request, res: Response) => {
  res.send(
    `<h1>Login</h1>
      <form method="post" action="/register">
        <input name="name" placeholder="name" required/>
        <input type="email" name="email" placeholder="Email" required/>
        <input type="password" name="password" placeholder="password" required/>
        <input type="submit" />
      </form>
      <a href="/login">Login</a>
    `
  );
});

router.post("/logout", redirectLogin, (req: Request, res: Response) => {
  const user = users.find((user) => user.id === req.session.userId);

  req.session.destroy((err) => {
    if (err) {
      return res.redirect(route.home);
    }

    res.clearCookie(appConfig.sessionName);
    res.redirect(route.login);
  });
});

router.post(route.signup, redirectHome, (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (name && email && password) {
    const exists = users.some((user) => user.email === email);

    if (!exists) {
      const user = {
        id: users.length + 1,
        name,
        email,
        password,
      };

      users.push(user);
      req.session.userId = user.id;
      return res.redirect(route.home);
    }
  }

  res.redirect(route.signup);
});

export { router };
