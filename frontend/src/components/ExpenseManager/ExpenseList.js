import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

function createData(User, amount, category, description, date) {
    return { User, amount, category, description, date };
  }
const rows = [
    createData("User 1", 159, 'Category 1', 'Description 1', '2023-09-01'),
    createData("User 2", 237, 'Category 2', 'Description 2', '2023-09-02')
  ];
  
export  function ExpenseList() {
    return(
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User Name </TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">category</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.User}
                </TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.category}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" startIcon={<EditIcon />}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button variant="outlined" startIcon={<DeleteIcon />}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}
export default ExpenseList;

