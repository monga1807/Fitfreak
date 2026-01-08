const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Journal = require("../models/journal");

// Create journal entry
router.post("/", auth, async (req, res) => {
  try {
    const { title, content, mood } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const entry = await Journal.create({
      userId: req.user.id,
      title,
      content,
      mood
    });

    res.status(201).json({ entry });
  } catch (err) {
    console.error("Create journal error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all journal entries
router.get("/", auth, async (req, res) => {
  try {
    const entries = await Journal.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json({ entries });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update journal entry
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, content, mood } = req.body;

    const entry = await Journal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      {
        title,
        content,
        mood,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.json({ entry });
  } catch (err) {
    console.error("Update journal error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete journal entry
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Journal.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!deleted) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.json({ message: "Journal entry deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
