const mongoose = require('mongoose')
const Word = require('./models/word')
const User = require('./models/user')

let sortByWeight = (a, b) => {
    return a.weight - b.weight
}

let getFirstWord = (user) => {
    return new Promise(function(resolve, reject) {
        console.log('inside getFirstWord')
        User.findById(user, 'trained justAsked').exec(function(error, docs) {

            docs = docs.toObject()
            let wordArray = docs.trained
            wordArray.sort(sortByWeight)

            if (docs.hasOwnProperty('justAsked') && wordArray[0].word.toString() !== docs.justAsked.toString()) {

                console.log(`${wordArray[0].word.toString()} !== ${docs.justAsked.toString()} ---> ${wordArray[0].word.toString() !== docs.justAsked.toString()}`)
                console.log('inside if')
                User.findByIdAndUpdate(user, {
                    justAsked: wordArray[0].word
                }, function(error) {
                    if (error) {
                        throw error
                    }
                })
                Word.findById(wordArray[0].word).exec(function(error, result) {
                    console.log('findById Word: ', result)
                    resolve(result)
                })

            } else {

                User.findByIdAndUpdate(user, {
                    justAsked: wordArray[1].word
                }, function(error) {
                    if (error) {
                        throw error
                    }
                })
                Word.findById(wordArray[1].word).exec(function(error, result) {
                    console.log('findById Word: ', result)
                    resolve(result)
                })

            }
        })
    })
}

let getNextWord = (user, wordId, isCorrect) => {
    return new Promise(function(resolve, reject) {
        console.log('inside getNextWord')
        User.findById(user, 'trained justAsked').exec(function(error, docs) {
            console.log(error)
            console.log(docs)
            let word = docs.trained.filter(function(obj) {
                return obj.word.toString() === wordId.toString()
            })
            if(isCorrect) {
              word.weight *= 2
              User.findByIdAndUpdate
            }


        })
    })
}


exports.getFirstWord = getFirstWord
exports.getNextWord = getNextWord
