const { Post } = require("../models/post");

const getAllPosts = async () => await Post.find({});

module.exports = { getAllPosts };
