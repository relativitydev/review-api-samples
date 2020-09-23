function padNumber(number) {
	if (number < 10) {
		return "0" + number;
	}

	return number;
}

function getTimeString() {
	var today = new Date();
	var hour = today.getHours();
	var minute = padNumber(today.getMinutes());
	var second = padNumber(today.getSeconds());
	return hour + ":" + minute + ":" + second;
}

function updateDom(element, timeString) {
	element.innerHTML = timeString;
}

var clockElement = document.getElementById("clock");

setInterval(function() {
	var time = getTimeString();
	updateDom(clockElement, time);
}, 500);