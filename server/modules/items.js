const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const asyncHandler = require("express-async-handler");

const Items = require("../models/items");

// @desc    Get all items
// @route   GET /items
// @access  Private
const getItems = asyncHandler(async (req, res) => {
  const items = await Items.find({
    hidden: false,
    "createdBy.id": req.user._id,
  });
  res.status(200).json(items);
});

// @desc Get projects
// @route GET /items/projects
// @access Private
const getProjects = asyncHandler(async (req, res) => {
  const items = await Items.find({
    type: "projects",
    "createdBy.id": req.user._id,
  });
  res.status(200).json(items);
});

// @desc Get projects
// @route GET /items/events
// @access Private
const getEvents = asyncHandler(async (req, res) => {
  const items = await Items.find({
    type: "events",
    "createdBy.id": req.user._id,
  });
  res.status(200).json(items);
});

// @desc Get projects
// @route GET /items/communities
// @access Private
const getCommunities = asyncHandler(async (req, res) => {
  const items = await Items.find({
    type: "communities",
    "createdBy.id": req.user._id,
  });
  res.status(200).json(items);
});

// @desc    Get item
// @route   GET /items/:id
// @access  Private
const getItem = asyncHandler(async (req, res) => {
  const item = await Items.findById(req.params.id);
  res.status(200).json(item);
});

// @desc    Put Item
// @route   PUT /item/:id
// @access  Private
const putItem = asyncHandler(async (req, res) => {
  const item = req.body._id
    ? await Items.findByIdAndUpdate(req.body._id, req.body)
    : await Items.create(req.body);
  res.status(200).json(item);
});

// @desc    Delete item
// @route   DELETE /:id
// @access  Private
const delItem = asyncHandler(async (req, res) => {
  const item = await Items.findById(req.params.id);

  if (!item) {
    res.status(400);
    throw new Error("item not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("Not authorised");
  }

  const data = await item.remove();
  res.status(200).json(data);
});

router.route("/all").get(protect, getItems);
router.route("/projects").get(protect, getProjects);
router.route("/events").get(protect, getEvents);
router.route("/communities").get(protect, getCommunities);
router.route("/:id").get(protect, getItem).delete(protect, delItem);
router.route("/").put(protect, putItem);

module.exports = router;
