const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ['employee', 'manager', 'finance', 'director', 'admin'],
    default: 'employee'
  },

  manager: {
    // Each employee can have a manager
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },

  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',  // Optional: if you want multi-company support
    required: true
  },

  isActive: {
    type: Boolean,
    default: true
  },

  dateCreated: {
    type: Date,
    default: Date.now
  },

  lastLogin: {
    type: Date
  }
});


userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const bcrypt = require('bcryptjs');
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});


userSchema.methods.comparePassword = async function(password) {
  const bcrypt = require('bcryptjs');
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
