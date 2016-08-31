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
    score: Number
})
UserSchema.plugin(deepPopulate)

// Only call when a user first logs in or user registers
UserSchema.methods.getWeightedWords = function(callback) {
    console.log('inside getWeightedWords')
    let that = this
    this.model('User').findById(this._id, 'trained').populate('Word').exec(function(error, results) {
        let newWords = []
        Word.find({}, function(error, allWords) {
            if (results.trained.length) {
                let userWordIds = results.trained.map((el) => el.word.toString())
                console.log(userWordIds)
                newWords = allWords.filter((word) => {
                    return !userWordIds.includes(word._id.toString())
                })
                newWords = newWords.map(function(word) {
                    return {
                        word: word._id,
                        weight: 1
                    }
                })
            } else {
                newWords = allWords.map(function(word) {
                    return {
                        word: word._id,
                        weight: 1
                    }
                })
            }

            that.model('User').findByIdAndUpdate(that._id, {
                $push: {
                    trained: {
                        $each: newWords
                    }
                }
            }, {
                safe: true,
                upsert: true,
                new: true
            }).deepPopulate('trained.word').exec(callback)
        })
    })
}

const User = mongoose.model('User', UserSchema)

module.exports = User
