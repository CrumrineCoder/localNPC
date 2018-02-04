
'use strict';
/* Authentication: */
/*
  This file handles connecting the user to the server and the controllers to the database. 
*/
require('dotenv').config();
// Used to join paths regardless of operating system.
var path = require('path');

// The view engine I use throughout the site.
var exphbs = require('express-handlebars');

// Middleware that takes the incoming request and converts it to req.body
var bodyParser = require('body-parser');

// Test
var cookieParser = require('cookie-parser');

// Used to save data to the session ID.
var session = require('express-session');

// Authentication Middleware
var passport = require('passport');

// Name says it all; middleware for input validation
var expressValidator = require('express-validator');

// Middleware for storing messages to send to the user as part of the session
var flash = require('connect-flash');

// Password and username authentication.
var LocalStrategy = require('passport-local').Strategy;

var mLab = 'mongodb://' + process.env.HOST + '/' + process.env.NAME;
console.log(mLab);

// Connect to the database with Mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.HOST + '/' + process.env.NAME, {

});
var db = mongoose.connection;
/*
var users = require('./app/routes/users.js');
var NPC = require('./app/routes/NPCs.js'); */
var express = require('express'),
 //   routes = require('./app/routes/index.js'),
    mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var app = express();



MongoClient.connect(mLab, function(err, db) {
 
    if (err) {
        throw new Error('Database failed to connect!');
    } else {
        console.log('MongoDB successfully connected on port 27017.');
    }
 
    //Exports the routes to app and db
    //routes(app, db);
    app.listen(3000, function() {
        console.log('Listening on port 3000...');
    });
});