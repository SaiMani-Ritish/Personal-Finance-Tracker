import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton } from '@mui/material';
import './ExpenseList.css';
import DeleteExpense from './DeleteExpense';

const dayjs = require('dayjs');

export function ExpenseList({ expenses, onEdit, onDelete }) {
  return (
    <Box className="expense-list-box">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <colgroup>
            <col width="10%" />
            <col width="20%" />
            <col width="30%" />
            <col width="20%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell align="left">Amount</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Edit</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense._id}>
                <TableCell align="left">{expense.amount}</TableCell>
                <TableCell align="left">{expense.category}</TableCell>
                <TableCell align="left">{expense.description}</TableCell>
                <TableCell align="left">{dayjs(expense.date).format('YYYY-MM-DD')}</TableCell>
                <TableCell align="left">
                  <IconButton onClick={() => onEdit(expense)}>
                    <EditIcon color="primary" />
                  </IconButton>
                </TableCell>
                <TableCell align="left">
                  <DeleteExpense expense={expense} onDelete={onDelete} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
export default ExpenseList;
