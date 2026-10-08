import mongoose from "mongoose";
import Menu from "./models/Menu.js";

mongoose
  .connect("mongodb://127.0.0.1:27017/khana-khazana")
  .then(async () => {
    console.log("MongoDB connected");

    const menuItems = [
      {
        name: "Paneer Butter Masala",
        price: 250,
        category: "Main Course",
      },
      {
        name: "Veg Biryani",
        price: 180,
        category: "Biryani",
      },
      {
        name: "Masala Dosa",
        price: 120,
        category: "South Indian",
      },
      {
        name: "Chole Bhature",
        price: 150,
        category: "North Indian",
      },
    ];

    await Menu.deleteMany();

    await Menu.insertMany(menuItems);

    console.log("Menu items inserted successfully");

    await mongoose.connection.close();

    console.log("Database connection closed");
  })
  .catch((error) => {
    console.log("Error:", error);
  });