import * as React from 'react'
import ExpenseList from './ExpenseList';
import ExpenseModal from './ExpenseModal';
import { Box } from '@mui/material';
import './ExpenseManager.css';

export function ExpenseManager() {
  return (
    <Box class="expense-manager-box">
      <ExpenseModal />
      <ExpenseList />
    </Box>
  );
}

export default ExpenseManager;
