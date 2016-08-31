'use strict'
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
})

const Word = mongoose.model('Word', WordSchema)

module.exports = Word
