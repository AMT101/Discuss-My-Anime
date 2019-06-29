const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: String,
  googleId: String,
  thumbnail: String,
  // posts:[
  //
  // ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
