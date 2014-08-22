angular.module('brew-everywhere').factory('brewingHistoryDataService',function(messaging, events, mongolab, modelTransformer, Recipe, Fermentable, Hop) {
  var history = [];

  var getBrewingHistoryByBrewerId = function (brewerId) {
    return mongolab.query('brew_everywhere', 'brewingHistory', {q: {BrewerId: brewerId}})
      .then(getBrewingHistorySuccessHandler, getBrewingHistoryErrorHandler);
  };

  var getBrewingHistorySuccessHandler = function (response) {
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
      messaging.publish(events.message._GET_HISTORY_COMPLETE_, [result]);
    } else {
      getBrewingHistoryErrorHandler();
    }
  };

  var getBrewingHistoryErrorHandler = function () {
    messaging.publish(events.message._GET_HISTORY_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
      ['Unable to get history from server', 'alert.warning']);
  };

  messaging.subscribe(events.message._GET_HISTORY_, getBrewingHistoryByBrewerId);

  var getBrewingHistoryById = function (id) {
    return mongolab.queryById('brew_everywhere', 'brewingHistory', id, [])
      .then(getBrewingHistoryByIdSuccessHandler, getBrewingHistoryByIdErrorHandler);
  };

  var getBrewingHistoryByIdSuccessHandler = function (response) {
    if (response.data) {
      var temp = modelTransformer.transform(response.data, Recipe);
      var fermentables = modelTransformer.transform(temp.Fermentables, Fermentable);
      var hops = modelTransformer.transform(temp.Hops, Hop);
      temp.Fermentables = fermentables;
      temp.Hops = hops;
      messaging.publish(events.message._GET_HISTORY_BY_ID_COMPLETE_, [temp]);
    }
    else {
      getBrewingHistoryByIdErrorHandler();
    }
  };

  var getBrewingHistoryByIdErrorHandler = function () {
    messaging.publish(events.message._GET_HISTORY_BY_ID_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
      ['Unable to get history by id from server', 'alert.warning']);
  };

  messaging.subscribe(events.message._GET_HISTORY_BY_ID_, getBrewingHistoryById);

  var createBrewingHistory = function (recipe) {
    return mongolab.create('brew_everywhere', 'brewingHistory', recipe)
      .then(createBrewingHistorySuccessHandler, createBrewingHistoryErrorHandler);
  };

  var createBrewingHistorySuccessHandler = function (response) {
    if (response.data) {
      messaging.publish(events.message._CREATE_HISTORY_COMPLETE_,
        [modelTransformer.transform(response.data, Recipe)]);
    }
    else {
      createBrewingHistoryErrorHandler();
    }
  };

  var createBrewingHistoryErrorHandler = function () {
    messaging.publish(events.message._CREATE_HISTORY_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
      ['Unable to create history', 'alert.warning']);
  };

  messaging.subscribe(events.message._CREATE_HISTORY_, createBrewingHistory);

  var updateBrewingHistory = function (recipe) {
    return mongolab.update('brew_everywhere', 'brewingHistory', recipe)
      .then(updateBrewingHistorySuccessHandler, updateBrewingHistoryErrorHandler);
  };

  var updateBrewingHistorySuccessHandler = function (response) {
    if (response.data) {
      messaging.publish(events.message._UPDATE_HISTORY_COMPLETE_,
        [modelTransformer.transform(response.data, Recipe)]);
    }
    else {
      updateBrewingHistoryErrorHandler();
    }
  };

  var updateBrewingHistoryErrorHandler = function () {
    messaging.publish(events.message._UPDATE_HISTORY_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
      ['Unable to update history', 'alert.warning']);
  };

  messaging.subscribe(events.message._UPDATE_HISTORY_, updateBrewingHistory);

  var deleteBrewingHistory = function (recipe) {
    return mongolab.delete('brew_everywhere', 'brewingHistory', recipe)
      .then(deleteBrewingHistorySuccessHandler, deleteBrewingHistoryErrorHandler);
  };

  var deleteBrewingHistorySuccessHandler = function (response) {
    if (response.status === 200) {
      messaging.publish(events.message._DELETE_HISTORY_COMPLETE_);
    }
    else {
      deleteBrewingHistoryErrorHandler();
    }
  };

  var deleteBrewingHistoryErrorHandler = function () {
    messaging.publish(events.message._DELETE_HISTORY_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
      ['Unable to delete history', 'alert.warning']);
  };

  messaging.subscribe(events.message._DELETE_HISTORY_, deleteBrewingHistory);

  var init = function () {
    history = [];
  };


  var brewingHistoryDataService = {
    init: init,
    getBrewingHistoryByBrewerId: getBrewingHistoryByBrewerId,
    getBrewingSuccessHandler: getBrewingHistorySuccessHandler,
    getBrewingErrorHandler: getBrewingHistoryErrorHandler,
    getBrewingById: getBrewingHistoryById,
    getBrewingByIdSuccessHandler: getBrewingHistoryByIdSuccessHandler,
    getBrewingByIdErrorHandler: getBrewingHistoryByIdErrorHandler,
    createBrewing: createBrewingHistory,
    createBrewingSuccessHandler: createBrewingHistorySuccessHandler,
    createBrewingErrorHandler: createBrewingHistoryErrorHandler,
    updateBrewing: updateBrewingHistory,
    updateBrewingSuccessHandler: updateBrewingHistorySuccessHandler,
    updateBrewingErrorHandler: updateBrewingHistoryErrorHandler,
    deleteBrewing: deleteBrewingHistory,
    deleteBrewingSuccessHandler: deleteBrewingHistorySuccessHandler,
    deleteBrewingErrorHandler: deleteBrewingHistoryErrorHandler
  };

	return brewingHistoryDataService;
});