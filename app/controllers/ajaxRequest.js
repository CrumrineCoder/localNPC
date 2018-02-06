
// Run a function on page load
function ready(fn) {
    // Will do the function once the document is ready
    if (typeof fn !== 'function') {
        return;
    }
    if (document.readyState === 'complete') {
        return fn();
    }
    document.addEventListener('DOMContentLoaded', fn, false);
}
// Make an ajaxRequest to the backend
function ajaxRequest(method, url, callback) {
    var xmlhttp = new XMLHttpRequest();
    // Everytime the readystage changes, we're checking if it's done, and if so this function will do the callback
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.response);
        }
    };
    xmlhttp.open(method, url, true);
    xmlhttp.send();
}