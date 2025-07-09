import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/User.js";
import Food from "../models/Food.js";

dotenv.config();
const router = express.Router();

// ✅ USER SIGNUP
router.post("/signup", async (req, res) => {
  console.log("Signup route hit. Body:", req.body);

  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("❌ User already exists");
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    console.log("✅ New user created:", newUser.email);

    res.json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("❌ Signup Error:", error.message, error.stack);
    res.status(500).json({ error: "Server error during signup" });
  }
});

// ✅ USER LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("🔐 Login attempt for:", email);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Invalid password for", email);
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("✅ Login success for:", email);
    res.json({ message: "Login successful", token, role: user.role });
  } catch (error) {
    console.error("❌ Login Error:", error.message);
    res.status(500).json({ error: "Server error during login" });
  }
});

// ✅ GET ALL FOODS
router.get("/foods", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    console.error("❌ Fetch foods error:", error.message);
    res.status(500).json({ error: "Server error while fetching foods" });
  }
});

// ✅ DEV ONLY: Create test user for debug
router.post("/create-test-user", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash("12345678", 10);
    const user = await User.create({
      name: "Test2",
      email: "test2@gmail.com",
      password: hashedPassword,
      role: "user"
    });

    console.log("✅ Test user created:", user.email);
    res.json({ message: "Test user created", user });
  } catch (err) {
    console.error("❌ Error creating test user:", err.message);
    res.status(500).json({ error: "Failed to create test user" });
  }
});

export default router;
