// src/controllers/authController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET;

// Mock users for development when MongoDB is not available
const mockUsers = [
  {
    id: "1",
    name: "Employee User",
    email: "employee404@gmail.com",
    password: "EMP@404", // In real app, this would be hashed
    role: "employee",
  },
  {
    id: "2",
    name: "Manager User",
    email: "manager404@gmail.com",
    password: "MANAGER@404",
    role: "manager",
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin404@gmail.com",
    password: "ADMIN@404",
    role: "admin",
  },
];

// Helper function to check if MongoDB is connected
const isMongoConnected = () => {
  const mongoose = require("mongoose");
  return mongoose.connection.readyState === 1;
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role, managerId, companyId } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Create user
    const user = new User({
      name,
      email,
      password,
      role: role || "employee",
      manager: managerId || null,
      companyId,
    });

    await user.save();

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`[Auth] Login attempt for: ${email}`);

    // Check if MongoDB is connected
    if (!isMongoConnected()) {
      console.log("[Auth] MongoDB not connected, using mock users");

      // Use mock users for development
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password
      );
      if (!user) {
        console.log("[Auth] Mock user login failed");
        return res.status(400).json({ error: "Invalid email or password" });
      }

      console.log(
        `[Auth] Mock user login successful: ${user.name} (${user.role})`
      );

      // Generate JWT
      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.json({
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    }

    // MongoDB is connected, use database
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid email or password" });

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Seed function to create test users for different roles
exports.seedUsers = async (req, res) => {
  try {
    console.log("[Auth] Seed users request");

    // Check if MongoDB is connected
    if (!isMongoConnected()) {
      console.log("[Auth] MongoDB not connected, returning mock users info");
      return res.json({
        message: "Mock users available for development (no database required)",
        users: mockUsers.map((u) => ({
          email: u.email,
          role: u.role,
          password: u.password, // In development, show passwords
        })),
      });
    }

    // MongoDB is connected, create real users
    const existingAdmin = await User.findOne({ email: "admin404@gmail.com" });
    if (existingAdmin) {
      return res.json({ message: "Test users already exist" });
    }

    // Create test users for each role
    const testUsers = [
      {
        name: "Admin User",
        email: "admin404@gmail.com",
        password: "ADMIN@404",
        role: "admin",
      },
      {
        name: "Manager User",
        email: "manager404@gmail.com",
        password: "MANAGER@404",
        role: "manager",
      },
      {
        name: "Employee User",
        email: "employee404@gmail.com",
        password: "EMP@404",
        role: "employee",
      },
    ];

    for (const userData of testUsers) {
      const user = new User(userData);
      await user.save();
    }

    res.json({
      message: "Test users created successfully",
      users: testUsers.map((u) => ({ email: u.email, role: u.role })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
