var AppUtil = {};

AppUtil.showMessage = function (message) {
    navigator.notification.alert(message, null, 'Memo', 'Ok');
};

AppUtil.showConfirmationMessage = function (message, okHandler) {
    navigator.notification.confirm(
        message,
        function (index) {
        	if (index == 1) {
        		okHandler();
        	}
        },             
        'Memo'
    );        
};