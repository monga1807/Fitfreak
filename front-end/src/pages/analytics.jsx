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

  const chartData = [...logs].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-8">Analytics</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weight Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-bold mb-4">📈 Weight Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="weight"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Water Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-bold mb-4">💧 Water Intake</h3>
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
    </div>
  );
}
