angular.module('brew-everywhere').controller('BaseCtrl', function ($scope, $location, messaging, events) {
    //#region login methods
    $scope.trace = function (message) {
      messaging.publish(events.message._LOG_TRACE_, [message]);
    };

    $scope.traceDebug = function (message) {
      messaging.publish(events.message._LOG_DEBUG_, [message]);
    };

    $scope.traceInfo = function (message) {
      messaging.publish(events.message._LOG_INFO_, [message]);
    };

    $scope.traceWarning = function (message) {
      messaging.publish(events.message._LOG_WARNING_, [message]);
    };

    $scope.traceError = function (message) {
      messaging.publish(events.message._LOG_ERROR_, [message]);
    };

    $scope.traceFatal = function (message) {
      messaging.publish(events.message._LOG_FATAL_, [message]);
    };
    //#endregion

    //#region messaging vars and methods
    $scope.messagingHandles = [];

    $scope.subscribe = function (topic, callback) {
      var handle = messaging.subscribe(topic, callback);

      if (handle) {
        $scope.messagingHandles.push(handle);
      }
    };

    $scope.publish = function (topic, data) {
      messaging.publish(topic, data);
    };

    $scope.$on('$destroy', function () {
      angular.forEach($scope.messagingHandles, function (handle) {
        messaging.unsubscribe(handle);
      });
    });
    //#endregion

    //#region shared functions
    $scope.onCancel = function () {
      $location.path('/');
    };
    //#endregion
  });