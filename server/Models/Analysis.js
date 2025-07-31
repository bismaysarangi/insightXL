const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const analysisSchema = new mongoose.Schema({
  userId: {
    type: String, // This will store the string representation of the user's MongoDB _id
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  chartType: {
    type: String,
    required: true,
    enum: ["Bar", "Line", "Pie", "Scatter", "Area", "Other"],
  },
  previewUrl: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("Analysis", analysisSchema);