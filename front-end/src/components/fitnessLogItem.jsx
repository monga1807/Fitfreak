import React from "react";

export default function FitnessLogItem({ log }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: 8,
      padding: 12,
      marginBottom: 8
    }}>
      <strong>{log.date}</strong>
      <div>Weight: {log.weight ?? "-"} kg</div>
      <div>Water: {log.water ?? "-"} L</div>
      <div>Workout: {log.workout || "-"}</div>
    </div>
  );
}
