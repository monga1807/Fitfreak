// src/pages/Register.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await registerUser(form.name, form.email, form.password);
      // Option A: redirect to login page and let user login
      navigate("/login");
      // Option B: you could auto-login by calling login() here, if you prefer
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 20 }}>
      <h2>Create account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input name="name" value={form.name} onChange={onChange} required />
        </div>

        <div>
          <label>Email</label>
          <input name="email" type="email" value={form.email} onChange={onChange} required />
        </div>

        <div>
          <label>Password</label>
          <input name="password" type="password" value={form.password} onChange={onChange} required />
        </div>

        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}

        <button type="submit" disabled={loading} style={{ marginTop: 12 }}>
          {loading ? "Creating..." : "Register"}
        </button>
      </form>

      <p style={{ marginTop: 12 }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
