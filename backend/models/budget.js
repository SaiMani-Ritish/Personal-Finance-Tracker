const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  period: {
    type: String,
    enum: ['monthly', 'yearly'],
    required: [true, 'Period is required']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Budget', budgetSchema);
