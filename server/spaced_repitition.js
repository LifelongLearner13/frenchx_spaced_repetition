const mongoose = require('mongoose')
const Word = require('./models/word')
const User = require('./models/user')

// Loosely based on SM-2 algorithm by P.A.Wozniak
// Description: http://www.supermemo.com/english/ol/sm2.htm
// Implimentation based on:
// https://github.com/joedel/spaced-repetition/blob/master/spaced.js
// -------
// Right answer: Reps + 1, interval and nextDate calculated via Easiness Factor (ef)
// Wrong answer: Set reps and interval to 0, keep current EF (repeat card today)
// -------
// Returns object with word information
// Warning, this function does mutate the word object
function calcIntervalEF(word, isCorrect) {
  if (!isCorrect) {
    word.reps = 0;
    word.interval = 0;
  } else {
    newEF = word.ef + (0.1 - (5 * (0.08 + (5 * 0.02))));
    // ef cannot go lower than 1.3
    word.ef = newEF < 1.3 ? 1.3 : newEF;
    word.reps = word.reps + 1;

    switch (word.reps) {
      case 1:
        word.interval = 1;
        break;
      case 2:
        word.interval = 6;
        break;
      default:
        word.interval = Math.ceil((word.reps - 1) * word.ef);
        break;
    }
  }

  // Update when the word should appear nextDate
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  word.prevDate = today;

  word.nextDate.setDate(today.getDate() + word.interval);
  word.nextDate.setHours(0,0,0,0);

  return word;
}

// Format definition string by removing numbers and seperating
// the alternatives into an array.
function formatDefinition(definition) {
  return definition.replace(/[0-9]./g, '').split('.').map(e => e.trim()).slice(0, -1);
}

function scoreAnswer(translation, userAnswer) {
  let definitions= formatDefinition(translation);

  for (let i = 0; i < definitions.length; i++) {
    if (definitions[i].toLowerCase() === userAnswer.toLowerCase()) {
      return true;
    }
  }

  return false;
}

// Check if user has trained on given word
// use previous values in calculation if
// avaliable, or defaults
function updateWord(trainedArray, wordID, isCorrect) {
  trainedArray = trainedArray.filter((el) => {
    return el.word === wordID;
  });

  console.log(`trainedArray -> ${trainedArray}`)

  // Inishalize with default values
  let updatedWord = {
    word: wordID,
    prevDate: new Date(),
    nextDate: new Date(),
    interval: 0,
    reps: 0,
    ef: 2.5
  };

  // If user has trained on word before use thoes values,
  // if not use default values
  if (trainedArray.length > 1) {
    return calcIntervalEF(trainedArray[0], isCorrect);
  } else {
    return calcIntervalEF(updatedWord, isCorrect);
  }
}

// Retrieve the next card the user needs to train on
exports.getNextCard = function(userID) {
  trainedArray = trainedArray.filter((el) => {
    return el.word === word._id;
  });

  console.log(`trainedArray -> ${trainedArray}`)

  // Inishalize with default values
  let updatedWord = {
    word: word._id,
    prevDate: new Date(),
    nextDate: new Date(),
    interval: 0,
    reps: 0,
    ef: 2.5
  };

  // Already trained on word
  if (trainedArray.length > 1) {
    updatedWord = calcIntervalEF(trainedArray[0], isCorrect);
  } else {
    updatedWord = calcIntervalEF(updatedWord, isCorrect);
  }
}

exports.scoreAndUpdate = function(userID, wordID, userAnswer) {
  // Lookup word so it can be compared against the user's answer
  Word.findById(wordID, (wordError, word) => {
    console.log(`Word.findById: error -> ${wordError} result -> ${word}`)
    // Check user's answer against translation
    let isCorrect = scoreAnswer(word.translation, userAnswer);

    console.log(`Word.findById: isCorrect -> ${isCorrect}`)

    // Lookup the words a user has trained on
    User.findByIdAndUpdate(userID, {}, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    }, (userError, result) => {
      console.log(`User.findByIdAndUpdate: error -> ${userError} result`, result)

      let updatedWord = updateWord(result.train, word._id, isCorrect);

      console.log(`updatedWord -> `, updatedWord)

      // If the user has never trained with the word then
      // it must be added to their document, otherwise the
      // record must be updated.
      let query = {};
      let update = {};

      if(result.train.length > 0) {
        query = {
          _id: result._id,
          'train.word': word._id,
        };
        update = {
          'train.$.word': updatedWord.word,
          'train.$.prevDate': updatedWord.prevDate,
          'train.$.nextDate': updatedWord.nextDate,
          'train.$.interval': updatedWord.interval,
          'train.$.reps': updatedWord.reps,
          'train.$.ef': updatedWord.ef,
        };
      } else {
        query = {
          _id: result._id,
        };
        update = {
          $push: {train: {
            'word': updatedWord.word,
            'prevDate': updatedWord.prevDate,
            'nextDate': updatedWord.nextDate,
            'interval': updatedWord.interval,
            'reps': updatedWord.reps,
            'ef': updatedWord.ef,
          }}
        };
      }

      User.findOneAndUpdate(query, update, {
        new: true,
      }, function(updateError, toReturn) {
        console.log('User.update error ->', updateError, ' toReturn -> ', toReturn)
      });
    });
  });
};
