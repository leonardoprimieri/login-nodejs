const express = require("express");
const nunjucks = require("nunjucks");
const router = require("./routes/routes");
const mongoose = require("mongoose");
const session = require("express-session");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

mongoose.connect("mongodb://127.0.0.1:27017/loginteste", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.Promise = global.Promise;
const server = express();

server.use(express.urlencoded({ extended: true }));

server.use(express.static("public"));
server.use(
  session({
    secret: "123",
    resave: false,
    saveUninitialized: false,
  })
);

server.use(passport.initialize());
server.use(passport.session());
const User = require("./app/models/User");

server.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

server.use(express.json());
server.use(router);

server.set("view engine", "njk");

nunjucks.configure("src/app/views", {
  express: server,
  noCache: true,
});

server.listen(3000, () => {
  console.log("Server running at 3000!");
});
