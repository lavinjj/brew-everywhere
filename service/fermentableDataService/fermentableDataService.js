angular.module('brew-everywhere').factory('fermentableDataService', function(messaging, events, mongolab, modelTransformer, Fermentable) {
    var fermentable = [];

    var getFermentable = function () {
      return mongolab.query('brew_everywhere', 'fermentables', [])
          .then(getFermentableSuccessHandler, getFermentableErrorHandler);
    };

    var getFermentableSuccessHandler = function (response) {
      if (response.data.length > 0) {
        var result = [];
        angular.forEach(response.data, function (fermentable) {
          result.push(modelTransformer.transform(fermentable, Fermentable));
        });
        messaging.publish(events.message._GET_FERMENTABLES_COMPLETE_, [result]);
      } else {
        getFermentableErrorHandler();
      }
    };

    var getFermentableErrorHandler = function () {
      messaging.publish(events.message._GET_FERMENTABLES_FAILED_);
      messaging.publish(events.message._ADD_ERROR_MESSAGE_,
          ['Unable to get fermentable from server', 'alert.warning']);
    };

    messaging.subscribe(events.message._GET_FERMENTABLES_, getFermentable);

    var getFermentableById = function (id) {
      return mongolab.queryById('brew_everywhere', 'fermentables', id, [])
          .then(getFermentableByIdSuccessHandler, getFermentableByIdErrorHandler);
    };

    var getFermentableByIdSuccessHandler = function (response) {
      if (response.data) {
        messaging.publish(events.message._GET_FERMENTABLE_BY_ID_COMPLETE_,
            [modelTransformer.transform(response.data, Fermentable)]);
      }
      else {
        getFermentableByIdErrorHandler();
      }
    };

    var getFermentableByIdErrorHandler = function () {
      messaging.publish(events.message._GET_FERMENTABLE_BY_ID_FAILED_);
      messaging.publish(events.message._ADD_ERROR_MESSAGE_,
          ['Unable to get fermentable by id from server', 'alert.warning']);
    };

    messaging.subscribe(events.message._GET_FERMENTABLE_BY_ID_, getFermentableById);

    var createFermentable = function (fermentable) {
      return mongolab.create('brew_everywhere', 'fermentables', fermentable)
          .then(createFermentableSuccessHandler, createFermentableErrorHandler);
    };

    var createFermentableSuccessHandler = function (response) {
      if (response.data) {
        messaging.publish(events.message._CREATE_FERMENTABLE_COMPLETE_,
            [modelTransformer.transform(response.data, Fermentable)]);
      }
      else {
        createFermentableErrorHandler();
      }
    };

    var createFermentableErrorHandler = function () {
      messaging.publish(events.message._CREATE_FERMENTABLE_FAILED_);
      messaging.publish(events.message._ADD_ERROR_MESSAGE_,
          ['Unable to create fermentable', 'alert.warning']);
    };

    messaging.subscribe(events.message._CREATE_FERMENTABLE_, createFermentable);

    var updateFermentable = function (fermentable) {
      return mongolab.update('brew_everywhere', 'fermentables', fermentable)
          .then(updateFermentableSuccessHandler, updateFermentableErrorHandler);
    };

    var updateFermentableSuccessHandler = function (response) {
      if (response.data) {
        messaging.publish(events.message._UPDATE_FERMENTABLE_COMPLETE_,
            [modelTransformer.transform(response.data, Fermentable)]);
      }
      else {
        updateFermentableErrorHandler();
      }
    };

    var updateFermentableErrorHandler = function () {
      messaging.publish(events.message._UPDATE_FERMENTABLE_FAILED_);
      messaging.publish(events.message._ADD_ERROR_MESSAGE_,
          ['Unable to update fermentable', 'alert.warning']);
    };

    messaging.subscribe(events.message._UPDATE_FERMENTABLE_, updateFermentable);

    var deleteFermentable = function (fermentable) {
      return mongolab.delete('brew_everywhere', 'fermentables', fermentable)
          .then(deleteFermentableSuccessHandler, deleteFermentableErrorHandler);
    };

    var deleteFermentableSuccessHandler = function (response) {
      if (response.status === 200) {
        messaging.publish(events.message._DELETE_FERMENTABLE_COMPLETE_);
      }
      else {
        deleteFermentableErrorHandler();
      }
    };

    var deleteFermentableErrorHandler = function () {
      messaging.publish(events.message._DELETE_FERMENTABLE_FAILED_);
      messaging.publish(events.message._ADD_ERROR_MESSAGE_,
          ['Unable to delete fermentable', 'alert.warning']);
    };

    messaging.subscribe(events.message._DELETE_FERMENTABLE_, deleteFermentable);

    var init = function () {
      fermentable = [];
    };

    var fermentableDataService = {
      init: init,
      getFermentable: getFermentable,
      getFermentableSuccessHandler: getFermentableSuccessHandler,
      getFermentableErrorHandler: getFermentableErrorHandler,
      getFermentableById: getFermentableById,
      getFermentableByIdSuccessHandler: getFermentableByIdSuccessHandler,
      getFermentableByIdErrorHandler: getFermentableByIdErrorHandler,
      createFermentable: createFermentable,
      createFermentableSuccessHandler: createFermentableSuccessHandler,
      createFermentableErrorHandler: createFermentableErrorHandler,
      updateFermentable: updateFermentable,
      updateFermentableSuccessHandler: updateFermentableSuccessHandler,
      updateFermentableErrorHandler: updateFermentableErrorHandler,
      deleteFermentable: deleteFermentable,
      deleteFermentableSuccessHandler: deleteFermentableSuccessHandler,
      deleteFermentableErrorHandler: deleteFermentableErrorHandler
    };

    return fermentableDataService;
});