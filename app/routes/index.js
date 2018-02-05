console.log(process.cwd());
var NPCHandler = require(process.cwd() + '/app/controllers/NPCHandler.server.js');
'use strict';
console.log("index.js");
module.exports = function (app, db) {
   var npcHandler = new NPCHandler(db);

   app.route('/')
      .get(function (req, res) {
         res.render(process.cwd() + '/views/NPClisting.handlebars');
      });
  app.route('/api/listings')
      .get(npcHandler.getAllNPCs)
  app.route('/api/NPC/?')
      .get(npcHandler.getOneNPC)
};