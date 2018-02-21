var socket = null;
//Posts a result that button has been clicked
var postresult = "Working!";

if (document.readyState != 'loading') ready();
else document.addEventListener('DOMContentLoaded', ready);
//sends a message to the app.js script
function ready() {
	const url = 'ws://' + location.host + '/ws';
	socket = new ReconnectingWebsocket(url);
	socket.onopen = function(evt) {};
	socket.onmessage = function(evt) {
		logReceived(evt.data);
	};
}

function send(str) {
	socket.send(str);
}

function logReceived(d) {
	console.log(d);
}
//displays a div saying that the program is working
function displayDiv() {
document.getElementById("results").innerHTML= postresult;
document.getElementById("results").style.background = "green";
}
