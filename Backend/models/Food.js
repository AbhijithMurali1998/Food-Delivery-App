const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: String,
  price: Number,
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  image: String,
});

module.exports = mongoose.model("Food", foodSchema);
