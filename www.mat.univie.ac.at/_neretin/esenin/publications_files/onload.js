function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function(e) {
      if (oldonload) {
        oldonload(e);
      }
      func(e);
    }
  }
}

function shrinkFontsForSmallScreens(event)
{
	if( document.body.clientWidth <= 825 ){
		document.body.style.fontSize = '87.5%';
	}else{
		document.body.style.fontSize = '100%';
	}
}

window.onresize = shrinkFontsForSmallScreens;
addLoadEvent( shrinkFontsForSmallScreens );

try{
    window.onbeforeunload = function() 
    {
        var formlist = document.getElementsByTagName("form");
        for (var i=0; i < formlist.length; i++) {
            if (formlist[i].className == 'MirrorSitesForm') {
                formlist[i].reset();
            } else if (formlist[i].className == 'SelectDownloadFormat') {
                formlist[i].reset();
            }
        }

    }
} catch (e)
{
}


