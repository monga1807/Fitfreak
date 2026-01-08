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
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
// in Dashboard.jsx add:
import { Link } from "react-router-dom";




export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={{ padding: 24 }}>
      <p><Link to="/habits">Go to Habits</Link></p>
      <h1>Welcome, {user?.name || "User"}!</h1>
      <p>Your email: {user?.email}</p>
      <button onClick={logout} style={{ marginTop: 12 }}>Logout</button>
    </div>
  );
}
