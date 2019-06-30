const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: String,
  googleId: String,
  thumbnail: String,
  posts:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Series"
    }
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
