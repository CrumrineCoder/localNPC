var express = require('express');
console.log("NPCs.js");
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
// This file handles routing relation to making and viewing polls
//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
var NPC = require(process.cwd() + '/models/NPC');
var mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.HOST + '/' + process.env.NAME + "?authMode=scram-sha1", {
});
var db = mongoose.connection;
var npcs = db.collection('npcs');
//var page; 
router.get('/create', function(req, res) {
    if (req.user) {
        res.render('create');
    } else {
        res.render('login');
    }
});
router.get('/view/:id', function(req, res) {
    res.render('view');
});
router.get('/edit/:id', function(req, res) {
    res.render('edit');
});
router.get('/profile/', function(req, res) {
    res.render('profile');
});
router.post('/edit/', function(req, res) {
  var arr = JSON.parse(req.body.comments);
  req.body.comments = arr;
    var newNPC = new NPC(req.body);
    NPC.replace(newNPC, function(err, NPC) {
        if (err) throw err;
    });
    req.flash('success_msg', 'Saves changed.');
    res.redirect('/');
});
router.post('/delete/', function(req, res) {
    var newNPC = new NPC(req.body);
    NPC.delete(newNPC, function(err, NPC) {
        if (err) throw err;
    });
    req.flash('success_msg', 'NPC deleted; you monster.');
    res.redirect('/');
});
router.post('/create', function(req, res) {
    req.checkBody('Name', 'Name is required').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        res.render('create', {
            errors: errors
        });
    } else {
        req.body.username = req.user.username;
        req.body.comments = [];
		console.log(req.body);
        var newNPC = new NPC(req.body);
        NPC.createNPC(newNPC, function(err, NPC) {
            if (err) throw err;
        });
        req.flash('success_msg', 'Your NPC was created.');
        res.redirect('/');
    }
});
// Post a comment
router.post('/comment', function(req, res) {
    function guidGenerator() {
        var S4 = function() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
    var Comment = {displayName: "Anonymous", username: undefined};
    Comment.comment = req.body.comment;
    Comment.commentID = guidGenerator();
    Comment.date = Date.now();
    var npcID = req.body.npcID;
    if (req.user) {
        Comment.displayName = req.user.name;
        Comment.username = req.user.name;
    }
    npcs.update({
        _id: ObjectId(npcID)
    }, {
        $push: {
            comments: Comment
        }
    });
    req.flash('success_msg', 'Your comment was posted.');
    res.redirect('back');
});
router.get("/listing", function(req, res) {
    res.render('NPClisting');
});
module.exports = router;