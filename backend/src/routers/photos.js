const {
  getAllPhotos,
  createPhoto,
  deletePhoto,
  editPhoto,
  getPopularTags,
} = require("../services/photo");

const express = require("express"),
  router = express.Router();

router.get("/", async (req, res) => {
  res.json(await getAllPhotos());
  return res;
});
router.get("/tags", async (req, res) => await getPopularTags(req, res));
router.post("/", async (req, res) => await createPhoto(req, res));
router.get("/:id", async (req, res) => {});
router.delete("/:id", async (req, res) => await deletePhoto(req, res));
router.put("/:id", async (req, res) => await editPhoto(req, res));

module.exports = router;
