angular.module('brew-everywhere').controller('HomeCtrl',function($scope, $controller, events){
  // this call to $controller adds the base controller's methods
  // and properties to the controller's scope
  $controller('BaseCtrl', {$scope: $scope});

  $scope.currentBrewer = {};
  $scope.recipes = [];
  $scope.brewingEvents = [];
  $scope.brewingTasks = [];
  $scope.isGooglePlusUser = false;

  $scope.onGetRecipesCompleteHandler = function(recipes){
    $scope.recipes = recipes;
  };

  $scope.subscribe(events.message._GET_RECIPES_BY_BREWER_ID_COMPLETE_, $scope.onGetRecipesCompleteHandler);

  $scope.onRequestCurrentUserComplete = function (brewer) {
    $scope.currentBrewer = brewer;
    if ($scope.currentBrewer._id) {
      $scope.publish(events.message._GET_RECIPES_BY_BREWER_ID_, [$scope.currentBrewer._id.$oid]);
      if($scope.currentBrewer.UserName.indexOf('GP:') >= 0){
        $scope.isGooglePlusUser = true;
          $scope.publish(events.message._GET_BREWING_CALENDAR_);
        $scope.publish(events.message._GET_BREWING_TASKS_);
      }
    }
  };

  $scope.subscribe(events.message._CURRENT_USER_RESPONSE_, $scope.onRequestCurrentUserComplete);
  $scope.subscribe(events.message._AUTHENTICATE_USER_COMPLETE_, $scope.onRequestCurrentUserComplete);

  $scope.onGetBrewingCalendarComplete = function(items){
    $scope.brewingEvents = items;
  };

  $scope.subscribe(events.message._GET_BREWING_CALENDAR_COMPLETE_, $scope.onGetBrewingCalendarComplete);

  $scope.onGetBrewingTasksComplete = function(items){
    $scope.brewingTasks = items;
  };

  $scope.subscribe(events.message._GET_BREWING_TASKS_COMPLETE_, $scope.onGetBrewingTasksComplete);

  $scope.init = function(){
    $scope.publish(events.message._REQUEST_CURRENT_USER_);
  };

  $scope.init();
});