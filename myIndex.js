"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3001;
const SESSION_LIFETIME = process.env.SESSION_SECRET_LIFETIME; // 2 HOURS;
const SESSION_NAME = process.env.SESSION_SECRET_NAME || "session_name";
const SESSION_SECRET = process.env.SESSION_SECRET_SECRET;
const users = [
    { id: 1, name: "Rahim", email: "rahim@gmail.com", password: "secret" },
    { id: 2, name: "Karim", email: "karim@gmail.com", password: "secret" },
    { id: 3, name: "Jamal", email: "jamal@gmail.com", password: "secret" },
];
// Middlewares
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use((0, express_session_1.default)({
    name: SESSION_NAME,
    secret: "i-love-husky",
    resave: false,
    saveUninitialized: true,
}));
const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect("/login");
    }
    else {
        next();
    }
};
const redirectHome = (req, res, next) => {
    if (req.session.userId) {
        res.redirect("/home");
    }
    else {
        next();
    }
};
// ROUTES
app.get("/", (req, res) => {
    var _a;
    res.send(`
    <h1>Welcome!</h1>
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
app.get("/home", redirectLogin, (req, res) => {
    const user = users.find((user) => user.id === req.session.userId);
    res.send(`
    <h1>Home</h1>
    <a href='/'>Main</a>
    <ul>
      <li>Name: ${user === null || user === void 0 ? void 0 : user.name}</li>
      <li>Email: ${user === null || user === void 0 ? void 0 : user.email}</li>
    </ul>
  `);
});
app.get("/login", redirectHome, (req, res) => {
    res.send(`<h1>Login</h1>
    <form method="post" action="/login">
      <input type="email" name="email" placeholder="Email" required/>
      <input type="password" name="password" placeholder="password" required/>
      <input type="submit" />
    </form>
    <a href="/register">Register</a>
    `);
});
app.get("/register", redirectHome, (req, res) => {
    res.send(`<h1>Login</h1>
      <form method="post" action="/register">
        <input name="name" placeholder="name" required/>
        <input type="email" name="email" placeholder="Email" required/>
        <input type="password" name="password" placeholder="password" required/>
        <input type="submit" />
      </form>
      <a href="/login">Login</a>
    `);
});
app.post("/login", redirectHome, (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        const user = users.find((user) => user.email === email && user.password === password);
        if (user) {
            req.session.userId = user.id;
            return res.redirect("/home");
        }
    }
    res.redirect("/login");
});
app.post("/register", redirectHome, (req, res) => {
    const { name, email, password } = req.body;
    if (name && email && password) {
        const exists = users.some((user) => user.email === email);
        if (!exists) {
            const user = {
                id: users.length + 1,
                name,
                email,
                password,
            };
            users.push(user);
            req.session.userId = user.id;
            return res.redirect("/home");
        }
    }
    res.redirect("/register");
});
app.post("/logout", redirectLogin, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect("/home");
        }
        res.clearCookie(SESSION_NAME);
        res.redirect("/login");
    });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
