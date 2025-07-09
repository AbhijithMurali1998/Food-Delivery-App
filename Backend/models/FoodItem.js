import mongoose from "mongoose";

const FoodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

export default mongoose.model("FoodItem", FoodItemSchema);
