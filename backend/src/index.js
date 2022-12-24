// @/main.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Product } = require("./models/product");
const { ShoppingCart } = require("./models/shoppingCart");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

app.get("/products", async (req, res) => {
  const allProducts = await Product.find();
  return res.status(200).json(allProducts);
});

app.post("/shopping-carts", async (req, res) => {
  const products = req.body.products;
  const newShoppingCart = new ShoppingCart({ ...req.body });
  const insertedShoppingCart = await newShoppingCart.save();
  return res.status(201).json(insertedShoppingCart);
});

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${username}:${password}@yanir-toar.0tfcqu7.mongodb.net/makolet?retryWrites=true&w=majority`
    );
    app.listen(3001, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
