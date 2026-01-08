// src/pages/Habits.jsx
import React, { useState } from "react";
import useHabits from "../hooks/useHabits";
import HabitItem from "../components/habitItem";

export default function HabitsPage() {
  const { habits, loading, error, addHabit, markDone } = useHabits();
  const [form, setForm] = useState({ title: "", description: "" });
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!form.title.trim()) return setMsg("Title is required");
    setSubmitting(true);
    try {
      await addHabit({ title: form.title.trim(), description: form.description });
      setForm({ title: "", description: "" });
      setMsg("Habit added");
      setTimeout(() => setMsg(""), 1600);
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to add habit");
    } finally {
      setSubmitting(false);
    }
  };

  const onMark = async (habitId) => {
    try {
      await markDone(habitId);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to mark done");
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "24px auto", padding: 20 }}>
      <h2>Habits</h2>

      <form onSubmit={onSubmit} style={{ marginBottom: 20 }}>
        <input
          name="title"
          placeholder="Habit title (e.g. Drink water)"
          value={form.title}
          onChange={onChange}
          style={{ width: "60%", padding: 8, marginRight: 8 }}
        />
        <input
          name="description"
          placeholder="Short description (optional)"
          value={form.description}
          onChange={onChange}
          style={{ width: "30%", padding: 8, marginRight: 8 }}
        />
        <button type="submit" disabled={submitting} style={{ padding: "8px 12px" }}>
          {submitting ? "Adding..." : "Add"}
        </button>
        {msg && <div style={{ marginTop: 8 }}>{msg}</div>}
      </form>

      {loading && <div>Loading habits...</div>}
      {error && <div style={{ color: "red" }}>Failed to load habits</div>}

      <div>
        {habits.length === 0 && !loading ? (
          <div>No habits yet — add your first one.</div>
        ) : (
          habits.map((h) => (
            <HabitItem key={h._id} habit={h} onMarkDone={onMark} />
          ))
        )}
      </div>
    </div>
  );
}
