angular.module('brew-everywhere').factory('styleDataService',function(messaging, events, mongolab, modelTransformer, Style) {
  var styles = [];

  var getStyles = function () {
    return mongolab.query('brew_everywhere', 'styles', [])
        .then(getStyleSuccessHandler, getStyleErrorHandler);
  };

  var getStyleSuccessHandler = function (response) {
    if (response.data.length > 0) {
      var result = [];
      angular.forEach(response.data, function (style) {
        result.push(modelTransformer.transform(style, Style));
      });
      messaging.publish(events.message._GET_STYLES_COMPLETE_, [result]);
    } else {
      getStyleErrorHandler();
    }
  };

  var getStyleErrorHandler = function () {
    messaging.publish(events.message._GET_STYLES_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to get styles from server', 'alert.warning']);
  };

  messaging.subscribe(events.message._GET_STYLES_, getStyles);

  var getStyleById = function (id) {
    return mongolab.queryById('brew_everywhere', 'styles', id, [])
        .then(getStyleByIdSuccessHandler, getStyleByIdErrorHandler);
  };

  var getStyleByIdSuccessHandler = function (response) {
    if (response.data) {
      messaging.publish(events.message._GET_STYLE_BY_ID_COMPLETE_,
          [modelTransformer.transform(response.data, Style)]);
    }
    else {
      getStyleByIdErrorHandler();
    }
  };

  var getStyleByIdErrorHandler = function () {
    messaging.publish(events.message._GET_STYLE_BY_ID_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to get style by id from server', 'alert.warning']);
  };

  messaging.subscribe(events.message._GET_STYLE_BY_ID_, getStyleById);

  var createStyle = function (style) {
    return mongolab.create('brew_everywhere', 'styles', style)
        .then(createStyleSuccessHandler, createStyleErrorHandler);
  };

  var createStyleSuccessHandler = function (response) {
    if (response.data) {
      messaging.publish(events.message._CREATE_STYLE_COMPLETE_,
          [modelTransformer.transform(response.data, Style)]);
    }
    else {
      createStyleErrorHandler();
    }
  };

  var createStyleErrorHandler = function () {
    messaging.publish(events.message._CREATE_STYLE_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to create style', 'alert.warning']);
  };

  messaging.subscribe(events.message._CREATE_STYLE_, createStyle);

  var updateStyle = function (style) {
    return mongolab.update('brew_everywhere', 'styles', style)
        .then(updateStyleSuccessHandler, updateStyleErrorHandler);
  };

  var updateStyleSuccessHandler = function (response) {
    if (response.data) {
      messaging.publish(events.message._UPDATE_STYLE_COMPLETE_,
          [modelTransformer.transform(response.data, Style)]);
    }
    else {
      updateStyleErrorHandler();
    }
  };

  var updateStyleErrorHandler = function () {
    messaging.publish(events.message._UPDATE_STYLE_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to update style', 'alert.warning']);
  };

  messaging.subscribe(events.message._UPDATE_STYLE_, updateStyle);

  var deleteStyle = function (style) {
    return mongolab.delete('brew_everywhere', 'styles', style)
        .then(deleteStyleSuccessHandler, deleteStyleErrorHandler);
  };

  var deleteStyleSuccessHandler = function (response) {
    if (response.status === 200) {
      messaging.publish(events.message._DELETE_STYLE_COMPLETE_);
    }
    else {
      deleteStyleErrorHandler();
    }
  };

  var deleteStyleErrorHandler = function () {
    messaging.publish(events.message._DELETE_STYLE_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to delete style', 'alert.warning']);
  };

  messaging.subscribe(events.message._DELETE_STYLE_, deleteStyle);

  var init = function () {
    styles = [];
  };

  var styleDataService = {
    init: init,
    getStyles: getStyles,
    getStyleSuccessHandler: getStyleSuccessHandler,
    getStyleErrorHandler: getStyleErrorHandler,
    getStyleById: getStyleById,
    getStyleByIdSuccessHandler: getStyleByIdSuccessHandler,
    getStyleByIdErrorHandler: getStyleByIdErrorHandler,
    createStyle: createStyle,
    createStyleSuccessHandler: createStyleSuccessHandler,
    createStyleErrorHandler: createStyleErrorHandler,
    updateStyle: updateStyle,
    updateStyleSuccessHandler: updateStyleSuccessHandler,
    updateStyleErrorHandler: updateStyleErrorHandler,
    deleteStyle: deleteStyle,
    deleteStyleSuccessHandler: deleteStyleSuccessHandler,
    deleteStyleErrorHandler: deleteStyleErrorHandler
  };

  return styleDataService;
});