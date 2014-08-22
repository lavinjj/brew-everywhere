/* jslint -W117*/
angular.module('brew-everywhere').factory('googleTasks',function(messaging, events) {
  var taskListId = '';
  var taskListName = '';
  var createIfDoesNotExist = false;

  var getTaskListByName = function(name, create){
    taskListName = name;
    createIfDoesNotExist = create;
    gapi.client.load('tasks', 'v1', handleTasksClientLoaded);
  };

  messaging.subscribe(events.message._GET_TASK_LIST_, getTaskListByName);

  var handleTasksClientLoaded = function() {
    messaging.publish(events.message._SERVER_REQUEST_STARTED_);
    var request = gapi.client.tasks.tasklists.list();
    request.execute(handleGetTasksList);
  };

  var handleGetTasksList = function(resp) {
    if(resp.items.length > 0){
      angular.forEach(resp.items, function(item){
        if(item.title === taskListName){
          taskListId = item.id;
        }
      });
    }

    if (taskListId){
      getGoogleTaskListById(taskListId);
    }
    else {
      if(createIfDoesNotExist){
        createTaskList();
      }
      else {
        getTaskListFailed();
      }
    }
  };

  var getTaskListFailed = function(){
    messaging.publish(events.message._SERVER_REQUEST_ENDED_);
    messaging.publish(events.message._GET_TASK_LIST_FAILED_);
  };

  var getGoogleTaskListById = function(id){
    var request = gapi.client.tasks.tasks.list({'tasklist': id});
    request.execute(handleGetGoogleTaskListById);
  };

  var handleGetGoogleTaskListById = function(resp){
    if(resp.items.length > 0){
      messaging.publish(events.message._SERVER_REQUEST_ENDED_);
      messaging.publish(events.message._GET_TASK_LIST_COMPLETE_, [resp]);
    }
    else {
      getTaskListFailed();
    }
  };

  var createTaskList = function(){
    var request = gapi.client.tasks.tasklists.insert({"resource" :{'title': taskListName}});
    request.execute(handleCreateTaskListRequest);
  };

  var handleCreateTaskListRequest = function(resp){
    if(resp && resp.title === taskListName){
      taskListId = resp.id;
      getGoogleTaskListById(taskListId);
    }
    else {
      getTaskListFailed();
    }
  };

  var createTask = function(taskListId, task){
    messaging.publish(events.message._SERVER_REQUEST_STARTED_);
    var request = gapi.client.tasks.tasks.insert({'tasklist': taskListId, 'resource': task});
    request.execute(handleCreateTaskRequest);
  };

  messaging.subscribe(events.message._CREATE_TASK_, createTask);

  var handleCreateTaskRequest = function(resp){
    if(resp){
      getGoogleTaskListById(taskListId);
    }
    else {
      messaging.publish(events.message._CREATE_TASK_FAILED_);
    }
  };

  var updateTask = function(taskListId, task){
    messaging.publish(events.message._SERVER_REQUEST_STARTED_);
    var request = gapi.client.tasks.tasks.update({'tasklist': taskListId, 'task': task.id, 'resource': task});
    request.execute(handleUpdateTaskRequest);
  };

  messaging.subscribe(events.message._UPDATE_TASK_, updateTask);

  var handleUpdateTaskRequest = function(resp){
    if(resp){
      getGoogleTaskListById(taskListId);
    }
    else {
      messaging.publish(events.message._UPDATE_TASK_FAILED_);
    }
  };

  var deleteTask = function(taskListId, task){
    messaging.publish(events.message._SERVER_REQUEST_STARTED_);
    var request = gapi.client.tasks.tasks.delete({'tasklist': taskListId, 'task': task.id});
    request.execute(handleDeleteTaskRequest);
  };

  messaging.subscribe(events.message._DELETE_TASK_, deleteTask);

  var handleDeleteTaskRequest = function(resp){
    if(resp){
      getGoogleTaskListById(taskListId);
    }
    else {
      messaging.publish(events.message._DELETE_TASK_FAILED_);
    }
  };

  var init = function(){
    taskListId = '';
  };

  var googleTasks = {
    getTaskListByName: getTaskListByName,
    handleGetTasksList: handleGetTasksList,
    getTaskListFailed: getTaskListFailed,
    getGoogleTaskListById: getGoogleTaskListById,
    handleGetGoogleTaskListById: handleGetGoogleTaskListById,
    createTaskList: createTaskList,
    handleCreateTaskListRequest: handleCreateTaskListRequest,
    createTask: createTask,
    handleCreateTaskRequest: handleCreateTaskRequest,
    updateTask: updateTask,
    handleUpdateTaskRequest: handleUpdateTaskRequest,
    deleteTask: deleteTask,
    handleDeleteTaskRequest: handleDeleteTaskRequest,
    init: init
  };

  return googleTasks;
});