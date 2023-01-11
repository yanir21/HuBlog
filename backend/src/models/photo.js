const mongoose = require("mongoose");

const PhotoSchema = new mongoose.Schema({
  author: {
    type: String,
    ref: "User",
  },
  date: {
    type: Date,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: false,
  },
  tags: {
    type: [String],
    required: false,
  },
});

const Photo = mongoose.model("photo", PhotoSchema);

module.exports = { Photo };
