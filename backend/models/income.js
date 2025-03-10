const mongoose = require('mongoose');

// Income schema
const incomeSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  source: {
    type: String,
    required: [true, 'Source is required']
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
      amount_text_source_text_date_text: {
        amount: 'text',
        source: 'text',
        date: 'text',
      }
    }
  ]
});

module.exports = mongoose.model('Income', incomeSchema);
