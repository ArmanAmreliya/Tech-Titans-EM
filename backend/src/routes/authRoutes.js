// src/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Signup route
router.post("/signup", authController.signup);

// Login route
router.post("/login", authController.login);

// Seed test users route (for development)
router.post("/seed-users", authController.seedUsers);

module.exports = router;
