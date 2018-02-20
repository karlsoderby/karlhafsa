var socket = null;
if (document.readyState != 'loading') ready();
else document.addEventListener('DOMContentLoaded', ready);

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


function displayDiv() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}