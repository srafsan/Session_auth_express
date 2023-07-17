const express = require("express");
const session = require("express-session");

const app = express();
const PORT = 3000;

const SESSION_LIFETIME = 1000 * 60 * 60 * 2; // 2 HOURS;
const SESSION_NAME = "sid";
const SESSION_SECRET = "thisIsSecret";

const users = [
  { id: 1, name: "Rahim", email: "rahim@gmail.com", password: "secret" },
  { id: 2, name: "Karim", email: "karim@gmail.com", password: "secret" },
  { id: 3, name: "Jamal", email: "jamal@gmail.com", password: "secret" },
];

app.use(
  session({
    name: SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: SESSION_LIFETIME,
      sameSite: true,
    },
  })
);

app.get("/", (req, res) => {
  const { userId } = req.session;

  res.send(`
    <h1>Welcome!</h1>
    ${
      userId
        ? `
    <a href="/home">Home</a>
    <form method="post" action="/logout">
      <button>Logout</button>
    </form>
    `
        : `
    <a href="/login">Login</a>
    <a href="/register">Register</a>`
    }
    
  `);
});

app.get("/home", (req, res) => {
  res.send(`
    <h1>Home</h1>
    <a href='/'>Main</a>
    <ul>
      <li>Name: </li>
      <li>Email: </li>
    </ul>
  `);
});

app.get("/login", (req, res) => {
  res.send(
    `<h1>Login</h1>
    <form method="post" action="/login">
      <input type="email" name="email" placeholder="Email" required/>
      <input type="password" name="password" placeholder="password" required/>
      <input type="submit" />
    </form>
    <a href="/register">Register</a>
    `
  );
});

app.get("/register", (req, res) => {
  res.send(
    `<h1>Login</h1>
      <form method="post" action="/register">
        <input name="name" placeholder="name" required/>
        <input type="email" name="email" placeholder="Email" required/>
        <input type="password" name="password" placeholder="password" required/>
        <input type="submit" />
      </form>
      <a href="/login">Login</a>
    `
  );
});

app.post("/login", (req, res) => {});

app.post("/register", (req, res) => {});

app.post("/logout", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
