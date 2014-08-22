angular.module('brew-everywhere').controller('RegisterCtrl',function($scope, $controller, $location, events, sha, Brewer){
  // this call to $controller adds the base controller's methods
  // and properties to the controller's scope
  $controller('BaseCtrl', {$scope: $scope});

  $scope.brewer = new Brewer();
  $scope.password = "";
  $scope.confirmpassword = "";

  $scope.register = function () {
    $scope.brewer.DateJoined = new Date();
    $scope.brewer.Password = sha.hash($scope.password + $scope.brewer.DateJoined.valueOf().toString());
    $scope.publish(events.message._CREATE_BREWER_, [$scope.brewer]);
  };

  $scope.onBrewerRegisterComplete = function(){
    $location.path('/home');
  };

  $scope.subscribe(events.message._CREATE_BREWER_COMPLETE_, $scope.onBrewerRegisterComplete);
});