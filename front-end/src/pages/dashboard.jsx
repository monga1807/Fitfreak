// import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";

// function Dashboard() {
//   const { user } = useContext(AuthContext);

//   return (
//     <div>
//       <h2>Welcome, {user?.name}!</h2>
//     </div>
//   );
// }

// export default Dashboard;

// src/pages/Dashboard.jsx
// import React, { useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext.jsx";
// // in Dashboard.jsx add:
// import { Link } from "react-router-dom";




// export default function Dashboard() {
//   const { user, logout } = useContext(AuthContext);

//   return (
//     <div style={{ padding: 24 }}>
//       <p><Link to="/habits">Go to Habits</Link></p>
//       <h1>Welcome, {user?.name || "User"}!</h1>
//       <p>Your email: {user?.email}</p>
//       <button onClick={logout} style={{ marginTop: 12 }}>Logout</button>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/statCard";
import api from "../utils/axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    habits: 0,
    habitsDoneToday: 0,
    journals: 0,
    weight: "-",
    water: "-"
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Fetch in parallel
      const [habitsRes, journalRes, fitnessTodayRes, checksRes] =
        await Promise.all([
          api.get("/habits"),
          api.get("/journal"),
          api.get("/fitness/today"),
          api.get("/habits/checks") // defaults to today
        ]);

      const habits = habitsRes.data.habits || [];
      const journals = journalRes.data.entries || [];
      const todayFitness = fitnessTodayRes.data.log;
      const checksByHabit = checksRes.data.byHabit || {};

      const doneCount = Object.keys(checksByHabit).length;

      setStats({
        habits: habits.length,
        habitsDoneToday: doneCount,
        journals: journals.length,
        weight: todayFitness?.weight ?? "-",
        water: todayFitness?.water ?? "-"
      });
    } catch (err) {
      console.error("Dashboard load error:", err);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          marginTop: 20
        }}
      >
        <StatCard
          title="Total Habits"
          value={stats.habits}
          subtitle={`Done today: ${stats.habitsDoneToday}`}
          onClick={() => navigate("/habits")}
        />

        <StatCard
          title="Journal Entries"
          value={stats.journals}
          subtitle="Your thoughts archive"
          onClick={() => navigate("/journal")}
        />

        <StatCard
          title="Today's Weight"
          value={`${stats.weight} kg`}
          subtitle="Latest log"
          onClick={() => navigate("/fitness")}
        />

        <StatCard
          title="Water Intake"
          value={`${stats.water} L`}
          subtitle="Today"
          onClick={() => navigate("/fitness")}
        />
      </div>

      <div style={{ marginTop: 30 }}>
        <h3>Quick Actions</h3>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button onClick={() => navigate("/habits")}>➕ Add Habit</button>
          <button onClick={() => navigate("/journal")}>📝 Write Journal</button>
          <button onClick={() => navigate("/fitness")}>💪 Update Fitness</button>
        </div>
      </div>
    </div>
  );
}
