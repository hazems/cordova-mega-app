//Singleton Object
var MemoManager = (function () {     
  var instance;
 
  function createObject() {
      var fileManager = FileManager.getInstance();      
      var MEMOS_KEY = "memos";
      var APP_BASE_DIRECTORY = "Mega";
      var memoMap;
      var audioMedia;
      var recordingMedia;
      var mediaFileName;
      
      return {
          getMemos: function () {
              memoMap = JSON.parse(window.localStorage.getItem(MEMOS_KEY)) || {};
              
              return memoMap;
          }, 
          getMemoDetails: function (memoID) {
              memoMap = JSON.parse(window.localStorage.getItem(MEMOS_KEY)) || {};
              
              return memoMap[memoID];
          },
          saveMemo: function (memoItem) {  
              memoMap = JSON.parse(window.localStorage.getItem(MEMOS_KEY)) || {};
              
              memoMap[memoItem.id] = memoItem;
              
              window.localStorage.setItem(MEMOS_KEY, JSON.stringify(memoMap));
          }, 
          removeMemo: function(memoID) {
              memoMap = JSON.parse(window.localStorage.getItem(MEMOS_KEY)) || {};
              
              if (memoMap[memoID]) {
            	  delete memoMap[memoID];
              }
              
              window.localStorage.setItem(MEMOS_KEY, JSON.stringify(memoMap));
          },
          removeAllMemos: function() {
              window.localStorage.removeItem(MEMOS_KEY);
          },
          showConfirmationMessage: function (message, okHandler) {
              navigator.notification.confirm(message,
                   function (index) {
                       if (index == 1) {
                           okHandler();
                       }
                   },
                   'MegaApp'
               );
           },
          startRecordingVoice: function (recordingCallback) {
              var recordVoice = function(dirPath) {
                  var basePath = "";

                  if (dirPath) {
                      basePath = dirPath;
                  }

                  mediaFileName = (new Date()).getTime() + ".wav";
                  
                  var mediaFilePath = basePath + mediaFileName;
                  
                  var recordingSuccess = function() {
                      recordingCallback.recordSuccess(mediaFilePath);
                  };            
                  
                  recordingMedia = new Media(mediaFilePath, recordingSuccess, recordingCallback.recordError);

                  // Record audio
                  recordingMedia.startRecord(); 
              };
              
              if (device.platform === "Android") {
                  
                  // For Android, store the recording in the app directory under the SD Card root ...
                  var callback = {};
              
                  callback.requestSuccess = recordVoice;
                  callback.requestError = recordingCallback.recordError;

                  fileManager.requestDirectory(APP_BASE_DIRECTORY, callback);
              } else if (device.platform === "iOS") {
                   
                  // For iOS, store recording in app documents directory ...
                  recordVoice("documents://");
              } else {
                  
                  // Else for Windows Phone 8, store recording under the app directory ...
                  recordVoice();
              }
          },
          stopRecordingVoice: function () {
              recordingMedia.stopRecord();   
              recordingMedia.release();
          },
          playVoice: function (filePath, playCallback) {
              if (filePath) {                  
                  this.cleanUpResources();
                     
                  audioMedia = new Media(filePath, playCallback.playSuccess, playCallback.playError);
                
                  // Play audio
                  audioMedia.play();
              }            
          }, 
          getPhoto: function (capturingCallback, fromGallery) {      
        	  var source = Camera.PictureSourceType.CAMERA;
        	  
        	  if (fromGallery) {
        	      source = Camera.PictureSourceType.PHOTOLIBRARY;  
        	  }
              
              var captureSuccess = function(filePath) {
                  
                   //Copy the captured image from tmp to app directory ...
                  var fileCallback = {};
                  
                  fileCallback.copySuccess = function(newFilePath) {
                       capturingCallback.captureSuccess(newFilePath);
                  };
                   
                  fileCallback.copyError = capturingCallback.captureError;
                   
                  if (device.platform === "Android") {
                   
                      //If it is Android then copy image file to App directory under SDCard ...
                      fileManager.copyFileToDirectory(APP_BASE_DIRECTORY, filePath, fileCallback);
                  } else if (device.platform === "iOS") {
                   
                      //If it is iOS then copy image file to Documents directory of the iOS app.
                      fileManager.copyFileToDirectory("", filePath, fileCallback);
                  } else {
                   
                     //Else for Windows Phone 8, store the image file in the application's isolated store ...
                     capturingCallback.captureSuccess(filePath);
                  }
              };
        	  
              navigator.camera.getPicture(captureSuccess,
            		  					  capturingCallback.captureError, 
            		  					  { 
            	                           quality: 30, 
            	  						   destinationType: Camera.DestinationType.FILE_URI, 
            	  						   sourceType: source,
            	  						   correctOrientation: true
            	  						   });              
          },           
          cleanUpResources: function() {
              if (audioMedia) {
                  audioMedia.stop();
                  audioMedia.release();
                  audioMedia = null;
              } 
              
              if (recordingMedia) {
            	  recordingMedia.stop();
            	  recordingMedia.release();
            	  recordingMedia = null;
              } 
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