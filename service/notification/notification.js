angular.module('brew-everywhere').factory('notification',function($timeout, messaging, events) {
  //#region internal variables
  var userMessages = [];
  //#endregion

  //#region messaging handlers
  var addUserMessageHandler = function(message, type){
    if(!userMessages){
      userMessages = [];
    }

    userMessages.push({type: type, message: message});

    $timeout(function() {
      messaging.publish(events.message._USER_MESSAGES_UPDATED_, userMessages);
    }, 0);
  };

  messaging.subscribe(events.message._ADD_USER_MESSAGE_, addUserMessageHandler);

  var clearUserMessagesHandler = function() {
    userMessages = [];
  };

  messaging.subscribe(events.message._CLEAR_USER_MESSAGES_, clearUserMessagesHandler);
  //#endregion

  //#region internal methods
  var init = function(){
    userMessages = [];
  };
  //#endregion

  var notifications = {
    init: init
  };

  return notifications;
});
