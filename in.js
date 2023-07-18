const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

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

// Middlewares
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

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

const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    next();
  }
};

const redirectHome = (req, res, next) => {
  console.log("session request", req.sessionID);
  console.log("session request id", req.session.userId);
  if (req.session.userId) {
    res.redirect("/home");
  } else {
    next();
  }
};

// ROUTES
app.get("/", (req, res) => {
  console.log(req.session);
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

app.get("/home", redirectLogin, (req, res) => {
  console.log(
    "session user id",
    req.sessionID,
    req.session,
    req.session.userId
  );
  const user = users.find((user) => user.id === req.session.userId);

  req.sessionStore.all((err, obj) => {
    console.log(obj);
  });
  res.send(`
    <h1>Home</h1>
    <a href='/'>Main</a>
    <ul>
      <li>Name: ${user.name}</li>
      <li>Email: ${user.email}</li>
    </ul>
  `);
});

app.get("/login", redirectHome, (req, res) => {
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

app.get("/register", redirectHome, (req, res) => {
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

app.post("/login", redirectHome, (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

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

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
