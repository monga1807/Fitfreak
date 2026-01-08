const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    default: ""
  },
  content: {
    type: String,
    required: true
  },
  mood: {
    type: String, // optional: happy, sad, calm, stressed
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

module.exports = mongoose.model("Journal", journalSchema);
