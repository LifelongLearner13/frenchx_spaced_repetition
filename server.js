'use strict'

const express = require('express')
const jsonParser = require('body-parser').json()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const passport = require('passport')
const BasicStrategy = require('passport-http')
const Word = require('./models/word')
const User = require('./models/user')
const Weight = require('./models/weight')
const configDB = require('./config/database');

const app = express()


// GET endpoints for word pair
app.get('/word', function(req, res) {
  Word.find({}).exec(function(error, docs) {
      let randomPair = docs[Math.floor(Math.random() * (docs.length - 0) + 0)]
    	return res.json(randomPair)
  })
})

app.get('/test', function(request, response) {
  let newUser = User.findById('57c5a3839951fd8b10e209ca', function(error, result) {
    result.getWeightedWords(function(error, results) {
      console.log('error: ', error)
      console.log('results: ', results.trained)
    })
  })
})

// PUT endpoint to submit answer and update score
app.put('/submitanswer', jsonParser, function(req, res) {
	// Calls algorithm and updates user score
  if(!req.body.french || !req.body.english || !req.body.isCorrect) {
    res.status(422).json({
      message: 'Missing Fields'
    })
  }
  if(typeof req.body.french !== 'string'|| typeof req.body.english !== 'string' || typeof req.body.isCorrect) {
    res.status(422).json({
      message: 'Incorrect field type'
    })
  }

  // update algorithm
  // update database with new weight

})




const runServer = function(callback) {
  var databaseUri = process.env.DATABASE_URI || global.databaseUri || configDB.url;
  mongoose.connect(databaseUri).then(function() {
    const port = process.env.PORT || 8080;
    const server = app.listen(port, function() {
      console.log('Listening on port:' + port);
      if (callback) {
        callback(server);
      }
    });
  });
};

if (require.main === module) {
  runServer();
}
