import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, FormControl, MenuItem, Modal, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import './ExpenseModal.css';

const dayjs = require('dayjs');

export function ExpenseModal({ open, onSubmit, onClose, expense }) {
  const [category, setCategory] = React.useState(expense ? expense.category : '');
  const [date, setDate] = React.useState();

  React.useEffect(() => {
    if (expense) {
      setCategory(expense.category);
      setDate(dayjs(expense.date));
    }
  }, [expense]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Complete submission first and then clear cateogry
    onSubmit();
    setCategory('');
  };

  const handleClose = () => {
    setCategory('');
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
          <FormControl className="form" onSubmit={handleSubmit}>
            <TextField fullWidth className="textfield" label="Amount" variant="outlined" value={expense ? expense.amount : ''} />
            <TextField
              className="textfield"
              fullWidth
              select
              label="Category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <MenuItem  value="Online Shopping">
                Online Shopping
              </MenuItem>
              <MenuItem value="Groceries">
                Groceries
              </MenuItem>
              <MenuItem value="Rent">
                Rent
              </MenuItem>
            </TextField>
            <TextField fullWidth className="textfield" label="Description" variant="outlined" value={expense ? expense.description : ''} />
            <DatePicker
              className="textfield"
              fullWidth
              label="Date"
              value={date}
              slotProps={{ textField: { fullWidth: true } }}
              onChange={(newValue) => setDate(newValue)}
            />
            <div></div>
            <Button type="submit" variant="contained" onClick={onSubmit}>
              Submit
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}
export default ExpenseModal;


