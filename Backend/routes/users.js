//POST /signup: Creates a new user in the database with the provided email and password. Returns a JWT token.
//POST /login: Logs in a user with the provided email and password. Returns a JWT token.

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();


router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const newUser = new User({
        email,
        password: hashedPassword,
      });
  
      const result = await newUser.save();
  
      const token = jwt.sign(
        { email: result.email, id: result._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
  
      res.status(201).json({ result, token });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  });


  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
  
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );
  
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
  
      res.status(200).json({ result: existingUser, token });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  });


  module.exports = router;