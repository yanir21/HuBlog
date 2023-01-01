const mongoose = require("mongoose");
const { UserSchema, User } = require("./user");

const PhotoSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  timestamp: {
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
