//Singleton Object that uses JStorage
var CacheManager = (function () {     
  var instance;
 
  function createObject() {   
    return {
        put: function (key, value) {
            window.localStorage.setItem(key, JSON.stringify(value));
        },
        get: function (key) {
        	return JSON.parse(window.localStorage.getItem(key));
        },
        remove: function (key) {
            window.localStorage.removeItem(key);
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