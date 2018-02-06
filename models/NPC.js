// This file handles the backend for the NPC mongoose schema
console.log("NPC.js");
var mongoose = require('mongoose');
//mongoose.set('debug', true);
var bcrypt = require('bcryptjs');
mongoose.connect('mongodb://' + process.env.HOST + '/' + process.env.NAME + "?authMode=scram-sha1", {
});

var db = mongoose.connection;
var npc = db.collection('npcs');

var NPCSchema = mongoose.Schema({
    Name: {
        type: String,
        text: true
    }
}, {
    strict: false
});
var ObjectId = require('mongodb').ObjectID;

/*
NPCSchema.index({
    "$**": "text"
});
npc.createIndex({
    "$**": "text"
});
*/

// The below line is causing problems. It may not be needed.
 var NPC = module.exports = mongoose.model('NPC', NPCSchema);

module.exports.replace = function(newNPC, callback) {
    npc.update({
        _id: ObjectId(newNPC._id)
    }, newNPC);
}
module.exports.delete = function(newNPC, callback) {
    npc.remove({
        _id: ObjectId(newNPC._id)
    });
}
module.exports.createNPC = function(newNPC, callback) {
	console.log("Create new NPC");
	console.log(newNPC);
    newNPC.save(callback);
}
