const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin.js");
const FoodItem = require("../models/FoodItem.js"); // ✅ Food item model
const { authMiddleware } = require("../middleware/authMiddleware");

// Admin Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, admin: { id: admin._id, email: admin.email } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin Profile (Protected)
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.userId).select("-password");
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ======= FOOD MENU ROUTES ======= //

// Get all food items
router.get("/food", authMiddleware, async (req, res) => {
  try {
    const foods = await FoodItem.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch food items" });
  }
});

// Add a new food item
router.post("/food", authMiddleware, async (req, res) => {
  try {
    const { name, price } = req.body;
    const newItem = new FoodItem({ name, price });
    await newItem.save();
    res.status(201).json({ message: "Food item added", item: newItem });
  } catch (err) {
    res.status(500).json({ message: "Failed to add food item" });
  }
});

// Update food item price
router.put("/food/:id", authMiddleware, async (req, res) => {
  try {
    const { price } = req.body;
    const updated = await FoodItem.findByIdAndUpdate(
      req.params.id,
      { price },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Food item not found" });

    res.json({ message: "Price updated", updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update price" });
  }
});

module.exports = router;
