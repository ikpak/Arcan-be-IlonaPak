const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  resolved: {
    type: Boolean,
    default: false, 
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  organization: {
    type: String,
    required: true,
    trim: true,
  },

  pageUrl: {
    type: String,
    required: true,
  },

  dateOne: {
    type: Date,
    required: true,
  },

  dateTwo: {
    type: Date,
    required: true,
  },

  startTime: {
    type: String,
    required: true,
  },

  endTime: {
    type: String,
    required: true,
  },

  capacity: {
    type: Number,
    required: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
