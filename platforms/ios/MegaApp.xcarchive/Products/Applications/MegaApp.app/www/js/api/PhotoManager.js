var PhotoManager = (function () {
    var instance;
  
    function createObject() {
        var fileManager = FileManager.getInstance();
        var APP_BASE_DIRECTORY = "Mega";

        return {
            getPhoto: function (capturingCallback, fromGallery) {
              var source = Camera.PictureSourceType.CAMERA;
  
              if (fromGallery) {
                  source = Camera.PictureSourceType.PHOTOLIBRARY;
              }
  
              var captureSuccess = function(filePath) {
  
                     //Copy the captured image from tmp to app directory.
                    var fileCallback = {};
  
                    fileCallback.copySuccess = function(newFilePath) {
                        alert(newFilePath);
                        capturingCallback.captureSuccess(newFilePath);
                    };
  
                    fileCallback.copyError = capturingCallback.captureError;
  
                    if (device.platform === "Android") {
  
                        //If it is Android then copy image file to App directory.
                        fileManager.copyFileToDirectory(APP_BASE_DIRECTORY, filePath, true, fileCallback);
                    } else if (device.platform === "iOS") {
  
                        //If it is iOS then copy image file to Documents directory of the iOS app.
                        fileManager.copyFileToDirectory("", filePath, true, fileCallback);
                    } else {
  
                       //Else for other platforms, store the image file in default capture path.
                       capturingCallback.captureSuccess(filePath);
                    }
               };
  
               navigator.camera.getPicture(captureSuccess,
                                           capturingCallback.captureError, {
                                               quality: 70,
                                               destinationType: Camera.DestinationType.FILE_URI,
                                               sourceType: source,
                                               correctOrientation: true,
                                               encodingType: Camera.EncodingType.JPEG
                                           });
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
  