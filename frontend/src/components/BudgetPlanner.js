import React, { useState, useEffect } from 'react';
//import './BudgetPlanner.css'; // Import the custom CSS

function BudgetPlanner() {
  const [income, setIncome] = useState('');
  const [goals, setGoals] = useState([]);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalAmount, setNewGoalAmount] = useState('');
  const [newGoalDeadline, setNewGoalDeadline] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [newExpenseName, setNewExpenseName] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');
  const [availableForSaving, setAvailableForSaving] = useState(0);

  // Calculate total expenses
  const totalExpenses = expenses.reduce((total, expense) => total + parseFloat(expense.amount || 0), 0);

  // Calculate available income after expenses
  useEffect(() => {
    const availableAmount = parseFloat(income || 0) - totalExpenses;
    setAvailableForSaving(availableAmount);
  }, [income, totalExpenses]);

  // Add a new goal
  const handleAddGoal = () => {
    if (newGoalName && newGoalAmount && newGoalDeadline) {
      const newGoal = {
        id: Date.now(),
        name: newGoalName,
        amount: parseFloat(newGoalAmount),
        deadline: new Date(newGoalDeadline),
        monthlySavingRequired: calculateMonthlySaving(parseFloat(newGoalAmount), new Date(newGoalDeadline))
      };
      
      setGoals([...goals, newGoal]);
      setNewGoalName('');
      setNewGoalAmount('');
      setNewGoalDeadline('');
    }
  };

  // Calculate monthly saving required to reach goal by deadline
  const calculateMonthlySaving = (amount, deadline) => {
    const today = new Date();
    const monthsDiff = (deadline.getFullYear() - today.getFullYear()) * 12 + 
                       (deadline.getMonth() - today.getMonth());
    
    if (monthsDiff <= 0) return amount;
    return (amount / monthsDiff).toFixed(2);
  };

  // Add a new expense
  const handleAddExpense = () => {
    if (newExpenseName && newExpenseAmount) {
      const newExpense = {
        id: Date.now(),
        name: newExpenseName,
        amount: parseFloat(newExpenseAmount)
      };
      
      setExpenses([...expenses, newExpense]);
      setNewExpenseName('');
      setNewExpenseAmount('');
    }
  };

  // Remove a goal
  const removeGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  // Remove an expense
  const removeExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="budget-planner">
      <h1>Budget Planner</h1>
      
      {/* Income Section */}
      <div className="income-section">
        <h2>Monthly Income</h2>
        <div className="add-goal">
          <label>Income: $</label>
          <input 
            type="number" 
            value={income} 
            onChange={(e) => setIncome(e.target.value)}
            placeholder="0.00"
          />
        </div>
      </div>
      
      {/* Expenses Section */}
      <div className="expenses-section">
        <h2>Monthly Expenses</h2>
        
        <div className="add-expense">
          <input 
            type="text" 
            value={newExpenseName}
            onChange={(e) => setNewExpenseName(e.target.value)}
            placeholder="Expense name (e.g., Rent, Utilities)" 
          />
          <div>
            <span>$ </span>
            <input 
              type="number" 
              value={newExpenseAmount}
              onChange={(e) => setNewExpenseAmount(e.target.value)}
              placeholder="Amount" 
            />
          </div>
          <button 
            className="button-primary"
            onClick={handleAddExpense}
          >
            Add Expense
          </button>
        </div>
        
        {expenses.length > 0 && (
          <div className="expenses-list">
            <h3>Current Expenses:</h3>
            <ul>
              {expenses.map(expense => (
                <li key={expense.id}>
                  <div>
                    <span>{expense.name}</span>
                    <div>
                      <span>{formatCurrency(expense.amount)}</span>
                      <button 
                        onClick={() => removeExpense(expense.id)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div>
              <strong>Total Expenses: {formatCurrency(totalExpenses)}</strong>
            </div>
          </div>
        )}
      </div>
      
      {/* Available for Saving */}
      <div className="saving-summary">
        <h2>Saving Summary</h2>
        <div>
          <span>Monthly Income:</span>
          <span>{formatCurrency(parseFloat(income || 0))}</span>
        </div>
        <div>
          <span>Monthly Expenses:</span>
          <span>{formatCurrency(totalExpenses)}</span>
        </div>
        <div>
          <span><strong>Available for Saving:</strong></span>
          <span className={availableForSaving < 0 ? 'negative-amount' : 'positive-amount'}>
            {formatCurrency(availableForSaving)}
          </span>
        </div>
      </div>
      
      {/* Goals Section */}
      <div className="goals-section">
        <h2>Savings Goals</h2>
        
        <div className="add-goal">
          <input 
            type="text" 
            value={newGoalName}
            onChange={(e) => setNewGoalName(e.target.value)}
            placeholder="Goal name (e.g., Car, House)" 
          />
          <div>
            <span>$ </span>
            <input 
              type="number" 
              value={newGoalAmount}
              onChange={(e) => setNewGoalAmount(e.target.value)}
              placeholder="Target amount" 
            />
          </div>
          <div>
            <span>by </span>
            <input 
              type="date" 
              value={newGoalDeadline}
              onChange={(e) => setNewGoalDeadline(e.target.value)}
            />
          </div>
          <button 
            className="button-primary"
            onClick={handleAddGoal}
          >
            Add Goal
          </button>
        </div>
        
        {goals.length > 0 && (
          <div className="goals-list">
            <h3>Current Goals:</h3>
            <ul>
              {goals.map(goal => (
                <li key={goal.id}>
                  <div>
                    <span><strong>{goal.name}</strong></span>
                    <button 
                      onClick={() => removeGoal(goal.id)}
                    >
                      ✕
                    </button>
                  </div>
                  <div>
                    <span>Target Amount:</span>
                    <span>{formatCurrency(goal.amount)}</span>
                  </div>
                  <div>
                    <span>Deadline:</span>
                    <span>
                      {goal.deadline.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div>
                    <span><strong>Monthly Saving Required:</strong></span>
                    <span 
                      className={parseFloat(goal.monthlySavingRequired) > availableForSaving 
                        ? 'negative-amount' 
                        : 'positive-amount'}
                    >
                      {formatCurrency(goal.monthlySavingRequired)}
                    </span>
                  </div>
                  
                  {parseFloat(goal.monthlySavingRequired) > availableForSaving && (
                    <div className="warning-message">
                      Warning: This goal requires more monthly savings than currently available!
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default BudgetPlanner;