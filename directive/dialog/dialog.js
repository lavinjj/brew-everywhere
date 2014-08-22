angular.module('brew-everywhere')
  .directive('dialog', function(messaging, events) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'directive/dialog/dialog.html',
		link: function(scope, element) {
      element.hide();

      scope.modalType = 'popup';
      scope.message = '';

      var showPopupHandler = function (messageText) {
        // got the request start notification, show the element
        scope.message = messageText;
        scope.modalType = 'popup';
        element.show();
      };

      var showConfirmationHandler = function(messageText) {
        // got the request start notification, show the element
        scope.message = messageText;
        scope.modalType = 'confirmation';
        element.show();
      };

      scope.showPopupHandle = messaging.subscribe(events.message._DISPLAY_POPUP_, showPopupHandler);
      scope.showConfirmationHandle = messaging.subscribe(events.message._DISPLAY_CONFIRMATION_, showConfirmationHandler);

      scope.$on('$destroy', function() {
        messaging.unsubscribe(scope.showPopupHandle);
        messaging.unsubscribe(scope.showConfirmationHandle);
      });

      scope.answeredOk = function(){
        element.hide();
        messaging.publish(events.message._USER_RESPONDED_, "OK");
      };

      scope.answeredYes = function(){
        element.hide();
        messaging.publish(events.message._USER_RESPONDED_, "YES");
      };

      scope.answeredNo = function(){
        element.hide();
        messaging.publish(events.message._USER_RESPONDED_, "NO");
      };
    }
	};
});
