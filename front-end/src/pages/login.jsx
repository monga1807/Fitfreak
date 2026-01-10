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
import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";


export default function Login() {
  // const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, googleLogin } = useContext(AuthContext);



  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-extrabold mb-6">Login</h1>

        <div className="space-y-4">
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

          <Button className="w-full">Login</Button>
        </div>

        {/* 👇 New user link */}
        <p className="text-sm text-center text-slate-600 mt-6">
          New here?{" "}
          <Link
            to="/register"
            className="text-primary font-semibold hover:underline"
          >
            Create an account
          </Link>
        </p>
        <div className="mt-6 flex justify-center">
  <GoogleLogin
    onSuccess={async (credentialResponse) => {
      try {
        await googleLogin(credentialResponse.credential);
        navigate("/");
      } catch {
        alert("Google login failed");
      }
    }}
    onError={() => alert("Google login failed")}
  />
</div>

      </form>
    </div>
  );
}
