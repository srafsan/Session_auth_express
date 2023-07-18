"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const appConfig_1 = require("./config/appConfig");
const auth_1 = require("./routes/auth");
const home_1 = require("./routes/home");
const routeNames_1 = __importDefault(require("./common/routeNames"));
const app = (0, express_1.default)();
// Middlewares
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use((0, express_session_1.default)({
    name: appConfig_1.appConfig.sessionName,
    secret: appConfig_1.appConfig.sessionSecret,
    resave: false,
    saveUninitialized: true,
}));
// ROUTES
app.get("/", (req, res) => {
    var _a;
    res.send(`
      <h1>Welcome Screen!!</h1>
      ${((_a = req.session) === null || _a === void 0 ? void 0 : _a.userId)
        ? `
      <a href=${routeNames_1.default.home}>Home</a>
      <form method="post" action="/logout">
        <button>Logout</button>
      </form>
      `
        : `
         
      <a href=${routeNames_1.default.login}>Login</a>
      <a href=${routeNames_1.default.signup}>Register</a>`}   
    `);
});
app.use("/", auth_1.router);
app.use("/", home_1.homeRouter);
app.listen(appConfig_1.appConfig.port, () => {
    console.log(`Example app listening on port ${appConfig_1.appConfig.port}`);
});
