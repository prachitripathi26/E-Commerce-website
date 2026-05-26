import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// 🔹 MongoDB Connect
mongoose.connect("your_mongodb_url")
.then(() => console.log("MongoDB Connected ✅"))
.catch((err) => console.log(err));

// 🔹 Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

const Product = mongoose.model("Product", productSchema);

// 🔹 Add Product API
app.post("/add-product", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json({ message: "Product Added ✅" });
});

// 🔹 Get Products API
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// 🔹 Server Start
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");


});
