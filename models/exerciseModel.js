const mongoose = require("mongoose");
require("mongodb");

const exerciseSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Exercise", exerciseSchema);
