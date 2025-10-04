// src/controllers/approvalController.js
const Expense = require('../models/Expense');
const User = require('../models/User');

// Approve or Reject an expense
exports.approveOrRejectExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const { action, comment } = req.body; // 'approve' or 'reject'
    const userId = req.user.id;
    const userRole = req.user.role;

    // Fetch expense
    const expense = await Expense.findById(expenseId).populate('approvals.approver', 'name role');
    if (!expense) return res.status(404).json({ error: 'Expense not found' });

    // Find the approval step for this user/role
    const approvalStep = expense.approvals.find(app =>
      (app.approver && app.approver._id.toString() === userId) || app.role === userRole
    );

    if (!approvalStep) return res.status(403).json({ error: 'You are not an approver for this expense' });
    if (approvalStep.approved !== undefined) return res.status(400).json({ error: 'You have already approved/rejected this expense' });

    // Update approval step
    approvalStep.approved = action === 'approve';
    approvalStep.comment = comment || '';
    approvalStep.approvedAt = Date.now();

    // -----------------------------
    // Evaluate Expense Status
    // -----------------------------
    let status = 'pending';

    if (expense.approvals.some(a => a.approved === false)) {
      // Any rejection immediately rejects the expense
      status = 'rejected';
    } else {
      // Evaluate based on ruleType
      const { ruleType, percentage, specificApprover } = expense;

      if (ruleType === 'percentage') {
        const approvedCount = expense.approvals.filter(a => a.approved).length;
        const total = expense.approvals.length;
        if ((approvedCount / total) * 100 >= percentage) status = 'approved';
      } else if (ruleType === 'specific') {
        if (expense.approvals.some(a => a.approver?._id.toString() === specificApprover?.toString() && a.approved)) {
          status = 'approved';
        }
      } else if (ruleType === 'hybrid') {
        const approvedCount = expense.approvals.filter(a => a.approved).length;
        const total = expense.approvals.length;
        const specificApproved = expense.approvals.some(a => a.approver?._id.toString() === specificApprover?.toString() && a.approved);
        if (specificApproved || (approvedCount / total) * 100 >= percentage) status = 'approved';
      } else {
        // sequential fallback
        if (expense.approvals.every(a => a.approved)) status = 'approved';
      }
    }

    expense.status = status;
    await expense.save();

    res.json({ message: `Expense ${action}d successfully`, expense });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get pending approvals for logged-in approver
exports.getPendingApprovals = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    // Find expenses where this user/role is in approvals and not yet approved/rejected
    const expenses = await Expense.find({
      'approvals': {
        $elemMatch: {
          $or: [{ approver: userId }, { role: userRole }],
          approved: { $exists: false }
        }
      },
      status: 'pending'
    }).populate('submittedBy', 'name email role');

    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
