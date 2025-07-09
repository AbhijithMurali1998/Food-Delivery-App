import express from 'express';
import Food from '../models/Food.js'; // Import with .js extension

const router = express.Router();

// GET /api/food - Get all food items from MongoDB
router.get("/", async (req, res) => {
  try {
    const foodItems = await Food.find(); // Fetch from database
    res.json(foodItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching food items", error });
  }
});

export default router;
