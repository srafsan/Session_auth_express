"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const databaseRouter = (0, express_1.default)();
// Database
const db = mysql_1.default.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "expressDB",
});
databaseRouter.get('/users', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err)
            return res.json(err);
        return res.json(data);
    });
});
exports.default = databaseRouter;
