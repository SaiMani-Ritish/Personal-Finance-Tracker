import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Paper, 
  Stack,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';

function BudgetPlanner() {
  const [income, setIncome] = useState('');
  const [goals, setGoals] = useState([]);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalAmount, setNewGoalAmount] = useState('');
  const [newGoalDeadline, setNewGoalDeadline] = useState(null);
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
        deadline: newGoalDeadline.toDate(),
        monthlySavingRequired: calculateMonthlySaving(parseFloat(newGoalAmount), newGoalDeadline.toDate())
      };
      
      setGoals([...goals, newGoal]);
      setNewGoalName('');
      setNewGoalAmount('');
      setNewGoalDeadline(null);
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
    <Container maxWidth="lg" sx={{ py: 4, bgcolor: '#f4f4f4', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Budget Planner
      </Typography>
      
      {/* Income Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Monthly Income
        </Typography>
        <TextField
          fullWidth
          label="Income"
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          placeholder="0.00"
          InputProps={{
            startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
          }}
        />
      </Paper>
      
      {/* Expenses Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Monthly Expenses
        </Typography>
        
        <Stack spacing={2} sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Expense Name"
            value={newExpenseName}
            onChange={(e) => setNewExpenseName(e.target.value)}
            placeholder="e.g., Rent, Utilities"
          />
          <TextField
            fullWidth
            label="Expense Amount"
            type="number"
            value={newExpenseAmount}
            onChange={(e) => setNewExpenseAmount(e.target.value)}
            placeholder="0.00"
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
            }}
          />
          <Button 
            variant="contained" 
            onClick={handleAddExpense}
            sx={{ 
              bgcolor: '#1976d2',
              '&:hover': { bgcolor: '#1565c0' },
              px: 3
            }}
          >
            Add Expense
          </Button>
        </Stack>
        
        {expenses.length > 0 && (
          <List>
            {expenses.map(expense => (
              <ListItem
                key={expense.id}
                sx={{ 
                  bgcolor: '#f8f8f8',
                  borderRadius: 1,
                  mb: 1,
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" fontWeight="bold">
                      {expense.name}
                    </Typography>
                  }
                  secondary={
                    <Stack spacing={1} sx={{ mt: 1 }}>
                      <Typography variant="body2">
                        Amount: {formatCurrency(expense.amount)}
                      </Typography>
                    </Stack>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton 
                    edge="end" 
                    onClick={() => removeExpense(expense.id)}
                    sx={{ color: 'error.main' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Total Expenses:
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            {formatCurrency(totalExpenses)}
          </Typography>
        </Box>
      </Paper>
      
      {/* Saving Summary */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Saving Summary
        </Typography>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Monthly Income:</Typography>
            <Typography>{formatCurrency(parseFloat(income || 0))}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Monthly Expenses:</Typography>
            <Typography>{formatCurrency(totalExpenses)}</Typography>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Available for Saving:
            </Typography>
            <Typography 
              color={availableForSaving < 0 ? 'error' : 'success.main'}
              fontWeight="bold"
            >
              {formatCurrency(availableForSaving)}
            </Typography>
          </Box>
        </Stack>
      </Paper>
      
      {/* Goals Section */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Savings Goals
        </Typography>
        
        <Stack spacing={2} sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Goal Name"
            value={newGoalName}
            onChange={(e) => setNewGoalName(e.target.value)}
            placeholder="e.g., Car, House"
          />
          <TextField
            fullWidth
            label="Target Amount"
            type="number"
            value={newGoalAmount}
            onChange={(e) => setNewGoalAmount(e.target.value)}
            placeholder="0.00"
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
            }}
          />
          <DatePicker
            label="Target Date"
            value={newGoalDeadline}
            onChange={(newValue) => setNewGoalDeadline(newValue)}
            slotProps={{ textField: { fullWidth: true } }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleAddGoal}
            disabled={!newGoalName || !newGoalAmount || !newGoalDeadline}
            sx={{ 
              bgcolor: '#82ca9d', 
              '&:hover': { bgcolor: '#6baf84' },
              '&.Mui-disabled': { bgcolor: '#e0e0e0' }
            }}
          >
            Add Goal
          </Button>
        </Stack>
        
        {goals.length > 0 && (
          <List>
            {goals.map(goal => (
              <ListItem
                key={goal.id}
                sx={{ 
                  bgcolor: '#f8f8f8',
                  borderRadius: 1,
                  mb: 1,
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" fontWeight="bold">
                      {goal.name}
                    </Typography>
                  }
                  secondary={
                    <Stack spacing={1} sx={{ mt: 1 }}>
                      <Typography variant="body2">
                        Target: {formatCurrency(goal.amount)}
                      </Typography>
                      <Typography variant="body2">
                        Monthly Saving: {formatCurrency(goal.monthlySavingRequired)}
                      </Typography>
                      <Typography variant="body2">
                        By: {dayjs(goal.deadline).format('MMM D, YYYY')}
                      </Typography>
                      {parseFloat(goal.monthlySavingRequired) > availableForSaving && (
                        <Typography color="error" variant="body2">
                          Warning: This goal requires more monthly savings than currently available!
                        </Typography>
                      )}
                    </Stack>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton 
                    edge="end" 
                    onClick={() => removeGoal(goal.id)}
                    sx={{ color: 'error.main' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
}

export default BudgetPlanner;