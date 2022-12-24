const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const { username, password } = req.body.body;
  User.findOne({ username }, (error, user) => {
    if (error) {
      res.status(500).json({ message: error });
    } else if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      bcrypt.compare(password, user.password, (error, result) => {
        if (error) {
          res.status(500).json({ message: error });
        } else if (result) {
          // Generate a JWT and send it as the response
          const token = jwt.sign(
            { sub: user.id, username: user.username },
            process.env.JWT_SECRET,
            {
              expiresIn: "1d",
            }
          );
          res.status(200).json({ token });
        } else {
          res.status(401).json({ message: "Incorrect password" });
        }
      });
    }
  });
  return res;
};

// Verify a JWT
const verify = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ message: "No authorization header" });
  } else {
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        res.status(401).json({ message: "Invalid token" });
      }
    });
  }
};

module.exports = { verify, authenticate };
