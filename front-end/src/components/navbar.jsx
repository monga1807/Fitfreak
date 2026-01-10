import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg font-medium transition ${
      isActive
        ? "bg-primary text-white"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <header className="relative sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="text-xl font-extrabold text-primary flex items-center">
          <img src="gym.svg" alt="gym-emoji" style={{ width: 18, height: 18 }} />FitFreak
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-2">
          <NavLink to="/" className={linkClass}>Dashboard</NavLink>
          <NavLink to="/habits" className={linkClass}>Habits</NavLink>
          <NavLink to="/journal" className={linkClass}>Journal</NavLink>
          <NavLink to="/fitness" className={linkClass}>Fitness</NavLink>
          <NavLink to="/analytics" className={linkClass}>Analytics</NavLink>
        </nav>

        {/* Desktop User */}
        <div className="hidden md:flex items-center gap-3">
          <span className="text-sm font-medium">{user?.name}</span>
          <button
            onClick={logout}
            className="px-3 py-1.5 rounded-md bg-accent text-white text-sm hover:opacity-90"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
       {open && (
        <div className="md:hidden absolute right-4 top-16 w-56 bg-white rounded-xl shadow-xl border z-50">


            {/* User Info */}
  <div className="px-4 py-3 border-b">
    <div className="font-semibold truncate">{user?.name}</div>
    <div className="text-xs text-slate-500">Account</div>
  </div>

  {/* Links */}
  <div className="p-2 space-y-1">
    <NavLink onClick={() => setOpen(false)} to="/" className={linkClass}>
      Dashboard
    </NavLink>
    <NavLink onClick={() => setOpen(false)} to="/habits" className={linkClass}>
      Habits
    </NavLink>
    <NavLink onClick={() => setOpen(false)} to="/journal" className={linkClass}>
      Journal
    </NavLink>
    <NavLink onClick={() => setOpen(false)} to="/fitness" className={linkClass}>
      Fitness
    </NavLink>
    <NavLink onClick={() => setOpen(false)} to="/analytics" className={linkClass}>
      Analytics
    </NavLink>
  </div>

  {/* Logout */}
  <div className="p-2 border-t">
    <button
      onClick={() => {
        logout();
        setOpen(false);
      }}
      className="w-full px-3 py-2 rounded-lg bg-accent text-white font-semibold"
    >
      Logout
    </button>
  </div>

        </div>
      )}
    </header>
  );
}
