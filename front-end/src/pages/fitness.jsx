import React, { useState } from "react";
import useFitness from "../hooks/useFitness";
import FitnessLogItem from "../components/fitnessLogItem";
import Input from "../components/ui/input";
import Button from "../components/ui/button";

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
    <div>
      <h1 className="text-3xl font-extrabold">Fitness Tracker</h1>

      {/* Form */}
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-xl shadow mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Input
          name="weight"
          placeholder="Weight (kg)"
          value={form.weight}
          onChange={onChange}
        />

        <Input
          name="water"
          placeholder="Water (liters)"
          value={form.water}
          onChange={onChange}
        />

        <Input
          name="workout"
          placeholder="Workout"
          value={form.workout}
          onChange={onChange}
        />

        <div className="md:col-span-3">
          <Button className="w-full">Save Today</Button>
        </div>
      </form>

      {/* Today */}
      {today && (
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-3">Today</h2>
          <FitnessLogItem log={today} />
        </div>
      )}

      {/* History */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-3">History</h2>

        {loading ? (
          <p>Loading...</p>
        ) : logs.length === 0 ? (
          <p className="text-slate-500">No logs yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {logs.map((log) => (
              <FitnessLogItem key={log._id} log={log} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
