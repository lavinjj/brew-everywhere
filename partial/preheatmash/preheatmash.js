angular.module('brew-everywhere').controller('PreheatmashCtrl',function($scope, $controller, $location, events, viewController){
  // this call to $controller adds the base controller's methods
  // and properties to the controller's scope
  $controller('BaseCtrl', {$scope: $scope});

  $scope.currentRecipe = null;
  $scope.currentMashProfile = null;
  $scope.currentMashStep = null;
  $scope.MashTemperature = 170;

  $scope.onGetRecipeByIdComplete = function(recipe){
    $scope.currentRecipe = recipe;
    $scope.publish(events.message._GET_MASHPROFILE_BY_ID_, [$scope.currentRecipe.MashProfile]);
  };

  $scope.subscribe(events.message._GET_RECIPE_BY_ID_COMPLETE_, $scope.onGetRecipeByIdComplete);

  $scope.onMashProfileByIdComplete = function(mashProfile){
    $scope.currentMashProfile = mashProfile;
    $scope.currentMashStep = $scope.currentMashProfile.MashSteps[0];
  };

  $scope.subscribe(events.message._GET_MASHPROFILE_BY_ID_COMPLETE_, $scope.onMashProfileByIdComplete);

  $scope.onTemperatureReached = function(){
    viewController.navigateToStateUsingCommand('TemperatureReached');
  };

  $scope.onCancel = function(){
    viewController.navigateToStateUsingCommand('Exit');
  };

  $scope.init = function(){
    var searchObject = $location.search();
    var recipeId = searchObject.recipe;
    $scope.publish(events.message._GET_RECIPE_BY_ID_, [recipeId]);
  };

  $scope.init();
});