const Expense = require('../models/Expense');
const User = require('../models/User');
const ApprovalRule = require('../models/ApprovalRule');

// Approve or Reject an expense with conditional rules
exports.approveOrRejectExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const { action, comment } = req.body; // action: 'approve' or 'reject'
    const userId = req.user.id;
    const userRole = req.user.role;

    // Fetch expense with approvals
    const expense = await Expense.findById(expenseId).populate('approvals.approver', 'name role');
    if (!expense) return res.status(404).json({ error: 'Expense not found' });

    // Find the approval step for this user/role
    const approvalStep = expense.approvals.find(app =>
      (!app.approved && !app.rejected) && 
      ((app.approver && app.approver._id.toString() === userId) || app.role === userRole)
    );

    if (!approvalStep) return res.status(403).json({ error: 'You are not an approver for this expense' });

    // Update approval step
    if (action === 'approve') approvalStep.approved = true;
    else if (action === 'reject') approvalStep.rejected = true;
    approvalStep.comment = comment || '';
    approvalStep.approvedAt = Date.now();

    // -------------------------------
    // Conditional Approval Logic
    // -------------------------------
    let allApproved = false;

    const totalApprovers = expense.approvals.length;
    const approvedCount = expense.approvals.filter(a => a.approved).length;
    const rejectedCount = expense.approvals.filter(a => a.rejected).length;

    // Fetch approval rule (assume only 1 active per company)
    const rule = await ApprovalRule.findOne({ companyId: expense.companyId, isActive: true });

    if (rejectedCount > 0) {
      expense.status = 'rejected';
    } else if (rule) {
      switch (rule.ruleType) {
        case 'percentage':
          if ((approvedCount / totalApprovers) * 100 >= rule.percentage) allApproved = true;
          break;

        case 'specific':
          if (expense.approvals.some(a => a.approver && a.approver._id.equals(rule.specificApprover) && a.approved)) {
            allApproved = true;
          }
          break;

        case 'hybrid':
          const percentageMet = rule.percentage ? ((approvedCount / totalApprovers) * 100 >= rule.percentage) : false;
          const specificMet = rule.specificApprover ? expense.approvals.some(a => a.approver && a.approver._id.equals(rule.specificApprover) && a.approved) : false;
          if (percentageMet || specificMet) allApproved = true;
          break;
      }

      expense.status = allApproved ? 'approved' : 'pending';
    } else {
      // fallback: sequential approval
      if (approvedCount === totalApprovers) expense.status = 'approved';
      else expense.status = 'pending';
    }

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
      approvals: {
        $elemMatch: {
          $or: [{ approver: userId }, { role: userRole }],
          approved: false,
          rejected: { $ne: true }
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
