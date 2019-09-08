var AudioManager = (function () {
    var instance;
  
    function createObject() {
        var fileManager = FileManager.getInstance();
        var APP_BASE_DIRECTORY = "Mega";
        var audioMedia;
        var recordingMedia;
        var mediaFileName;
  
        return {
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
  
                    // For Android, store the recording in the app directory.
                    var callback = {};
  
                    callback.requestSuccess = recordVoice;
                    callback.requestError = recordingCallback.recordError;
  
                    fileManager.requestDirectory(APP_BASE_DIRECTORY, callback);
                } else if (device.platform === "iOS") {
  
                    // For iOS, store recording in app documents directory.
                    recordVoice("documents://");
                } else {
  
                    // Else for other platforms, store recording under the default directory.
                    recordVoice();
                }
            },
            stopRecordingVoice: function () {
                recordingMedia.stopRecord();
                recordingMedia.release();
            },
            playVoice: function (filePath, playCallback) {
                if (!filePath) {
                    return;
                }

                this.cleanUpResources();
                audioMedia = new Media(filePath, playCallback.playSuccess, playCallback.playError);
                audioMedia.play();
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
  