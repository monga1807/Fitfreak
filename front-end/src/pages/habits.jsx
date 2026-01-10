// src/pages/Habits.jsx
import React, { useState } from "react";
import useHabits from "../hooks/useHabits";
import HabitItem from "../components/HabitItem";

export default function HabitsPage() {
  const { habits, loading, addHabit, markDone } = useHabits();
  const [form, setForm] = useState({ title: "", description: "" });

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    await addHabit(form);
    setForm({ title: "", description: "" });
  };

  return (
    <div>
      <h1 className="text-3xl font-extrabold">Habits</h1>

      {/* Add Habit */}
      <form
        onSubmit={submit}
        className="bg-white p-5 rounded-xl shadow mt-6 flex flex-col sm:flex-row gap-4"
      >
        <input
          name="title"
          placeholder="Habit title"
          value={form.title}
          onChange={onChange}
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <input
          name="description"
          placeholder="Description (optional)"
          value={form.description}
          onChange={onChange}
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <button
          className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90"
        >
          Add
        </button>
      </form>

      {/* Habit List */}
      <div className="mt-8 grid gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : habits.length === 0 ? (
          <p className="text-slate-500">No habits yet.</p>
        ) : (
          habits.map((h) => (
            <HabitItem key={h._id} habit={h} onMarkDone={markDone} />
          ))
        )}
      </div>
    </div>
  );
}
