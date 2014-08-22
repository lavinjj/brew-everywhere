/* jslint -W117*/
angular.module('brew-everywhere').factory('googleCalendar',function(messaging, events) {
  var calendarName = '';
  var calendarId = '';
  var createIfDoesNotExist = false;

  var getCalendarByName = function(name, create){
    calendarName = name;
    createIfDoesNotExist = create;
    gapi.client.load('calendar', 'v3', handleCalendarClientLoaded);
  };

  messaging.subscribe(events.message._GET_CALENDAR_, getCalendarByName);

  var handleCalendarClientLoaded = function() {
    messaging.publish(events.message._SERVER_REQUEST_STARTED_);
    var request = gapi.client.calendar.calendarList.list();
    request.execute(handleGetCalendarList);
  };

  var handleGetCalendarList = function(resp) {
    if(resp && resp.items && resp.items.length > 0){
      angular.forEach(resp.items, function(item){
        if(item.summary === calendarName){
          calendarId = item.id;
        }
      });
    }

    if (calendarId){
      getGoogleCalendarById(calendarId);
    }
    else {
      if(createIfDoesNotExist){
        createCalendar();
      }
      else {
        getCalendarFailed();
      }
    }
  };

  var getGoogleCalendarById = function(id){
    var request = gapi.client.calendar.events.list({'calendarId': id});
    request.execute(handleGetGoogleCalendarById);
  };

  var handleGetGoogleCalendarById = function(resp){
    if(resp && resp.items && resp.items.length > 0){
      resp.id = calendarId;
      messaging.publish(events.message._SERVER_REQUEST_ENDED_);
      messaging.publish(events.message._GET_CALENDAR_COMPLETE_, [resp]);
    }
    else {
      getCalendarFailed();
    }
  };

  var getCalendarFailed = function(){
    messaging.publish(events.message._SERVER_REQUEST_ENDED_);
    messaging.publish(events.message._GET_CALENDAR_FAILED_);
  };

  var createCalendar = function(){
    var request = gapi.client.calendar.calendars.insert({"resource" :{'summary': calendarName}});
    request.execute(handleCreateCalendarRequest);
  };

  var handleCreateCalendarRequest = function(resp){
    if(resp && resp.summary === calendarName){
      calendarId = resp.id;
    }
    else {
      getCalendarFailed();
    }
  };

  var createCalendarEvent = function(calendarId, event){
    messaging.publish(events.message._SERVER_REQUEST_STARTED_);
    var request = gapi.client.calendar.events.insert({'calendarId': calendarId, 'resource': event});
    request.execute(handleCreateEventRequest);
  };

  messaging.subscribe(events.message._CREATE_EVENT_, createCalendarEvent);

  var handleCreateEventRequest = function(resp){
    if(resp){
      getGoogleCalendarById(calendarId);
    }
    else {
      messaging.publish(events.message._CREATE_EVENT_FAILED_);
    }
  };

  var updateCalendarEvent = function(calendarId, event){
    messaging.publish(events.message._SERVER_REQUEST_STARTED_);
    var request = gapi.client.calendar.events.update({'calendarId': calendarId, 'eventId': event.id, 'resource': event});
    request.execute(handleUpdateEventRequest);
  };

  messaging.subscribe(events.message._UPDATE_EVENT_, updateCalendarEvent);

  var handleUpdateEventRequest = function(resp){
    if(resp){
      getGoogleCalendarById(calendarId);
    }
    else {
      messaging.publish(events.message._UPDATE_EVENT_FAILED_);
    }
  };

  var deleteCalendarEvent = function(calendarId, event){
    messaging.publish(events.message._SERVER_REQUEST_STARTED_);
    var request = gapi.client.calendar.events.delete({'calendarId': calendarId, 'eventId': event.id});
    request.execute(handleDeleteEventRequest);
  };

  messaging.subscribe(events.message._DELETE_EVENT_, deleteCalendarEvent);

  var handleDeleteEventRequest = function(resp){
    if(resp){
      getGoogleCalendarById(calendarId);
    }
    else {
      messaging.publish(events.message._DELETE_EVENT_FAILED_);
    }
  };

  var init = function(){
    calendarId = '';
  };

	var googleCalendar = {
    getCalendarByName: getCalendarByName,
    handleGetCalendarList: handleGetCalendarList,
    getGoogleCalendarById: getGoogleCalendarById,
    handleGetGoogleCalendarById: handleGetGoogleCalendarById,
    createCalendar: createCalendar,
    handleCreateCalendarRequest: handleCreateCalendarRequest,
    createCalendarEvent: createCalendarEvent,
    handleCreateEventRequest: handleCreateEventRequest,
    updateCalendarEvent: updateCalendarEvent,
    handleUpdateEventRequest: handleUpdateEventRequest,
    deleteCalendarEvent: deleteCalendarEvent,
    handleDeleteEventRequest: handleDeleteEventRequest,
    init: init
  };

	return googleCalendar;
});