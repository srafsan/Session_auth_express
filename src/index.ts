import express, { Express, Request, Response } from "express";
import session from "express-session";
import bodyParser from "body-parser";
// import mysql, {Connection} from 'mysql';
import { appConfig } from "./config/appConfig";
import { router as authRouter } from "./routes/auth";
import { homeRouter } from "./routes/home";
import route from "./common/routeNames";
import databaseRouter from "./models/mysql";

const app: Express = express();

// Middlewares
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    name: appConfig.sessionName,
    secret: appConfig.sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);

// ROUTES
app.get(route.home.main, (req: Request, res: Response) => {
  res.send(`
      <h1>Welcome Screen!!</h1>
      ${
        req.session?.userId
          ? `
      <a href=${route.home.main}>Home</a>
      <form method="post" action=${route.auth.logout}>
        <button>Logout</button>
      </form>
      `
          : `    
      <a href=${route.auth.login}>Login</a>
      <a href=${route.auth.signup}>Register</a>`
      }   
    `);
});

app.use(route.home.main, authRouter);
app.use(route.home.main, homeRouter);
app.use(route.home.main, databaseRouter);

app.listen(appConfig.port, () => {
  console.log(`Example app listening on port ${appConfig.port}`);
});
