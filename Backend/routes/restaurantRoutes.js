const express = require("express");
const Restaurant = require("../models/Restaurant");

const router = express.Router();

// Get all restaurants
router.get("/", async (req, res) => {
  const restaurants = await Restaurant.find();
  res.json(restaurants);
});

module.exports = router;
