/**
 * This file contains common routines across all the pages.
 */

$.mobile.defaultPageTransition   = 'none';
$.mobile.defaultDialogTransition = 'none';
$.mobile.buttonMarkup.hoverDelay = 0;

(function() {
	
	//Use JQM params plugin in order to pass data between pages.
	$(document).bind("pagebeforechange", function(event, data) {
	    $.mobile.pageData = (data && data.options && data.options.pageData) 
	    				  ? data.options.pageData : null;
	});
})();