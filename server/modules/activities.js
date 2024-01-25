const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const asyncHandler = require('express-async-handler');
const Activities = require('../models/Activities');

// @desc    Get Activities
// @route   GET /api/activities
// @access  Private
const getActivities = asyncHandler(async (req, res) => {
  const activities = await Activities.find();
  console.log('Activities Send All');
  res.status(200).json(activities);
});

// @desc    Get Activity
// @route   GET /api/activities/:id
// @access  Private
const getActivity = asyncHandler(async (req, res) => {
  const activity = await Activities.findById(req.params.id);
  console.log('Getting one activitiy');
  res.status(200).json(activity);
});

// @desc    Post Activity
// @route   POST /api/activities
// @access  Private
const postActivity = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(200).json({error: 'Name is missing'});
    return;
  }

  if (req.body.name.length < 4) {
    res.status(200).json({error: 'Name minumum 4 characters'});
    return;
  }

  const activity = await Activities.create({
    name: req.body.name,
    description: req.body.description,
  });
  console.log('Activity Created');
  res.status(200).json(activity);
});

// @desc    Put activity
// @route   PUT /api/activities/:id
// @access  Private
const putActivity = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user) {
    res.status(200).json({error: 'User not found'});
  }

  // find if activity exists
  const activity = await Activities.findById(req.body._id);

  if (!activity) {
    res.status(200).json({error: 'activity not found'});
  }

  // Make sure the logged in user matches the member
  // if (member._id.toString() !== req.user._id.toString()) {
  //   res.status(200).json({error: 'Not authorised.'});
  // }

  const updatedActivity = await Activities.findByIdAndUpdate(
    req.body._id,
    req.body,
    {
      new: true,
    },
  );
  console.log('Activity Updated');
  res.status(200).json(updatedActivity);
});

// @desc    Delete activity
// @route   DELETE /api/activities/:id
// @access  Private
const delActivity = asyncHandler(async (req, res) => {
  const activity = await Activities.findById(req.params.id);

  if (!activity) {
    res.status(200).json('Activity not found');
  }

  // Check for user
  if (!req.user) {
    res.status(200).json('User not found');
  }

  // Make sure the logged in user matches the member user
  // if (activity.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error('User not authorized');
  // }

  await Activities.findOneAndDelete(req.params.id);
  console.log('Activity deleted ');
  const activities = await Activities.find();
  console.log('Activities Send All');
  res.status(200).json(activities);
});

router
  .route('/')
  .get(protect, getActivities) // Get all activities
  .post(protect, postActivity); // creating new activity
router
  .route('/:id')
  .delete(protect, delActivity) // deleting activity by id
  .put(protect, putActivity) // updating activity by id
  .get(protect, getActivity); //get a activity by id
module.exports = router;
