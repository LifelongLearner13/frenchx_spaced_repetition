'use strict'

const express = require('express')
const jsonParser = require('body-parser').json()
const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('connect-flash');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const Word = require('./models/word')
const User = require('./models/user')
const configDB = !process.env.DATABASE_URI ? require('./config/database') : {
    url: ''
}
const logger = require('morgan')
const app = express()


require('./config/passport')(passport)

// Enable CORS from client-side
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// Setting up basic middleware for all Express requests
app.use(logger('dev')); // Log requests to API using morgan

app.use(cookieParser('changemelater'))

app.use(session({
    secret: 'changemelater',
    saveUninitialized: true,
    resave: true
}))

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(express.static('frontend/build'));


app.get('/', function(request, response) {
  console.log('user inside /: ', request.user)
    console.log('Cookies: ', request.cookies)
    console.log(request.session)

})

// GET endpoints for word pair
app.get('/word', function(req, res) {
  // console.log('user inside word: ', req.user.google.email)
    User.findById('57c75a3cc7fdfc5517713efb', 'trained justAsked').exec(function(error, docs) {
        console.log(docs, '<---- docs')
        // Mongoose does not return a plain object, convert to plain object so we can manipulate it
        docs = docs.toObject()
        // save the array of word/weight objects into a temp variable so it is more readable
        let wordArray = docs.trained
        // sort the array of word/weight so the smallest weights are on top
        wordArray.sort(function(a, b) {
            return a.weight - b.weight
        })
        console.log('inside findById user', wordArray)
        console.log(docs.hasOwnProperty('justAsked'))

        // If the first word/weight object was not just sent to the user i.e. was not the last question asked
        // then update the justAsked property and send back the populated object
        if(docs.hasOwnProperty('justAsked') && wordArray[0].word.toString() !== docs.justAsked.toString()) {
          console.log(`${wordArray[0].word.toString()} !== ${docs.justAsked.toString()} ---> ${wordArray[0].word.toString() !== docs.justAsked.toString()}`)
          console.log('inside if')
          User.findByIdAndUpdate('57c75a3cc7fdfc5517713efb', {justAsked: wordArray[0].word}, function(error) {
            if (error) {
              throw error
            }
          })
          Word.findById(wordArray[0].word).exec(function(error, result) {
            console.log('findById Word: ', result)
            res.json(result)
          })
          // We just sent the first word/weight object to the user, send the next one in the list.
          // this will only be called if the user did not answer the pervious question correctly
        } else {
          User.findByIdAndUpdate('57c75a3cc7fdfc5517713efb', {justAsked: wordArray[1].word}, function(error) {
            if (error) {
              throw error
            }
          })
          Word.findById(wordArray[1].word).exec(function(error, result) {
            console.log('findById Word: ', result)
            res.json(result)
          })
        }
    })
})

// PUT endpoint to submit answer and update score
//
app.put('/submitanswer', jsonParser, function(req, res) {
    // Calls algorithm and updates user score
    if (!req.body.wordId || !req.body.isCorrect) {
        res.status(422).json({
            message: 'Missing Fields'
        })
    }
    if (typeof req.body.wordId !== 'string' || typeof req.body.isCorrect !== 'string') {
        res.status(422).json({
            message: 'Incorrect field type'
        })
    }
    // if(req.body.isCorrect === 'true') {

    // } else {
    //
    // }

    // update algorithm
    // update database with new weight

})

// =====================================
// GOOGLE ROUTES =======================
// =====================================
// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// the callback after google has authenticated the user
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/#/quiz',
        failureRedirect: '/#/'
    }));

// LOGOUT ==============================
app.get('/logout', function(req, res) {
    console.log('before logout', req.user)
    req.logout();
    console.log('after logout', req.user)
    res.redirect('/');
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


const runServer = function(callback) {
    var databaseUri = process.env.DATABASE_URI || configDB.url
    mongoose.connect(databaseUri).then(function() {
        const port = process.env.PORT || 8080
        const server = app.listen(port, function() {
            console.log('Listening on port:' + port)
            if (callback) {
                callback(server);
            }
        });
    });
};

if (require.main === module) {
    runServer();
}
