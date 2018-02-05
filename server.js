
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

// Connect to the database with Mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.HOST + '/' + process.env.NAME, {

});
var db = mongoose.connection;

var users = require('./app/routes/users.js');
var NPC = require('./app/routes/NPCs.js'); 
var express = require('express'),
  //  routes = require('./app/routes/index.js'),
    mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var app = express();

// Set up the handlebars html view
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
    defaultLayout: 'layout'
}));
app.set('view engine', 'handlebars');
// Body and cookie parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
// Shortcut the routes
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/views', express.static(process.cwd() + '/views'));
// Passport set up
app.use(session({
    secret: process.env.PASSKEY,
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());
// Error validation
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));
// Error message
app.use(flash());

app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});
 
// Routing
app.use('/users', users);
app.use('/NPC', NPC); 
// MongoDB connect 


MongoClient.connect(mLab, function(err, db) {
 
    if (err) {
        throw new Error('Database failed to connect!');
    } else {
        console.log('MongoDB successfully connected on port 27017.');
    }
 
    //Exports the routes to app and db
  //  routes(app, db);
    app.listen(3000, function() {
        console.log('Listening on port 3000...');
    });
});