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
    word.ef = newEF < 1.3
      ? 1.3
      : newEF;
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

  word.prevDate = today;

  word.nextDate.setDate(today.getDate() + word.interval);

  return word;
}

// Format definition string by removing numbers and seperating
// the alternatives into an array.
function formatDefinition(definition) {
  return definition.replace(/[0-9]./g, '').split('.').map(e => e.trim()).slice(0, -1);
}

function scoreAnswer(translation, userAnswer) {
  let definitions = formatDefinition(translation);

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

// Returns a random integer between min (included) and max (excluded)
function getRandomIndex(max) {
  max = Math.floor(max);
  return Math.floor(Math.random() * max);
}

function getRandomWord() {
  return new Promise(function(resolve, reject) {
    Word.count().exec(function(err, count) {
      let randIdx = getRandomIndex(count);

      Word.findOne().skip(randIdx).exec(function(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve({
            word: result.visibleWord,
            wordID: result._id,
          });
        }
      });
    });
  });
}

function scoreAndUpdate(userID, wordID, userAnswer) {
  return new Promise(function(resolve, reject) {
    // Lookup word so it can be compared against the user's answer
    Word.findById(wordID, (wordError, word) => {
      if (wordError) {
        reject(wordError);
      }
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
        if (userError) {
          reject(userError);
        }
        console.log(`User.findByIdAndUpdate: error -> ${userError} result`, result)

        let updatedWord = updateWord(result.train, word._id, isCorrect);

        console.log(`updatedWord -> `, updatedWord)

        // If the user has never trained with the word then
        // it must be added to their document, otherwise the
        // record must be updated.
        let query = {};
        let update = {};

        if (result.train.length > 0) {
          query = {
            _id: result._id,
            'train.word': word._id
          };
          update = {
            'train.$.word': updatedWord.word,
            'train.$.prevDate': updatedWord.prevDate,
            'train.$.nextDate': updatedWord.nextDate,
            'train.$.interval': updatedWord.interval,
            'train.$.reps': updatedWord.reps,
            'train.$.ef': updatedWord.ef
          };
        } else {
          query = {
            _id: result._id
          };
          update = {
            $push: {
              train: {
                'word': updatedWord.word,
                'prevDate': updatedWord.prevDate,
                'nextDate': updatedWord.nextDate,
                'interval': updatedWord.interval,
                'reps': updatedWord.reps,
                'ef': updatedWord.ef
              }
            }
          };
        }

        User.findOneAndUpdate(query, update, {new: true}).populate('train.word').exec(function(updateError, toReturn) {
          if (updateError) {
            reject(updateError);
          }
          console.log('User.update error ->', updateError, ' toReturn -> ', toReturn)
          resolve({isCorrect, previousWord: word.visibleWord, previousWordPOS: word.partOfSpeach, previousWordPron: word.pronunciation, previousWordDef: word.translation})
        });
      });
    });
  });
}

function findNextWord(userID) {
  return new Promise(function(resolve, reject) {
    let d = new Date();
    User.findOne({
      _id: userID,
      'train.nextDate': {
        '$lte': d
      }
    }).populate('train.word').exec(function(error, result) {
      console.log('findNextWord User.find error -> ', error, ' result -> ', result);
      if (error) {
        reject(error);
      }

      // If user still has words to train on today,
      // return a random word from list
      if (result) {
        let train = result.train;
        console.log('result[getRandomIndex(0, result.length)].word -> ', train[getRandomIndex(0, train.length)].word)
        let word = train[getRandomIndex(0, train.length)].word;
        resolve({
          word: word.visibleWord,
          wordID: word._id,
        });
      } else {
        // return a random word from the database
        resolve(getRandomWord());
      }
    });
  });
}

// Retrieve the next card the user needs to train on
exports.getNextWord = function(userID, wordID, userAnswer) {
  return new Promise(function(resolve, reject) {
    if(wordID === '' && userAnswer === '') {
      findNextWord(userID).then(function(nextWord) {
        console.log(nextWord);
        let returnedWord = {
          isCorrect: true,
          previousWord: '',
          previousWordPOS: '',
          previousWordPron: '',
          previousWordDef: '',
        };
        returnedWord.currentWord = nextWord.word;
        returnedWord.currentWordID = nextWord.wordID;
        console.log('returnedWord -> ', returnedWord);
        resolve(returnedWord);
      });
    } else {
      scoreAndUpdate(userID, wordID, userAnswer).then(function(response) {
        console.log('scoreAndUpdate response -> ', response);
        findNextWord(userID).then(function(nextWord) {
          console.log(nextWord);
          let returnedWord = response;
          returnedWord.currentWord = nextWord.word;
          returnedWord.currentWordID = nextWord.wordID;
          console.log('returnedWord -> ', returnedWord);
          resolve(returnedWord);
        });
      });
    }
  });
}
