import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const linkStyle = ({ isActive }) => ({
  padding: "8px 12px",
  borderRadius: 6,
  textDecoration: "none",
  fontWeight: 500,
  color: isActive ? "white" : "#333",
  background: isActive ? "#2563eb" : "transparent"
});

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 20px",
      borderBottom: "1px solid #eee",
      background: "#fafafa"
    }}>
      <div style={{ fontWeight: 700 }}>🚀 Fitfreak</div>

      <div style={{ display: "flex", gap: 8 }}>
        <NavLink to="/" style={linkStyle}>Dashboard</NavLink>
        <NavLink to="/habits" style={linkStyle}>Habits</NavLink>
        <NavLink to="/journal" style={linkStyle}>Journal</NavLink>
        <NavLink to="/fitness" style={linkStyle}>Fitness</NavLink>
        <NavLink to="/analytics" style={linkStyle}>Analytics</NavLink>

      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 13 }}>
          {user?.name}
        </span>
        <button
          onClick={logout}
          style={{
            padding: "6px 10px",
            borderRadius: 6,
            border: "1px solid #ddd",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
