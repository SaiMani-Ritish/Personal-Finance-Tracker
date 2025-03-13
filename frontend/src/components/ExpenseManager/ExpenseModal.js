import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { EXPENSE_CATEGORIES } from '../../constants/expenseCategories';

const dayjs = require('dayjs');

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  p: 4,
};

const inputStyle = {
  mb: 2.5
};

//  Modal for adding and editing expenses
export function ExpenseModal({ open, onSubmit, onClose, expense }) {
  const [formData, setFormData] = React.useState({
    amount: '',
    category: '',
    description: '',
    date: null
  });

  // Set form data when expense prop changes
  React.useEffect(() => {
    if (expense) {
      setFormData({
        amount: expense.amount || '',
        category: expense.category || '',
        description: expense.description || '',
        date: dayjs(expense.date) || null
      });
    } else {
      setFormData({
        amount: '',
        category: '',
        description: '',
        date: null
      });
    }
  }, [expense]);

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...formData,
      date: formData.date
    });
    setFormData({
      amount: '',
      category: '',
      description: '',
      date: null
    });
  };

  // Close the modal
  const handleClose = () => {
    setFormData({
      amount: '',
      category: '',
      description: '',
      date: null
    });
    onClose();
  };

// Render the modal
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="expense-modal-title"
    >
      <Box sx={modalStyle}>
        <Typography 
          id="expense-modal-title" 
          variant="h5" 
          component="h2" 
          sx={{ 
            mb: 3, 
            color: '#2c3e50',
            fontWeight: 500
          }}
        >
          {expense ? 'Edit Expense' : 'Add Expense'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Amount"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            required
            sx={inputStyle}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1, color: '#2c3e50' }}>$</Typography>,
            }}
          />
          <TextField
            fullWidth
            select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            sx={inputStyle}
          >
            {EXPENSE_CATEGORIES.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            sx={inputStyle}
          />
          <DatePicker
            label="Date"
            value={formData.date}
            onChange={(newValue) => setFormData(prev => ({ ...prev, date: newValue }))}
            sx={inputStyle}
            slotProps={{ 
              textField: { 
                fullWidth: true,
                sx: inputStyle
              } 
            }}
          />
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth
              sx={{ 
                bgcolor: '#82ca9d',
                '&:hover': { bgcolor: '#6baf84' }
              }}
            >
              {expense ? 'Update' : 'Add'}
            </Button>
            <Button 
              type="button" 
              onClick={handleClose} 
              variant="outlined"
              fullWidth
              sx={{ 
                color: '#82ca9d',
                borderColor: '#82ca9d',
                '&:hover': { 
                  borderColor: '#6baf84',
                  color: '#6baf84'
                }
              }}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default ExpenseModal;
