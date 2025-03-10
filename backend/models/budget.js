const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: [0, 'Amount cannot be negative']
    },
    deadline: {
        type: Date,
        required: true
    },
    monthlySavingRequired: {
        type: Number,
        required: true
    }
});

const budgetSchema = new mongoose.Schema({
    income: {
        type: Number,
        default: 0,
        min: [0, 'Income cannot be negative']
    },
    monthlyExpense: {
        type: Number,
        default: 0,
        min: [0, 'Monthly expense cannot be negative']
    },
    goals: [goalSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Budget', budgetSchema);
