import React, { useEffect, useState } from 'react';
import { expenseService } from '../services/expenseService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [totalExpense, setTotalExpense] = useState(0);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
    const EXPENSE_COLOR = COLORS[1];
    const SAVINGS_COLOR = COLORS[2];

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const data = await expenseService.getAllExpenses();
                setExpenses(data);
                const total = data.reduce((sum, expense) => sum + expense.amount, 0);
                setTotalExpense(total);
            } catch (error) {
                console.error('Failed to fetch expenses', error);
            }
        };

        fetchExpenses();
    }, []);

    const barChartData = expenses.map(expense => ({
        name: expense.category,
        amount: expense.amount
    }));

    const income = 5000; // Monthly income
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

    const handleChatbotQuery = () => {
        if (query.toLowerCase().includes('groceries')) {
            setResponse('You spent $500 on Groceries this month.');
        } else if (query.toLowerCase().includes('rent')) {
            setResponse('Your Rent budget is set to $1000.');
        } else {
            setResponse('Sorry, I cannot understand the query.');
        }
    };

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
                                            <Cell key={`cell-${entry.name}`} fill={entry.name === 'Expense' ? EXPENSE_COLOR : SAVINGS_COLOR} />
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
                    <div className="chatbot-container">
                        <h3>Expense Query Chatbot</h3>
                        <input 
                            type="text" 
                            placeholder="Ask about your expenses..." 
                            value={query} 
                            onChange={(e) => setQuery(e.target.value)} 
                        />
                        <button onClick={handleChatbotQuery}>Ask</button>
                        <p>{response}</p>
                    </div>
                </>
            ) : (
                <p>No Expenses Found</p>
            )}
        </div>
    );
};

export default Dashboard;
