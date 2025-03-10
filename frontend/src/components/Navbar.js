import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        Finance Tracker
      </div>
      <div className="nav-links">
        <NavLink to="/"  style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal', color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)' })}>Dashboard</NavLink>
        <NavLink to="/expenses"  style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal', color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)' })}>Expense Manager</NavLink>
        <NavLink to="/budget"  style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal', color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)' })}>Budget Planner</NavLink>
        <NavLink to="/chat"  style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal', color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)' })}>Chat</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;