(function() {
	
	var memoManager = MemoManager.getInstance();
	
    $(document).on("pageinit", "#memoList", function(e) {
    	
    	$("#removeAllVoices").on("tap", function(e) {
    		e.preventDefault();
    		
    	    AppUtil.showConfirmationMessage("Are you sure you want to remove all the memos?", deleteAllMemos);
    	});     
    	
    	$("#newMemo").on("tap", function(e) {
    		e.preventDefault();
    		
    		$("#memoTypeSelection").popup("open");
    	});     	
    	
    });
    
    $(document).on("pageshow", "#memoList", function(e) {
        e.preventDefault();
        
        updatememoList();
    });
    
    function deleteAllMemos() {
		memoManager.removeAllMemos();
		
		updatememoList();    	
    }
    
    function updatememoList() {
        var memos = memoManager.getMemos();

        $("#memoListView").empty();
                
        if (jQuery.isEmptyObject(memos)) {
            $("<li>No Memos Available</li>").appendTo("#memoListView");
        } else {
            for (var memo in memos) {
            	var type = "";
            	
            	if (memos[memo].type == "voice") {
            		type = "audio";
            	} else if (memos[memo].type == "photo") {
            		type = "camera";            		
            	}
            	
            	$("<li data-icon='" + type + "'><a href='#memoCapture?memoID=" + memos[memo].id + "'>" + 
            			memos[memo].title + "</a></li>").appendTo("#memoListView");
            }
        }
        
        $("#memoListView").listview('refresh');    	
    }
})();
