import React from 'react';
import ChatBot from './ChatBot';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard Overview</h1>
      <div className="dashboard-grid">
        <div className="card">
          <h2>Income Trend</h2>
          <p>Chart will go here</p>
        </div>
        <div className="card">
          <h2>Expense Analysis</h2>
          <p>Chart will go here</p>
        </div>
        <div className="card">
          <h2>Savings Distribution</h2>
          <p>Chart will go here</p>
        </div>
      </div>
      <ChatBot />
    </div>
  );
}

export default Dashboard;