angular.module('brew-everywhere').factory('brewerDataService', function (messaging, events, mongolab, modelTransformer, Brewer) {
  var brewers = [];

  var getBrewerByUserName = function (username) {
    return mongolab.query('brew_everywhere', 'brewers', {q: {UserName: username}})
        .then(getBrewerByUserNameSuccessHandler, getBrewerByUserNameErrorHandler);
  };

  var getBrewerByUserNameSuccessHandler = function (response) {
    if (response.data.length > 0) {
      var result = [];
      angular.forEach(response.data, function (brewer) {
        result.push(modelTransformer.transform(brewer, Brewer));
      });
      messaging.publish(events.message._GET_BREWER_BY_USERNAME_COMPLETE_, [result]);
    } else {
      getBrewerByUserNameErrorHandler();
    }
  };

  var getBrewerByUserNameErrorHandler = function () {
    messaging.publish(events.message._GET_BREWER_BY_USERNAME_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to get brewers from server', 'alert.warning']);
  };

  messaging.subscribe(events.message._GET_BREWER_BY_USERNAME_, getBrewerByUserName);

  var getBrewerByEmail = function (email) {
    mongolab.query('brew_everywhere', 'brewers', {q: {Email: email}})
        .then(getBrewerByEmailSuccessHandler, getBrewerByEmailErrorHandler);
  };

  var getBrewerByEmailSuccessHandler = function (response) {
    if (response.data.length > 0) {
      var result = [];
      angular.forEach(response.data, function (brewer) {
        result.push(modelTransformer.transform(brewer, Brewer));
      });
      messaging.publish(events.message._GET_BREWER_BY_EMAIL_COMPLETE_, [result]);
    } else {
      getBrewerByUserNameErrorHandler();
    }
  };

  var getBrewerByEmailErrorHandler = function () {
    messaging.publish(events.message._GET_BREWER_BY_EMAIL_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to get brewers from server', 'alert.warning']);
  };

  messaging.subscribe(events.message._GET_BREWER_BY_EMAIL_, getBrewerByEmail);

  var getBrewers = function () {
    return mongolab.query('brew_everywhere', 'brewers', [])
        .then(getBrewerSuccessHandler, getBrewerErrorHandler);
  };

  var getBrewerSuccessHandler = function (response) {
    if (response.data.length > 0) {
      var result = [];
      angular.forEach(response.data, function (brewer) {
        result.push(modelTransformer.transform(brewer, Brewer));
      });
      messaging.publish(events.message._GET_BREWERS_COMPLETE_, [result]);
    } else {
      getBrewerErrorHandler();
    }
  };

  var getBrewerErrorHandler = function () {
    messaging.publish(events.message._GET_BREWERS_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to get brewers from server', 'alert.warning']);
  };

  messaging.subscribe(events.message._GET_BREWERS_, getBrewers);

  var getBrewerById = function (id) {
    return mongolab.queryById('brew_everywhere', 'brewers', id, [])
        .then(getBrewerByIdSuccessHandler, getBrewerByIdErrorHandler);
  };

  var getBrewerByIdSuccessHandler = function (response) {
    if (response.data) {
      messaging.publish(events.message._GET_BREWER_BY_ID_COMPLETE_,
          [modelTransformer.transform(response.data, Brewer)]);
    }
    else {
      getBrewerByIdErrorHandler();
    }
  };

  var getBrewerByIdErrorHandler = function () {
    messaging.publish(events.message._GET_BREWER_BY_ID_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to get brewer by id from server', 'alert.warning']);
  };

  messaging.subscribe(events.message._GET_BREWER_BY_ID_, getBrewerById);

  var createBrewer = function (brewer) {
    return mongolab.create('brew_everywhere', 'brewers', brewer)
        .then(createBrewerSuccessHandler, createBrewerErrorHandler);
  };

  var createBrewerSuccessHandler = function (response) {
    if (response.data) {
      messaging.publish(events.message._CREATE_BREWER_COMPLETE_,
          [modelTransformer.transform(response.data, Brewer)]);
    }
    else {
      createBrewerErrorHandler();
    }
  };

  var createBrewerErrorHandler = function () {
    messaging.publish(events.message._CREATE_BREWER_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to create brewer', 'alert.warning']);
  };

  messaging.subscribe(events.message._CREATE_BREWER_, createBrewer);

  var updateBrewer = function (brewer) {
    return mongolab.update('brew_everywhere', 'brewers', brewer)
        .then(updateBrewerSuccessHandler, updateBrewerErrorHandler);
  };

  var updateBrewerSuccessHandler = function (response) {
    if (response.data) {
      messaging.publish(events.message._UPDATE_BREWER_COMPLETE_,
          [modelTransformer.transform(response.data, Brewer)]);
    }
    else {
      updateBrewerErrorHandler();
    }
  };

  var updateBrewerErrorHandler = function () {
    messaging.publish(events.message._UPDATE_BREWER_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to update brewer', 'alert.warning']);
  };

  messaging.subscribe(events.message._UPDATE_BREWER_, updateBrewer);

  var deleteBrewer = function (brewer) {
    return mongolab.delete('brew_everywhere', 'brewers', brewer)
        .then(deleteBrewerSuccessHandler, deleteBrewerErrorHandler);
  };

  var deleteBrewerSuccessHandler = function (response) {
    if (response.status === 200) {
      messaging.publish(events.message._DELETE_BREWER_COMPLETE_);
    }
    else {
      deleteBrewerErrorHandler();
    }
  };

  var deleteBrewerErrorHandler = function () {
    messaging.publish(events.message._DELETE_BREWER_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to delete brewer', 'alert.warning']);
  };

  messaging.subscribe(events.message._DELETE_BREWER_, deleteBrewer);

  var init = function () {
    brewers = [];
  };

  var brewerDataService = {
    init: init,
    getBrewers: getBrewers,
    getBrewerSuccessHandler: getBrewerSuccessHandler,
    getBrewerErrorHandler: getBrewerErrorHandler,
    getBrewerByUserName: getBrewerByUserName,
    getBrewerByUserNameSuccessHandler: getBrewerByUserNameSuccessHandler,
    getBrewerByUserNameErrorHandler: getBrewerByUserNameErrorHandler,
    getBrewerByEmail: getBrewerByEmail,
    getBrewerByEmailSuccessHandler: getBrewerByEmailSuccessHandler,
    getBrewerByEmailErrorHandler: getBrewerByEmailErrorHandler,
    getBrewerById: getBrewerById,
    getBrewerByIdSuccessHandler: getBrewerByIdSuccessHandler,
    getBrewerByIdErrorHandler: getBrewerByIdErrorHandler,
    createBrewer: createBrewer,
    createBrewerSuccessHandler: createBrewerSuccessHandler,
    createBrewerErrorHandler: createBrewerErrorHandler,
    updateBrewer: updateBrewer,
    updateBrewerSuccessHandler: updateBrewerSuccessHandler,
    updateBrewerErrorHandler: updateBrewerErrorHandler,
    deleteBrewer: deleteBrewer,
    deleteBrewerSuccessHandler: deleteBrewerSuccessHandler,
    deleteBrewerErrorHandler: deleteBrewerErrorHandler
  };

  return brewerDataService;
});