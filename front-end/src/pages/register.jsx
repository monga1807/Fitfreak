// src/pages/Register.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { registerUser } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-extrabold mb-6">Create Account</h1>

        <div className="space-y-4">
          <Input
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={onChange}
          />

          <Input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
          />

          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
          />

          <Button variant="accent" className="w-full">
            {loading ? "Creating..." : "Register"}
          </Button>

          {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
        </div>

        {/* 👇 Existing user link */}
        <p className="text-sm text-center text-slate-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
