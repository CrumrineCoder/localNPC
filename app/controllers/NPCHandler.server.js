'use strict';

var ObjectId = require('mongodb').ObjectID;
// This file gets the polls collection data from the db and handles adding votes to the database
function NPCHandler(db) {
    var npc = db.collection('npcs');
    // Get all NPCs
    this.getAllNPCs = function(req, res) {
        npc.find({}, {
            __v: 0
        }).toArray(function(err, documents) {
            if (err) throw err
            res.json(documents);
        })
    }
    // Get one NPC
    this.getOneNPC = function(req, res) {
        npc.find({
            _id: ObjectId(req.query.id)
        }).toArray(function(err, documents) {
            if (err) throw err
            res.json(documents);
        })
    }
    // Outdated function: search for NPCs based on text. 
    this.Search = function(req, res) {
        npc.find({
            $text: {
                $search: req.body.npcName
            }
        }, {
            __v: 0
        }).toArray(function(err, documents) {
            if (err) throw err
            res.json(documents);
        })
    }
}
module.exports = NPCHandler;