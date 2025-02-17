// src/components/ExpenseTracker.js
import React from 'react';

function ExpenseTracker() {
  return (
    <div className="expense-tracker">
      <h1>Expense Tracker</h1>
      <div className="expense-form">
        <form>
          <input type="date" placeholder="Date" />
          <input type="number" placeholder="Amount" />
          <input type="text" placeholder="Category" />
          <button type="submit">Add Expense</button>
        </form>
      </div>
    </div>
  );
}

export default ExpenseTracker;
