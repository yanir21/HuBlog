const { User } = require("../models/user");

const getAllUsers = async (req, res) =>
  await User.find({})
    .select("-_id username isAdmin");

const deleteUser = async (req, res) => {
  User.findByIdAndDelete(req.params.id, (error) => {
    if (error) {
      res.send(error);
    } else {
      res.send("User deleted successfully");
    }
  });
};

const editUser = async (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body.body, (error) => {
    if (error) {
      res.send(error);
    } else {
      res.send("User updated successfully");
    }
  });
};

module.exports = { getAllUsers, createUser, deleteUser, editUser };
