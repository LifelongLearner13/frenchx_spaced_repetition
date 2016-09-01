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
const spaced_repitition = require('./spaced_repitition')
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

// // GET endpoints for word pair
// app.get('/word', function(req, res) {
//     let userId = '57c75a3cc7fdfc5517713efb'
//     spaced_repitition.getFirstWord(userId).then(function(results, error) {
//         res.json(results)
//     })
// })

// PUT endpoint to submit answer and update score
//
app.put('/submitanswer', jsonParser, function(req, res) {
  console.log(req.body.score, '<==== req')
    if (typeof req.body.wordId !== 'string' || typeof req.body.isCorrect !== 'string' || typeof req.body.score !== 'number') {
        return res.status(422).json({
            message: 'Incorrect field type'
        })
    }
    let userId = '57c75a3cc7fdfc5517713efb'
    if (req.body.wordId === '' && req.body.isCorrect === '') {
        spaced_repitition.getFirstWord(userId, req.body.score).then(function(results, error) {
            res.json(results)
        })
    } else {
        if (req.body.isCorrect === 'true') {
            spaced_repitition.getNextWord(userId, req.body.wordId, true, req.body.score).then(function(results, error) {
                res.json(results)
            })
        } else {
            spaced_repitition.getNextWord(userId, req.body.wordId, false, req.body.score).then(function(results, error) {
                res.json(results)
            })
        }
    }
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
