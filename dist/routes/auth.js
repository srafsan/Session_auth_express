"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const sessionMiddleware_1 = require("../middleware/sessionMiddleware");
const db_1 = require("../models/db");
const appConfig_1 = require("../config/appConfig");
const routeNames_1 = __importDefault(require("../common/routeNames"));
const router = (0, express_1.default)();
exports.router = router;
// Login get
router.get(routeNames_1.default.login, sessionMiddleware_1.redirectHome, (req, res) => {
    console.log(db_1.users);
    res.send(`<h1>Login</h1>
        <form method="post" action="/login">
          <input type="email" name="email" placeholder="Email" required/>
          <input type="password" name="password" placeholder="password" required/>
          <input type="submit" />
        </form>
        <a href="/register">Register</a>
        `);
});
// Login post
router.post(routeNames_1.default.login, sessionMiddleware_1.redirectHome, (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        const user = db_1.users.find((user) => user.email === email && user.password === password);
        if (user) {
            req.session.userId = user.id;
            return res.redirect(routeNames_1.default.home);
        }
    }
    res.redirect(routeNames_1.default.login);
});
// Registration get
router.get(routeNames_1.default.signup, sessionMiddleware_1.redirectHome, (req, res) => {
    res.send(`<h1>Registration</h1>
      <form method="post" action="/register">
        <input name="name" placeholder="name" required/>
        <input type="email" name="email" placeholder="Email" required/>
        <input type="password" name="password" placeholder="password" required/>
        <input type="submit" />
      </form>
      <a href="/login">Login</a>
    `);
});
// Logout post
router.post("/logout", sessionMiddleware_1.redirectLogin, (req, res) => {
    const user = db_1.users.find((user) => user.id === req.session.userId);
    req.session.destroy((err) => {
        if (err) {
            return res.redirect(routeNames_1.default.home);
        }
        res.clearCookie(appConfig_1.appConfig.sessionName);
        res.redirect(routeNames_1.default.login);
    });
});
// Registration post
router.post(routeNames_1.default.signup, sessionMiddleware_1.redirectHome, (req, res) => {
    const { name, email, password } = req.body;
    if (name && email && password) {
        const exists = db_1.users.some((user) => user.email === email);
        if (!exists) {
            const user = {
                id: db_1.users.length + 1,
                name,
                email,
                password,
            };
            const sql = "INSERT INTO users(id, name, email, password) VALUES (?)";
            db_1.db.query(sql, [user], (error, result) => {
                if (error) {
                    return res.redirect(routeNames_1.default.signup);
                }
                const userId = result.insertId;
                req.session.userId = userId;
                return res.redirect(routeNames_1.default.home);
            });
        }
        else {
            // user with the same email already exists
            return res.redirect(routeNames_1.default.signup);
        }
    }
    else {
        return res.redirect(routeNames_1.default.signup);
    }
});
