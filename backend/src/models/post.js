const mongoose = require("mongoose");
const { UserSchema, User } = require("./user");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
  },
});

const Post = mongoose.model("post", PostSchema);

module.exports = { Post };
