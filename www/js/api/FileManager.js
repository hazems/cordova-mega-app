//Singleton Object
var FileManager = (function () {     
  var instance;
 
  function createObject() {
      var FILE_BASE = "file:///";
      
      return {
          copyFileToDirectory: function (dirPath, filePath, enforceUniqueName, fileCallback) {
              var directoryReady = function (dirEntry) { 
            	  if (filePath.indexOf(FILE_BASE) != 0) {
                      filePath = filePath.replace("file:/", FILE_BASE);
              	  }
              
                  window.resolveLocalFileSystemURL(filePath, function(file) {
                      var filename = filePath.replace(/^.*[\\\/]/, '');
                      
                      if (enforceUniqueName) {
                    	  filename = (new Date()).getTime() + filename;
                      }
                          
                      file.copyTo(dirEntry, filename, function(fileEntry) {
                         fileCallback.copySuccess(dirEntry.toURL() + filename);
                      }, fileCallback.copyError);
                   }, fileCallback.copyError);  
              };              
              
              var fileSystemReady = function(fileSystem) {
                  fileSystem.root.getDirectory(dirPath, {create: true}, directoryReady);
              };
                            
              window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemReady, fileCallback.copyError);
          },
          requestDirectory: function (dirPath, callback) {
              var directoryReady = function (dirEntry) {
            	  callback.requestSuccess(dirEntry.toURL());
              };
        	  
              var fileSystemReady = function(fileSystem) {
                  fileSystem.root.getDirectory(dirPath, {create: true}, directoryReady);                    
              };        	  
        	  
              window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemReady, callback.requestError);
          }
    };
  };
 
  return {
    getInstance: function () {
      if (!instance) {
          instance = createObject();
      }
 
      return instance;
    }
  }; 
})();