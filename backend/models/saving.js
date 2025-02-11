const mongoose = require('mongoose');

const savingSchema = new mongoose.Schema({
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
  goal: {
    type: String,
    required: [true, 'Goal is required']
  },
  targetDate: {
    type: Date,
    required: [true, 'Target date is required']
  },
  progress: {
    type: Number,
    default: 0,
    min: [0, 'Progress cannot be negative']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Saving', savingSchema);
