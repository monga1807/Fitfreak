import React from "react";

export default function StatCard({ title, value, subtitle, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        flex: 1,
        padding: 20,
        borderRadius: 12,
        background: "white",
        boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
        cursor: onClick ? "pointer" : "default"
      }}
    >
      <div style={{ fontSize: 14, color: "#666" }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 700, marginTop: 6 }}>
        {value}
      </div>
      {subtitle && (
        <div style={{ fontSize: 12, color: "#999", marginTop: 4 }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}
