angular.module('brew-everywhere').directive('waitSpinner', function(messaging, events) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'directive/waitSpinner/waitSpinner.html',
		link: function(scope, element, attrs, fn) {
      element.hide();

      var startRequestHandler = function () {
        // got the request start notification, show the element
        element.show();
      };

      var endRequestHandler = function() {
        // got the request start notification, show the element
        element.hide();
      };

      scope.startHandle = messaging.subscribe(events.message._SERVER_REQUEST_STARTED_, startRequestHandler);
      scope.endHandle = messaging.subscribe(events.message._SERVER_REQUEST_ENDED_, endRequestHandler);

      scope.$on('$destroy', function() {
        messaging.unsubscribe(scope.startHandle);
        messaging.unsubscribe(scope.endHandle);
      });
		}
	};
});
