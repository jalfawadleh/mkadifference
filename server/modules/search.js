const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const asyncHandler = require("express-async-handler");

const Items = require("../models/items");
const Members = require("../models/users");

// @desc    Get all items in a certain criteria
// @route   GET /search
// @access  Private
const search = asyncHandler(async (req, res) => {
  const items = await Items.find(
    {
      hidden: false,
      name: { $regex: ".*" + req.params.name + ".*", $options: "i" },
    },
    "_id name type location"
  ).limit(10);

  const members = await Members.find(
    {
      hidden: false,
      name: { $regex: ".*" + req.params.name + ".*", $options: "i" },
    },
    "_id name type location"
  ).limit(10);
  const results = items.concat(members);
  res.status(200).json(results);
});

router.route("/:name").get(protect, search);
module.exports = router;
