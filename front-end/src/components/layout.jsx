import React from "react";
import Navbar from "./navbar";

export default function Layout({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f6f7fb" }}>
      <Navbar />
      <div style={{ padding: 20 }}>
        {children}
      </div>
    </div>
  );
}
