/*---------- USER SCHEMA -----------*/
const mongoose = require('mongoose');
const Word = require('./word');

const UserSchema = new mongoose.Schema({
    _id: {
  		type: String,
  		required: true,
  	},
    train: [ {
      word: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Word',
      },
      prevDate: {
        type: Date,
        default: Date.now,
      },
      nextDate: {
        type: Date,
        default: Date.now,
      },
      interval: {
        type: Number,
        default: 0,
      },
      reps: {
        type: Number,
        default: 0,
      },
      ef: {
        type: Number,
        default: 2.5,
      },
    }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
