const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const asyncHandler = require("express-async-handler");

const Items = require("../models/items");
const Members = require("../models/users");

// @desc    Get all items in a certain criteria
// @route   GET /search
// @access  Private
const getAll = asyncHandler(async (req, res) => {
  const items = await Items.find({ hidden: false }, "_id name type location");

  const members = await Members.find(
    { hidden: false },
    "_id name type location"
  );
  const results = items.concat(members);
  res.status(200).json(results);
});

router.route("/").get(protect, getAll);
module.exports = router;
