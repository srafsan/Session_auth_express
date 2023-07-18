"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
const express_1 = __importDefault(require("express"));
const sessionMiddleware_1 = require("../middleware/sessionMiddleware");
exports.rootRouter = (0, express_1.default)();
// Home page route.
exports.rootRouter.get("/", sessionMiddleware_1.redirectLogin, (req, res) => {
    var _a;
    res.send(`
      <h1>Welcome Screen!!</h1>
      ${((_a = req.session) === null || _a === void 0 ? void 0 : _a.userId)
        ? `
      <a href="/home">Home</a>
      <form method="post" action="/logout">
        <button>Logout</button>
      </form>
      `
        : `
         
      <a href="/login">Login</a>
      <a href="/register">Register</a>`}
      
    `);
});
