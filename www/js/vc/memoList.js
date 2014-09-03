(function() {
	
	var memoManager = MemoManager.getInstance();
	
    $(document).on("pageinit", "#memoList", function(e) {
    	
    	$("#removeAllMemos").on("tap", function(e) {
    		e.preventDefault();
    		
    	    memoManager.showConfirmationMessage("Are you sure you want to remove all the memos?", deleteAllMemos);
    	});     
    	
    	$("#newMemo").on("tap", function(e) {
    		e.preventDefault();
    		
    		$("#memoTypeSelection").popup("open");
    	});     	
    	
    });
    
    $(document).on("pageshow", "#memoList", function(e) {
        e.preventDefault();
        
        updateMemoList();
    });
    
    function deleteAllMemos() {
		memoManager.removeAllMemos();
		
		updateMemoList();
    }
    
    function updateMemoList() {
        var memos = memoManager.getMemos(), memo;

        $("#memoListView").empty();
                
        if (jQuery.isEmptyObject(memos)) {
            $("<li>No Memos Available</li>").appendTo("#memoListView");
        } else {
            for (memo in memos) {
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
