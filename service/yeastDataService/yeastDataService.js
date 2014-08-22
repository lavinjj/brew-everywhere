angular.module('brew-everywhere').factory('yeastDataService',function(messaging, events, mongolab, modelTransformer, Yeast) {
  var yeast = [];

  var getYeast = function () {
    return mongolab.query('brew_everywhere', 'yeast', [])
        .then(getYeastSuccessHandler, getYeastErrorHandler);
  };

  var getYeastSuccessHandler = function (response) {
    if (response.data.length > 0) {
      var result = [];
      angular.forEach(response.data, function (yeast) {
        result.push(modelTransformer.transform(yeast, Yeast));
      });
      messaging.publish(events.message._GET_YEAST_COMPLETE_, [result]);
    } else {
      getYeastErrorHandler();
    }
  };

  var getYeastErrorHandler = function () {
    messaging.publish(events.message._GET_YEAST_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to get yeast from server', 'alert.warning']);
  };

  messaging.subscribe(events.message._GET_YEAST_, getYeast);

  var getYeastById = function (id) {
    return mongolab.queryById('brew_everywhere', 'yeast', id, [])
        .then(getYeastByIdSuccessHandler, getYeastByIdErrorHandler);
  };

  var getYeastByIdSuccessHandler = function (response) {
    if (response.data) {
      messaging.publish(events.message._GET_YEAST_BY_ID_COMPLETE_,
          [modelTransformer.transform(response.data, Yeast)]);
    }
    else {
      getYeastByIdErrorHandler();
    }
  };

  var getYeastByIdErrorHandler = function () {
    messaging.publish(events.message._GET_YEAST_BY_ID_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to get yeast by id from server', 'alert.warning']);
  };

  messaging.subscribe(events.message._GET_YEAST_BY_ID_, getYeastById);

  var createYeast = function (yeast) {
    return mongolab.create('brew_everywhere', 'yeast', yeast)
        .then(createYeastSuccessHandler, createYeastErrorHandler);
  };

  var createYeastSuccessHandler = function (response) {
    if (response.data) {
      messaging.publish(events.message._CREATE_YEAST_COMPLETE_,
          [modelTransformer.transform(response.data, Yeast)]);
    }
    else {
      createYeastErrorHandler();
    }
  };

  var createYeastErrorHandler = function () {
    messaging.publish(events.message._CREATE_YEAST_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to create yeast', 'alert.warning']);
  };

  messaging.subscribe(events.message._CREATE_YEAST_, createYeast);

  var updateYeast = function (yeast) {
    return mongolab.update('brew_everywhere', 'yeast', yeast)
        .then(updateYeastSuccessHandler, updateYeastErrorHandler);
  };

  var updateYeastSuccessHandler = function (response) {
    if (response.data) {
      messaging.publish(events.message._UPDATE_YEAST_COMPLETE_,
          [modelTransformer.transform(response.data, Yeast)]);
    }
    else {
      updateYeastErrorHandler();
    }
  };

  var updateYeastErrorHandler = function () {
    messaging.publish(events.message._UPDATE_YEAST_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to update yeast', 'alert.warning']);
  };

  messaging.subscribe(events.message._UPDATE_YEAST_, updateYeast);

  var deleteYeast = function (yeast) {
    return mongolab.delete('brew_everywhere', 'yeast', yeast)
        .then(deleteYeastSuccessHandler, deleteYeastErrorHandler);
  };

  var deleteYeastSuccessHandler = function (response) {
    if (response.status === 200) {
      messaging.publish(events.message._DELETE_YEAST_COMPLETE_);
    }
    else {
      deleteYeastErrorHandler();
    }
  };

  var deleteYeastErrorHandler = function () {
    messaging.publish(events.message._DELETE_YEAST_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to delete yeast', 'alert.warning']);
  };

  messaging.subscribe(events.message._DELETE_YEAST_, deleteYeast);

  var init = function () {
    yeast = [];
  };

  var yeastDataService = {
    init: init,
    getYeast: getYeast,
    getYeastSuccessHandler: getYeastSuccessHandler,
    getYeastErrorHandler: getYeastErrorHandler,
    getYeastById: getYeastById,
    getYeastByIdSuccessHandler: getYeastByIdSuccessHandler,
    getYeastByIdErrorHandler: getYeastByIdErrorHandler,
    createYeast: createYeast,
    createYeastSuccessHandler: createYeastSuccessHandler,
    createYeastErrorHandler: createYeastErrorHandler,
    updateYeast: updateYeast,
    updateYeastSuccessHandler: updateYeastSuccessHandler,
    updateYeastErrorHandler: updateYeastErrorHandler,
    deleteYeast: deleteYeast,
    deleteYeastSuccessHandler: deleteYeastSuccessHandler,
    deleteYeastErrorHandler: deleteYeastErrorHandler
  };

  return yeastDataService;
});