/**
 * This file contains common routines across all the pages.
 */

var homePage = "memoList";

$.mobile.defaultPageTransition   = 'none';
$.mobile.defaultDialogTransition = 'none';
$.mobile.buttonMarkup.hoverDelay = 0;

(function() {
 
	//Use JQM params plugin in order to pass data between pages.
	$(document).bind("pagebeforechange", function(event, data) {
	    $.mobile.pageData = (data && data.options && data.options.pageData) 
	    				  ? data.options.pageData : null;
	});
 
    //Handle back buttons decently for Android and Windows Phone 8 ...
    function onDeviceReady() {
        document.addEventListener("backbutton", function(e){
            if ($.mobile.activePage.is('#' + homePage)){
                e.preventDefault();
                navigator.app.exitApp();
            } else {
                history.back();
            }
        }, false);
    }
 
    $(document).ready(function() {
        document.addEventListener("deviceready", onDeviceReady, false);
    });
})();