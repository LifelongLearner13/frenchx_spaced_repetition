const mongoose = require('mongoose')

const WordSchema = new mongoose.Schema({
	french: {
		type: String,
		required: true,
		unique: true
	},
	english: {
		type: String,
		required: true,
		unique: true
	}
	weight: {
		type: Number,
		ref: 'User'
	}
})

const Word = mongoose.model('Word', UserSchema)

module.exports = Word