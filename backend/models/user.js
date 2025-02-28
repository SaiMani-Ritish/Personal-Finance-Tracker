const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: function(v) {
        return /\S+@\S+\.\S+/.test(v);
      },
      message: 'Invalid email format'
    }
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  phoneNo: { 
    type: String,
    validate: {
      validator: function(v) {
        return /^\d+$/.test(v);
      },
      message: 'Phone number must contain only digits'
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
