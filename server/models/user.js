'use strict'
const mongoose = require('mongoose')
const deepPopulate = require('mongoose-deep-populate')(mongoose)

const Word = require('./word')

const UserSchema = new mongoose.Schema({
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    justAsked: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Word'
    },
    trained: [{
        word: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Word'
        },
        weight: {
            type: Number,
            default: 1
        }
    }],
    currentSortedIndex: {
      type: Number,
      default: 0
    },
    score: {
        type: Number,
        default: 0
    }
})
UserSchema.plugin(deepPopulate)

// Only call when a user first logs in or user registers
// Populates the trained array with all the words in the Word document.
UserSchema.methods.getWeightedWords = function(callback) {
    let currentUser = this

    // Use promise to ensure authentication redirect does not happen until
    // after the database has been updated
    return new Promise((resolve, reject) => {
        let id = currentUser._id

        // Find the current user in the database
        currentUser.model('User').findById(id, 'trained')
            .exec((error, results) => {
                let newWords = []

                // Retrieve all words stored in the database
                Word.find({},(error, allWords) => {

                    // If the user does have something in their trained
                    // array use map and filter to find the words that exist
                    // in the Word document but do not exist in the users
                    // trained array.
                    if (results.trained.length) {
                        let userWordIds = results.trained.map((el) => el.word.toString())
                        newWords = allWords.filter((word) => {!userWordIds.includes(word._id.toString())})
                        newWords = newWords.map(function(word) {
                            return {
                                word: word._id,
                                weight: 1
                            }
                        })
                    // First time user has logged in. Populate their trained
                    // array with all word currently in database
                    } else {
                        newWords = allWords.map(function(word) {
                            return {
                                word: word._id,
                                weight: 1
                            }
                        })
                    }

                    // Update the user to include the new information
                    currentUser.model('User')
                      .findByIdAndUpdate(currentUser._id, {
                        $push: {
                            trained: {
                                $each: newWords
                            }
                        },
                        justAsked: newWords[0].word
                    }, {
                        safe: true,
                        upsert: true,
                        new: true
                    }).exec((error, result) => {
                        if (error) {
                            reject(error)
                        }
                        resolve(callback)
                    })
                })
            })
    })
}

const User = mongoose.model('User', UserSchema)

module.exports = User
