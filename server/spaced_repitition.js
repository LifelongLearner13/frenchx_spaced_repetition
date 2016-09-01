const mongoose = require('mongoose')
const Word = require('./models/word')
const User = require('./models/user')

let sortByWeight = (a, b) => {
    return a.weight - b.weight
}

let getFirstWord = (user, score) => {
    return new Promise(function(resolve, reject) {
        console.log('inside getFirstWord')
        User.findById(user).exec(function(error, docs) {
            console.log(error, '<== error')
            console.log(score, '<==== score')
            let wordArray = docs.trained
            wordArray.sort(sortByWeight)
            if (docs.hasOwnProperty('justAsked') && wordArray[0].word.toString() !== docs.justAsked.toString()) {

                console.log(`${wordArray[0].word.toString()} !== ${docs.justAsked.toString()} ---> ${wordArray[0].word.toString() !== docs.justAsked.toString()}`)
                console.log('inside if')
                User.findByIdAndUpdate(user, {
                    justAsked: wordArray[0].word, score: score
                }, function(error) {
                    if (error) {
                        throw error
                    }
                })
                Word.findById(wordArray[0].word).exec(function(error, result) {
                    console.log('findById Word: ', result)
                    result.score = score
                    resolve(result)
                })

            } else {

                User.findByIdAndUpdate(user, {
                    justAsked: wordArray[1].word, score: score
                }, function(error) {
                    if (error) {
                        throw error
                    }
                })
                Word.findById(wordArray[1].word).exec(function(error, result) {
                    console.log('findById Word: ', result)
                    result.score = score
                    resolve(result)
                })

            }
        })
    })
}

let getNextWord = (user, wordId, isCorrect, score) => {
    return new Promise(function(resolve, reject) {
        console.log('inside getNextWord')
        User.findById(user).exec(function(error, returnedUser) {
            console.log(error)
            console.log(returnedUser)
            let words = returnedUser.trained
            console.log(words, '<--- Words')
            for(let i = 0; i < words.length; i++) {
              if(words[i].word.toString() === wordId.toString()) {
                console.log('word id matches')
                if(isCorrect) {
                  console.log('isCorrect')
                  words[i].weight *= 2
                  console.log('isCorrect: ', words[i])
                } else {
                  words[i].weight = 1
                }
              }
            }
            console.log(words, '<--- Words after')

            words = words.sort(sortByWeight)

            console.log(words, '<---- Words after sort')
            console.log(`${words[0].word.toString()} !== ${returnedUser.justAsked.toString()} ---> ${words[0].word.toString() !== returnedUser.justAsked.toString()}`)
            if (words[0].word.toString() !== returnedUser.justAsked.toString()) {
                console.log('inside if')
                returnedUser.justAsked = words[0].word
                returnedUser.score = score
                returnedUser.trained = words
                console.log(returnedUser, '<--- returnedUser')
                User.findByIdAndUpdate(returnedUser._id, returnedUser, function(error, result) {
                  console.log('did not save: ', error)
                  console.log('did save: ', result)
                    if (error) {
                        throw error
                    }
                })
                Word.findById(words[0].word).exec(function(error, result) {
                    console.log('findById Word: ', result)
                    result.score = score
                    resolve(result)
                })

            } else {

              returnedUser.justAsked = words[1].word
              returnedUser.score = score
              returnedUser.trained = words

              User.findByIdAndUpdate(returnedUser._id, returnedUser, function(error, result) {
                console.log('did not save: ', error)
                console.log('did save: ', result)
                  if (error) {
                      throw error
                  }
              })
                Word.findById(words[1].word).exec(function(error, result) {
                    console.log('findById Word: ', result)
                    result.score = score
                    resolve(result)
                })

            }

        })
    })
}


exports.getFirstWord = getFirstWord
exports.getNextWord = getNextWord
