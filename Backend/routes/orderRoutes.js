const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/place", async (req, res) => {
  try {
    const { userId, cartItems, totalPrice } = req.body;

    const order = new Order({
      user: userId,
      items: cartItems.map((item) => ({
        food: item._id,
        quantity: item.quantity,
        name: item.name,
        price: item.price,
        image: item.image, // ✅ Store image in the order
      })),
      totalPrice,
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully!", order });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
});

module.exports = router;
