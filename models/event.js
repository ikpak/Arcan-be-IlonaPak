const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },

    startTime: {
        type: String,
        required: true
    },

    endTime: {
        type: String,
        required: true
    },

    entrance: {
        type: Number,
        required: true
    },

    artists: {
        type: Array,
        required: true
    },

    genres: {
        type: Array,
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

module.exports = mongoose.model("Event", eventSchema)