const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    trim: true
  },

  amount: {
    type: Number,
    required: true
  },

  currency: {
    type: String,
    default: 'INR'  // Default company currency
  },

  date: {
    type: Date,
    required: true,
    default: Date.now
  },

  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },

  approvals: [
    {
      approver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      role: { type: String, enum: ['manager', 'finance', 'director'] },
      approved: { type: Boolean, default: false },
      approvedAt: { type: Date },
      comment: { type: String }
    }
  ],

  ocrData: {
    vendor: { type: String },
    expenseType: { type: String },
    lines: [{ description: String, amount: Number }]
  },

  dateCreated: {
    type: Date,
    default: Date.now
  },

  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Update `lastUpdated` automatically
expenseSchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  next();
});

module.exports = mongoose.model('Expense', expenseSchema);
