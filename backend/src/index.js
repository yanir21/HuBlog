// @/main.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Post } = require("./models/post");
const { User } = require("./models/user");
const socketIo = require("socket.io");
const { verify, createRegisteredUser } = require("./services/auth");
const http = require("http");
require("dotenv").config();
const PORT = 3001;

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("client connected: ", socket.id);
});

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
  req.io = io;
  req.root = await verify(req, res, next);
  if (!res.destroyed) {
    next();
  } else {
    console.log("Response: ", res.statusCode, res.statusMessage);
  }
  res.on("finish", function () {
    console.log("Response: ", res.statusCode);
  });
});

app.post("/register", createRegisteredUser);

const postRoutes = require("./routers/posts");
app.use("/posts", postRoutes);

const photoRoutes = require("./routers/photos");
app.use("/photos", photoRoutes);

const userRoutes = require("./routers/users");
const { post } = require("./routers/posts");
const { Photo } = require("./models/photo");
app.use("/users", userRoutes);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${username}:${password}@yanir-toar.0tfcqu7.mongodb.net/hublog?retryWrites=true&w=majority`
    );
    server.listen(PORT, (err) => {
      if (err) console.log(err);
      console.log("Server running on Port ", PORT);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
