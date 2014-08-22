/*jshint -W117 */
angular.module('brew-everywhere').factory('logging', function (messaging, events) {
  var log = null;

  var init = function (logName) {
    log = log4javascript.getLogger(logName);
  };

  var setLogLevel = function (level) {
    log.setLevel(level);
  };

  var setLogAppender = function (appender) {
    log.addAppender(appender);
  };

  // wrap log4javascript trace method
  var trace = function (message) {
    log.trace(message);
  };

  messaging.subscribe(events.message._LOG_TRACE_, trace);

  // wrap log4javascript debug method
  var debug = function (message) {
    log.debug(message);
  };

  messaging.subscribe(events.message._LOG_DEBUG_, debug);

  // wrap log4javascript info method
  var info = function (message) {
    log.info(message);
  };

  messaging.subscribe(events.message._LOG_INFO_, info);

  // wrap log4javascript warn method
  var warn = function (message) {
    log.warn(message);
  };

  messaging.subscribe(events.message._LOG_WARNING_, warn);

  // wrap log4javascript error method
  var error = function (message) {
    log.error(message);
  };

  messaging.subscribe(events.message._LOG_ERROR_, error);

  // wrap log4javascript fatal method
  var fatal = function (message) {
    log.fatal(message);
  };

  messaging.subscribe(events.message._LOG_FATAL_, fatal);

  // Define the functions and properties to reveal.
  var service = {
    init: init,
    setLogLevel: setLogLevel,
    setLogAppender: setLogAppender
  };

  return service;

});
