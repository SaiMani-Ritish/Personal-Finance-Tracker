import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, FormControl, MenuItem, Modal, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import './ExpenseModal.css';

export function ExpenseModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [date, setDate] = React.useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log({
      date
    });
  };

  return (
    <div>
      <Box className="add-expense-button">
        <Button type="button" onClick={handleOpen} variant='contained'>
          Add Expenses
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box className="modal-box">
          <h2>
            Add Expenses
          </h2>
          <FormControl className="form" onSubmit={handleSubmit}>
            <TextField fullWidth className="textfield" label="Amount" variant="outlined" />
            <TextField
              className="textfield"
              fullWidth
              select
              label="Category"
            >
              <MenuItem>
                Shopping
              </MenuItem>
              <MenuItem>
                Rent
              </MenuItem>
              <MenuItem>
                Pet
              </MenuItem>
            </TextField>
            <TextField fullWidth className="textfield" label="Description" variant="outlined" />
            <DatePicker
              className="textfield"
              fullWidth
              label="Date"
              value={date}
              slotProps={{ textField: { fullWidth: true } }}
              onChange={(newValue) => setDate(newValue)}
            />
            <div></div>
            <Button type="submit" variant="contained" onClick={handleClose}>
              Submit
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}
export default ExpenseModal;


