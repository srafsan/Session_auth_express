"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.users = exports.databaseRouter = void 0;
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const routeNames_1 = __importDefault(require("../common/routeNames"));
const databaseRouter = (0, express_1.default)();
exports.databaseRouter = databaseRouter;
// Database
const db = mysql_1.default.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "expressDB",
});
exports.db = db;
let users = [];
exports.users = users;
databaseRouter.get(routeNames_1.default.common.users, (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err)
            return res.json(err);
        // users = data
        // console.log("db.ts", data);
        return res.json(data);
    });
});
