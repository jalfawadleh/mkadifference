const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/users');

// https://en.wikipedia.org/wiki/List_of_HTTP_status_codes

// Generate JWT
const generateToken = id => {
  return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'});
};

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {username, password, rpassword, email} = req.body;

  if (password !== rpassword) {
    res.status(200).json({error: "Passwords don't match"});
    return;
  }

  if (!username || !email || !password || !rpassword) {
    res.status(200).json({error: 'Please Add Missing Fields'});
    return;
  }

  // Check if user exists
  const userExists = await User.findOne({username});

  if (userExists) {
    res.status(200).json({error: 'name Not Available'});
    return;
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(user);

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.username,
      location: user.location,
      token: generateToken(user._id),
    });
    return;
  } else {
    res.status(200).json({error: 'Member Account Creation Error'});
    return;
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const {username, password} = req.body;
  // console.log(Date.now + ' - ' + req.body);
  const user = await User.findOne({username});

  if (user && (await bcrypt.compare(password, user.password))) {
    await User.findByIdAndUpdate(user._id, user, {new: true});

    res.status(200).json({
      _id: user._id,
      name: user.username,
      location: user.location,
      token: generateToken(user._id),
    });
    console.log('Done');
    return;
  } else {
    res.status(200).json({error: 'Invalid Login Credentials'});
    return;
  }
});

router.post('/', registerUser);
router.post('/login', loginUser);

module.exports = router;
