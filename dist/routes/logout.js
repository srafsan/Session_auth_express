"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutRouter = void 0;
const express_1 = __importDefault(require("express"));
const sessionMiddleware_1 = require("../middleware/sessionMiddleware");
const db_1 = require("../models/db");
const appConfig_1 = require("../config/appConfig");
exports.logoutRouter = (0, express_1.default)();
// Home page route.
exports.logoutRouter.post("/", sessionMiddleware_1.redirectLogin, (req, res) => {
    const user = db_1.users.find((user) => user.id === req.session.userId);
    req.session.destroy((err) => {
        if (err) {
            return res.redirect("/home");
        }
        res.clearCookie(appConfig_1.appConfig.sessionName);
        res.redirect("/login");
    });
});
