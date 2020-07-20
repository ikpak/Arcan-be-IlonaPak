const mongoose = require("mongoose")

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },

    category: {
        type: String,
        trim: true,
        required: true
    },

    description: {
        type: String,
        trim: true,
        required: true
    },

    imageUrl: {
        type: String,
        trim: true,
        required: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

module.exports = mongoose.model("News", newsSchema)