'use strict';
console.log("profile.client.js");
(function() {
    var app = angular.module('npc', []);
    	// Because handlebar uses {{}}, we have to use {[{}]}
    app.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    });
    app.controller('npcController', function($scope) {
        $scope.NPCs = [];
        var apiUrl = 'http://localhost:3000';
        var user;

        function getUser(callback) {
            ajaxRequest('GET', apiUrl + "users/user_data", function(data) {
                data = JSON.parse(data);
                if (data.hasOwnProperty('username')) {
                    user = data.username;
                }
                callback();
            });
        }
        getUser(function() {
            ready(ajaxRequest('GET', apiUrl + "/api/listings", showNPCs))
        });

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
            var resultObject = search(user, NPCObject);
           // Show the NPCs
            for (var i = 0; i < resultObject.length; i++) {
                $scope.$apply(function() {
                    $scope.NPCs.push(resultObject[i]);
                });
            }
           // Add the edit buttons
            if (resultObject.length > 0) {
                for (var i = 0; i < resultObject.length; i++) {
                    var link = document.createElement("a");
                    link.href = "edit/" + NPCObject[i]._id;
                    var textnode = document.createTextNode("Edit");
                    link.appendChild(textnode);
                    document.getElementById(NPCObject[i]._id).appendChild(link);
                }
                var elems = document.getElementsByClassName('confirmation');
                var confirmIt = function(e) {
                    if (!confirm('Are you sure?')) e.preventDefault();
                };
                for (var i = 0, l = elems.length; i < l; i++) {
                    elems[i].addEventListener('click', confirmIt, false);
                }
            }
        }
    });
})();