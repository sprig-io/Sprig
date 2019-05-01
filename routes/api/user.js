const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
// Load User model
const User = require('../../models/User');

// @route POST api/users/register
// @desc Register user
// @access Public

router.post('/register', async (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  try {
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    //Hash password before saving in database
    bcrypt.genSalt(10, function(salt) {
      bcrypt.hash(newUser.password, salt, async function(hash) {
        newUser.password = hash;
        const savedUser = await newUser.save();
        console.log('SAVED USER', savedUser);
        res.json(savedUser);
      });
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
