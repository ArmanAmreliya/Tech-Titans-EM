// server.js
<<<<<<< HEAD
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import routes
const authRoutes = require("./src/routes/auth");
const expenseRoutes = require("./src/routes/expenses");
=======
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const expenseRoutes = require('./src/routes/expenseRoutes');
const approvalRoutes = require('./src/routes/approvalRoutes');
>>>>>>> b446a71 (Backend Ready)

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request body

// Routes
<<<<<<< HEAD
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
=======
app.use('/auth', authRoutes);
app.use('/expenses', expenseRoutes);
app.use('/approvals', approvalRoutes);
>>>>>>> b446a71 (Backend Ready)

// Health Check
app.get("/", (req, res) => {
  res.send("Expense Management Backend is running 🚀");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Something went wrong" });
});

<<<<<<< HEAD
// MongoDB connection (hardcoded URI for now)
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
=======
// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb+srv://coder2878_db_user:jCL7VehHWeGkn8UX@cluster0.poc3dqk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
>>>>>>> b446a71 (Backend Ready)

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in environment variables");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
