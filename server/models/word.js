'use strict'
const mongoose = require('mongoose')

const WordSchema = new mongoose.Schema({
	word1: {
		type: String,
		required: true,
		unique: true
	},
	word2: {
		type: String,
		required: true,
		unique: true
	}
})

const Word = mongoose.model('Word', WordSchema)

module.exports = Word
