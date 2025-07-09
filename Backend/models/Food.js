import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: String,
  price: Number,
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  image: String,
});

const Food = mongoose.model("Food", foodSchema);
export default Food;
