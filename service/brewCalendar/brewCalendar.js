/* jslint -W117 */
angular.module('brew-everywhere').factory('brewCalendar', function (messaging, events) {
  var defaultEvents = [
    {"summary": "Brew: Maibock", "start": {"date": "2014-02-06"}, "end": {"date": "2014-02-14"}, "recurrence": ["RRULE:FREQ=YEARLY"], "reminders": {"useDefault": false}},
    {"summary": "Brew: Irish Ales", "start": {"date": "2014-01-25"}, "end": {"date": "2014-02-11"}, "recurrence": ["RRULE:FREQ=YEARLY"], "reminders": {"useDefault": false}},
    {"summary": "Brew: Hefeweizen", "start": {"date": "2014-03-06"}, "end": {"date": "2014-03-20"}, "recurrence": ["RRULE:FREQ=YEARLY"], "reminders": {"useDefault": false}},
    {"summary": "Brew: Light Lagers", "start": {"date": "2014-01-29"}, "end": {"date": "2014-02-12"}, "recurrence": ["RRULE:FREQ=YEARLY"], "reminders": {"useDefault": false}},
    {"summary": "Brew: Hybrid Beers", "start": {"date": "2014-03-26"}, "end": {"date": "2014-04-10"}, "recurrence": ["RRULE:FREQ=YEARLY"], "reminders": {"useDefault": false}},
    {"summary": "Brew: Smoked Beers", "start": {"date": "2014-11-18"}, "end": {"date": "2014-12-10"}, "recurrence": ["RRULE:FREQ=YEARLY"], "reminders": {"useDefault": false}},
    {"summary": "Brew: Dark Ales", "start": {"date": "2014-12-12"}, "end": {"date": "2014-01-05"}, "recurrence": ["RRULE:FREQ=YEARLY"], "reminders": {"useDefault": false}},
    {"summary": "Brew: American Amber Ale", "start": {"date": "2014-04-02"}, "end": {"date": "2014-04-20"}, "recurrence": ["RRULE:FREQ=YEARLY"], "reminders": {"useDefault": false}},
    {"summary": "Brew: IPA", "start": {"date": "2014-05-08"}, "end": {"date": "2014-05-25"}, "recurrence": ["RRULE:FREQ=YEARLY"], "reminders": {"useDefault": false}},
    {"summary": "Brew: American Pale Ale", "start": {"date": "2014-04-17"}, "end": {"date": "2014-05-02"}, "recurrence": ["RRULE:FREQ=YEARLY"], "reminders": {"useDefault": false}},
    {"summary": "Brew: Saison", "start": {"date": "2014-06-04"}, "end": {"date": "2014-06-19"}, "recurrence": ["RRULE:FREQ=YEARLY"], "reminders": {"useDefault": false}},
    {"summary": "Brew: Wheat Beers", "start": {"date": "2014-06-20"}, "end": {"date": "2014-07-05"}, "recurrence": ["RRULE:FREQ=YEARLY"], "reminders": {"useDefault": false}},
    {"summary": "Brew: Light Belgian Ales", "start": {"date": "2014-07-03"}, "end": {"date": "2014-07-19"}, "recurrence": ["RRULE:FREQ=YEARLY"], "reminders": {"useDefault": false}},
    {"summary": "Brew: India Black Ale", "start": {"date": "2014-08-05"}, "end": {"date": "2014-08-24"}, "recurrence": ["RRULE:FREQ=YEARLY"], "reminders": {"useDefault": false}},
    {"summary": "Brew: Rye Beers", "start": {"date": "2014-08-20"}, "end": {"date": "2014-09-06"}, "recurrence": ["RRULE:FREQ=YEARLY"], "reminders": {"useDefault": false}},
    {"summary": "Brew: American Amber Ales", "start": {"date": "2014-09-17"}, "end": {"date": "2014-10-05"}, "recurrence": ["RRULE:FREQ=YEARLY"], "reminders": {"useDefault": false}},
    {"summary": "Brew: Tripels and Dubbels", "start": {"date": "2014-09-05"}, "end": {"date": "2014-09-21"}, "recurrence": ["RRULE:FREQ=YEARLY"], "reminders": {"useDefault": false}},
    {"summary": "Brew: British Bitters", "start": {"date": "2014-08-19"}, "end": {"date": "2014-09-06"}, "recurrence": ["RRULE:FREQ=YEARLY"], "reminders": {"useDefault": false}},
    {"summary": "Brew: Spiced Ales", "start": {"date": "2014-09-23"}, "end": {"date": "2014-10-09"}, "recurrence": ["RRULE:FREQ=YEARLY"], "reminders": {"useDefault": false}},
    {"summary": "Brew: Scottish Ales", "start": {"date": "2014-10-26"}, "end": {"date": "2014-11-11"}, "recurrence": ["RRULE:FREQ=YEARLY"], "reminders": {"useDefault": false}},
    {"summary": "Brew: Porters and Stouts", "start": {"date": "2014-11-14"}, "end": {"date": "2014-11-30"}, "recurrence": ["RRULE:FREQ=YEARLY"], "reminders": {"useDefault": false}},
    {"summary": "Brew: Scottish Ales", "start": {"date": "2014-02-13"}, "end": {"date": "2014-02-26"}, "recurrence": ["RRULE:FREQ=YEARLY"], "reminders": {"useDefault": false}},
    {"summary": "Brew: Lawnmower Beers", "start": {"date": "2014-04-17"}, "end": {"date": "2014-05-07"}, "recurrence": ["RRULE:FREQ=YEARLY"], "reminders": {"useDefault": false}},
    {"summary": "Brew: Strong Ales", "start": {"date": "2014-10-12"}, "end": {"date": "2014-10-26"}, "recurrence": ["RRULE:FREQ=YEARLY"], "reminders": {"useDefault": false}},
    {"summary": "Brew: Brown Ales", "start": {"date": "2014-09-28"}, "end": {"date": "2014-10-14"}, "recurrence": ["RRULE:FREQ=YEARLY"], "reminders": {"useDefault": false}},
    {"summary": "Brew: Sour Beers", "start": {"date": "2014-01-09"}, "end": {"date": "2014-01-28"}, "recurrence": ["RRULE:FREQ=YEARLY"], "reminders": {"useDefault": false}},
    {"summary": "Brew: Dunkelweizen", "start": {"date": "2014-02-19"}, "end": {"date": "2014-03-07"}, "recurrence": ["RRULE:FREQ=YEARLY"], "reminders": {"useDefault": false}},
    {"summary": "Brew: Oktoberfest", "start": {"date": "2014-03-05"}, "end": {"date": "2014-03-17"}, "recurrence": ["RRULE:FREQ=YEARLY"], "reminders": {"useDefault": false}}
  ];

  var brewingCalendar = {};
  var brewingCalendarId = '';
  var brewingCalendarName = 'My Brewing Calendar';
  var brewingTaskList = {};
  var brewingTaskListId = '';
  var brewingTaksListName = 'My Brewing Tasks';

  var reduceBrewingCalendar = function (calendar) {
    var today = moment();
    var formattedDate = today.format('YYYY-MM-DD');
    // filter calendar item for those still in the future
    var result = _.filter(calendar.items, function (event) {
      if (event.end.date > formattedDate) {
        return event;
      }
    });
    // sort by start date
    result = _.sortBy(result, function (event) {
      return event.start.date;
    });
    return result;
  };

  var getBrewingCalender = function () {
    messaging.publish(events.message._GET_CALENDAR_, [brewingCalendarName, true]);
  };

  messaging.subscribe(events.message._GET_BREWING_CALENDAR_, getBrewingCalender);

  var onHandleGetCalendarComplete = function (calendar) {
    brewingCalendar = calendar;
    brewingCalendarId = calendar.id;

    if (calendar.items.length > 0) {
      var result = reduceBrewingCalendar(brewingCalendar);
      messaging.publish(events.message._GET_BREWING_CALENDAR_COMPLETE_, [result]);
    }
    else {
      createDefaultCalendarEntries(brewingCalendarId);
    }
  };

  messaging.subscribe(events.message._GET_CALENDAR_COMPLETE_, onHandleGetCalendarComplete);

  var getBrewingTaskList = function () {
    messaging.publish(events.message._GET_TASK_LIST_, [brewingTaksListName, true]);
  };

  messaging.subscribe(events.message._GET_BREWING_TASKS_, getBrewingTaskList);

  var onHandleGetTaskListComplete = function (taskList) {
    brewingTaskList = taskList;
    brewingTaskListId = taskList.id;

    messaging.publish(events.message._GET_BREWING_TASKS_COMPLETE_, [brewingTaskList.items]);
  };

  messaging.subscribe(events.message._GET_TASK_LIST_COMPLETE_, onHandleGetTaskListComplete);

  var createDefaultCalendarEntries = function (id) {
    var event = defaultEvents.shift();
    if (event) {
      messaging.publish(events.message._CREATE_EVENT_, [id, event]);
    }
    else {
      getBrewingCalender();
    }
  };

  var handleCreateDefaultEventRequest = function () {
    createDefaultCalendarEntries(brewingCalendarId);
  };

  messaging.subscribe(events.message._CREATE_EVENT_COMPLETE_, handleCreateDefaultEventRequest);

  var createBrewDayEvents = function (recipe, scheduleDate, addBrewDayTasks, addFermentationTasks, addConditioningTasks) {
    if (addBrewDayTasks) {
      addGetIngredientsTask(recipe, scheduleDate);
      addPrepareStarterTask(recipe, scheduleDate);
    }

    addBrewDayToCalendar(recipe, scheduleDate);

    if (addFermentationTasks) {
      addPrimaryToCalendar(recipe, scheduleDate);
      addSecondaryToCalendar(recipe, scheduleDate);
      addTertiaryToCalendar(recipe, scheduleDate);
    }

    if (addConditioningTasks) {
      addBottlingToCalendar(recipe, scheduleDate);
      addConditioningToCalendar(recipe, scheduleDate);
    }
  };

  messaging.subscribe(events.message._CREATE_BREW_DAY_EVENTS_, createBrewDayEvents);

  var addGetIngredientsTask = function (currentRecipe, scheduledDate) {
    var dueDate = moment(scheduledDate).subtract('days', 2);
    var ingredientList = 'Gather the following ingredients:\n\n';

    angular.forEach(currentRecipe.Fermentables, function (item) {
      ingredientList += item.Amount + ' - ' + item.Name + ' ' + item.Type + '\n';
    });

    angular.forEach(currentRecipe.Adjuncts, function (item) {
      ingredientList += item.Amount + ' - ' + item.Name + ' ' + item.Type + '\n';
    });

    angular.forEach(currentRecipe.Hops, function (item) {
      ingredientList += item.Amount + ' - ' + item.Name + ' ' + item.Form + '\n';
    });

    angular.forEach(currentRecipe.Yeast, function (item) {
      ingredientList += item.Amount + ' - ' + item.Name + ' ' + item.Form + '\n';
    });

    var task = {'title': 'Gather Ingredients: ' + currentRecipe.Name,
      'status': 'needsAction',
      'due': dueDate.format('YYYY-MM-DD'),
      'notes': ingredientList
    };

    messaging.publish(events.message._CREATE_TASK_, [brewingTaskListId, task]);
  };

  var addPrepareStarterTask = function (currentRecipe, scheduledDate) {
    var dueDate = moment(scheduledDate).subtract('days', 1);

    var task = {"title": "Prepare Starter: " + currentRecipe.Name,
      "status": "needsAction",
      "due": dueDate.format('YYYY-MM-DD')
    };

    messaging.publish(events.message._CREATE_TASK_, [brewingTaskListId, task]);
  };

  var addBrewDayToCalendar = function (currentRecipe, scheduledDate) {
    var formattedBrewDate = moment(scheduledDate).format('YYYY-MM-DD');

    var event = {"summary": "Brew: " + currentRecipe.Name,
      "description": "Brew: " + currentRecipe.Name,
      "start": {"date": formattedBrewDate},
      "end": {"date": formattedBrewDate},
      "reminders": {"useDefault": true}};

    messaging.publish(events.message._CREATE_EVENT_, [brewingCalendarId, event]);
  };

  var addPrimaryToCalendar = function (currentRecipe, scheduledDate) {
    if (currentRecipe.PrimaryAge > 0 && currentRecipe.PrimaryTemp > 0) {
      var startDate = moment(scheduledDate);
      var endDate = startDate.add('days', parseInt(currentRecipe.PrimaryAge));
      var formattedStartDate = startDate.format('YYYY-MM-DD');
      var formattedEndDate = endDate.format('YYYY-MM-DD');

      var event = {'summary': 'Primary Fermentation: ' + currentRecipe.Name,
        'start': {'date': formattedStartDate},
        "end": {"date": formattedEndDate},
        'description': 'Primary Fermentation at ' + currentRecipe.PrimaryTemp + ' degrees.',
        'reminders': {'useDefault': true}};

      messaging.publish(events.message._CREATE_EVENT_, [brewingCalendarId, event]);
    }
  };

  var addSecondaryToCalendar = function (currentRecipe, scheduledDate) {
    if (currentRecipe.SecondaryAge > 0 && currentRecipe.SecondaryTemp > 0) {
      var startDate = moment(scheduledDate).add('days', parseInt(currentRecipe.PrimaryAge));
      var endDate = startDate.add('days', parseInt(currentRecipe.SecondaryAge));
      var formattedStartDate = startDate.format('YYYY-MM-DD');
      var formattedEndDate = endDate.format('YYYY-MM-DD');

      var event = {"summary": "Secondary Fermentation: " + currentRecipe.Name,
        "start": {"date": formattedStartDate},
        "end": {"date": formattedEndDate},
        "description": "Secondary Fermentation at " + currentRecipe.SecondaryTemp + " degrees.",
        "reminders": {"useDefault": true}};

      messaging.publish(events.message._CREATE_EVENT_, [brewingCalendarId, event]);
    }
  };

  var addTertiaryToCalendar = function (currentRecipe, scheduledDate) {
    if (currentRecipe.TertiaryAge > 0 && currentRecipe.TertiaryTemp > 0) {
      var startDate = moment(scheduledDate).add('days', parseInt(currentRecipe.PrimaryAge) + parseInt(currentRecipe.SecondaryAge));
      var endDate = startDate.add('days', parseInt(currentRecipe.TertiaryAge));

      var formattedStartDate = startDate.format('YYYY-MM-DD');
      var formattedEndDate = endDate.format('YYYY-MM-DD');

      var event = {"summary": "Tertiary Fermentation: " + currentRecipe.Name,
        "start": {"date": formattedStartDate},
        "end": {"date": formattedEndDate},
        "description": "Tertiary Fermentation at " + currentRecipe.TertiaryTemp + " degrees.",
        "reminders": {"useDefault": true}};

      messaging.publish(events.message._CREATE_EVENT_, [brewingCalendarId, event]);
    }
  };

  var addBottlingToCalendar = function (currentRecipe, scheduledDate) {
    var startDate = moment(scheduledDate).add('days', parseInt(currentRecipe.PrimaryAge) + parseInt(currentRecipe.SecondaryAge) + parseInt(currentRecipe.TertiaryAge));
    var endDate = startDate;

    var formattedStartDate = startDate.format('YYYY-MM-DD');
    var formattedEndDate = endDate.format('YYYY-MM-DD');

    var event = {"summary": "Bottle: " + currentRecipe.Name,
      "start": {"date": formattedStartDate},
      "end": {"date": formattedEndDate},
      "description": "Bottle: " + currentRecipe.Name,
      "reminders": {"useDefault": true}};

    messaging.publish(events.message._CREATE_EVENT_, [brewingCalendarId, event]);
  };

  var addConditioningToCalendar = function (currentRecipe, scheduledDate) {
    if (currentRecipe.ConditioningAge > 0 && currentRecipe.ConditioningTemp > 0) {
      var startDate = moment(scheduledDate).add('days', parseInt(currentRecipe.PrimaryAge) + parseInt(currentRecipe.SecondaryAge) + parseInt(currentRecipe.TertiaryAge));
      var endDate = startDate.add('days', parseInt(currentRecipe.ConditioningAge));

      var formattedStartDate = startDate.format('YYYY-MM-DD');
      var formattedEndDate = endDate.format('YYYY-MM-DD');

      var event = {"summary": "Condition: " + currentRecipe.Name,
        "start": {"date": formattedStartDate},
        "end": {"date": formattedEndDate},
        "description": "Condition at " + currentRecipe.ConditioningTemp + " degrees.",
        "reminders": {"useDefault": true}};

      messaging.publish(events.message._CREATE_EVENT_, [brewingCalendarId, event]);
    }
  };

  var init = function () {
    brewingCalendar = {};
    brewingCalendarId = '';
    brewingCalendarName = 'My Brewing Calendar';
    brewingTaskList = {};
    brewingTaskListId = '';
    brewingTaksListName = 'My Brewing Tasks';
  };

  var brewCalendar = {
    init: init,
    reduceBrewingCalendar: reduceBrewingCalendar,
    getBrewingCalender: getBrewingCalender,
    onHandleGetCalendarComplete: onHandleGetCalendarComplete,
    getBrewingTaskList: getBrewingTaskList,
    onHandleGetTaskListComplete: onHandleGetTaskListComplete,
    createDefaultCalendarEntries: createDefaultCalendarEntries,
    handleCreateDefaultEventRequest: handleCreateDefaultEventRequest,
    createBrewDayEvents: createBrewDayEvents,
    addGetIngredientsTask: addGetIngredientsTask,
    addPrepareStarterTask: addPrepareStarterTask,
    addBrewDayToCalendar: addBrewDayToCalendar,
    addPrimaryToCalendar: addPrimaryToCalendar,
    addSecondaryToCalendar: addSecondaryToCalendar,
    addTertiaryToCalendar: addTertiaryToCalendar,
    addBottlingToCalendar: addBottlingToCalendar,
    addConditioningToCalendar: addConditioningToCalendar
  };

  return brewCalendar;
});