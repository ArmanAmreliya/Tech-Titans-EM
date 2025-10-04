const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import routes
const authRoutes = require("./src/routes/authRoutes");
const expenseRoutes = require("./src/routes/expenseRoutes");
const approvalRoutes = require("./src/routes/approvalRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request body

// Routes
app.use("/auth", authRoutes);
app.use("/expenses", expenseRoutes);
app.use("/approvals", approvalRoutes);

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

// MongoDB connection (hardcoded URI for now)
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

console.log("🔧 Starting server in development mode...");

// Start server first, then attempt MongoDB connection
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);

  // Try MongoDB connection after server starts
  if (MONGO_URI) {
    mongoose
      .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("✅ Connected to MongoDB Atlas");
      })
      .catch((err) => {
        console.error("❌ MongoDB connection error:", err.message);
        console.log("⚠️  Server running without database connection");
      });
  } else {
    console.log("⚠️  No MONGO_URI found, running without database");
  }
});
