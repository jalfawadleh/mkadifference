const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const asyncHandler = require('express-async-handler');

const Activities = require('../models/Activities');
// const Members = require('../models/users');

// @desc    Get all items in a certain criteria
// @route   GET /search
// @access  Private
const search = asyncHandler(async (req, res) => {
  const activities = await Activities.find(
    {
      hidden: false,
      name: {$regex: '.*' + req.params.name + '.*', $options: 'i'},
    },
    '_id name type location',
  ).limit(10);

  // const members = await Members.find(
  //   {
  //     hidden: false,
  //     username: {$regex: '.*' + req.params.name + '.*', $options: 'i'},
  //   },
  //   '_id username type location',
  // ).limit(10);
  // const results = items.concat(members);
  console.log('Results Sent');
  // console.log(activities);
  res.status(200).json(activities);
});

router.route('/:name').get(protect, search);
module.exports = router;
