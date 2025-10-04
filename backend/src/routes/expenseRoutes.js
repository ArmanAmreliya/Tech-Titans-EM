const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Temporary storage for OCR

// Submit a new expense
router.post('/', authMiddleware, expenseController.submitExpense);

// Get my expenses
router.get('/my', authMiddleware, expenseController.getMyExpenses);

// Get team expenses
router.get('/team', authMiddleware, expenseController.getTeamExpenses);

// Upload receipt (OCR)
router.post('/upload-receipt', authMiddleware, upload.single('receipt'), expenseController.uploadReceipt);

module.exports = router;
