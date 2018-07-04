const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  email: String,
  img: String,
  favorites: [{type: Schema.Types.ObjectId, ref: 'Menu' }],
  votes: [{type: Schema.Types.ObjectId, ref: 'Menu' }]
});

module.exports = mongoose.model("User", UserSchema);
