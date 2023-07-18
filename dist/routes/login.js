"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRouter = void 0;
const express_1 = __importDefault(require("express"));
const sessionMiddleware_1 = require("../middleware/sessionMiddleware");
exports.loginRouter = (0, express_1.default)();
// Home page route.
exports.loginRouter.get("/", sessionMiddleware_1.redirectHome, (req, res) => {
    res.send(`<h1>Login</h1>
        <form method="post" action="/login">
          <input type="email" name="email" placeholder="Email" required/>
          <input type="password" name="password" placeholder="password" required/>
          <input type="submit" />
        </form>
        <a href="/register">Register</a>
        `);
});
