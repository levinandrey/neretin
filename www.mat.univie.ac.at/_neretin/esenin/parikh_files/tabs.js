var currentFolder;
var currentTab;
var currentLink;

// Check to see if this browser supports encodeURIComponent
try {
    _xtest = encodeURIComponent("test");
} catch (e) {
    encodeURIComponent = escape;
}

function toggleTab( windowName, tab, folder )
{
	/*
	if( tabsLoaded == 0 )
		return;
	*/
    // alert (windowName + ' '  + tab + ' ' + folder);
	if (windowName == 'home' && tab == 'tab4') {
	    // alert ("redirect");
	    location.href = "/mathscinet/citations.html";
	    return false;
	}

	var f = document.getElementById( folder );

	// Exit if we're already on that folder
	if( currentFolder == f )
		return false;

	// flip the divs to the desired folder
	f.className = 'topFolder';
	currentFolder.className = 'bottomFolder';
	currentFolder = f;

	// move focus to first input box
	focusTab( f );

	// Set window title
	document.title = 'MR: ' + document.getElementById( tab + "link" ).title;

	// Remember the tab/folder combo so we can automatically come back to it
	var now = new Date();
	now.setTime(now.getTime() + 365 * 24 * 60 * 60 * 1000);
	setCookie( windowName + 'StickyTabs', tab, now );
	setCookie( windowName + 'StickyFolders', folder, now );

	// change the newly selected tab to the 'upper' style
	var t = document.getElementById( tab );
	if( t.className == 'lowerTabEdge' )
		t.className = 'upperTabEdge';
	else
		t.className = 'upperTab';

	// change the deselected tab to the 'lower' style
	if( currentTab != null )
		if( currentTab.className == 'upperTabEdge' )
			currentTab.className = 'lowerTabEdge';
		else
			currentTab.className = 'lowerTab';


	// remember where we are
	currentTab = t;

	return false;
}

// Flip to the tab we remembered
function rememberTab( windowName )
{
	var tab = getCookie( windowName + 'StickyTabs' );
	if( tab ){
		var folder = getCookie( windowName + 'StickyFolders' );
		toggleTab( windowName, tab, folder );
	}
}

function focusTab( tab )
{
	// move focus to first input box
	var input = tab.getElementsByTagName('input');
	for( var i=0; i < input.length; i++ ){
		if( input[i].type == 'text' ){
			input[i].focus();
			break;
		}
	}
}

function setCurrentTab( tab )
{
	currentFolder = document.getElementById( 'folder'+tab );
	currentTab = document.getElementById( 'tab'+tab );
	currentLink = document.getElementById( 'folder'+tab+'link' );
}

// initialize tabbing
/*
addLoadEvent( function() {
	if( !currentFolder )
		setCurrentTab( 1 );

	var divs = document.getElementsByTagName('div');
	for( var i=0; i < divs.length; i++ ){
		if( divs[i].className == 'folder' ){
			if( currentFolder == divs[i] ){
				//divs[i].style.visibility = 'visible';
				//focusTab( divs[i] );
				toggleTab( 
			}

			// set the window title
			document.title = 'MathSciNet: ' + document.getElementById( currentLink ).innerHTML;
		}
	}
} );

*/

/* Ajaxish stuff */

function topMCQSubmitIt() 
{
	var year = document.getElementById('topMCQYear');
	year = year ? year.value : '';

	var container = document.getElementById('topMCQ');
	var url = 'top_10_mcq_filtered.html?year=' + encodeURIComponent(year);

	loadXMLDoc( url, function (req){
		container.innerHTML = req.responseText;
	});

	return false;
}


function topJournalsSubmitIt() 
{
	var year = document.getElementById('topJournalYear');
	year = year ? year.value : '';

	var container = document.getElementById('topJournals');
	var url = 'top_10_jours_filtered.html?year=' + encodeURIComponent(year);

	loadXMLDoc( url, function (req){
		container.parentNode.innerHTML = req.responseText;
	});

	return false;
}

function topArticlesSubjSubmitIt() 
{
	var subj = document.getElementById('subj_top_articles');
	subj = subj ? subj.value : '';

	var topx = document.getElementById('topx_top_articles_subj');
	topx = topx ? topx.value : '';

	var stype = document.getElementById('type_top_articles_subj');
	stype = stype ? stype.value : '';


	var container = document.getElementById('top_articles_subj');
	var url = 'top_articles_subj_filter.html?subj=' + encodeURIComponent(subj);

	if (topx != '') {
	    url += '&topX=' + encodeURIComponent(topx);
	}

	if (stype != '') {
	    url += '&type=' + encodeURIComponent(stype);
	}

	loadXMLDoc( url, function (req){
		container.innerHTML = req.responseText;

                // Eval scripts
                var scripts = container.getElementsByTagName('script');
                for (var ix = 0; ix < scripts.length; ix++) {
                    if (scripts[ix] && scripts[ix].type.match('javascript')) {
                        try {
                            eval(scripts[ix].text);
                        } catch (e) {
                            // This failed why
                            // alert(scripts[ix].text);
                        }
                    }
                }
                
	});

	return false;

}

function topArticlesYearSubmitIt() 
{
	var year = document.getElementById('year_top_articles');
	year = year ? year.value : '';

	var topx = document.getElementById('topx_top_articles_year');
	topx = topx ? topx.value : '';

	var stype = document.getElementById('type_top_articles_year');
	stype = stype ? stype.value : '';


	var container = document.getElementById('top_articles_year');
	var url = 'top_articles_year_filter.html?year=' + encodeURIComponent(year);

	if (topx != '') {
	    url += '&topX=' + encodeURIComponent(topx);
	}

	if (stype != '') {
	    url += '&type=' + encodeURIComponent(stype);
	}

	loadXMLDoc( url, function (req){
		container.parentNode.innerHTML = req.responseText;

                // Eval scripts
                var scripts = container.getElementsByTagName('script');
                for (var ix = 0; ix < scripts.length; ix++) {
                    if (scripts[ix] && scripts[ix].type.match('javascript')) {
                        eval(scripts[ix].text);
                    }
                }
	});

	return false;

}

function top10SubmitIt() 
{
	var year = document.getElementById('top10Year');
	year = year ? year.value : '';

	var topx = document.getElementById('top10items');
	topx = topx ? topx.value : '';

	var top10List = document.getElementById('selectTop10List');
	top10List = top10List ? top10List.value : 'books';

	var container = document.getElementById('top10List');
	var url = 'top_10_lists_filtered.html?year=' + encodeURIComponent(year);

	url += '&top10List=' + encodeURIComponent(top10List);

	if (topx != '') {
	    url += '&topX=' + encodeURIComponent(topx);
	}

	loadXMLDoc( url, function (req){
		container.parentNode.innerHTML = req.responseText;

		try {
		    execJS(container);
		} catch (e) {
		    alert(e);
		}

		focusTab( container );

	});

	return false;
}

function topBooksSubmitIt() 
{
	var year = document.getElementById('topBooksYear');
	year = year ? year.value : '';

	var container = document.getElementById('topBooks');
	var url = 'top_10_books_filtered.html?year=' + encodeURIComponent(year);

	loadXMLDoc( url, function (req){
		container.innerHTML = req.responseText;
		focusTab( container );
	});

	return false;
}


function submitIt() 
{
	var name = document.getElementById('citationJournalName').value;
	var year = document.getElementById('citingYear').value;

	var container = document.getElementById('citationsBlock');
	var url = 'journalCitationsFiltered.html?journalName=' + encodeURIComponent(name) + '&citingYear=' + encodeURIComponent(year);

	loadXMLDoc( url, function (req){
		container.innerHTML = req.responseText;
	});

	return false;
}

function clearIt() 
{
	var container = document.getElementById('citationsBlock');
	var url = 'journalCitationsFiltered.html';

	loadXMLDoc( url, function (req){
		container.innerHTML = req.responseText;
	});

	return false;
}

function authorSubmitIt() 
{
	var name = document.getElementById('citationAuthorName').value;

	var container = document.getElementById('authorCitationsBlock');
	var url = 'authorCitationsFiltered.html?authorName=' + encodeURIComponent(name);

	loadXMLDoc( url, function (req){
		container.innerHTML = req.responseText;
	});

	return false;
}

function authorClearIt() 
{
	var container = document.getElementById('authorCitationsBlock');
	var url = 'authorCitationsFiltered.html';

	loadXMLDoc( url, function (req){
		container.innerHTML = req.responseText;
	});

	return false;
}

function collaborationSubmitIt() 
{
	var source = document.getElementById('AuthorSourceName');
	source = source ? source.value : '';
	var target = document.getElementById('AuthorTargetName');
	target = target ? target.value : '';
	var group_target = document.getElementById('group_target');
	group_target = group_target ? group_target.value : '';
	var group_source = document.getElementById('group_source');
	group_source = group_source ? group_source.value : '';

	var container = document.getElementById('collaborationDistBlock');
	var url = 'collaborationFiltered.html?AuthorSourceName=' + encodeURIComponent(source) + '&AuthorTargetName=' + encodeURIComponent(target) + '&group_target=' + encodeURIComponent(group_target) + '&group_source=' + encodeURIComponent(group_source);

	loadXMLDoc( url, function (req){
		container.innerHTML = req.responseText;
		focusTab( container );
	});

	return false;
}

function collaborationJump( source, target )
{
	var container = document.getElementById('collaborationDistBlock');
	var url = 'collaborationFiltered.html?';
	if( source )
		url += 'group_source=' + source + '&';

	if( target )
		url += 'group_target=' + target;

	loadXMLDoc( url, function (req){
		container.innerHTML = req.responseText;
		focusTab( container );
	});

	return false;
}

function publicationsClear()
{
	var container = document.getElementById('publicationsBlock');
	var url = 'publicationsFiltered.html';
	
	loadXMLDoc( url, function (req){
		container.innerHTML = req.responseText;
		focusTab( container );
	});

	return false;
}

var bSaf = (navigator.userAgent.indexOf('Safari') != -1);
var bOpera = (navigator.userAgent.indexOf('Opera') != -1);
var bMoz = (navigator.appName == 'Netscape');
function execJS(node) {
    var st = node.getElementsByTagName('SCRIPT');
    var strExec;
    for(var i=0;i<st.length; i++) {
        if (st[i].type.indexOf("math/tex") != -1)
            continue;
	if (bSaf) {
	    strExec = st[i].innerHTML;
	}
	else if (bOpera) {
	    strExec = st[i].text;
	}
	else if (bMoz) {
	    strExec = st[i].textContent;
	}
	else {
	    strExec = st[i].text;
	}
	try {
	    eval(strExec.split("<!--").join("").split("-->").join(""));
	} catch(e) {
	    alert("execJS: " + e);
	}
    }
}
