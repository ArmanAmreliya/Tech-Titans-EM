const express = require('express');
const router = express.Router();
const { submitExpense, getMyExpenses, getTeamExpenses, uploadReceipt, validateExpense } = require('../controllers/expenseController');
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');

const upload = require('../middleware/uploadMiddleware');

// Submit expense with validation
router.post('/submit', authMiddleware, validateExpense, submitExpense);

// Get user expenses
router.get('/my-expenses', authMiddleware, getMyExpenses);

// Get team expenses
router.get('/team-expenses', authMiddleware, getTeamExpenses);

// Upload receipt (OCR)
router.post('/upload-receipt', authMiddleware, upload.single('receipt'), uploadReceipt);

module.exports = router;

