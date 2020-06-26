const User = require("../models/User");
module.exports = {
  async register(req, res) {
    return res.render("create");
  },
  async registerAction(req, res) {
    const newUser = new User(req.body);
    User.register(newUser, req.body.password, (error) => {
      if (error) {
        console.log("error");
        return res.redirect("/");
      }

      return res.redirect("/user/login");
    });
  },
  login(req, res) {
    return res.render("login");
  },
  loginAction(req, res) {
    const authenticateUser = User.authenticate();

    authenticateUser(req.body.email, req.body.password, (error, result) => {
      if (!result) return res.redirect("/user/login");

      req.login(result, () => {});

      return res.redirect("/");
    });
  },
  logout(req, res) {
    req.logout();
    return res.redirect("/");
  },
  profile(req, res) {
    return res.render("profile");
  },
};
