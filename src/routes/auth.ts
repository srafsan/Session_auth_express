import { Router, Request, Response, NextFunction } from "express";
import { redirectHome, redirectLogin } from "../middleware/sessionMiddleware";
import { db, users } from "../models/db";
import { appConfig } from "../config/appConfig";
import route from "../common/routeNames";

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const router: Router = Router();


async function postUser(userData:any) {
  // ... you will write your Prisma Client queries here
  const user = await prisma.user.create({
    data: {
      email: userData.email,
      name: userData.name,
      password: userData.password
    },
  })
  console.log(user)
}

router.get('/ping', (req: Request, res: Response) => {

})

// Login get
router.get(route.auth.login, redirectHome, (req: Request, res: Response) => {
  console.log(users);
  res.send(
    `<h1>Login</h1>
        <form method="post" action=${route.auth.login}>
          <input type="email" name="email" placeholder="Email" required/>
          <input type="password" name="password" placeholder="password" required/>
          <input type="submit" />
        </form>
        <a href=${route.auth.signup}>Register</a>
        `
  );
});

// Login post
router.post(route.auth.login, redirectHome, (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      req.session.userId = user.id;
      return res.redirect(route.home.main);
    }
  }

  res.redirect(route.auth.login);
});

// Registration get
router.get(route.auth.signup, redirectHome, (req: Request, res: Response) => {
  res.send(
    `<h1>Registration</h1>
      <form method="post" action=${route.auth.signup}>
        <input name="name" placeholder="name" required/>
        <input type="email" name="email" placeholder="Email" required/>
        <input type="password" name="password" placeholder="password" required/>
        <input type="submit" />
      </form>
      <a href=${route.auth.login}>Login</a>
    `
  );
});

// Logout post
router.post(route.auth.login, redirectLogin, (req: Request, res: Response) => {
  const user = users.find((user) => user.id === req.session.userId);

  req.session.destroy((err) => {
    if (err) {
      return res.redirect(route.home.main);
    }

    res.clearCookie(appConfig.sessionName);
    res.redirect(route.auth.login);
  });
});

// Registration post
router.post(route.auth.signup, redirectHome, (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (name && email && password) {
    const userData = {
      name,
      email,
      password,
    };


  } else {
    return res.redirect(route.auth.signup);
  }
});

export { router };
