function openWin(url) {
	window2 = window.open(url , "SFXmenu" ,
			"location=no,"		+
			"status=yes,"		+
			"menubar=no,"		+
			"scrollbars=yes,"	+
			"resizable=yes,"	+
			"width=460,"		+
			"height=520");
	window2.focus();
}

function SFXButton(url, image_url) {
	if (url.length < 8)
		return;

	var anchorStr  = "<img src=" + image_url + " alt=\"More links\" border=\"0\">";
	document.write('<a onclick="openWin(\'' + url +  '\'); return false">' + anchorStr + '</a>' );

	return true;
}
