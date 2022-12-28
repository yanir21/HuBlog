const { Post } = require("../models/post");

const getAllPosts = () => {
  Post.find({}, (err, posts) => {
    return posts;
  });
};

module.exports = { getAllPosts };
