'use strict'
const mongoose = require('mongoose')
const Word = require('./models/word')
const User = require('./models/user')

let updateWeight = (wordsArray, wordId, isCorrect) => {
  // Loop over array of word/weight pairs to find and update the
  // weight of the word that was just asked
  for (let i = 0; i < wordsArray.length; i++) {
      if (wordsArray[i].word._id.toString() === wordId.toString()) {
          if (isCorrect) {
              wordsArray[i].weight *= 2
          } else {
              wordsArray[i].weight = 1
          }
      }
  }
  return wordsArray
}

let sortByWeight = (a, b) => {
    return a.weight - b.weight
}

let getNextWord = (user, wordId, isCorrect, score) => {

    // Create new promise so results will not be sent to user until async
    // database actions have completed.
    return new Promise((resolve, reject) => {
        console.log('inside getNextWord')
            // Find user by Id (i.e. user)
        User.findById(user).populate('trained.word')
            .exec(function(error, returnedUser) {
                console.log(error, '<-- error')

                // Store the array of word/weight pairs in the words variable
                let words = returnedUser.trained

                if(typeof isCorrect !== 'undefined') {
                  words = updateWeight(words, wordId, isCorrect)
                }

                // Sort the array by weight value; pairs with a smaller weight
                // value will be at a lower index
                words = words.sort(sortByWeight)

                    // if the first word in the sorted array does not equal
                    // the word stored in the justAsked property
                if (words[0].word._id.toString() !== returnedUser.justAsked.toString()) {
                    // Then update the user's justAsked property to the first
                    // word in the array. If score was passed to the function,
                    // update it, else keep it the same. Update the words array
                    // regardless.
                    returnedUser.justAsked = words[0].word
                    returnedUser.score = score || returnedUser.score
                    returnedUser.trained = words

                    // Else, the first word in the sorted array was asked in the
                    // previous session
                } else {
                    // Update the user's justAsked property to the second word
                    // in the array and update the score and trained arrays
                    returnedUser.justAsked = words[1].word
                    returnedUser.score = score || returnedUser.score
                    returnedUser.trained = words
                }

                // Save the updated user document back to the database
                returnedUser.save((error, result) => {
                    if (error) {
                        reject(error)
                    }

                    // create the reply object and send it back
                    let objectToReturn = {
                        _id: returnedUser.justAsked._id,
                        word1: returnedUser.justAsked.word1,
                        word2: returnedUser.justAsked.word2,
                        score: score || returnedUser.score
                    }
                    resolve(objectToReturn)
                })

            })
    })
}

exports.getNextWord = getNextWord
