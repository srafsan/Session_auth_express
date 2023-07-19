import express, { Express, Request, Response } from "express";
import session from "express-session";
import bodyParser from "body-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
// import mysql, {Connection} from 'mysql';
import prisma from "./prisma";

import { appConfig } from "./config/appConfig";
import { router as authRouter } from "./routes/auth";
import { homeRouter } from "./routes/home";
import route from "./common/routeNames";
// import databaseRouter from "./models/mysql";

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


const options = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: appConfig.appDesc || "this is title",
            version: "1.0.1"
        },
        schemas: ['http', 'https'],
        servers: [{url: `http://localhost:${appConfig.port}`}],
    },
        apis: [
            `${__dirname}/routes/auth.js`
        ],
    }

console.log(`${__dirname}`)
const swaggerSpec = swaggerJSDoc(options)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(route.home.main, authRouter);
app.use(route.home.main, homeRouter);
// app.use(route.home.main, databaseRouter);

app.listen(appConfig.port, () => {
  console.log(`Example app listening on port ${appConfig.port}`);
});
