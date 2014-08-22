angular.module('brew-everywhere').factory('recipeDataService',function(messaging, events, mongolab, modelTransformer, Recipe, Fermentable, Hop) {
  var recipes = [];

  var getRecipes = function () {
    return mongolab.query('brew_everywhere', 'recipes', [])
        .then(getRecipeSuccessHandler, getRecipeErrorHandler);
  };

  var getRecipeSuccessHandler = function (response) {
    if (response.data.length > 0) {
      var result = [];
      angular.forEach(response.data, function (recipe) {
        var temp = modelTransformer.transform(recipe, Recipe);
        var fermentables = modelTransformer.transform(temp.Fermentables, Fermentable);
        var hops = modelTransformer.transform(temp.Hops, Hop);
        temp.Fermentables = fermentables;
        temp.Hops = hops;
        result.push(temp);
      });
      messaging.publish(events.message._GET_RECIPES_COMPLETE_, [result]);
    } else {
      getRecipeErrorHandler();
    }
  };

  var getRecipeErrorHandler = function () {
    messaging.publish(events.message._GET_RECIPES_BY_BREWER_ID_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to get recipes from server', 'alert.warning']);
  };

  messaging.subscribe(events.message._GET_RECIPES_, getRecipes);

  var getRecipesByBrewerId = function (brewerId) {
    return mongolab.query('brew_everywhere', 'recipes', {q: {BrewerId: brewerId}})
      .then(getRecipesByBrewerIdSuccessHandler, getRecipesByBrewerIdErrorHandler);
  };

  var getRecipesByBrewerIdSuccessHandler = function (response) {
    if (response.data.length > 0) {
      var result = [];
      angular.forEach(response.data, function (recipe) {
        var temp = modelTransformer.transform(recipe, Recipe);
        var fermentables = modelTransformer.transform(temp.Fermentables, Fermentable);
        var hops = modelTransformer.transform(temp.Hops, Hop);
        temp.Fermentables = fermentables;
        temp.Hops = hops;
        result.push(temp);
      });
      messaging.publish(events.message._GET_RECIPES_BY_BREWER_ID_COMPLETE_, [result]);
    } else {
      getRecipesByBrewerIdErrorHandler();
    }
  };

  var getRecipesByBrewerIdErrorHandler = function () {
    messaging.publish(events.message._GET_RECIPES_BY_BREWER_ID_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
      ['Unable to get recipes from server', 'alert.warning']);
  };

  messaging.subscribe(events.message._GET_RECIPES_BY_BREWER_ID_, getRecipesByBrewerId);

  var getRecipeById = function (id) {
    return mongolab.queryById('brew_everywhere', 'recipes', id, [])
        .then(getRecipeByIdSuccessHandler, getRecipeByIdErrorHandler);
  };

  var getRecipeByIdSuccessHandler = function (response) {
    if (response.data) {
      var temp = modelTransformer.transform(response.data, Recipe);
      var fermentables = modelTransformer.transform(temp.Fermentables, Fermentable);
      var hops = modelTransformer.transform(temp.Hops, Hop);
      temp.Fermentables = fermentables;
      temp.Hops = hops;
      messaging.publish(events.message._GET_RECIPE_BY_ID_COMPLETE_, [temp]);
    }
    else {
      getRecipeByIdErrorHandler();
    }
  };

  var getRecipeByIdErrorHandler = function () {
    messaging.publish(events.message._GET_RECIPE_BY_ID_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to get recipe by id from server', 'alert.warning']);
  };

  messaging.subscribe(events.message._GET_RECIPE_BY_ID_, getRecipeById);

  var createRecipe = function (recipe) {
    return mongolab.create('brew_everywhere', 'recipes', recipe)
        .then(createRecipeSuccessHandler, createRecipeErrorHandler);
  };

  var createRecipeSuccessHandler = function (response) {
    if (response.data) {
      messaging.publish(events.message._CREATE_RECIPE_COMPLETE_,
          [modelTransformer.transform(response.data, Recipe)]);
    }
    else {
      createRecipeErrorHandler();
    }
  };

  var createRecipeErrorHandler = function () {
    messaging.publish(events.message._CREATE_RECIPE_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to create recipe', 'alert.warning']);
  };

  messaging.subscribe(events.message._CREATE_RECIPE_, createRecipe);

  var updateRecipe = function (recipe) {
    return mongolab.update('brew_everywhere', 'recipes', recipe)
        .then(updateRecipeSuccessHandler, updateRecipeErrorHandler);
  };

  var updateRecipeSuccessHandler = function (response) {
    if (response.data) {
      messaging.publish(events.message._UPDATE_RECIPE_COMPLETE_,
          [modelTransformer.transform(response.data, Recipe)]);
    }
    else {
      updateRecipeErrorHandler();
    }
  };

  var updateRecipeErrorHandler = function () {
    messaging.publish(events.message._UPDATE_RECIPE_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to update recipe', 'alert.warning']);
  };

  messaging.subscribe(events.message._UPDATE_RECIPE_, updateRecipe);

  var deleteRecipe = function (recipe) {
    return mongolab.delete('brew_everywhere', 'recipes', recipe)
        .then(deleteRecipeSuccessHandler, deleteRecipeErrorHandler);
  };

  var deleteRecipeSuccessHandler = function (response) {
    if (response.status === 200) {
      messaging.publish(events.message._DELETE_RECIPE_COMPLETE_);
    }
    else {
      deleteRecipeErrorHandler();
    }
  };

  var deleteRecipeErrorHandler = function () {
    messaging.publish(events.message._DELETE_RECIPE_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to delete recipe', 'alert.warning']);
  };

  messaging.subscribe(events.message._DELETE_RECIPE_, deleteRecipe);

  var init = function () {
    recipes = [];
  };

  var recipeDataService = {
    init: init,
    getRecipes: getRecipes,
    getRecipeSuccessHandler: getRecipeSuccessHandler,
    getRecipeErrorHandler: getRecipeErrorHandler,
    getRecipeById: getRecipeById,
    getRecipeByIdSuccessHandler: getRecipeByIdSuccessHandler,
    getRecipeByIdErrorHandler: getRecipeByIdErrorHandler,
    createRecipe: createRecipe,
    createRecipeSuccessHandler: createRecipeSuccessHandler,
    createRecipeErrorHandler: createRecipeErrorHandler,
    updateRecipe: updateRecipe,
    updateRecipeSuccessHandler: updateRecipeSuccessHandler,
    updateRecipeErrorHandler: updateRecipeErrorHandler,
    deleteRecipe: deleteRecipe,
    deleteRecipeSuccessHandler: deleteRecipeSuccessHandler,
    deleteRecipeErrorHandler: deleteRecipeErrorHandler
  };

  return recipeDataService;
});