// @/main.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Post } = require("./models/post");
const { User } = require("./models/user");
const { authenticate, verify } = require("./services/auth");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

app.use(async (req, res, next) => {
  console.log(
    "Time:",
    new Date().toISOString(),
    "Method:",
    req.method,
    "Route: ",
    req.path
  );
  if (req.path !== "/login" && req.path !== "/register") {
    req.root = await verify(req, res, next);
  }
  next();
  res.on("finish", function () {
    console.log("Response: ", res.statusCode);
  });
});

app.post("/login", authenticate);

app.post("/register", async (req, res) => {
  const newUser = new User({ ...req.body.body });
  const insertedUser = await newUser.save();
  return res.status(201).json(insertedUser);
});

const postRoutes = require("./routers/posts");
app.use("/posts", postRoutes);

const photoRoutes = require("./routers/photos");
app.use("/photos", postRoutes);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${username}:${password}@yanir-toar.0tfcqu7.mongodb.net/hublog?retryWrites=true&w=majority`
    );
    app.listen(3001, () => console.log("Server started on port 3001"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
