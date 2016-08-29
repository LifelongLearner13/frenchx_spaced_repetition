const mongoose = require('mongoose')

const WeightSchema = new mongoose.Schema({
	weight: {
		type: Number,
		required: true
	},
	user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true	
  },
  word: {
  	type: mongoose.Schema.Types.ObjectId,
  	ref: 'Word',
  	required: true
  }
})

const Weight = mongoose.model('Weight', UserSchema)

module.exports = Weight