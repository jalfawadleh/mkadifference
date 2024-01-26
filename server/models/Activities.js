const mongoose = require('mongoose');
const {Schema} = mongoose;

const Activities = Schema(
  {
    name: {
      type: String,
      minlength: 4,
      maxlength: 50,
      trim: true,
      required: true,
    },
    description: {type: String, default: ''},
    notes: [],

    createdBy: {id: Schema.Types.ObjectId, name: String},
    managedBy: [{id: Schema.Types.ObjectId, name: String}],
    lastLogin: Date,
    hidden: {type: Boolean, default: false},

    members: [{_id: Schema.Types.ObjectId, name: String}],

    tags: [{name: String}],

    stages: [
      {
        name: {
          type: String,
          minlength: 4,
          maxlength: 50,
          trim: true,
          required: true,
        },
        description: {type: String, default: ''},
        start: Date,
        end: Date,

        location: {
          lng: {type: Number, default: 0},
          lat: {type: Number, default: 0},
        },
      },
    ],

    discussion: [
      {
        id: Schema.Types.ObjectId,
        name: String,
        content: String,
        date: Date,
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Activities', Activities);
