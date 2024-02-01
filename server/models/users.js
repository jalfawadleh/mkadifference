const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = Schema(
  {
    username: {
      type: String,
      minlength: 4,
      maxlength: 50,
      trim: true,
      required: [true, 'Please add a username'],
      unique: 'already exist',
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    description: String,
    languages: {type: [{name: String}], default: []},
    help: {type: [{name: String}], default: []},
    tags: {type: [{name: String}], default: []},
    location: {type: Array, default: [-122.2683, 37.8243]},

    darkmood: {type: Boolean, default: false},
    hidden: {type: Boolean, default: false},

    type: {type: String, default: 'members'},

    contacts: [
      {
        id: {type: Schema.Types.ObjectId},
        name: {type: String},
        approved: {type: Boolean, default: false},
      },
    ],
    communities: [
      {
        id: Schema.Types.ObjectId,
        name: String,
      },
    ],
    events: [
      {
        id: Schema.Types.ObjectId,
        name: String,
      },
    ],
    projects: [
      {
        id: Schema.Types.ObjectId,
        name: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', userSchema);
