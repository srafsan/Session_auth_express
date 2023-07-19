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
app.get("/", (req: Request, res: Response) => {
  res.send(`
      <h1>Welcome Screen!!</h1>
      ${
        req.session?.userId
          ? `
      <a href=${route.home}>Home</a>
      <form method="post" action="/logout">
        <button>Logout</button>
      </form>
      `
          : `
         
      <a href=${route.login}>Login</a>
      <a href=${route.signup}>Register</a>`
      }   
    `);
});

app.use("/", authRouter);
app.use("/", homeRouter);
app.use('/', databaseRouter)

app.listen(appConfig.port, () => {
  console.log(`Example app listening on port ${appConfig.port}`);
});
