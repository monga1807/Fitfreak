// import { useState, useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";

// function Login() {
//   const { login } = useContext(AuthContext);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await login(email, password);
//     alert("Login successful!");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>

//       <input 
//         type="email"
//         placeholder="Email"
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input 
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button type="submit">Login</button>
//     </form>
//   );
// }

// export default Login;

// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/"); // go to dashboard
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p style={{ marginTop: 12 }}>
        Don't have account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
