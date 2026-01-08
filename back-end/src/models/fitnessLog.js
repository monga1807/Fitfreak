const mongoose = require("mongoose");

const fitnessLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: String, // YYYY-MM-DD
    required: true
  },
  weight: {
    type: Number // kg
  },
  water: {
    type: Number // liters
  },
  workout: {
    type: String // optional text (e.g. Chest + Triceps)
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

// Prevent duplicate logs per day per user
fitnessLogSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("FitnessLog", fitnessLogSchema);
