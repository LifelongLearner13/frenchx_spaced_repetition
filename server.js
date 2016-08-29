'use strict'

const express = require('express')
const jsonParser = require('body-parser').json()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const passport = require('passport')
const BasicStrategy = require('passport-http')

const app = express()


let words = [{
  french: 	'être',	
  english: 'to be, being',
  weight: 10
	},
	{
  french: 'je',
  english: 'I', 
  weight: 10
	},
	{
	french: 'de',
	english: 'of, from, by, than, in, with',
	weight: 10
	},
	{
  french: 'ne',	
  english: 'not',
  weight: 10
	},
	{
  french: 'pas',	
  english: 'not; step, pace',
  weight: 10
	},
	{
  french: 'le',	
  english: 'the; him, it', 
  weight: 10
	},
	{
  french: 'la',	
  english: 'the; her, it',
  weight: 10
}]



// GET endpoints for word pair
app.get('/words', function(req, res) {
	return res.json(words)
})



// PUT endpoint to submit answer and update score
app.put('/submitanswer', jsonParser, function(req, res) {
	// Calls algorithm and updates user score 
  
})









const runServer = function(callback) {
  var databaseUri = process.env.DATABASE_URI || global.databaseUri || 'mongodb://mainuser:AwQuHTbnDFcYh4e7/or$@ds019746.mlab.com:19746/spaced_repetition';
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