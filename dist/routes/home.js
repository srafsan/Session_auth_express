"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeRouter = void 0;
const express_1 = __importDefault(require("express"));
const sessionMiddleware_1 = require("../middleware/sessionMiddleware");
const db_1 = require("../models/db");
const routeNames_1 = __importDefault(require("../common/routeNames"));
exports.homeRouter = (0, express_1.default)();
// Home page route.
exports.homeRouter.get(routeNames_1.default.home.main, sessionMiddleware_1.redirectLogin, (req, res) => {
    const user = db_1.users.find((user) => user.id === req.session.userId);
    res.send(`
      <h1>Home</h1>
      <a href='/'>Main</a>
      <ul>
        <li>Name: ${user === null || user === void 0 ? void 0 : user.name}</li>
        <li>Email: ${user === null || user === void 0 ? void 0 : user.email}</li>
      </ul>
    `);
});
