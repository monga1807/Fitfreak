// src/components/HabitItem.jsx
import React, { useState, useEffect } from "react";
import { getStreak } from "../services/habitService";

export default function HabitItem({ habit, onMarkDone }) {
  const [streak, setStreak] = useState(null);
  const [loadingStreak, setLoadingStreak] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoadingStreak(true);
        const res = await getStreak(habit._id);
        if (mounted) setStreak(res.data.streak);
      } catch (err) {
        if (mounted) setStreak(null);
      } finally {
        if (mounted) setLoadingStreak(false);
      }
    }
    load();
    return () => (mounted = false);
  }, [habit._id]);

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 12,
      border: "1px solid #eee",
      borderRadius: 8,
      marginBottom: 8
    }}>
      <div>
        <div style={{ fontWeight: 600 }}>{habit.title}</div>
        {habit.description && <div style={{ fontSize: 13, color: "#555" }}>{habit.description}</div>}
        <div style={{ fontSize: 12, color: "#777", marginTop: 6 }}>
          {loadingStreak ? "..." : `Streak: ${streak ?? 0} days`}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <div style={{ fontSize: 12, color: habit.doneToday ? "green" : "#999" }}>
          {habit.doneToday ? "Done today" : "Not done"}
        </div>
        <button
          onClick={() => onMarkDone(habit._id)}
          disabled={habit.doneToday}
          style={{
            padding: "8px 12px",
            borderRadius: 6,
            background: habit.doneToday ? "#e6f4ea" : "#2563eb",
            color: habit.doneToday ? "#064e3b" : "white",
            border: "none",
            cursor: habit.doneToday ? "not-allowed" : "pointer"
          }}
        >
          {habit.doneToday ? "✓" : "Mark done"}
        </button>
      </div>
    </div>
  );
}
