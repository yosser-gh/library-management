const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String },
  description: { type: String },
  image: { type: String },
  registeredUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.models.Event || mongoose.model("Event", eventSchema);
