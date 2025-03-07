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
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

function BudgetPlanner() {
  const [income, setIncome] = useState('');
  const [goals, setGoals] = useState([]);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalAmount, setNewGoalAmount] = useState('');
  const [newGoalDeadline, setNewGoalDeadline] = useState(null);
  const [monthlyExpense, setMonthlyExpense] = useState('');
  const [availableForSaving, setAvailableForSaving] = useState(0);

  // Calculate available income after expenses
  useEffect(() => {
    const availableAmount = parseFloat(income || 0) - parseFloat(monthlyExpense || 0);
    setAvailableForSaving(availableAmount);
  }, [income, monthlyExpense]);

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

  // Remove a goal
  const removeGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ 
        color: '#000',
        fontWeight: 600,
        mb: 4
      }}>
        Budget Planner
      </Typography>
    
      {/* Top Section - Income/Expenses and Saving Summary side by side */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 4 }}>
        {/* Income and Expenses Card */}
        <Paper elevation={2} sx={{ 
          p: 3, 
          borderRadius: 2,
          bgcolor: '#fff',
          '&:hover': { boxShadow: 6 },
          transition: 'box-shadow 0.3s'
        }}>
          <Typography variant="h6" gutterBottom sx={{ 
            color: '#000',
            fontWeight: 600,
            mb: 3
          }}>
            Monthly Budget
          </Typography>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Monthly Income"
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="0.00"
              InputProps={{
                startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                },
              }}
            />
            <TextField
              fullWidth
              label="Monthly Expenses"
              type="number"
              value={monthlyExpense}
              onChange={(e) => setMonthlyExpense(e.target.value)}
              placeholder="0.00"
              InputProps={{
                startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                },
              }}
            />
          </Stack>
        </Paper>

        {/* Saving Summary Card */}
        <Paper elevation={2} sx={{ 
          p: 3, 
          borderRadius: 2,
          bgcolor: '#fff',
          '&:hover': { boxShadow: 6 },
          transition: 'box-shadow 0.3s'
        }}>
          <Typography variant="h6" gutterBottom sx={{ 
            color: '#000',
            fontWeight: 600,
            mb: 3
          }}>
            Saving Summary
          </Typography>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
              <Typography sx={{ fontWeight: 500 }}>Monthly Income:</Typography>
              <Typography sx={{ fontWeight: 500 }}>{formatCurrency(parseFloat(income || 0))}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
              <Typography sx={{ fontWeight: 500 }}>Monthly Expenses:</Typography>
              <Typography sx={{ fontWeight: 500 }}>{formatCurrency(parseFloat(monthlyExpense || 0))}</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Available for Saving:
              </Typography>
              <Typography 
                sx={{ 
                  fontWeight: 600,
                  color: availableForSaving < 0 ? '#d32f2f' : '#2e7d32'
                }}
              >
                {formatCurrency(availableForSaving)}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Box>
    
      {/* Goals Section */}
      <Paper elevation={2} sx={{ 
        p: 3, 
        borderRadius: 2,
        bgcolor: '#fff',
        '&:hover': { boxShadow: 6 },
        transition: 'box-shadow 0.3s'
      }}>
        <Typography variant="h6" gutterBottom sx={{ 
          color: '#000',
          fontWeight: 600,
          mb: 3
        }}>
          Savings Goals
        </Typography>
        
        <Stack spacing={3} sx={{ mb: 4 }}>
          <TextField
            fullWidth
            label="Goal Name"
            value={newGoalName}
            onChange={(e) => setNewGoalName(e.target.value)}
            placeholder="e.g., Car, House"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
              },
            }}
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
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
              },
            }}
          />
          <DatePicker
            label="Target Date"
            value={newGoalDeadline}
            onChange={(newValue) => setNewGoalDeadline(newValue)}
            slotProps={{ 
              textField: { 
                fullWidth: true,
                sx: {
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                }
              } 
            }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleAddGoal}
            disabled={!newGoalName || !newGoalAmount || !newGoalDeadline}
            sx={{ 
              bgcolor: '#1976d2',
              color: 'white',
              py: 1.5,
              fontWeight: 600,
              '&:hover': { 
                bgcolor: '#1565c0',
                boxShadow: 3
              },
              '&.Mui-disabled': { 
                bgcolor: '#e0e0e0',
                color: '#9e9e9e'
              }
            }}
          >
            Add Goal
          </Button>
        </Stack>
        
        {goals.length > 0 && (
          <List sx={{ width: '100%' }}>
            {goals.map(goal => (
              <ListItem
                key={goal.id}
                sx={{ 
                  bgcolor: '#f8f8f8',
                  borderRadius: 2,
                  mb: 2,
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  p: 2,
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                    boxShadow: 2
                  },
                  transition: 'all 0.3s'
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ 
                      color: '#000',
                      fontWeight: 600,
                      mb: 1
                    }}>
                      {goal.name}
                    </Typography>
                  }
                  secondary={
                    <Stack spacing={1} sx={{ mt: 1 }}>
                      <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 500 }}>
                        Target: {formatCurrency(goal.amount)}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 500 }}>
                        Monthly Saving: {formatCurrency(goal.monthlySavingRequired)}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 500 }}>
                        By: {dayjs(goal.deadline).format('MMM D, YYYY')}
                      </Typography>
                      {parseFloat(goal.monthlySavingRequired) > availableForSaving && (
                        <Typography sx={{ 
                          color: '#d32f2f',
                          bgcolor: '#ffebee',
                          p: 1,
                          borderRadius: 1,
                          mt: 1
                        }}>
                          This goal requires more monthly savings than your current savings!
                        </Typography>
                      )}
                    </Stack>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton 
                    edge="end" 
                    onClick={() => removeGoal(goal.id)}
                    sx={{ 
                      color: '#d32f2f',
                      '&:hover': {
                        bgcolor: '#ffebee'
                      }
                    }}
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