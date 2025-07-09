import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

// Use export default for ES Module compatibility
export default Restaurant;

