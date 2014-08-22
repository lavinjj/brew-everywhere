angular.module('brew-everywhere')
  .directive('notificationList', function(messaging, events) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'directive/notificationList/notificationList.html',
		link: function(scope) {
      scope.notifications = [];

      scope.onErrorMessagesUpdatedHandler = function (errorMessages) {
        if(!scope.notifications){
          scope.notifications = [];
        }
        scope.notifications.push(errorMessages);
        messaging.publish(events.message._CLEAR_ERROR_MESSAGES_);
      };

      scope.errorMessageUpdateHandle = messaging.subscribe(events.message._ERROR_MESSAGES_UPDATED_, scope.onErrorMessagesUpdatedHandler);

      scope.onUserMessagesUpdatedHandler = function (userMessages) {
        if(!scope.notifications){
          scope.notifications = [];
        }
        scope.notifications.push(userMessages);
        messaging.publish(events.message._CLEAR_USER_MESSAGES_);
      };

      scope.userMessagesUpdatedHandle = messaging.subscribe(events.message._USER_MESSAGES_UPDATED_, scope.onUserMessagesUpdatedHandler);

      scope.$on('$destroy', function() {
        messaging.unsubscribe(scope.errorMessageUpdateHandle);
        messaging.unsubscribe(scope.userMessagesUpdatedHandle);
      });

      scope.acknowledgeAlert = function(index){
        scope.notifications.splice(index, 1);
      };
		}
	};
});
