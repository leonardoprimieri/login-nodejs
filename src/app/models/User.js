const mongoose = require("mongoose");

const passportLocal = require("passport-local-mongoose");
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

userSchema.plugin(passportLocal, { usernameField: "email" });

module.exports = mongoose.model("User", userSchema);
