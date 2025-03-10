import React, { useEffect, useState } from 'react';
import { expenseService } from '../services/expenseService';
import { budgetService } from '../services/budgetService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [income, setIncome] = useState(0);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch expenses
                const expenseData = await expenseService.getAllExpenses();
                setExpenses(expenseData);
                const total = expenseData.reduce((sum, expense) => sum + expense.amount, 0);
                setTotalExpense(total);

                // Fetch budget data for income
                const budgetData = await budgetService.getBudget();
                if (budgetData.data && budgetData.data.income) {
                    setIncome(budgetData.data.income);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, []);

    const barChartData = expenses.map(expense => ({
        name: expense.category,
        amount: expense.amount
    }));

    const savings = income - totalExpense;

    const budgetData = [
        { name: 'Expense', value: totalExpense },
        { name: 'Savings', value: savings }
    ];

    const allData = [
        { name: 'Income', value: income },
        { name: 'Expense', value: totalExpense },
        { name: 'Savings', value: savings }
    ];

    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            {expenses.length > 0 ? (
                <>
                    <div className="charts-container">
                        <div className="chart-container">
                            <h3>Expenses Bar Graph</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="amount" fill="#82ca9d" barSize={50} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="chart-container">
                            <h3>Budget Overview</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={budgetData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, value }) => `${name}: $${value}`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {budgetData.map((entry) => (
                                            <Cell key={`cell-${entry.name}`} fill={entry.name === 'Expense' ? COLORS[1] : COLORS[2]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `$${value}`} />
                                    <Legend 
                                        payload={allData.map((item, index) => ({
                                            id: item.name,
                                            type: 'square',
                                            value: `${item.name}: $${item.value}`,
                                            color: COLORS[index]
                                        }))}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </>
            ) : (
                <p>No Expenses Found</p>
            )}
        </div>
    );
};

export default Dashboard;
