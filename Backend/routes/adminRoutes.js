import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import multer from "multer";
import fs from "fs"; // ✅ For deleting image files

import Admin from "../models/Admin.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Food from "../models/Food.js";

dotenv.config();
const router = express.Router();

/* --------- Multer Setup for Image Uploads --------- */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

/* --------- Admin Routes --------- */

// ✅ TEMP Admin Account Creator
router.post("/create-temp-admin", async (req, res) => {
  try {
    const existing = await Admin.findOne({ email: "admin@example.com" });
    if (existing)
      return res.status(200).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = new Admin({ email: "admin@example.com", password: hashedPassword });
    await admin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
    console.error("🔥 Admin creation error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Admin Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Fetch All Orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("❌ Fetching orders failed:", err.message);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// ✅ Get One Order by ID
router.get("/orders/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    console.error("❌ Fetch single order error:", err.message);
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

// ✅ Admin Updates Order Status
router.put("/orders/:id/:status", async (req, res) => {
  try {
    const { id, status } = req.params;
    const validStatuses = ["pending", "accepted", "delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const updated = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) return res.status(404).json({ error: "Order not found" });

    res.json(updated);
  } catch (err) {
    console.error("❌ Updating status failed:", err.message);
    res.status(500).json({ error: "Failed to update order" });
  }
});

// ✅ User Confirms Delivery
router.put("/orders/confirm-received/:id", async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "delivered" },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Order not found" });

    res.json({ message: "Order marked as delivered by user", order: updated });
  } catch (err) {
    console.error("❌ Confirm delivery error:", err.message);
    res.status(500).json({ error: "Failed to confirm delivery" });
  }
});

// ✅ Fetch All Registered Users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error("❌ Fetching users failed:", err.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

/* --------- ✅ MENU ROUTES --------- */

// ✅ Add Food Item
router.post("/menu", upload.single("image"), async (req, res) => {
  try {
    const { name, price } = req.body;
    const image = req.file?.filename;

    if (!name || !price || !image) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newFood = new Food({ name, price, image });
    await newFood.save();

    res.status(201).json({ message: "Food item added", food: newFood });
  } catch (err) {
    console.error("❌ Add food error:", err.message);
    res.status(500).json({ error: "Failed to add food item" });
  }
});

// ✅ Fetch All Food Items
router.get("/menu", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    console.error("❌ Fetch menu error:", err.message);
    res.status(500).json({ error: "Failed to fetch menu" });
  }
});

// ✅ Delete Food Item
router.delete("/menu/:id", async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ error: "Food item not found" });

    // Optional: Delete image file from uploads/
    const imagePath = path.join("uploads", food.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Food.findByIdAndDelete(req.params.id);
    res.json({ message: "Food item deleted successfully" });
  } catch (err) {
    console.error("❌ Delete food error:", err.message);
    res.status(500).json({ error: "Failed to delete food item" });
  }
});

export default router; 