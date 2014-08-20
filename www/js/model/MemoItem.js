var MemoItem = function(memoItem) {
	var now = new Date().toLocaleString();
	
	this.type = memoItem.type || "voice";	
	this.title = memoItem.title || "";	
	this.desc = memoItem.desc || "";
	this.location = memoItem.location || "";
	this.mtime = memoItem.mtime || now;	
	this.id = memoItem.id || "Memo_" + (new Date()).getTime();
};

MemoItem.prototype.toString = function () {
	return "Title = " + this.title + ", " +
		   "Type = " + this.type + ", " +
		   "Description = " + this.desc + ", " +
		   "Location = " + this.location + ", " +
		   "Time = " + this.mtime + ", " +
		   "ID = " + this.id;
};


//type, title, desc, location, mtime, id