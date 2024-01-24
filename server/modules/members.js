const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const asyncHandler = require('express-async-handler');
const Member = require('../models/users');

// @desc    Get Members
// @route   GET /api/members
// @access  Private
const getMembers = asyncHandler(async (req, res) => {
  const members = await Member.find();

  res.status(200).json(members);
});

// @desc    Get Member
// @route   GET /api/members/:id
// @access  Private
const getMember = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.id);
  res.status(200).json(member);
});

// @desc    Put member
// @route   PUT /api/members/:id
// @access  Private
const putMember = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user) {
    res.status(200).json({error: 'User not found'});
  }

  // find if member exists
  const member = await Member.findById(req.params.id);

  if (!member) {
    res.status(200).json({error: 'Member not found'});
  }

  // Make sure the logged in user matches the member
  // if (member._id.toString() !== req.user._id.toString()) {
  //   res.status(200).json({error: 'Not authorised.'});
  // }

  const updatedMember = await Member.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    },
  );

  res.status(200).json(updatedMember);
});

// @desc    Delete member
// @route   DELETE /api/members/:id
// @access  Private
const deleteMember = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.id);

  if (!member) {
    res.status(400);
    throw new Error('member not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the member user
  if (member.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await Member.remove();

  res.status(200).json({id: req.params.id});
});

router.route('/all').get(protect, getMembers); // Get all members
router
  .route('/:id')
  .delete(protect, deleteMember) // deleting member by id
  .put(protect, putMember) // updating member by id
  .get(protect, getMember); //get a member by id
module.exports = router;
