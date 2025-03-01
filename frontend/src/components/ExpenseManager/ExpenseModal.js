import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, MenuItem, Modal, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { EXPENSE_CATEGORIES } from '../../constants/expenseCategories';
import './ExpenseModal.css';

const dayjs = require('dayjs');

export function ExpenseModal({ open, onSubmit, onClose, expense }) {
  const [formData, setFormData] = React.useState({
    amount: '',
    category: '',
    description: '',
    date: null
  });

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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

  const handleClose = () => {
    setFormData({
      amount: '',
      category: '',
      description: '',
      date: null
    });
    onClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box className="modal-box">
          <h2>
            {expense ? 'Edit Expense' : 'Add Expenses'}
          </h2>
          <form className="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              className="textfield"
              label="Amount"
              name="amount"
              type="number"
              variant="outlined"
              value={formData.amount}
              onChange={handleChange}
              required
            />
            <TextField
              className="textfield"
              fullWidth
              select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {EXPENSE_CATEGORIES.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              className="textfield"
              label="Description"
              name="description"
              variant="outlined"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <DatePicker
              label="Date"
              value={formData.date}
              slotProps={{ textField: { fullWidth: true } }}
              onChange={(newValue) => setFormData(prev => ({ ...prev, date: newValue }))}
              className="textfield"
            />
            <Box className="button-group">
              <Button type="submit" variant="contained" color="primary">
                {expense ? 'Update' : 'Add'}
              </Button>
              <Button type="button" onClick={handleClose} variant="outlined">
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
export default ExpenseModal;
