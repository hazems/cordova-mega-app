var MemoManager = (function () {
  var instance;

  function createObject() {
      var photoManager = PhotoManager.getInstance();
      var audioManager = AudioManager.getInstance();
      var MEMOS_KEY = "memos";

      return {
          getMemos: function () {
        	  var items = window.localStorage.getItem(MEMOS_KEY);

        	  if (items) {
        		  memoMap = JSON.parse(items);
        	  } else {
        		  memoMap = {};
        	  }

              return memoMap;
          },
          getMemoDetails: function (memoID) {
              var memoMap = this.getMemos();

              return memoMap[memoID];
          },
          saveMemo: function (memoItem) {
              var memoMap = this.getMemos();

              memoMap[memoItem.id] = memoItem;

              window.localStorage.setItem(MEMOS_KEY, JSON.stringify(memoMap));
          },
          removeMemo: function(memoID) {
              var memoMap = this.getMemos();

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
              audioManager.startRecordingVoice(recordingCallback);
          },
          stopRecordingVoice: function () {
              audioManager.stopRecordingVoice();
          },
          playVoice: function (filePath, playCallback) {
              audioManager.playVoice(filePath, playCallback);
          },
          getPhoto: function (capturingCallback, fromGallery) {
              photoManager.getPhoto(capturingCallback, fromGallery);
          },
          cleanUpResources: function() {
            audioManager.cleanUpResources();
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
