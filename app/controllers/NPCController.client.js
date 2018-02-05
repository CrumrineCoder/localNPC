'use strict';
console.log(window.location.href);
console.log("NPCControllers.client.js");
(function() {
    // Set up Angular
    var app = angular.module('npc', []);
    // Because handlebars already uses {{}}, we have to use {[{}]}
    app.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    });
    app.controller('npcController', function($scope) {
        // User search angular var
        $scope.search = "";
        // NPCs to show to the user angular var
        $scope.NPCs = [];
        var apiUrl = 'http://localhost:3000/';
        var user;
        // Get the current user  logged in 
        function getUser(callback) {
			console.log(apiUrl + "users/user_data");
            ajaxRequest('GET', apiUrl + "users/user_data", function(data) {
                data = JSON.parse(data);
                if (data.hasOwnProperty('username')) {
                    user = data.username;
                }
                callback();
            });
        }
        // Show the NPCs on page load
        $scope.load = function reload() {
            getUser(function() {
                ready(ajaxRequest("GET", apiUrl + "api/listings", showNPCs))
            });
        }
        $scope.load();
        // Search bar functionality: based on the search text, reduce the array of NPCs
        // Oudated, now we filter. 
        function search(nameKey, myArray) {
            var newArr = [];
            for (var i = 0; i < myArray.length; i++) {
                if (myArray[i].username === nameKey && nameKey != null) {
                    newArr.push(myArray[i]);
                }
            }
            return newArr;
        }

        function showNPCs(data) {
            var NPCObject = JSON.parse(data);
            // Reset the NPCs var on load
            $scope.NPCs = [];
            // If the user is searching, then filter the NPCs returned
            if ($scope.search != "") {
                NPCObject = NPCObject.filter(function(obj) {
                    return (obj.Name.toLowerCase()).indexOf($scope.search.toLowerCase()) != -1
                });
            }
            // Put the NPCs into the NPC array to display to the user
            for (var i = 0; i < NPCObject.length; i++) {
                $scope.$apply(function() {
                    $scope.NPCs.push(NPCObject[i]);
                });
            }
            // Add the edit button for the creator of the NPCs
            if (NPCObject.length > 0) {
                for (var i = 0; i < NPCObject.length; i++) {
                    if (user == NPCObject[i].username) {
                        var link = document.createElement("a");
                        link.href = "NPC/edit/" + NPCObject[i]._id;
                        var textnode = document.createTextNode("Edit");
                        link.appendChild(textnode);
                        document.getElementById(NPCObject[i]._id).appendChild(link);
                    }
                }
                var elems = document.getElementsByClassName('confirmation');
                var confirmIt = function(e) {
                    if (!confirm('Are you sure?')) e.preventDefault();
                };
                for (var i = 0, l = elems.length; i < l; i++) {
                    elems[i].addEventListener('click', confirmIt, false);
                }
            }
            // Error handling
            else {
                alert("No NPC can be found by that name.")
            }
        }
    });
})();