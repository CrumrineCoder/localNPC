'use strict'
console.log("creatingNPCs.client.js");
function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}
(function() {
    var apiUrl = 'http://localhost:3000';
    // Remove duplicates from an array
    function uniq(a) {
        var seen = {};
        return a.filter(function(item) {
            return seen.hasOwnProperty(item) ? false : (seen[item] = true);
        });
    }
    // Show the NPC values on the listing
    function showNPCs(data) {
        var NPCObject = JSON.parse(data);
        var Age = uniq(NPCObject.map(function(a) {
            return a.Age;
        }));
        var Profession = uniq(NPCObject.map(function(a) {
            return a.Profession;
        }));
        var Gender = uniq(NPCObject.map(function(a) {
            return a.Gender;
        }));
        var Race = uniq(NPCObject.map(function(a) {
            return a.Race;
        }));
        var Faction = uniq(NPCObject.map(function(a) {
            return a.FactionType;
        }));
        var AgeList = document.getElementById('AgeList');
        Age.forEach(function(item) {
            var option = document.createElement('option');
            option.value = item;
            AgeList.appendChild(option);
        });
        var ProfessionList = document.getElementById('ProfessionList');
        Profession.forEach(function(item) {
            var option = document.createElement('option');
            option.value = item;
            ProfessionList.appendChild(option);
        });
        var GenderList = document.getElementById('GenderList');
        Gender.forEach(function(item) {
            var option = document.createElement('option');
            option.value = item;
            GenderList.appendChild(option);
        });
        var RaceList = document.getElementById('RaceList');
        Race.forEach(function(item) {
            var option = document.createElement('option');
            option.value = item;
            RaceList.appendChild(option);
        });
        var FactionList = document.getElementById('FactionList');
        Faction.forEach(function(item) {
            var option = document.createElement('option');
            option.value = item;
            FactionList.appendChild(option);
        });
    }
    ready(ajaxRequest('GET', apiUrl + "api/listings", showNPCs));
})();