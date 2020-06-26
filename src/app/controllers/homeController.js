const User = require("../models/User");
module.exports = {
  async getAllUsers(req, res) {
    const users = await User.find();
    return res.render("home", { users });
  },
};
