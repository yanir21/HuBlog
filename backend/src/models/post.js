const mongoose = require("mongoose");

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
    type: String,
    ref: "User",
  },
  content: {
    type: String,
  },
  upvotes: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      username: String,
    },
  ],
});

const Post = mongoose.model("post", PostSchema);

module.exports = { Post };
