const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var admin = require("firebase-admin");

var serviceAccount = require("../config/firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Verify a JWT
const verify = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ message: "No authorization header" });
  } else {
    const token = authorization.split(" ")[1];
    try {
      return (await admin.auth().verifyIdToken(token)).sub;
    } catch (err) {
      console.log(err);
      res.status(403).send("Unauthorized");
    }
  }
};

const getUser = (req, res) => {
  User.findById(req.root, (err, user) => res.json(user));
};
module.exports = { verify, getUser };
