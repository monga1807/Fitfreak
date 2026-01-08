import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import api from "../utils/axios";

export default function AnalyticsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    loadFitnessLogs();
  }, []);

  const loadFitnessLogs = async () => {
    try {
      const res = await api.get("/fitness");
      setLogs(res.data.logs || []);
    } catch (err) {
      console.error("Analytics load error:", err);
    }
  };

  // Sort by date ascending for charts
  const chartData = [...logs].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  return (
    <div>
      <h2>Analytics</h2>

      {/* Weight Chart */}
      <div style={{ background: "white", padding: 20, borderRadius: 12, marginBottom: 30 }}>
        <h3>Weight Progress</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="weight"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Water Chart */}
      <div style={{ background: "white", padding: 20, borderRadius: 12 }}>
        <h3>Water Intake</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="water" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
