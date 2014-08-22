angular.module('brew-everywhere').controller('StartbrewingCtrl',function($scope, $controller, $location, events, stateMachine, viewController, brewingProcessStateMachine){
  // this call to $controller adds the base controller's methods
  // and properties to the controller's scope
  $controller('BaseCtrl', {$scope: $scope});

  $scope.currentBrewer = {};
  $scope.recipes = [];

  $scope.onRequestCurrentUserComplete = function (brewer) {
    $scope.currentBrewer = brewer;
    if ($scope.currentBrewer._id) {
      $scope.publish(events.message._GET_RECIPES_BY_BREWER_ID_, [$scope.currentBrewer._id.$oid]);
    }
  };

  $scope.subscribe(events.message._CURRENT_USER_RESPONSE_, $scope.onRequestCurrentUserComplete);

  $scope.onGetRecipesCompleteHandler = function(recipes){
    $scope.recipes = recipes;
  };

  $scope.subscribe(events.message._GET_RECIPES_BY_BREWER_ID_COMPLETE_, $scope.onGetRecipesCompleteHandler);

  $scope.onBrewRecipe = function(){
    $location.search('recipe', $scope.currentRecipe._id.$oid);
    viewController.navigateToBeginStateForActivity(brewingProcessStateMachine.id);
  };

  $scope.init = function(){
    $scope.publish(events.message._REQUEST_CURRENT_USER_);
    stateMachine.init();
    stateMachine.addActivity(brewingProcessStateMachine);
  };

  $scope.init();

});