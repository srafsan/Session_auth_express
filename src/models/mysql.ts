import express, { Express, Request, Response, NextFunction } from "express";
import mysql, { Connection } from "mysql";


const databaseRouter: Express = express()

// Database
const db: Connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "expressDB",
});

databaseRouter.get('/users', (req: Request, res: Response) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err:any, data:any)=> {
    if(err) return res.json(err)
    return res.json(data)
  })
})


export default databaseRouter;
