function openwindow(url, name, params) {
	if (name == '') {
		win = window.open(url, '_blank', params);
	} else {
		win = window.open(url, name, params);
	}
	win.focus();
}



var start = (new Date()).getTime();

function time_show(id) {
	var abs = (Math.round(((new Date()).getTime() - start)/1000));
	var sec = 59 - (abs % 60);
	var min = 29 - (Math.abs(Math.round((abs-30) / 60)));
	if (min < 0) {
		return;
	}
	if (sec < 10) {sec = '0' + String(sec)} else {sec = String(sec)}
	if (min < 10) {min = '0' + String(min)} else {min = String(min)}
	var elem = window.document.getElementById(id)
	if (elem) {
		elem.value = min + ':' + sec;
	}
	window.setTimeout('time_show(\''+id+'\')', 1000);
}

time_show('time');
