const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String },
  description: { type: String },
  image: { type: String }, // Optional: URL for the event image
});

module.exports = mongoose.models.Event || mongoose.model("Event", eventSchema);
