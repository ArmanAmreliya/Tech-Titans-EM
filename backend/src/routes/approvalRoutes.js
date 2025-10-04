// src/routes/approvalRoutes.js
const express = require('express');
const router = express.Router();
const approvalController = require('../controllers/approvalController');
const{ authMiddleware} = require('../middleware/authMiddleware');

// Approve or reject an expense
router.patch('/:id', authMiddleware, approvalController.approveOrRejectExpense);

// Get pending approvals
router.get('/pending', authMiddleware, approvalController.getPendingApprovals);

module.exports = router;
