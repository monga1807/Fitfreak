// src/components/HabitItem.jsx
import React, { useState, useEffect } from "react";
import { getStreak } from "../services/habitService";

export default function HabitItem({ habit, onMarkDone }) {
  const [streak, setStreak] = useState(null);

  useEffect(() => {
    loadStreak();
  }, []);

  const loadStreak = async () => {
    try {
      const res = await getStreak(habit._id);
      setStreak(res.data.streak);
    } catch {
      setStreak(0);
    }
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition flex justify-between items-center">
      <div>
        <h3 className="font-bold text-lg">{habit.title}</h3>
        {habit.description && (
          <p className="text-sm text-slate-500">{habit.description}</p>
        )}

        <div className="mt-2 text-sm font-medium text-primary">
          🔥 Streak: {streak ?? 0} days
        </div>
      </div>

      <button
        onClick={() => onMarkDone(habit._id)}
        disabled={habit.doneToday}
        className={`px-4 py-2 rounded-lg font-semibold transition ${
          habit.doneToday
            ? "bg-green-100 text-green-700 cursor-not-allowed"
            : "bg-primary text-white hover:opacity-90"
        }`}
      >
        {habit.doneToday ? "Done ✅" : "Mark Done"}
      </button>
    </div>
  );
}
