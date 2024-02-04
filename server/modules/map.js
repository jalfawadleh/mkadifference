const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const asyncHandler = require('express-async-handler');

const Activities = require('../models/Activities');
const Members = require('../models/users');

// @desc    Get all items in a certain criteria
// @route   GET /search
// @access  Private
const getAll = asyncHandler(async (req, res) => {
  const activities = await Activities.find(
    {hidden: false},
    '_id name type location',
  );
  const membersPoints = {type: 'FeatureCollection', features: []};
  const activitiesPoints = {type: 'FeatureCollection', features: []};

  activities.forEach(activity => {
    activitiesPoints.features.push({
      id: activity._id,
      type: 'Feature',
      properties: {
        name: activity.name,
        id: activity._id,
        type: activity.type,
      },
      geometry: {
        coordinates: activity.location,
        type: 'Point',
      },
    });
  });

  const members = await Members.find(
    {hidden: false},
    '_id username type location',
  );

  members.forEach(member => {
    membersPoints.features.push({
      id: member._id,
      type: 'Feature',
      properties: {
        name: member.username,
        id: member._id,
        type: member.type,
      },
      geometry: {
        coordinates: member.location,
        type: 'Point',
      },
    });
  });

  console.log('Map Items: Sent');
  res.status(200).json({membersPoints, activitiesPoints});
});

router.route('/').get(protect, getAll);
module.exports = router;
