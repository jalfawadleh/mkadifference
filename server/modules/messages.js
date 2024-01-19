const express = require('express');
const router = express.Router();

const {protect} = require('../middleware/authMiddleware');

const asyncHandler = require('express-async-handler');

const Messages = require('../models/messages');

// @desc    Get messages
// @route   GET /api/messages/:id
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  // to: req.params.id,
  // const messages = await Messages.find({ user: req.user.id });
  const messages = await Messages.find({
    $or: [
      {$and: [{user: req.user.id}, {to: req.params.id}]},
      {$and: [{user: req.params.id}, {to: req.user.id}]},
    ],
  });

  // console.log(messages);
  res.status(200).json(messages);
});

// @desc    Set message
// @route   POST /api/messages
// @access  Private
const postMessage = asyncHandler(async (req, res) => {
  if (!req.body.content) {
    res.status(400);
    throw new Error('Please add a message content');
  } else {
    const message = await Messages.create({
      user: req.user.id,
      to: req.body.to,
      content: req.user.name + ': ' + req.body.content,
    });
    res.status(200).json(message);
  }
});

router.get('/:id', protect, getMessages).post('/', protect, postMessage);

module.exports = router;
