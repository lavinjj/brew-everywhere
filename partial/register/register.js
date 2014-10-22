angular.module('brew-everywhere').controller('RegisterCtrl',function($scope, $controller, $location, events, Brewer){
  // this call to $controller adds the base controller's methods
  // and properties to the controller's scope
  $controller('BaseCtrl', {$scope: $scope});

  $scope.brewer = new Brewer();
  $scope.password = "";
  $scope.confirmpassword = "";

  $scope.register = function () {
    $scope.publish(events.message._REGISTER_BREWER_, [$scope.brewer, $scope.password]);
  };

  $scope.onBrewerRegisterComplete = function(){
    $location.path('/home');
  };

  $scope.subscribe(events.message._AUTHENTICATE_USER_COMPLETE_, $scope.onBrewerRegisterComplete);
});
