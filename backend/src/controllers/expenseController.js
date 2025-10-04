// src/controllers/expenseController.js
const Expense = require('../models/Expense');
const User = require('../models/User');
const ApprovalRule = require('../models/ApprovalRule');
const { processReceipt } = require('../services/ocrService');
const { convertCurrency } = require('../services/currencyService');
const fs = require('fs');

// Submit a new expense (Employee role) with currency conversion and dynamic approval rules
exports.submitExpense = async (req, res) => {
  try {
    const { title, description, amount, currency, date } = req.body;
    const submittedBy = req.user.id;

    // Fetch user & company default currency
    const user = await User.findById(submittedBy).populate('companyId');
    const companyCurrency = user.companyId.defaultCurrency || 'USD';

    // Convert amount to company currency
    const convertedAmount = await convertCurrency(amount, currency, companyCurrency);

    // Fetch active approval rules
    const approvalRules = await ApprovalRule.find({ companyId: user.companyId, isActive: true });

    // Pick first rule (or fallback sequential)
    const appliedRule = approvalRules[0];

    // Map approval steps
    let approvalsArray = [];
    appliedRule?.approvers.forEach(app => {
      approvalsArray.push({
        role: app.role,
        approver: app.user || null
      });
    });

    // Create expense with dynamic rule info
    const expense = new Expense({
      title,
      description,
      amount: convertedAmount,
      currency: companyCurrency,
      originalAmount: amount,
      originalCurrency: currency,
      date: date || Date.now(),
      submittedBy,
      approvals: approvalsArray,
      ruleType: appliedRule?.ruleType || 'sequential',
      percentage: appliedRule?.percentage || 0,
      specificApprover: appliedRule?.specificApprover || null
    });

    await expense.save();

    res.status(201).json({ message: 'Expense submitted successfully', expense });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all expenses for the logged-in user
exports.getMyExpenses = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await Expense.find({ submittedBy: userId })
      .populate('approvals.approver', 'name email role');
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all team expenses (manager/finance/director/admin)
exports.getTeamExpenses = async (req, res) => {
  try {
    const userRole = req.user.role;
    const userId = req.user.id;

    if (userRole === 'employee') {
      return res.status(403).json({ error: 'Access denied' });
    }

    let query = {};
    if (userRole === 'manager') {
      // Employees under this manager
      const employees = await User.find({ manager: userId }).select('_id');
      const employeeIds = employees.map(emp => emp._id);
      query = { submittedBy: { $in: employeeIds } };
    }

    // Admin/Finance/Director see all
    const expenses = await Expense.find(query)
      .populate('submittedBy', 'name email role')
      .populate('approvals.approver', 'name email role');

    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// OCR Receipt Upload & Auto-Extract Expense
exports.uploadReceipt = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    // Process receipt using OCR
    const ocrData = await processReceipt(req.file.path);

    // Delete uploaded file after processing
    fs.unlinkSync(req.file.path);

    res.json({ message: 'OCR processed successfully', ocrData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
const { body, validationResult } = require('express-validator');

// Validation middleware
exports.validateExpense = [
  body('title')
    .notEmpty()
    .withMessage('Title is required'),
  body('amount')
    .isFloat({ gt: 0 })
    .withMessage('Amount must be greater than 0'),
  body('currency')
    .notEmpty()
    .withMessage('Currency is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

