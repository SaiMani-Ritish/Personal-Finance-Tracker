// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ExpenseManager from './components/ExpenseManager/ExpenseManager';
import BudgetPlanner from './components/BudgetPlanner';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/expenses" element={<ExpenseManager />} />
            <Route path="/budget" element={<BudgetPlanner />} />
          </Routes>
        </div>
      </Router>
    </LocalizationProvider>
  );
}

export default App;