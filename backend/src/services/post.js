const { Post } = require("../models/post");

const getAllPosts = async () =>
  await Post.find({})
    .populate({ path: "author", select: "-_id username" })
    .sort({ date: "desc" });

const createPost = async (req, res) => {
  const user = req.root;
  const post = req.body.body;
  const createdPost = await Post.create({
    ...post,
    author: user.id,
    date: new Date(),
  });
  req.io.sockets.emit("new-post", createdPost);
  res.send("Post added successfully");
};

const deletePost = async (req, res) => {
  Post.findByIdAndDelete(req.params.id, (error, post) => {
    if (error) {
      res.send(error);
    } else {
      req.io.sockets.emit("deleted-post", post);
      res.send("Post deleted successfully");
    }
  });
};

const editPost = async (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body.body, { new: true })
    .populate("author")
    .exec((error, editedPost) => {
      if (error) {
        res.send(error);
      } else {
        req.io.sockets.emit("updated-post", editedPost);
        res.send("Post updated successfully");
      }
    });
};

const addLikeToPost = async (req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: {
        upvotes: { username: req.root.username },
      },
    },
    { new: true }
  )
    .populate("author")
    .exec((error, updatedPost) => {
      if (error) {
        res.send(error);
      } else {
        req.io.sockets.emit("updated-post", updatedPost);
        res.send("Like added successfully");
      }
    });
};

const removeLikeFromPost = async (req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    {
      $pull: {
        upvotes: { username: req.root.username },
      },
    },
    { new: true }
  )
    .populate("author")
    .exec((error, updatedPost) => {
      if (error) {
        res.send(error);
      } else {
        req.io.sockets.emit("updated-post", updatedPost);
        res.send("Like removed successfully");
      }
    });
};

module.exports = {
  getAllPosts,
  createPost,
  deletePost,
  editPost,
  addLikeToPost,
  removeLikeFromPost,
};
