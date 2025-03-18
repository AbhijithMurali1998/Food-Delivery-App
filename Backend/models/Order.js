const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      food: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
      quantity: Number,
      name: String, // Store food name
      price: Number, // Store food price
      image: String, // ✅ Store food image
    },
  ],
  totalPrice: Number,
  status: { type: String, default: "pending" },
});

module.exports = mongoose.model("Order", orderSchema);
