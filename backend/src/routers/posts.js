const { getAllPosts } = require("../services/post");

const express = require("express"),
  router = express.Router();

router.get("/", async (req, res) => {
  res.status(200).json(getAllPosts());
});
router.post("/", async (req, res) => {});
router.get("/:id", async (req, res) => {});
router.delete("/:id", async (req, res) => {});

module.exports = router;
