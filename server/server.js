/*--------- GENERAL SETUP --------- */
const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const port = process.env.PORT || 8080;
const jwt = require('express-jwt');
const apiRoute = require('./routes/api');
const mongoose = require('mongoose');

let DATABASE_URI;
if (process.env.NODE_ENV === 'Development') {
  const logger = require('morgan');
  app.use(logger('dev')); // log every HTTP request to the console
  DATABASE_URI = process.env.LOCAL_DATABASE_URI;
} else {
  DATABASE_URI = process.env.DATABASE_URI;
}

/*-------- AUTHENTICATION ----------*/
const authenticate = jwt({
  secret: process.env.CLIENT_SECRET,
});

/*-------- SERVE FRONTEND ----------*/
app.use(express.static(path.resolve(__dirname, '../frontend/build/')))

/*------------ ROUTES --------------*/
app.use('/api', authenticate, apiRoute);

// handle every other route with index.html required by browserHistory
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '../frontend/build/', 'index.html'))
});

/*--------- START SERVER -----------*/
const runServer = function(callback) {
    var databaseUri = DATABASE_URI;
    console.log(databaseUri);
    mongoose.connect(databaseUri).then(function() {
        console.log('connected to Database')
        const server = app.listen(port, function() {
            console.log('Listening on port:' + port);
            if (callback) {
                callback(server);
            }
        })
    })
};

if (require.main === module) {
    runServer();
};

exports.app = app;
exports.runServer = runServer;
