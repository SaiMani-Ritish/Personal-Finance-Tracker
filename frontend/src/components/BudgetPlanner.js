// src/components/BudgetPlanner.js
import React from 'react';

function BudgetPlanner() {
  return (
    <div className="budget-planner">
      <h1>Budget Planner</h1>
      <div className="goals-section">
        <h2>Goals</h2>
        <div className="add-goal">
          <input type="text" placeholder="New Goal" />
          <button>Add Category</button>
        </div>
      </div>
    </div>
  );
}

export default BudgetPlanner;