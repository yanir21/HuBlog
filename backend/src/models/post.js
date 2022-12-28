const mongoose = require("mongoose");
const { UserSchema } = require("./user");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: UserSchema,
    required: true,
  },
  description: {
    type: String,
  },
});

const Post = mongoose.model("post", PostSchema);

module.exports = { Post };
