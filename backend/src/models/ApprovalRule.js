const mongoose = require('mongoose');

const approvalRuleSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },

  name: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    trim: true
  },

  type: {
    type: String,
    enum: ['sequential', 'parallel'],
    default: 'sequential'
  },


  approvers: [
    {
      role: { type: String, enum: ['manager', 'finance', 'director'] },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
      isMandatory: { type: Boolean, default: false } 
    }
  ],

  percentageRule: {
    type: Number, // e.g., 60 means 60% of approvers must approve
    default: null
  },

  specificApproverRule: {
    type: mongoose.Schema.Types.ObjectId, // If this user approves, auto-approved
    ref: 'User',
    default: null
  },

  isActive: {
    type: Boolean,
    default: true
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


approvalRuleSchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  next();
});

module.exports = mongoose.model('ApprovalRule', approvalRuleSchema);
