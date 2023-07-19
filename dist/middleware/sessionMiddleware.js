"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectHome = exports.redirectLogin = void 0;
const routeNames_1 = __importDefault(require("../common/routeNames"));
const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect(routeNames_1.default.auth.login);
    }
    else {
        next();
    }
};
exports.redirectLogin = redirectLogin;
const redirectHome = (req, res, next) => {
    if (req.session.userId) {
        res.redirect(routeNames_1.default.home.main);
    }
    else {
        next();
    }
};
exports.redirectHome = redirectHome;
