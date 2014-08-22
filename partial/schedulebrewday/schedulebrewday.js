angular.module('brew-everywhere').controller('SchedulebrewdayCtrl', function ($scope, $controller, $location, messaging, events) {
    // this call to $controller adds the base controller's methods
    // and properties to the controller's scope
    $controller('BaseCtrl', {$scope: $scope});

    $scope.currentBrewer = {};
    $scope.recipes = [];
    $scope.currentRecipe = {};
    $scope.addBrewDayTasks = true;
    $scope.addFermentationTasks = true;
    $scope.addConditioningTasks = true;
    $scope.dt = new Date();

    $scope.clear = function () {
        $scope.dt = null;
    };

    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
    };

    $scope.toggleMin();

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.onRequestCurrentUserComplete = function (brewer) {
        $scope.currentBrewer = brewer;
        if ($scope.currentBrewer._id) {
            $scope.publish(events.message._GET_RECIPES_);
        }
    };

    $scope.subscribe(events.message._CURRENT_USER_RESPONSE_, $scope.onRequestCurrentUserComplete);

    $scope.onGetRecipesCompleteHandler = function (recipes) {
        $scope.recipes = [];
        angular.forEach(recipes, function (recipe) {
            if (recipe.BrewerId === $scope.currentBrewer._id.$oid) {
                $scope.recipes.push(recipe);
            }
        });
    };

    $scope.subscribe(events.message._GET_RECIPES_COMPLETE_, $scope.onGetRecipesCompleteHandler);

    $scope.onAddBrewDay = function () {
        $scope.publish(events.message._CREATE_BREW_DAY_EVENTS_, [$scope.currentRecipe, new Date($scope.dt), $scope.addBrewDayTasks, $scope.addFermentationTasks, $scope.addConditioningTasks]);
    };

    $scope.onCreateBrewDayEventsResponse = function () {
        $location.path("/");
    };

    $scope.subscribe(events.message._CREATE_BREW_DAY_EVENTS_COMPLETE_, $scope.onCreateBrewDayEventsResponse);
    $scope.subscribe(events.message._CREATE_BREW_DAY_EVENTS_FAILED_, $scope.onCreateBrewDayEventsResponse);

    $scope.init = function () {
        $scope.publish(events.message._REQUEST_CURRENT_USER_);
    };

    $scope.init();
});