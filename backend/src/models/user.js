const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = { User, UserSchema };
