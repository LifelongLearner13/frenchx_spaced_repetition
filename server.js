const express = require('express')
const jsonParser = require('body-parser').json()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const passport = require('passport')
const BasicStrategy = require('passport-http')

const app = express()

// GET endpoints:
// 1. Word pair
app.get('/words', function(req, res) {
	// Provide next word pair
	
})



// PUT endpoints:
// 1. Submit answer, update score
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