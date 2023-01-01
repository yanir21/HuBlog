const { Post } = require("../models/post");

const getAllPosts = async () =>
  await Post.find({}).populate({ path: "author", select: "-_id username" });
const createPost = async (req, res) => {
  const user = req.root;
  const post = req.body.body;
  await Post.create({ ...post, author: user.id, date: new Date() });
  res.send("Post added successfully");
};

const deletePost = async (req, res) => {
  Post.findByIdAndDelete(req.params.id, (error) => {
    if (error) {
      res.send(error);
    } else {
      res.send("Post deleted successfully");
    }
  });
};

const editPost = async (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body.body, (error) => {
    if (error) {
      res.send(error);
    } else {
      res.send("Post updated successfully");
    }
  });
};

module.exports = { getAllPosts, createPost, deletePost, editPost };
