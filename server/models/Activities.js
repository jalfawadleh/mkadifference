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
    location: {type: Array, default: [-122.2683, 37.8243]},
    createdBy: {id: Schema.Types.ObjectId, name: String},
    managedBy: [{id: Schema.Types.ObjectId, name: String}],
    lastLogin: Date,
    hidden: {type: Boolean, default: false},
    type: {type: String, default: 'activity'},
    members: [{_id: Schema.Types.ObjectId, name: String}],

    tags: [{name: String}],
    help: [{name: String}],

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

        startLocation: {
          lng: {type: Number, default: 0},
          lat: {type: Number, default: 0},
        },
        endLocation: {
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
