const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
  food: String,
  type: String,
  desc: String,
  votes: Number,
  restaurantId: String
});

module.exports = mongoose.model("Menu", MenuSchema);