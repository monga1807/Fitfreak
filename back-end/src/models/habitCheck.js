const mongoose = require("mongoose");

const habitCheckSchema = new mongoose.Schema({
  habitId: { type: mongoose.Schema.Types.ObjectId, ref: "Habit", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true }, // store as string 'YYYY-MM-DD'
  completed: { type: Boolean, default: true }
});

module.exports = mongoose.model("HabitCheck", habitCheckSchema);
