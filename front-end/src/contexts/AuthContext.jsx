// import { createContext, useState, useEffect } from "react";
// import api from "../utils/axios";

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const token = localStorage.getItem("token");

//   // Add token to axios on load
//   useEffect(() => {
//     if (token) {
//       api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       fetchUser();
//     }
//   }, []);

//   const fetchUser = async () => {
//     try {
//       const res = await api.get("/auth/me");
//       setUser(res.data.user);
//     } catch {
//       logout();
//     }
//   };

//   const login = async (email, password) => {
//     const res = await api.post("/auth/login", { email, password });

//     // Save token
//     localStorage.setItem("token", res.data.token);
//     api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

//     setUser(res.data.user);
//   };

//   const registerUser = async (name, email, password) => {
//     const res = await api.post("/auth/register", { name, email, password });
//     return res.data;
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     delete api.defaults.headers.common["Authorization"];
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, login, registerUser, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// src/contexts/AuthContext.jsx
import React, { createContext, useEffect, useState } from "react";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // initial loading while checking token
  const navigate = useNavigate();

  // Attach interceptor to handle 401 globally
  useEffect(() => {
    const resInterceptor = api.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401) {
          // token invalid/expired -> logout
          logout();
          // optional: navigate to login if not already there
          navigate("/login");
        }
        return Promise.reject(err);
      }
    );
    return () => api.interceptors.response.eject(resInterceptor);
  }, []);

  // On app load: set token header if exists and fetch /me
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
      return res.data.user;
    } catch (err) {
      // already handled by interceptor; ensure cleanup
      setUser(null);
      return null;
    }
  };

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const token = res.data.token;
    if (!token){ throw new Error("No token returned from server");}
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(res.data.user);
    return res.data;
  };

//   const login = async (email, password) => {
//   // just to see it’s being called
//   console.log("login() called with:", email, password);

//   const res = await api.post("/auth/login", { email, password });
//   console.log("login response:", res.data); // debug output

//   const token = res.data.token;

//   if (!token) {
//     throw new Error("No token returned from backend");
//   }

//   // 1. Save token in localStorage
//   localStorage.setItem("token", token);
//   console.log("Token saved to localStorage:", token);

//   // 2. Attach token to axios defaults
//   api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//   // 3. Save user
//   setUser(res.data.user);
// };


  const registerUser = async (name, email, password) => {
    const res = await api.post("/auth/register", { name, email, password });
    // optionally auto-login after register, but we return the registered user
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
    // optionally navigate to login
    // navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, registerUser, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}
