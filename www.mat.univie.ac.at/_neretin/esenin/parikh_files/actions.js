function resizeMultLine(id) {
    var mathjaxDisplay = $(id).closest(".MathJax_Display");
    var root = $(mathjaxDisplay).find(".updatedSpanSize");

    if ($(mathjaxDisplay).length > 0) {
        if ($(root).length == 0) {
            $(mathjaxDisplay).find("span").each(
	        function(index) {
	            if ($(this).css("width") == '75.12%') {
	                $(this).addClass("updatedSpanSize");	
			// alert("updatedSpanSize");
	                root = $(this);
	                return false;
	            }
	        });
        }
    }

    if ($(root).length > 0) {
        // Figure out what a reasonable width is based on the widest row of
        // the multline
        var maxWidth = 0;
        var sumWidth = 0;
        var sum = [];
        var mtable = $(root).find("span.mtable");
        $(mtable).find("span.mtd").each(
            function(index) {
	        // If the first mtable is this mtds parent then all is good
	        if ($(this).parents(".mtable:first")[0] == $(mtable)[0]) {
	            sum[index] = $(this).width();
		    //	            alert(sum[index]);
	            
	            if ($(this).width() > maxWidth) {
	                maxWidth = $(this).width();
	            }
	        }
            });
        
        var maxBodyLength = 0;
        var minHeadFootLength = 0;
        for (index = 0; index < sum.length; index++) {
            if (index == 0 || index == sum.length - 1) {
	        if (minHeadFootLength > 0 && sum[index] < minHeadFootLength) {
	            minHeadFootLength = sum[index];
	        } else if (minHeadFootLength == 0) {
	            minHeadFootLength = sum[index];
	        }
            }
        }

        // This seems to work quite well
        sumWidth = minHeadFootLength + maxWidth;

        // Calculate the % of the width needed to layout the multline
        var percentage;

        if (sumWidth > $("div#everything").width()) {
            percentage = '95%';
        } else {
            percentage = ((sumWidth/$("div#everything").width())*100) + "%";
        }

	//      alert(percentage + " mWidth=" + maxWidth + " sumWidth=" + sumWidth);

        $(root).css("width", percentage);
        
        if (! $(id).hasClass("resizeMultLine")) {
            $(id).addClass("resizeMultLine");			  
        }
    }
}

function typeSet() 
{
    var useMathJaxFonts = 0;
    if (mathjax_active == "on") {
        // $(".MathTeX").hide();
        MathJax.Hub.Typeset();
        $(".preSearchEqnHighlight").addClass("searchEqnHighlight");
        if (useMathJaxFonts > 0) {
            $("body,input,select").css('font-family', 'MathJax_SansSerif');
        }
        MathJaxTypeset = 1;
    }
}


jQuery(document).ready(
    function() {
        var processSignal = MathJax.CallBack.Signal("Hub");
	var newMath = new Array();
        
        processSignal.Interest(
            function(message) {
	        if (typeof message == 'object' && 
                    message[0].indexOf("New Math") != -1) {
	            var id = "#" + message[1] + "-Frame";

		    var mathjaxDisplay = $(id).closest(".MathJax_Display");

		    // Only add to array if display equation
		    if ($(mathjaxDisplay).length > 0) {
			newMath.push(id);
		    }
	        }
	        if (typeof message == 'object' && 
                    message[0].indexOf("End Process") != -1) {

		    for (midx = 0; midx < newMath.length; midx++) {
			resizeMultLine(newMath[midx]);
		    }
		    newMath = new Array();
		}
            });

        var signal = MathJax.CallBack.Signal("Startup");
        var useMathJaxFonts = 0;
        signal.Interest(
            function(message){
	        if (message == 'End') {
	            MathJaxTypeset = 0;

	            if (mathjax_active == "on" && MathJax.Hub.config.jax.length > 0) {
	                // alert("before typeset " + MathJax.isReady);
	                // $(".MathTeX").hide();
	                MathJax.Hub.Typeset();
	                $(".preSearchEqnHighlight").addClass("searchEqnHighlight");
	                if (useMathJaxFonts > 0) {
	                    $("body,input,select").css('font-family', 'MathJax_SansSerif');
	                }
	                MathJaxTypeset = 1;
	            }
	            
                    // Conditionally display icon to turn mathjax on/off
                    // If MathJax is available on this platform and if there
                    // is math on the page.
	            if (MathJax.Hub.config.jax.length > 0 && $(".MathTeX").length > 0) {
	                // MathJax is available (Give user an option to use it)
	                // Add a button to the screen

                        if (mathjax_toggle && mathjax_toggle == "on") {                        
	                $(".pageTitle").append("<a class=\"MathJaxToggle\">MathJax is " + 
                            ((MathJaxTypeset == 0) ? "off" : "on") + 
                            "<\/a>").find(".MathJaxToggle").
                            bind("click",
	                         function(event) {
                                     // Take care of multiple clicks
                                     $(this).unbind(event);

		                     if (MathJaxTypeset == 1) {
		                         MathJaxTypeset = 0;
		                         $(".preSearchEqnHighlight").removeClass("searchEqnHighlight");
		                         if (useMathJaxFonts > 0) {
                                             $("body,input,select").css('font-family', 'Verdana, "Bitstream Vera Sans", Arial, Helvetica, sans-serif');
		                         }
		                         // $(".MathJax_Display,.MathJax").hide();
		                         // $(".MathTeX").show();
		                         $.get(root + "/mathscinet/search/settings.html", {mathjax : 'off', redirect: 'NONE'});
                                         $(this).bind("click", event.handler);
		                     } else {
		                         MathJaxTypeset = 1;
                                         var reactivateSignal = MathJax.CallBack.Signal("Hub");
                                         var mythis = this;
                                         var myevent = event;
                                         
                                         var activateClick = function() 
                                         {
                                             $(mythis).bind("click", myevent.handler);
                                         }
                                         
                                         reactivateSignal.Interest(function(message) 
                                                                   {
                                                                       if (typeof message == 'object' && 
                                                                           message[0].indexOf("End Process") != -1) {
                                                                           // Rebind click event to this object
                                                                           // alert("binding");
                                                                           activateClick();
                                                                       }
                                                                   });

		                         if ($(".MathTeX").length > 0 && $(".MathJax").length == 0) {
		                             MathJax.Hub.Typeset();	    
		                         }
		                         // $(".MathTeX").hide();
		                         $(".preSearchEqnHighlight").addClass("searchEqnHighlight");
		                         if (useMathJaxFonts > 0) {
                                             $("body,input,select").css('font-family', 'MathJax_SansSerif');
		                         }
		                         // $(".MathJax_Display,.MathJax").show();
		                         $.get(root + "/mathscinet/search/settings.html", {mathjax : 'on', redirect: 'NONE'});
		                     }
		                     
		                     $(".MathJaxToggle").html("MathJax is " + ((MathJaxTypeset == 0) ? "off" : "on"));
	                         }
	                        );
                            } else {
                                if (MathJaxTypeset == 1) {
                                    $(".pageTitle").prepend("<a class=\"MathJaxToggle\" href=\"http://www.mathjax.org\" target=\"WHATSNEW\" title=\"Mathematics on this page is rendered by MathJax a JavaScript display engine for Mathematics an Open Source Project of which the American Mathematical Society is a sponsor.\">MathJax is on</a>");
                                } else {
                                    $(".pageTitle").prepend("<span class=\"MathJaxToggle MathJaxHint\">To turn on MathJax update your preferences</span>");
                                }
                            }
                    }
	        }                
	        // alert(message);
            });
        
        $(window).resize(
            function(){
	        $(".resizeMultLine").each(
	            function(index) {
		    // Interesting problem this breaks if an alert statement exists
		    var id = "#" + $(this).attr("id");
		    resizeMultLine(id);
	            }
	        );
            }
        );
        
        $(window).load(
            function() {
	        //	  alert("ready " + $("script[type=math/tex]").length);


            }
        );
    }
);
