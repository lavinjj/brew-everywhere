angular.module('brew-everywhere')
  .factory('errors',function($timeout, messaging, events) {
  //#region internal variables
  var errorMessages = [];
  //#endregion

  //#region internal methods
  var addErrorMessageHandler = function(message, type){
    if(!errorMessages){
      errorMessages = [];
    }

    errorMessages.push({type: type, message: message});

    $timeout(function() {
      messaging.publish(events.message._ERROR_MESSAGES_UPDATED_, errorMessages);
    }, 0);
  };

  messaging.subscribe(events.message._ADD_ERROR_MESSAGE_, addErrorMessageHandler);

  var clearErrorMessagesHandler = function() {
    errorMessages = [];
  };

  messaging.subscribe(events.message._CLEAR_ERROR_MESSAGES_, clearErrorMessagesHandler);
  //#endregion

  //#region internal methods
  var init = function(){
    errorMessages = [];
  };
  //#endregion

  var errors = {
    init: init,
    addErrorMessageHandler: addErrorMessageHandler,
    clearErrorMessagesHandler: clearErrorMessagesHandler
  };

	return errors;
});
