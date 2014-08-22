angular.module('brew-everywhere').factory('adjunctDataService', function (messaging, events, mongolab, modelTransformer, Adjunct) {
      var adjuncts = [];

      var getAdjuncts = function () {
        return mongolab.query('brew_everywhere', 'adjuncts', [])
            .then(getAdjunctSuccessHandler, getAdjunctErrorHandler);
      };

      var getAdjunctSuccessHandler = function (response) {
        if (response.data.length > 0) {
          var result = [];
          angular.forEach(response.data, function (adjunct) {
            result.push(modelTransformer.transform(adjunct, Adjunct));
          });
          messaging.publish(events.message._GET_ADJUNCTS_COMPLETE_, [result]);
        } else {
          getAdjunctErrorHandler();
        }
      };

      var getAdjunctErrorHandler = function () {
        messaging.publish(events.message._GET_ADJUNCTS_FAILED_);
        messaging.publish(events.message._ADD_ERROR_MESSAGE_,
            ['Unable to get adjuncts from server', 'alert.warning']);
      };

      messaging.subscribe(events.message._GET_ADJUNCTS_, getAdjuncts);

      var getAdjunctById = function (id) {
        return mongolab.queryById('brew_everywhere', 'adjuncts', id, [])
            .then(getAdjunctByIdSuccessHandler, getAdjunctByIdErrorHandler);
      };

      var getAdjunctByIdSuccessHandler = function (response) {
        if (response.data) {
          messaging.publish(events.message._GET_ADJUNCT_BY_ID_COMPLETE_,
              [modelTransformer.transform(response.data, Adjunct)]);
        }
        else {
          getAdjunctByIdErrorHandler();
        }
      };

      var getAdjunctByIdErrorHandler = function () {
        messaging.publish(events.message._GET_ADJUNCT_BY_ID_FAILED_);
        messaging.publish(events.message._ADD_ERROR_MESSAGE_,
            ['Unable to get adjunct by id from server', 'alert.warning']);
      };

      messaging.subscribe(events.message._GET_ADJUNCT_BY_ID_, getAdjunctById);

      var createAdjunct = function (adjunct) {
        return mongolab.create('brew_everywhere', 'adjuncts', adjunct)
            .then(createAdjunctSuccessHandler, createAdjunctErrorHandler);
      };

      var createAdjunctSuccessHandler = function (response) {
        if (response.data) {
          messaging.publish(events.message._CREATE_ADJUNCT_COMPLETE_,
              [modelTransformer.transform(response.data, Adjunct)]);
        }
        else {
          createAdjunctErrorHandler();
        }
      };

      var createAdjunctErrorHandler = function () {
        messaging.publish(events.message._CREATE_ADJUNCT_FAILED_);
        messaging.publish(events.message._ADD_ERROR_MESSAGE_,
            ['Unable to create adjunct', 'alert.warning']);
      };

      messaging.subscribe(events.message._CREATE_ADJUNCT_, createAdjunct);

      var updateAdjunct = function (adjunct) {
        return mongolab.update('brew_everywhere', 'adjuncts', adjunct)
            .then(updateAdjunctSuccessHandler, updateAdjunctErrorHandler);
      };

      var updateAdjunctSuccessHandler = function (response) {
        if (response.data) {
          messaging.publish(events.message._UPDATE_ADJUNCT_COMPLETE_,
              [modelTransformer.transform(response.data, Adjunct)]);
        }
        else {
          updateAdjunctErrorHandler();
        }
      };

      var updateAdjunctErrorHandler = function () {
        messaging.publish(events.message._UPDATE_ADJUNCT_FAILED_);
        messaging.publish(events.message._ADD_ERROR_MESSAGE_,
            ['Unable to update adjunct', 'alert.warning']);
      };

      messaging.subscribe(events.message._UPDATE_ADJUNCT_, updateAdjunct);

      var deleteAdjunct = function (adjunct) {
        return mongolab.delete('brew_everywhere', 'adjuncts', adjunct)
            .then(deleteAdjunctSuccessHandler, deleteAdjunctErrorHandler);
      };

      var deleteAdjunctSuccessHandler = function (response) {
        if (response.status === 200) {
          messaging.publish(events.message._DELETE_ADJUNCT_COMPLETE_);
        }
        else {
          deleteAdjunctErrorHandler();
        }
      };

      var deleteAdjunctErrorHandler = function () {
        messaging.publish(events.message._DELETE_ADJUNCT_FAILED_);
        messaging.publish(events.message._ADD_ERROR_MESSAGE_,
            ['Unable to delete adjunct', 'alert.warning']);
      };

      messaging.subscribe(events.message._DELETE_ADJUNCT_, deleteAdjunct);

      var init = function () {
        adjuncts = [];
      };

      var adjunctDataService = {
        init: init,
        getAdjuncts: getAdjuncts,
        getAdjunctSuccessHandler: getAdjunctSuccessHandler,
        getAdjunctErrorHandler: getAdjunctErrorHandler,
        getAdjunctById: getAdjunctById,
        getAdjunctByIdSuccessHandler: getAdjunctByIdSuccessHandler,
        getAdjunctByIdErrorHandler: getAdjunctByIdErrorHandler,
        createAdjunct: createAdjunct,
        createAdjunctSuccessHandler: createAdjunctSuccessHandler,
        createAdjunctErrorHandler: createAdjunctErrorHandler,
        updateAdjunct: updateAdjunct,
        updateAdjunctSuccessHandler: updateAdjunctSuccessHandler,
        updateAdjunctErrorHandler: updateAdjunctErrorHandler,
        deleteAdjunct: deleteAdjunct,
        deleteAdjunctSuccessHandler: deleteAdjunctSuccessHandler,
        deleteAdjunctErrorHandler: deleteAdjunctErrorHandler
      };

      return adjunctDataService;
    });