const mongoose = require('mongoose')
const Word = require('./models/word')
const User = require('./models/user')

// Format definition string by removing numbers and seperating
// the alternatives into an array.
function formatDefinition(definition) {
  return definition.replace(/[0-9]./g, '').split('.').map(e => e.trim()).slice(0, -1);
}

// Retrieve the next card the user needs to train on
exports.getNextCard = function(userID) {};

exports.scoreAndUpdate = function(userID, wordID, userAnswer) {
  // Lookup wordID, check answer, calcIntervalEF, update record in user
  let isCorrect = false;

  Word.findById(wordID, (wordError, word) => {
    console.log(`Word.findById: error -> ${wordError} result -> ${word}`)
    // Check user's answer against translation
    let definition = formatDefinition(word.translation);

    for(let i = 0; i < definition.length; i++) {
      if(definition[i].toLowerCase() === userAnswer.toLowerCase()) {
        isCorrect = true;
      }
    }

    console.log(`Word.findById: isCorrect -> ${isCorrect}`)
    // User.findByIdAndUpdate(userID, {
    //   $push: {
    //     'train': {
    //       word: word._id
    //     }
    //   }
    // }, {
    //   upsert: true,
    //   new: true,
    //   setDefaultsOnInsert: true
    // }, (userError, result) => {
    //   console.log(`User.findByIdAndUpdate: error -> ${userError} result -> ${result}`)
    //
    // });
  });
};



// Loosely based SM-2 algorithm by P.A.Wozniak
// Description: http://www.supermemo.com/english/ol/sm2.htm
// -------
// Right answer: Reps + 1, interval and nextDate calculated via Easiness Factor (ef)
// Wrong answer: Set reps and interval to 0, keep current EF (repeat card today)
// -------
// Returns object with card information
function calcIntervalEF(word, isCorrect) {};
