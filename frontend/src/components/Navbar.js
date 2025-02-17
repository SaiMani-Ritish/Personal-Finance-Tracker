import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        Finance Tracker
      </div>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/expenses">Expense Manager</Link>
        <Link to="/budget">Budget Planner</Link>
      </div>
    </nav>
  );
}

export default Navbar;