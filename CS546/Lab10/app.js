// Setup server, session and middleware here.
import express from "express";
import session from "express-session";
import exphbs from "express-handlebars";
import configRoutes from "./routes/index.js";
const app = express();
app.use("/public", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
  session({
    name: "AuthState",
    secret: "Secret123",
    resave: false,
    saveUninitialized: false,
  })
);

// You will have the following middleware functions:

// 1. This middleware will apply to the root route / (note, a middleware applying to the root route is the same as a middleware that fires for every request) and will do one of the following:

app.use((req, res, next) => {
  const isAuthenticated = req.session && req.session.user;
  const userRole = isAuthenticated
    ? "Authenticated User"
    : "Non-Authenticated User";
  console.log(
    `[${new Date().toUTCString()}]: ${req.method} ${
      req.originalUrl
    } (${userRole})`
  );

  if (req.originalUrl === "/") {
    if (isAuthenticated && userRole === "admin") {
      res.redirect("/admin");
    } else if (isAuthenticated && userRole === "user") {
      res.redirect("/protected");
    } else {
      res.redirect("/login");
    }
  } else {
    next();
  }
});

// 2. This middleware will only be used for the GET /login route and will do one of the following: If the user is authenticated AND they have a role of admin, the middleware function will redirect them to the /admin route, if the user is authenticated AND they have a role of user, you will redirect them to the /protected route. If the user is NOT authenticated, you will allow them to get through to the GET /login route. A logged in user should never be able to access the login form.

app.use("/login", (req, res, next) => {
  if (req.method === "GET") {
    const isAuthenticated = req.session && req.session.user;
    if (isAuthenticated) {
      const userRole = req.session.user.role;
      if (userRole === "admin") {
        return res.redirect("/admin");
      } else {
        return res.redirect("/protected");
      }
    }
  }
  next();
});

//  3. This middleware will only be used for the GET /register route and will do one of the following: If the user is authenticated AND they have a role of admin, the middleware function will redirect them to the /admin route, if the user is authenticated AND they have a role of user, you will redirect them to the /protected route. If the user is NOT authenticated, you will allow them to get through to the GET /register route. A logged in user should never be able to access the registration form.

app.use("/register", (req, res, next) => {
  if (req.method === "GET") {
    const isAuthenticated = req.session && req.session.user;
    if (isAuthenticated) {
      const userRole = req.session.user.role;
      if (userRole === "admin") {
        return res.redirect("/admin");
      } else {
        return res.redirect("/protected");
      }
    }
  }
  next();
});

// 4. This middleware will only be used for the GET /protected route and will do one of the following:

// If a user is not logged in, you will redirect to the GET /login route.
// If the user is logged in, the middleware will "fall through" to the next route calling the next() callback.
// Users with both roles admin or user should be able to access the /protected route, so you simply need to make sure they are authenticated in this middleware.

app.use("/protected", (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  }
  next();
});

// 5. This middleware will only be used for the GET /admin route and will do one of the following:

// If a user is not logged in, you will redirect to the GET /login route.
// If a user is logged in, but they are not an admin user, you will redirect to /error and render a HTML error page saying that the user does not have permission to view the page, and the page must issue an HTTP status code of 403.
// If the user is logged in AND the user has a role of admin, the middleware will "fall through" to the next route calling the next() callback.
// ONLY USERS WITH A ROLE of admin SHOULD BE ABLE TO ACCESS THE /admin ROUTE!

app.use("/admin", (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  } else if (req.session.user.role !== "admin") {
    return res.status(403).render("error", {
      error: "You do not have permission to view this page",
    });
  }
  next();
});

// 6. This middleware will only be used for the GET /logout route and will do one of the following:

// 1. If a user is not logged in, you will redirect to the GET /login route.

// 2. if the user is logged in, the middleware will "fall through" to the next route calling the next() callback.

app.use("/logout", (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  }
  next();
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
