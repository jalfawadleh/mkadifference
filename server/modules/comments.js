const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const asyncHandler = require("express-async-handler");

const router = express.Router();

mongoose = require("mongoose");
const Comments = mongoose.model(
  "Comments",
  mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User id",
      },
      item: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Item id",
      },
      content: {
        required: true,
        type: String,
        trim: true,
      },
    },
    {
      timestamps: true,
    }
  )
);

// @desc    Get coments
// @route   GET /community/:id
// @access  Private
const getComments = asyncHandler(async (req, res) => {
  const comments = await Comments.find({ item: req.params.id });
  res.status(200).json(comments);
});

// @desc    Post Comment
// @route   POST Comment/
// @access  Private
const postComment = asyncHandler(async (req, res) => {
  if (!req.body.content || !req.body.id) {
    res.status(400);
    console.log("Please add comment");
  } else {
    const comment = await Comments.create({
      user: req.user.id,
      item: req.body.id,
      content: req.user.name + ": " + req.body.content,
    });
    res.status(200).json(comment);
  }
});

router.get("/:id", protect, getComments).post("/", protect, postComment);

module.exports = router;
