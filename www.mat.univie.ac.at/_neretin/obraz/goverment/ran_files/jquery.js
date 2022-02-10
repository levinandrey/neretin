/* ---------------------------------------------------------------------------------
   file-start: js/jquery/jquery.vkloader.js 
*/

/*!
 * LiveJournal loader for vkontakte like buttons.
 *
 * Copyright 2011, dmitry.petrov@sup.com
 *
 * VK script is often loaded with notable delay, so
 * plugin just loads it after the page rendering and
 * allows to display page faster.
 *
 */
(function ($) {
	'use strict';

	if ($.VK) {
		return;
	}

	$.VK = {};

	var onloads = [],
		buttons = [],
		onloadPassed = false,
		scriptLoaded = false,
		scriptLoading = false;

	/**
	 * Public API
	 *
	 * @namespase $.VK
	 */
	$.VK = {

		/**
		 * Init VK object after the script load.
		 *     Function passes all option to the VK.init
		 *  @param {Object} options
		 */
		init: function( options ) {
			onloads.push(function() {
				VK.init( options );
			});
		},

		/**
		 * Add button to init after script load.
		 *    If this method was called after the page load, and script wasn't downloaded yet,
		 *    it will trigger downloading.
		 */
		addButton: function( elementId, options ) {
			buttons.push( {
				id: elementId,
				options: options
			} );

			if( onloadPassed && !scriptLoading ) {
				if( scriptLoaded ) {
					initButtons();
				} else {
					loadScript( initButtons );
				}
			}
		}
	};

	function initButtons() {
		for( var i = 0; i < buttons.length; ++i ) {
			VK.Widgets.Like( buttons[ i ].id, buttons[ i ].options );
		}

		buttons = [];
	}

	function loadScript( onload ) {
		onload = onload || $.noop;
		scriptLoading = true;

		$.getScript( 'http://userapi.com/js/api/openapi.js?31', function() {
			scriptLoading = false;
			scriptLoaded = true;
			for( var i = 0; i < onloads.length; ++i ) {

				onloads[ i ]();
			}
			onloads = [];
			onload();
		} );
	}

	LiveJournal.register_hook('page_load', function() {
		//Do not download the script if the widgets were not added yet.
		if (buttons.length) {
			//Do not load the script directly after the page load.
			//We don't want to delay other onload functions somehow.
			setTimeout(function () {
				loadScript(initButtons);
			}, 500);
		}

		onloadPassed = true;
	});
}(jQuery));
;

/* file-end: js/jquery/jquery.vkloader.js 
----------------------------------------------------------------------------------*/
