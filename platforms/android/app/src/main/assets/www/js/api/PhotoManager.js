var PhotoManager = (function () {
    var instance;
  
    function createObject() {
        var fileManager = FileManager.getInstance();
        
        return {
            getPhoto: function (capturingCallback, fromGallery) {
                var source = Camera.PictureSourceType.CAMERA;
                var photoManager = this;

                if (fromGallery) {
                    source = Camera.PictureSourceType.PHOTOLIBRARY;
                }
  
                navigator.camera.getPicture(function(filePath) {
                                                photoManager._captureSuccess(filePath, capturingCallback);
                                            },
                                            capturingCallback.captureError, 
                                            {
                                                quality: 70,
                                                destinationType: Camera.DestinationType.FILE_URI,
                                                sourceType: source,
                                                correctOrientation: true,
                                                encodingType: Camera.EncodingType.JPEG
                                            });
            },
            _captureSuccess: function(filePath, capturingCallback) {
                
                //Copy the captured image from tmp to app directory.
                var fileCallback = {};

                fileCallback.copySuccess = function(newFilePath) {
                    capturingCallback.captureSuccess(newFilePath);
                };

                fileCallback.copyError = capturingCallback.captureError;

                if (device.platform === "Android") {

                    //If it is Android then copy image file to App directory.
                    fileManager.copyFileToDirectory(MemoConstants.APP_BASE_DIRECTORY, filePath, 
                        true, fileCallback);
                } else if (device.platform === "iOS") {

                    //If it is iOS then copy image file to Documents directory of the iOS app.
                    fileManager.copyFileToDirectory("", filePath, true, fileCallback);
                } else {
                    console.error("Sorry, unsupported platform ...");
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
  