const { User } = require("../models/user");
const { admin } = require("./auth");

const getAllUsers = async (req, res) => await User.find({}).select("-password");

const deleteUser = async (req, res) => {
  User.findByIdAndDelete(req.params.id, (error) => {
    if (error) {
      res.send(error);
    } else {
      admin.auth().deleteUser(req.params.id);
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

const getCurrentUser = (req, res) => {
  User.findById(req.root, (err, user) => res.json(user));
};

module.exports = { getAllUsers, deleteUser, editUser, getCurrentUser };
