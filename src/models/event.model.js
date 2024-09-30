const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, maxLength: 40, required: true },
    description: { type: String, maxLength: 300 },
    date: { type: Date, required: true },
    location: {
      address: { type: String },
      coordinates: {
        type: [Number],
        required: true,
        index: "2dsphere",
      },
    },
    price: { type: Number, required: true },
    capacity: { type: Number, required: true },
    imageUri: { type: String, required: true },
    tags: [{ type: String }],
    isRecommended: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);