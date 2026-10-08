import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import menuRoutes from "./routes/menuRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/khana-khazana")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

// Home Route
app.get("/", (req, res) => {
  res.send("Khana Khazana API is working!");
});

// Get Menu from MongoDB
app.get("/api/menu", async (req, res) => {
  try {
    const menu = await Menu.find();

    res.json(menu);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch menu",
      error: error.message,
    });
  }
});

// Server Start
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});