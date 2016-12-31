/*----------- WORD SCHEMA ----------*/
const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
  visibleWord: {
		type: String,
		required: true,
	},
	translation: {
		type: String,
		required: true,
	},
  partOfSpeach: {
		type: String,
	},
  pronunciation: {
    type: String,
  },
});

const Word = mongoose.model('Word', WordSchema);

module.exports = Word;
