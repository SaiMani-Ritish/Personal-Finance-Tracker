import * as React from 'react'
import ExpenseList from './ExpenseList';
import ExpenseModal from './ExpenseModal';
import { Box, Button, Container, Typography } from '@mui/material';
import { expenseService } from '../../services/expenseService';

export function ExpenseManager() {
  const [open, setOpen] = React.useState(false);
  const [selectedExpense, setSelectedExpense] = React.useState(null);
  const [expenses, setExpenses] = React.useState([]);

  // Fetch expenses when component mounts
  React.useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await expenseService.getAllExpenses();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      alert('Error fetching expenses');
    }
  };

  const handleSubmit = async (expenseData) => {
    try {
      if (selectedExpense) {
        // Update existing expense
        await expenseService.updateExpense(selectedExpense._id, expenseData);
      } else {
        // Add new expense
        await expenseService.addExpense(expenseData);
      }
      fetchExpenses(); // Refresh the list
      setSelectedExpense(null);
      setOpen(false);
    } catch (error) {
      console.error('Error saving expense:', error);
      alert('Error saving expense');
    }
  };

  const handleDelete = async (id) => {
    try {
      await expenseService.deleteExpense(id);
      fetchExpenses(); // Refresh the list
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Error deleting expense');
    }
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setOpen(true);
  };

  const handleOpen = () => {
    setSelectedExpense(null);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedExpense(null);
    setOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" sx={{ color: '#2c3e50', fontWeight: 500 }}>
          Expense Manager
        </Typography>
        <Button 
          variant="contained" 
          onClick={handleOpen}
          sx={{ 
            bgcolor: '#1976d2',
            '&:hover': { bgcolor: '#1565c0' },
            px: 3
          }}
        >
          Add Expense
        </Button>
      </Box>
      <ExpenseModal open={open} onSubmit={handleSubmit} onClose={handleClose} expense={selectedExpense} />
      <ExpenseList expenses={expenses} onEdit={handleEdit} onDelete={handleDelete} />
    </Container>
  );
}

export default ExpenseManager;
