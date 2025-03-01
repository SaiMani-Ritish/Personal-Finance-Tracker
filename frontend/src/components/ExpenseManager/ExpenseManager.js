import * as React from 'react'
import ExpenseList from './ExpenseList';
import ExpenseModal from './ExpenseModal';
import { Box, Button } from '@mui/material';
import './ExpenseManager.css';

export function ExpenseManager() {
  const [open, setOpen] = React.useState(false);
  const [selectedExpense, setSelectedExpense] = React.useState(null);
  const [expenses, setExpenses] = React.useState([
    { amount: 150, category: 'Online Shopping', description: 'Amazon', date: '2025-02-01' },
    { amount: 200, category: 'Groceries', description: 'Whole Foods', date: '2025-02-02' }
  ]);

  const handleSubmit = () => {
    setSelectedExpense(null);
    setOpen(false);
  }

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setOpen(true);
  }

  const handleOpen = () => {
    setSelectedExpense(null);
    setOpen(true);
  }

  const handleClose = () => {
    setSelectedExpense(null);
    setOpen(false);
  }

  return (
    <Box class="expense-manager-box">
      <Box className="add-expense-button">
        <Button type="button" variant='contained' onClick={handleOpen}>
          Add Expenses
        </Button>
      </Box>
      <ExpenseModal open={open} onSubmit={handleSubmit} onClose={handleClose} expense={selectedExpense} />
      <ExpenseList expenses={expenses} onEdit={handleEdit} />
    </Box>
  );
}

export default ExpenseManager;
