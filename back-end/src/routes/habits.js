const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Habit = require("../models/habit");
const HabitCheck = require("../models/habitCheck");

// Create habit
router.post("/", auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const habit = await Habit.create({
      userId: req.user.id,
      title,
      description
    });

    res.status(201).json({ habit });
  } catch (err) {
    console.error("Create habit error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/", auth, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user.id });
    res.json({ habits });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/:habitId/check", auth, async (req, res) => {
  try {
    const habitId = req.params.habitId;
    const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

    // Check if already checked today
    const existing = await HabitCheck.findOne({
      habitId,
      userId: req.user.id,
      date: today
    });

    if (existing) {
      return res.status(400).json({ message: "Already marked for today" });
    }

    const check = await HabitCheck.create({
      habitId,
      userId: req.user.id,
      date: today,
      completed: true
    });

    res.json({ message: "Marked done", check });
  } catch (err) {
    console.error("Check habit error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/:habitId/streak", auth, async (req, res) => {
  try {
    const habitId = req.params.habitId;
    const checks = await HabitCheck.find({
      habitId,
      userId: req.user.id
    }).sort({ date: -1 }); // latest first

    let streak = 0;
    let currentDate = new Date().toISOString().slice(0, 10);

    for (let check of checks) {
      if (check.date === currentDate) {
        streak++;
        const d = new Date(currentDate);
        d.setDate(d.getDate() - 1);
        currentDate = d.toISOString().slice(0, 10);
      } else {
        break;
      }
    }

    res.json({ streak });
  } catch (err) {
    console.error("Streak error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// GET /api/habits/checks?from=YYYY-MM-DD&to=YYYY-MM-DD
// Returns: { checks: [ { habitId, date, completed } ], byHabit: { "<habitId>": ["YYYY-MM-DD", ...] } }
router.get("/checks", auth, async (req, res) => {
  try {
    const from = req.query.from; // optional
    const to = req.query.to;     // optional

    // default to today if not provided
    const today = new Date().toISOString().slice(0, 10);

    const q = { userId: req.user.id };
    if (from && to) {
      q.date = { $gte: from, $lte: to };
    } else if (from) {
      q.date = { $gte: from };
    } else if (to) {
      q.date = { $lte: to };
    } else {
      // default: only today
      q.date = today;
    }

    const checks = await HabitCheck.find(q).lean();

    // Aggregate by habitId -> [date,...]
    const byHabit = {};
    for (const c of checks) {
      const id = String(c.habitId);
      byHabit[id] = byHabit[id] || [];
      byHabit[id].push(c.date);
    }

    return res.json({ checks, byHabit });
  } catch (err) {
    console.error("Get checks error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;