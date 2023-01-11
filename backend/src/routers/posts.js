const {
  getAllPosts,
  createPost,
  deletePost,
  editPost,
  addLikeToPost,
  removeLikeFromPost,
  getPostAmountByUserAndDate,
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
router.post("/:id/like", async (req, res) => await addLikeToPost(req, res));
router.delete(
  "/:id/like",
  async (req, res) => await removeLikeFromPost(req, res)
);

router.get("/amount", async (req, res) => {
  res.json(await getPostAmountByUserAndDate());
  return res;
});


module.exports = router;
