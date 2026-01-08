import React, { useState } from "react";
import useFitness from "../hooks/useFitness";
import FitnessLogItem from "../components/fitnessLogItem";

export default function FitnessPage() {
  const { today, logs, loading, save } = useFitness();

  const [form, setForm] = useState({
    weight: "",
    water: "",
    workout: ""
  });

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await save({
      weight: form.weight ? Number(form.weight) : undefined,
      water: form.water ? Number(form.water) : undefined,
      workout: form.workout
    });
  };

  return (
    <div style={{ maxWidth: 900, margin: "24px auto", padding: 20 }}>
      <h2>Fitness Tracker</h2>

      <form onSubmit={submit} style={{ marginBottom: 20 }}>
        <input
          name="weight"
          placeholder="Weight (kg)"
          value={form.weight}
          onChange={onChange}
        />
        <input
          name="water"
          placeholder="Water (liters)"
          value={form.water}
          onChange={onChange}
        />
        <input
          name="workout"
          placeholder="Workout (optional)"
          value={form.workout}
          onChange={onChange}
        />
        <button type="submit">Save Today</button>
      </form>

      {today && (
        <>
          <h3>Today</h3>
          <FitnessLogItem log={today} />
        </>
      )}

      <h3>History</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        logs.map((log) => <FitnessLogItem key={log._id} log={log} />)
      )}
    </div>
  );
}
