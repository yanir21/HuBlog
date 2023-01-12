const { Post } = require("../models/post");
const { User } = require("../models/user");

const getAllPosts = async () =>
  await Post.find({})
    .populate({ path: "author", select: "-_id username" })
    .populate({ path: "upvotes.user", select: "-_id username" })
    .sort({ date: "desc" });

const createPost = async (req, res) => {
  const post = req.body.body;
  const createdPost = await Post.create({
    ...post,
    author: req.root,
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
        upvotes: { user: req.root },
      },
    },
    { new: true }
  )
    .populate("author")
    .populate("upvotes.user")
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
        upvotes: { user: req.root },
      },
    },
    { new: true }
  )
    .populate("author")
    .populate("upvotes.user")
    .exec((error, updatedPost) => {
      if (error) {
        res.send(error);
      } else {
        req.io.sockets.emit("updated-post", updatedPost);
        res.send("Like removed successfully");
      }
    });
};

const getPostAmountByUserAndDate = async (req, res) => {
  console.log("Enter");
 // res.send("MAMAMAMA removed successfully");
  const pipeline = [
    {
      $group: {
        _id: { userId: "$author", date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } } },
        count: { $sum: 1 }
      }
    }
  ];

  const posts = await Post.find({})
    .populate({ path: "author", select: "-_id username" })
    .populate({ path: "upvotes.user", select: "-_id username" })
    .sort({ date: "desc" }).aggregate(pipeline).toArray(function(err, result) {
      if (err) {
        res.send(error);
      } else {
        console.log();
      }
    });;

    console.log("posts: " + posts);
    res.send(posts);
};


module.exports = {
  getAllPosts,
  createPost,
  deletePost,
  editPost,
  addLikeToPost,
  removeLikeFromPost,
  getPostAmountByUserAndDate
};
