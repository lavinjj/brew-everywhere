angular.module('brew-everywhere').controller('RecipeCtrl', function ($scope, $controller, $location, $routeParams, events, rulesEngine, Recipe, styleMatchingRules) {
  // this call to $controller adds the base controller's methods
  // and properties to the controller's scope
  $controller('BaseCtrl', {$scope: $scope});

  $scope.currentBrewer = {};
  $scope.itemsPerPage = 5;
  $scope.adjuncts = [];
  $scope.currentAdjunctPage = 0;
  $scope.equipment = [];
  $scope.fermentables = [];
  $scope.currentFerementablePage = 0;
  $scope.filterFermentables = '';
  $scope.hops = [];
  $scope.currentHopPage = 0;
  $scope.mashProfiles = [];
  $scope.currentMashProfilePage = 0;
  $scope.styles = [];
  $scope.waterProfiles = [];
  $scope.currentWaterProfilePage = 0;
  $scope.yeast = [];
  $scope.currentYeastPage = 0;
  $scope.selectedStyle = {};
  $scope.selectedEquipment = {};
  $scope.currentRecipe = new Recipe();
  $scope.currentRecipeFermentablePage = 1;
  $scope.currentRecipeAdjunctPage = 1;
  $scope.currentRecipeHopPage = 1;
  $scope.currentRecipeYeastPage = 1;
  $scope.sourceWaterProfile = {};
  $scope.desiredWaterProfile = {};
  $scope.selectedMashProfile = {};
  $scope.styleMatchingResults = {};

  $scope.changeAdjunctPage = function (page) {
    $scope.currentAdjunctPage = page;
  };

  $scope.getAdjunctStartFrom = function () {
    return (($scope.currentAdjunctPage - 1) * $scope.itemsPerPage);
  };

  $scope.changeRecipeAdjunctPage = function (page) {
    $scope.currentRecipeAdjunctPage = page;
  };

  $scope.getRecipeAdjunctStartFrom = function () {
    return (($scope.currentRecipeAdjunctPage - 1) * $scope.itemsPerPage);
  };

  $scope.addAdjunct = function (index) {
    angular.forEach($scope.adjuncts, function (adjunct) {
      if (adjunct._id.$oid === index) {
        $scope.currentRecipe.Adjuncts.push(angular.copy(adjunct));
      }
    });
  };

  $scope.removeAdjunct = function (index) {
    $scope.currentRecipe.Adjuncts.splice(index, 1);
  };

  $scope.changeFermentablePage = function (page) {
    $scope.currentFermentablePage = page;
  };

  $scope.getFermentableStartFrom = function () {
    return (($scope.currentFermentablePage - 1) * $scope.itemsPerPage);
  };

  $scope.changeRecipeFermentablePage = function (page) {
    $scope.currentRecipeFermentablePage = page;
  };

  $scope.getRecipeFermentableStartFrom = function () {
    return (($scope.currentRecipeFermentablePage - 1) * $scope.itemsPerPage);
  };

  $scope.addFermentable = function (index) {
    angular.forEach($scope.fermentables, function (fermentable) {
      if (fermentable._id.$oid === index) {
        $scope.currentRecipe.Fermentables.push(angular.copy(fermentable));
      }
    });
  };

  $scope.removeFermentable = function (index) {
    $scope.currentRecipe.Fermentables.splice(index, 1);
  };

  $scope.changeHopPage = function (page) {
    $scope.currentHopPage = page;
  };

  $scope.getHopStartFrom = function () {
    return (($scope.currentHopPage - 1) * $scope.itemsPerPage);
  };

  $scope.changeRecipeHopPage = function (page) {
    $scope.currentRecipeHopPage = page;
  };

  $scope.getRecipeHopStartFrom = function () {
    return (($scope.currentRecipeHopPage - 1) * $scope.itemsPerPage);
  };

  $scope.addHop = function (index) {
    angular.forEach($scope.hops, function (hop) {
      if (hop._id.$oid === index) {
        $scope.currentRecipe.Hops.push(angular.copy(hop));
      }
    });
  };

  $scope.removeHop = function (index) {
    $scope.currentRecipe.Hops.splice(index, 1);
  };

  $scope.changeYeastPage = function (page) {
    $scope.currentYeastPage = page;
  };

  $scope.getYeastStartFrom = function () {
    return (($scope.currentYeastPage - 1) * $scope.itemsPerPage);
  };

  $scope.changeRecipeYeastPage = function (page) {
    $scope.currentRecipeYeastPage = page;
  };

  $scope.getRecipeYeastStartFrom = function () {
    return (($scope.currentRecipeYeastPage - 1) * $scope.itemsPerPage);
  };

  $scope.addYeast = function (index) {
    angular.forEach($scope.yeast, function (yeast) {
      if (yeast._id.$oid === index) {
        $scope.currentRecipe.Yeast.push(angular.copy(yeast));
      }
    });
  };

  $scope.removeYeast = function (index) {
    $scope.currentRecipe.Yeast.splice(index, 1);
  };

  $scope.onAdjunctRequestComplete = function (adjuncts) {
    $scope.adjuncts = adjuncts;
    $scope.currentAdjunctPage = 1;
  };

  $scope.subscribe(events.message._GET_ADJUNCTS_COMPLETE_, $scope.onAdjunctRequestComplete);

  $scope.onEquipmentRequestComplete = function (equipment) {
    $scope.equipment = equipment;
  };

  $scope.subscribe(events.message._GET_EQUIPMENT_COMPLETE_, $scope.onEquipmentRequestComplete);

  $scope.onFermentablesRequestComplete = function (fermentables) {
    $scope.fermentables = fermentables;
    $scope.currentFerementablePage = 1;
  };

  $scope.subscribe(events.message._GET_FERMENTABLES_COMPLETE_, $scope.onFermentablesRequestComplete);

  $scope.onHopsRequestComplete = function (hops) {
    $scope.hops = hops;
    $scope.currentHopPage = 1;
  };

  $scope.subscribe(events.message._GET_HOPS_COMPLETE_, $scope.onHopsRequestComplete);

  $scope.onMashProfilesRequestComplete = function (mashProfiles) {
    $scope.mashProfiles = mashProfiles;
  };

  $scope.subscribe(events.message._GET_MASHPROFILES_COMPLETE_, $scope.onMashProfilesRequestComplete);

  $scope.onStyleRequestComplete = function (styles) {
    $scope.styles = styles;
    $scope.evalStyleRules();
  };

  $scope.subscribe(events.message._GET_STYLES_COMPLETE_, $scope.onStyleRequestComplete);

  $scope.onWaterProfilesRequestComplete = function (waterProfiles) {
    $scope.waterProfiles = waterProfiles;
  };

  $scope.subscribe(events.message._GET_WATERPROFILES_COMPLETE_, $scope.onWaterProfilesRequestComplete);

  $scope.onYeastRequestComplete = function (yeast) {
    $scope.yeast = yeast;
    $scope.currentYeastPage = 1;
  };

  $scope.subscribe(events.message._GET_YEAST_COMPLETE_, $scope.onYeastRequestComplete);

  $scope.onRequestCurrentUserComplete = function (brewer) {
    $scope.currentBrewer = brewer;
    if ($scope.currentBrewer._id && $scope.currentRecipe) {
      $scope.currentRecipe.BrewerId = $scope.currentBrewer._id.$oid;
      $scope.currentRecipe.BrewerName = $scope.currentBrewer.FirstName + ' ' + $scope.currentBrewer.LastName;
    }
  };

  $scope.subscribe(events.message._CURRENT_USER_RESPONSE_, $scope.onRequestCurrentUserComplete);

  $scope.saveRecipe = function(){
    // need to remove $oid from sub-objects
    angular.forEach($scope.currentRecipe.Adjuncts, function(object){
      delete object._id;
    });
    angular.forEach($scope.currentRecipe.Fermentables, function(object){
      delete object._id;
    });
    angular.forEach($scope.currentRecipe.Hops, function(object){
      delete object._id;
    });
    angular.forEach($scope.currentRecipe.Yeast, function(object){
      delete object._id;
    });


    if($scope.currentRecipe._id){
      $scope.publish(events.message._UPDATE_RECIPE_, [$scope.currentRecipe]);
    }
    else {
      $scope.publish(events.message._CREATE_RECIPE_, [$scope.currentRecipe]);
    }
  };

  $scope.updateRecipeSuccessHandler = function(){
    $location.path("/home");
  };

  $scope.subscribe(events.message._UPDATE_RECIPE_COMPLETE_, $scope.updateRecipeSuccessHandler);
  $scope.subscribe(events.message._CREATE_RECIPE_COMPLETE_, $scope.updateRecipeSuccessHandler);

  $scope.onGetRecipeByIdComplete = function(recipe){
    if(recipe){
      $scope.currentRecipe = recipe;
      $scope.onStyleChanged();
      $scope.onEquipmentChanged();
    }
  };

  $scope.subscribe(events.message._GET_RECIPE_BY_ID_COMPLETE_, $scope.onGetRecipeByIdComplete);

  $scope.onStyleChanged = function(){
    angular.forEach($scope.styles, function(style){
      if(style._id.$oid === $scope.currentRecipe.Style){
        $scope.selectedStyle = style;
      }
    });
  };

  $scope.onEquipmentChanged = function(){
    angular.forEach($scope.equipment, function(equipment){
      if(equipment._id.$oid === $scope.currentRecipe.Equipment){
        $scope.selectedEquipment = equipment;
      }
    });
  };

  $scope.$watch('currentRecipe', function(){
    $scope.evalStyleRules();
  }, true);

  $scope.evalStyleRules = function(){
    rulesEngine.execute({recipe: $scope.currentRecipe, styles: $scope.styles}, $scope.onRulesEvalComplete);
  };

  $scope.onRulesEvalComplete = function(result){
    $scope.styleMatchingResults = result;
  };

  $scope.init = function () {
    $scope.publish(events.message._REQUEST_CURRENT_USER_);
    $scope.publish(events.message._GET_ADJUNCTS_);
    $scope.publish(events.message._GET_EQUIPMENT_);
    $scope.publish(events.message._GET_FERMENTABLES_);
    $scope.publish(events.message._GET_HOPS_);
    $scope.publish(events.message._GET_MASHPROFILES_);
    $scope.publish(events.message._GET_STYLES_);
    $scope.publish(events.message._GET_WATERPROFILES_);
    $scope.publish(events.message._GET_YEAST_);
    var recipeId = $routeParams.id;
    if(recipeId){
      $scope.publish(events.message._GET_RECIPE_BY_ID_, [recipeId]);
    }
    rulesEngine.init(styleMatchingRules.styleRules);
  };

  $scope.init();

});