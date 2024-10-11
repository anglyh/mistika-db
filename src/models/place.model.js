const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema(
    {
        title: { type: String, maxLength: 50, required: true },
        imageUri: { type: String, required: true },
        likes: { type: Number, default: 0 },
        comments: { type: Number, default: 0 }, 
        history: { type: String, maxLength: 500, required: true },
        characteristics: { type: String, maxLength: 500, required: true },
        location: {
            address: { type: String, required: true },
            coordinates: { type: [Number], required: true, index: "2dsphere" },
        },
        reviews: [
            {
                user: { type: String, required: true },
                comment: { type: String, maxLength: 500 },
                rating: { type: Number, min: 1, max: 5, required: true },
            }
        ],
    },
    { timestamps: true }
)

module.exports = mongoose.model("Place", placeSchema);