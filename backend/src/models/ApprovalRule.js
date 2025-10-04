// src/models/ApprovalRule.js
const mongoose = require('mongoose');

const ApprovalRuleSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  name: String, // e.g., "Standard Expense Approval"
  isActive: { type: Boolean, default: true },
  approvers: [
    {
      role: { type: String, enum: ['manager','finance','director','admin'], required: true },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional specific approver
      step: Number // sequence order
    }
  ],
  ruleType: { type: String, enum: ['percentage','specific','hybrid'], default: 'percentage' },
  percentage: Number, // for percentage rule
  specificApprover: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // for specific approver rule
}, { timestamps: true });

module.exports = mongoose.model('ApprovalRule', ApprovalRuleSchema);
