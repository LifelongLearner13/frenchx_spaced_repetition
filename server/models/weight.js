const mongoose = require('mongoose')

const WeightSchema = new mongoose.Schema({
	weight: {
		type: Number,
		required: true,
    default: 1
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

const Weight = mongoose.model('Weight', WeightSchema)

module.exports = Weight
