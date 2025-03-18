const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json()); // ✅ Important: Parses JSON data

app.use("/api/auth", require("./routes/authRoutes"));

app.listen(3001, () => console.log("✅ Server running on port 3001"));
