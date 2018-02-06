// Textarea auto grows 
console.log("editNPC.client.js");
function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}
(function() {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    var app = angular.module('npc', []);
	// Because handlebar uses {{}}, we have to use {[{}]}
    app.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    });
    app.controller('npcController', function($scope) {
		// Reset the NPC var
        $scope.NPC = [];
        var apiUrl = 'http://localhost:3000';
        var elems = document.getElementsByClassName('confirmation');
        var confirmIt = function(e) {
            if (!confirm('Are you sure?')) e.preventDefault();
        };
        for (var i = 0, l = elems.length; i < l; i++) {
            elems[i].addEventListener('click', confirmIt, false);
        }
		// Show the NPCs
        function showNPCs(data) {
            var NPCObject = JSON.parse(data);
            for (var i = 0; i < NPCObject.length; i++) {
                $scope.$apply(function() {
                    $scope.NPC = NPCObject[i];
                });
            }
        }
        ready(ajaxRequest('GET', apiUrl + "/api/NPC/?id=" + page, showNPCs));
    });
})();