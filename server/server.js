// ========== General Setup ================
const express       = require('express');
const app           = express();
const port          = process.env.PORT || 8080;

const jsonParser    = require('body-parser').json();
//const cookieParser  = require('cookie-parser');
//const passport      = require('passport');
//const flash         = require('connect-flash');
//const session       = require('express-session');
const logger        = require('morgan');
//const spaced_repitition = require('./spaced_repitition');

// ========== Database Setup ================
const mongoose      = require('mongoose');
//const Word          = require('./models/word');
//const User          = require('./models/user');
// Determine database url
const configDB      = require('./config/database'); 

// ========= Authentication Setup ============
//require('./config/passport')(passport)
//app.use(cookieParser('changemelater'))
//app.use(session({
//    secret: 'changemelater',
//    saveUninitialized: true,
//    resave: true
//}))
//app.use(passport.initialize())
//app.use(passport.session()) // persistent login sessions
//app.use(flash()) // use connect-flash for flash messages stored in session

// =========== Log API Requests ================
app.use(logger('dev'));

// ======== Serve static frontend files ========
app.use(express.static('frontend/build'))

// ================ Routes =====================
//require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passpo


/* ------ PUT Endpoint ------ */

// Updates database with results, if neccessary, and returns a new word
app.put('/submitanswer', jsonParser, function(req, res) {
    let userId = '57c75a3cc7fdfc5517713efb' // fake authentication
    let wordId = req.body.wordId
    let isCorrect = req.body.isCorrect
    let score = req.body.score

    // Check request body, send an error if a problem occurs
    // wordId and isCorrect must be strings. isCorrect must be true, false, or
    // empty string. Score must be a number or an empty string.
    if (typeof wordId !== 'string' || typeof isCorrect !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: wordId and isCorrect must be a string'
        })
    }
    if (typeof score !== 'number' && score !== '') {
        return res.status(422).json({
            message: 'Incorrect field type: score must be a number or ""'
        })
    }
    if (!(isCorrect === 'true' || isCorrect === 'false' || isCorrect === '')) {
        return res.status(422).json({
            message: 'Incorrect value for isCorrect, must be "true", "false" or ""'
        })
    }

    // User has just logged in and we need to load the first word
    if (wordId === '' && isCorrect === '' && score === '') {
        spaced_repitition.getNextWord(userId).then((results, error) => {
            if (error) {
                throw error
            }
            res.json(results)
        })
    // The user has answered a word and needs a new one to train on
    } else {
        spaced_repitition
            .getNextWord(userId, wordId, isCorrect === 'true', score)
            .then((results, error) => {
                if (error) {
                    throw error
                }
                res.json(results)
            })
    }
})

/* ------ Google OAuth2 Authentication Routes ------ */

// This initiates the authication process. Scope is the
// information we are asking google to send us about the
// person sigining in.
//app.get('/auth/google', passport.authenticate('google', {
//    scope: ['profile', 'email']
//}))
//
//// Called when Google has finished authenticating, redirects based
//// on whether the login was successful.
//app.get('/auth/google/callback',
//    passport.authenticate('google', {
//        successRedirect: '/#/quiz',
//        failureRedirect: '/#/'
//    }))
//
//// Logout
//app.get('/logout', function(req, res) {
//    req.logout()
//    res.redirect('/')
//})
//
//// route middleware to make sure a user is logged in
//function isLoggedIn(req, res, next) {
//
//    // if user is authenticated in the session, carry on
//    if (req.isAuthenticated())
//        return next()
//
//    // if they aren't redirect them to the home page
//    res.redirect('/')
//}

// Connect to the MongoDB database and start the server
const runServer = function(callback) {
    var databaseUri = configDB.url
    console.log(databaseUri);
    mongoose.connect(databaseUri).then(function() {
        console.log('connected to Database')
        const server = app.listen(port, function() {
            console.log('Listening on port:' + port)
            if (callback) {
                callback(server);
            }
        })
    })
};

if (require.main === module) {
    runServer();
}
