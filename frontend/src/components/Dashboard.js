import React, { useEffect, useState } from 'react';
import { expenseService } from '../services/expenseService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const data = await expenseService.getAllExpenses();
                setExpenses(data);
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

    const budgetData = [
        { name: 'Rent', budget: 1000 },
        { name: 'Groceries', budget: 500 },
        { name: 'Utilities', budget: 300 },
        { name: 'Entertainment', budget: 200 },
        { name: 'Miscellaneous', budget: 100 }
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
                    <div className="bar-chart-container">
                        <h3>Expenses Bar Graph</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="amount" fill="#82ca9d" barSize={50} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="bar-chart-container">
                        <h3>Budget Planner</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={budgetData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="budget" fill="#8884d8" barSize={50} />
                            </BarChart>
                        </ResponsiveContainer>
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

