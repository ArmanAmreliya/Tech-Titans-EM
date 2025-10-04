// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // Parse JSON request body

// Routes


// Health Check
app.get('/', (req, res) => {
  res.send('Expense Management Backend is running 🚀');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Something went wrong' });
});

// MongoDB connection (hardcoded URI for now)
const PORT = 5000;
const MONGO_URI = 'mongodb+srv://coder2878_db_user:jCL7VehHWeGkn8UX@cluster0.poc3dqk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
