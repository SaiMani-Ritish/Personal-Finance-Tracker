const mongoose = require('mongoose');

// Expense schema
const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  indexes: [
    {
      amount_text_category_text_date_text: {
        amount: 'text',
        category: 'text',
        date: 'text',
      }
    }
  ]
});

module.exports = mongoose.model('Expense', expenseSchema);
