var socket = null;
var postresult = "Coffee is brewing...";
var postresult1 ="Coffee pot off.";
var postresult2 ="Lights turned on.";
var postresult3 ="Lights turned off.";
var postresult4 ="On for 30 sec.";



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
document.getElementById("results").innerHTML= postresult;
document.getElementById("results").style.background = "green";
}

function displayDiv1() {
	document.getElementById("results").innerHTML= postresult1;
	document.getElementById("results").style.background = "red";
	}

	function displayDiv2() {
		document.getElementById("results1").innerHTML= postresult2;
		document.getElementById("results1").style.background = "green";
		}


		function displayDiv3() {
			document.getElementById("results1").innerHTML= postresult3;
			document.getElementById("results1").style.background = "red";
			}

			function displayDiv4() {
				document.getElementById("results2").innerHTML= postresult4;
				document.getElementById("results2").style.background = "green";
				}
		
		
				function displayDiv5() {
					document.getElementById("results2").innerHTML= postresult5;
					document.getElementById("results2").style.background = "red";
					}
