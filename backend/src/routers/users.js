const {
    getAllUsers,
    deleteUser,
    editUser,
  } = require("../services/user");
  
  const express = require("express"),
    router = express.Router();
  
  router.get("/", async (req, res) => {
    res.json(await getAllUsers());
    return res;
  });
  router.get("/:id", async (req, res) => {});
  router.delete("/:id", async (req, res) => await deleteUser(req, res));
  router.put("/:id", async (req, res) => await editUser(req, res));
  
  module.exports = router;
  