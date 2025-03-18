const express = require("express");
const Food = require("../models/Food");

const router = express.Router();

// Get all foods
router.get("/", async (req, res) => {
  const foods = await Food.find().populate("restaurant");
  res.json(foods);
});

module.exports = router;
