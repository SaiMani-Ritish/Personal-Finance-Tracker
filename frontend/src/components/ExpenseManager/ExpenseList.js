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
import DeleteExpense from './DeleteExpense';

const dayjs = require('dayjs');

export function ExpenseList({ expenses, onEdit, onDelete }) {
  return (
    <Box>
      <TableContainer 
        component={Paper} 
        sx={{ 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="expense table">
          <colgroup>
            <col width="15%" />
            <col width="20%" />
            <col width="25%" />
            <col width="20%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f8f9fa' }}>
              <TableCell 
                sx={{ 
                  fontWeight: 600, 
                  color: '#2c3e50',
                  fontSize: '0.95rem',
                  py: 2
                }}
              >
                Amount
              </TableCell>
              <TableCell 
                sx={{ 
                  fontWeight: 600, 
                  color: '#2c3e50',
                  fontSize: '0.95rem',
                  py: 2
                }}
              >
                Category
              </TableCell>
              <TableCell 
                sx={{ 
                  fontWeight: 600, 
                  color: '#2c3e50',
                  fontSize: '0.95rem',
                  py: 2
                }}
              >
                Description
              </TableCell>
              <TableCell 
                sx={{ 
                  fontWeight: 600, 
                  color: '#2c3e50',
                  fontSize: '0.95rem',
                  py: 2
                }}
              >
                Date
              </TableCell>
              <TableCell 
                sx={{ 
                  fontWeight: 600, 
                  color: '#2c3e50',
                  fontSize: '0.95rem',
                  py: 2
                }}
              >
                Edit
              </TableCell>
              <TableCell 
                sx={{ 
                  fontWeight: 600, 
                  color: '#2c3e50',
                  fontSize: '0.95rem',
                  py: 2
                }}
              >
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow 
                key={expense._id}
                sx={{ 
                  '&:hover': { bgcolor: '#f8f9fa' },
                  transition: 'background-color 0.2s'
                }}
              >
                <TableCell sx={{ color: '#2c3e50' }}>
                  ${parseFloat(expense.amount).toFixed(2)}
                </TableCell>
                <TableCell sx={{ color: '#2c3e50' }}>
                  {expense.category}
                </TableCell>
                <TableCell sx={{ color: '#2c3e50' }}>
                  {expense.description}
                </TableCell>
                <TableCell sx={{ color: '#2c3e50' }}>
                  {dayjs(expense.date).format('MMM D, YYYY')}
                </TableCell>
                <TableCell>
                  <IconButton 
                    onClick={() => onEdit(expense)}
                    sx={{ 
                      color: '#82ca9d',
                      '&:hover': { 
                        color: '#6baf84',
                        bgcolor: 'rgba(130, 202, 157, 0.1)'
                      }
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
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
