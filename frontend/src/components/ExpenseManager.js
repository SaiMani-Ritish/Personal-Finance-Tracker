import React from 'react';

function ExpenseManager() {
  return (
    <div className="expense-manager">
      <h1>Expense Manager</h1>
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

export default ExpenseManager;
