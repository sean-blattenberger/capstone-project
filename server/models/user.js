const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: String,
  email: String,
  favorites: [{type: Schema.Types.ObjectId, ref: 'Menu' }],
  votes: [{type: Schema.Types.ObjectId, ref: 'Menu' }],
})
module.exports = mongoose.model("User", UserSchema);
