var AudioManager = (function () {
    var instance;
  
    function createObject() {
        var fileManager = FileManager.getInstance();
        var audioMedia;
        var recordingMedia;
        var mediaFileName;
  
        return {
            startRecordingVoice: function (recordingCallback) {
                if (device.platform === "Android") {
  
                    // For Android, store the recording in the app directory.
                    var callback = {};
                    var audioManager = this;
  
                    callback.requestSuccess = function(dirPath) {
                        audioManager._recordVoice(dirPath, recordingCallback);
                    };
                    callback.requestError = recordingCallback.recordError;
  
                    fileManager.requestDirectory(MemoConstants.APP_BASE_DIRECTORY, callback);
                } else if (device.platform === "iOS") {
  
                    // For iOS, store recording in app documents directory.
                    this._recordVoice("documents://", recordingCallback);
                } else {
                    console.error("Sorry, unsupported platform ...");
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

                // Play Media file
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
            },
            _recordVoice: function(dirPath, recordingCallback) {
                var basePath = (dirPath) ? dirPath : "";
                mediaFileName = (new Date()).getTime() + ".wav";

                var mediaFilePath = basePath + mediaFileName;

                var recordingSuccess = function() {
                    recordingCallback.recordSuccess(mediaFilePath);
                };

                // Record audio
                recordingMedia = new Media(mediaFilePath, recordingSuccess, recordingCallback.recordError);
                recordingMedia.startRecord();
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
  