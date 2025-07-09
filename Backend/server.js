// server.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

// ✅ Enable CORS for frontend origin
app.use(
  cors({
    origin: "http://localhost:5173", // Your React frontend URL
    credentials: true,
  })
);

// ✅ Parse incoming JSON bodies
app.use(express.json());

// ✅ Serve uploaded images statically
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));


// ✅ Register routes
app.use("/api", authRoutes);         // For login/signup
app.use("/api/admin", adminRoutes);  // For admin dashboard, menu, orders, users
app.use("/api", orderRoutes);        // For placing orders

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Stop app if DB connection fails
  });

// ✅ Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
