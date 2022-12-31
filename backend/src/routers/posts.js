const {
  getAllPosts,
  createPost,
  deletePost,
  editPost,
} = require("../services/post");

const express = require("express"),
  router = express.Router();

router.get("/", async (req, res) => {
  res.json(await getAllPosts());
  return res;
});
router.post("/", async (req, res) => await createPost(req, res));
router.get("/:id", async (req, res) => {});
router.delete("/:id", async (req, res) => await deletePost(req, res));
router.put("/:id", async (req, res) => await editPost(req, res));

module.exports = router;
