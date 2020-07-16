const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },

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
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

module.exports = mongoose.model("Event", eventSchema)