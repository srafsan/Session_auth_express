import express, { Express, Request, Response } from "express";
import mysql, { Connection } from "mysql";
import route from "../common/routeNames";

const databaseRouter: Express = express();

// Database
const db: Connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "expressDB",
});

let users: any[] = [];

databaseRouter.get(route.common.users, (req: Request, res: Response) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err: any, data: any) => {
    if (err) return res.json(err);

    // users = data
    console.log("db.ts", data);

    return res.json(data);
  });
});

export { databaseRouter, users, db };
