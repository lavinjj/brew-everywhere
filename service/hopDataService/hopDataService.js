angular.module('brew-everywhere').factory('hopDataService',function(messaging, events, mongolab, modelTransformer, Hop) {
  var hops = [];

  var getHops = function () {
    return mongolab.query('brew_everywhere', 'hops', [])
        .then(getHopSuccessHandler, getHopErrorHandler);
  };

  var getHopSuccessHandler = function (response) {
    if (response.data.length > 0) {
      var result = [];
      angular.forEach(response.data, function (hop) {
        result.push(modelTransformer.transform(hop, Hop));
      });
      messaging.publish(events.message._GET_HOPS_COMPLETE_, [result]);
    } else {
      getHopErrorHandler();
    }
  };

  var getHopErrorHandler = function () {
    messaging.publish(events.message._GET_HOPS_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to get hops from server', 'alert.warning']);
  };

  messaging.subscribe(events.message._GET_HOPS_, getHops);

  var getHopById = function (id) {
    return mongolab.queryById('brew_everywhere', 'hops', id, [])
        .then(getHopByIdSuccessHandler, getHopByIdErrorHandler);
  };

  var getHopByIdSuccessHandler = function (response) {
    if (response.data) {
      messaging.publish(events.message._GET_HOP_BY_ID_COMPLETE_,
          [modelTransformer.transform(response.data, Hop)]);
    }
    else {
      getHopByIdErrorHandler();
    }
  };

  var getHopByIdErrorHandler = function () {
    messaging.publish(events.message._GET_HOP_BY_ID_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to get hop by id from server', 'alert.warning']);
  };

  messaging.subscribe(events.message._GET_HOP_BY_ID_, getHopById);

  var createHop = function (hop) {
    return mongolab.create('brew_everywhere', 'hops', hop)
        .then(createHopSuccessHandler, createHopErrorHandler);
  };

  var createHopSuccessHandler = function (response) {
    if (response.data) {
      messaging.publish(events.message._CREATE_HOP_COMPLETE_,
          [modelTransformer.transform(response.data, Hop)]);
    }
    else {
      createHopErrorHandler();
    }
  };

  var createHopErrorHandler = function () {
    messaging.publish(events.message._CREATE_HOP_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to create hop', 'alert.warning']);
  };

  messaging.subscribe(events.message._CREATE_HOP_, createHop);

  var updateHop = function (hop) {
    return mongolab.update('brew_everywhere', 'hops', hop)
        .then(updateHopSuccessHandler, updateHopErrorHandler);
  };

  var updateHopSuccessHandler = function (response) {
    if (response.data) {
      messaging.publish(events.message._UPDATE_HOP_COMPLETE_,
          [modelTransformer.transform(response.data, Hop)]);
    }
    else {
      updateHopErrorHandler();
    }
  };

  var updateHopErrorHandler = function () {
    messaging.publish(events.message._UPDATE_HOP_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to update hop', 'alert.warning']);
  };

  messaging.subscribe(events.message._UPDATE_HOP_, updateHop);

  var deleteHop = function (hop) {
    return mongolab.delete('brew_everywhere', 'hops', hop)
        .then(deleteHopSuccessHandler, deleteHopErrorHandler);
  };

  var deleteHopSuccessHandler = function (response) {
    if (response.status === 200) {
      messaging.publish(events.message._DELETE_HOP_COMPLETE_);
    }
    else {
      deleteHopErrorHandler();
    }
  };

  var deleteHopErrorHandler = function () {
    messaging.publish(events.message._DELETE_HOP_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to delete hop', 'alert.warning']);
  };

  messaging.subscribe(events.message._DELETE_HOP_, deleteHop);

  var init = function () {
    hops = [];
  };

  var hopDataService = {
    init: init,
    getHops: getHops,
    getHopSuccessHandler: getHopSuccessHandler,
    getHopErrorHandler: getHopErrorHandler,
    getHopById: getHopById,
    getHopByIdSuccessHandler: getHopByIdSuccessHandler,
    getHopByIdErrorHandler: getHopByIdErrorHandler,
    createHop: createHop,
    createHopSuccessHandler: createHopSuccessHandler,
    createHopErrorHandler: createHopErrorHandler,
    updateHop: updateHop,
    updateHopSuccessHandler: updateHopSuccessHandler,
    updateHopErrorHandler: updateHopErrorHandler,
    deleteHop: deleteHop,
    deleteHopSuccessHandler: deleteHopSuccessHandler,
    deleteHopErrorHandler: deleteHopErrorHandler
  };

  return hopDataService;
});