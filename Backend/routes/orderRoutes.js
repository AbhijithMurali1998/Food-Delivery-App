import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// ✅ Route to place a new order
router.post("/orders", async (req, res) => {
  try {
    const { customerDetails, items, total, paymentMethod } = req.body;

    // Log all incoming data
    console.log("🔻 Incoming order data:");
    console.log("👤 customerDetails:", customerDetails);
    console.log("🛒 items:", items);
    console.log("💵 total:", total);
    console.log("💳 paymentMethod:", paymentMethod);

    // Validate inputs
    if (!customerDetails || typeof customerDetails !== "object") {
      return res.status(400).json({ error: "Missing or invalid customer details" });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Cart is empty or invalid" });
    }
    if (!total || typeof total !== "number") {
      return res.status(400).json({ error: "Invalid total amount" });
    }
    if (!paymentMethod || typeof paymentMethod !== "string") {
      return res.status(400).json({ error: "Invalid payment method" });
    }

    // ✅ Save the order
    const newOrder = await Order.create({
      customerDetails,
      items,
      total,
      paymentMethod,
      status: "pending",
    });

    console.log("✅ Order created:", newOrder._id);
    res.status(201).json({ orderId: newOrder._id });
  } catch (error) {
    console.error("❌ Backend Order Error:", error.message, error.stack);
    res.status(500).json({ error: "Failed to place order" });
  }
});

// ✅ Route to mark order as delivered (user confirms delivery)
router.post("/orders/:id/deliver", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "delivered" },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ message: "Order marked as delivered", order });
  } catch (error) {
    console.error("❌ Delivery confirm error:", error.message);
    res.status(500).json({ error: "Failed to update order" });
  }
});

export default router;
