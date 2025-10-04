// src/models/Expense.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  title: String,
  description: String,
  amount: Number,
  currency: String,
  originalAmount: Number,       // store original currency value
  originalCurrency: String,
  date: { type: Date, default: Date.now },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  
  approvals: [
    {
      role: String,
      approver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
      approved: { type: Boolean, default: false },
      comment: String,
      approvedAt: Date
    }
  ],

  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },

  // NEW: approval rule information
  ruleType: { type: String, enum: ['percentage', 'specific', 'hybrid', 'sequential'], default: 'sequential' },
  percentage: { type: Number, default: 0 }, // e.g., 60 for 60%
  specificApprover: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
});

module.exports = mongoose.model('Expense', expenseSchema);
