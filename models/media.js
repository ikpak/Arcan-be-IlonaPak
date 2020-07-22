const mongoose = require("mongoose")
const { loginRequired } = require("../middleware/auth")

const mediaSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },

    videoId: {
        type: String,
        trim: true,
        required: true,
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

module.exports = mongoose.model("Media", mediaSchema)