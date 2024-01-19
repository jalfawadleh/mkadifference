const mongoose = require("mongoose");
const { Schema } = mongoose;

const Items = Schema(
  {
    name: {
      type: String,
      minlength: 4,
      maxlength: 50,
      trim: true,
      required: true,
    },
    description: String,
    type: String,
    hidden: { type: Boolean, default: false },
    createdBy: [
      {
        id: Schema.Types.ObjectId,
        name: String,
      },
    ],
    hobbies: [
      {
        id: Number,
        name: String,
      },
    ],
    managedBy: [
      {
        id: Schema.Types.ObjectId,
        name: String,
      },
    ],
    members: [
      {
        _id: Schema.Types.ObjectId,
        name: String,
      },
    ],
    location: {
      lng: { type: Number, default: 0 },
      lat: { type: Number, default: 0 },
    },
    help: [],
    notes: [],
    discussion: [
      {
        id: Schema.Types.ObjectId,
        name: String,
        content: String,
        date: Date,
      },
    ],
    period: { start: Date, end: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Items", Items);
