import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// ExpenseChart component
const ExpenseChart = ({ expenses }) => {
    const data = {
        labels: expenses.map(expense => expense.category),
        datasets: [
            {
                label: 'Expense Amount',
                data: expenses.map(expense => expense.amount),
                backgroundColor: '#3f51b5', // Blue Color
                borderColor: '#3f51b5',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <Card style={{ maxWidth: '400px', margin: '0 auto' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Expense Distribution
                </Typography>
                <div style={{ height: '250px' }}>
                    <Bar data={data} options={options} />
                </div>
            </CardContent>
        </Card>
    );
};

export default ExpenseChart;
