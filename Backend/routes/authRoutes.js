const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const newUser = await User.create({ name, email, password: hashedPassword });
    res.json({ message: 'User registered', user: newUser });
  } catch (error) {
    res.status(400).json({ error: 'User already exists' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ message: 'Login successful', token });
});

module.exports = router;
