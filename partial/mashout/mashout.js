angular.module('brew-everywhere').controller('MashoutCtrl',function($scope, $controller, $location, events, viewController){
  // this call to $controller adds the base controller's methods
  // and properties to the controller's scope
  $controller('BaseCtrl', {$scope: $scope});

  $scope.currentRecipe = null;
  $scope.currentMashProfile = null;
  $scope.currentMashStep = null;
  $scope.waitTemperature = true;
  $scope.waitTime = false;
  $scope.currentStep = 0;

  $scope.onGetRecipeByIdComplete = function(recipe){
    $scope.currentRecipe = recipe;
    $scope.publish(events.message._GET_MASHPROFILE_BY_ID_, [$scope.currentRecipe.MashProfile]);
  };

  $scope.subscribe(events.message._GET_RECIPE_BY_ID_COMPLETE_, $scope.onGetRecipeByIdComplete);

  $scope.onMashProfileByIdComplete = function(mashProfile){
    $scope.currentMashProfile = mashProfile;
    $scope.currentMashStep = $scope.currentMashProfile.MashSteps[$scope.currentMashProfile.MashSteps.length - 1];
  };

  $scope.subscribe(events.message._GET_MASHPROFILE_BY_ID_COMPLETE_, $scope.onMashProfileByIdComplete);

  $scope.onStepTemperatureReached = function(){
    $scope.waitTemperature = false;
    $scope.waitTime = true;
  };

  $scope.onTimeReached = function(){
      viewController.navigateToStateUsingCommand('TimeReached');
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