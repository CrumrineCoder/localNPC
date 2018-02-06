(function() {
	console.log("getSpecificNPC.client.js");
    var path = window.location.pathname;
    var page = path.split("/").pop();
    var angularApp = angular.module('npc', []);
  	// Because handlebar uses {{}}, we have to use {[{}]}
    angularApp.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    });
    angularApp.controller('npcController', function($scope) {
        $scope.NPC = [];
        var apiUrl = 'http://localhost:3000';

        function showNPCs(data) {
            var NPCObject = JSON.parse(data);
          // Show the NPC and comments
            $scope.$apply(function() {
                $scope.NPC = NPCObject[0];
                $scope.comments = NPCObject[0].comments;
            });
        }
        ready(ajaxRequest('GET', apiUrl + "/api/NPC/?id=" + page, showNPCs));
    });
})();