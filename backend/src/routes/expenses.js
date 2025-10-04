const express = require('express');
const Expense = require('../models/Expense');
const authEmployee = require('../middleware/authEmployee');

const router = express.Router();

// Get all expenses for the authenticated user
router.get('/', authEmployee, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.body.userId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      expenses
    });

  } catch (error) {
    console.error('Fetch expenses error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching expenses' 
    });
  }
});

// Create new expense
router.post('/', authEmployee, async (req, res) => {
  try {
    const { title, amount, category, description, date } = req.body;

    const newExpense = new Expense({
      title,
      amount,
      category,
      description,
      date: date || new Date(),
      userId: req.body.userId,
      status: 'pending'
    });

    await newExpense.save();

    res.status(201).json({
      success: true,
      message: 'Expense created successfully',
      expense: newExpense
    });

  } catch (error) {
    console.error('Create expense error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error creating expense' 
    });
  }
});

// Update expense
router.put('/:id', authEmployee, async (req, res) => {
  try {
    const { title, amount, category, description, date } = req.body;
    const expenseId = req.params.id;

    const expense = await Expense.findOne({ 
      _id: expenseId, 
      userId: req.body.userId 
    });

    if (!expense) {
      return res.status(404).json({ 
        success: false, 
        message: 'Expense not found' 
      });
    }

    // Update expense fields
    expense.title = title || expense.title;
    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.description = description || expense.description;
    expense.date = date || expense.date;

    await expense.save();

    res.json({
      success: true,
      message: 'Expense updated successfully',
      expense
    });

  } catch (error) {
    console.error('Update expense error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error updating expense' 
    });
  }
});

// Delete expense
router.delete('/:id', authEmployee, async (req, res) => {
  try {
    const expenseId = req.params.id;

    const expense = await Expense.findOneAndDelete({ 
      _id: expenseId, 
      userId: req.body.userId 
    });

    if (!expense) {
      return res.status(404).json({ 
        success: false, 
        message: 'Expense not found' 
      });
    }

    res.json({
      success: true,
      message: 'Expense deleted successfully'
    });

  } catch (error) {
    console.error('Delete expense error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error deleting expense' 
    });
  }
});

module.exports = router;