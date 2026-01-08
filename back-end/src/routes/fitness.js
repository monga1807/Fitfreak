const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const FitnessLog = require("../models/fitnessLog");

// helper: today string
const todayStr = () => new Date().toISOString().slice(0, 10);

// Create or update today's fitness log
router.post("/", auth, async (req, res) => {
  try {
    const { weight, water, workout } = req.body;
    const date = todayStr();

    const log = await FitnessLog.findOneAndUpdate(
      { userId: req.user.id, date },
      {
        weight,
        water,
        workout,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    res.json({ log });
  } catch (err) {
    console.error("Save fitness log error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all fitness logs
router.get("/", auth, async (req, res) => {
  try {
    const logs = await FitnessLog.find({ userId: req.user.id })
      .sort({ date: -1 });

    res.json({ logs });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get today's log
router.get("/today", auth, async (req, res) => {
  try {
    const date = todayStr();
    const log = await FitnessLog.findOne({
      userId: req.user.id,
      date
    });

    res.json({ log });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
