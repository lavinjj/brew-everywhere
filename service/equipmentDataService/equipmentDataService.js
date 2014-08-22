angular.module('brew-everywhere').factory('equipmentDataService',function(messaging, events, mongolab, modelTransformer, Equipment) {
  var equipment = [];

  var getEquipment = function () {
    return mongolab.query('brew_everywhere', 'equipment', [])
        .then(getEquipmentSuccessHandler, getEquipmentErrorHandler);
  };

  var getEquipmentSuccessHandler = function (response) {
    if (response.data.length > 0) {
      var result = [];
      angular.forEach(response.data, function (equipment) {
        result.push(modelTransformer.transform(equipment, Equipment));
      });
      messaging.publish(events.message._GET_EQUIPMENT_COMPLETE_, [result]);
    } else {
      getEquipmentErrorHandler();
    }
  };

  var getEquipmentErrorHandler = function () {
    messaging.publish(events.message._GET_EQUIPMENT_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to get equipment from server', 'alert.warning']);
  };

  messaging.subscribe(events.message._GET_EQUIPMENT_, getEquipment);

  var getEquipmentById = function (id) {
    return mongolab.queryById('brew_everywhere', 'equipment', id, [])
        .then(getEquipmentByIdSuccessHandler, getEquipmentByIdErrorHandler);
  };

  var getEquipmentByIdSuccessHandler = function (response) {
    if (response.data) {
      messaging.publish(events.message._GET_EQUIPMENT_BY_ID_COMPLETE_,
          [modelTransformer.transform(response.data, Equipment)]);
    }
    else {
      getEquipmentByIdErrorHandler();
    }
  };

  var getEquipmentByIdErrorHandler = function () {
    messaging.publish(events.message._GET_EQUIPMENT_BY_ID_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to get equipment by id from server', 'alert.warning']);
  };

  messaging.subscribe(events.message._GET_EQUIPMENT_BY_ID_, getEquipmentById);

  var createEquipment = function (equipment) {
    return mongolab.create('brew_everywhere', 'equipment', equipment)
        .then(createEquipmentSuccessHandler, createEquipmentErrorHandler);
  };

  var createEquipmentSuccessHandler = function (response) {
    if (response.data) {
      messaging.publish(events.message._CREATE_EQUIPMENT_COMPLETE_,
          [modelTransformer.transform(response.data, Equipment)]);
    }
    else {
      createEquipmentErrorHandler();
    }
  };

  var createEquipmentErrorHandler = function () {
    messaging.publish(events.message._CREATE_EQUIPMENT_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to create equipment', 'alert.warning']);
  };

  messaging.subscribe(events.message._CREATE_EQUIPMENT_, createEquipment);

  var updateEquipment = function (equipment) {
    return mongolab.update('brew_everywhere', 'equipment', equipment)
        .then(updateEquipmentSuccessHandler, updateEquipmentErrorHandler);
  };

  var updateEquipmentSuccessHandler = function (response) {
    if (response.data) {
      messaging.publish(events.message._UPDATE_EQUIPMENT_COMPLETE_,
          [modelTransformer.transform(response.data, Equipment)]);
    }
    else {
      updateEquipmentErrorHandler();
    }
  };

  var updateEquipmentErrorHandler = function () {
    messaging.publish(events.message._UPDATE_EQUIPMENT_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to update equipment', 'alert.warning']);
  };

  messaging.subscribe(events.message._UPDATE_EQUIPMENT_, updateEquipment);

  var deleteEquipment = function (equipment) {
    return mongolab.delete('brew_everywhere', 'equipment', equipment)
        .then(deleteEquipmentSuccessHandler, deleteEquipmentErrorHandler);
  };

  var deleteEquipmentSuccessHandler = function (response) {
    if (response.status === 200) {
      messaging.publish(events.message._DELETE_EQUIPMENT_COMPLETE_);
    }
    else {
      deleteEquipmentErrorHandler();
    }
  };

  var deleteEquipmentErrorHandler = function () {
    messaging.publish(events.message._DELETE_EQUIPMENT_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to delete equipment', 'alert.warning']);
  };

  messaging.subscribe(events.message._DELETE_EQUIPMENT_, deleteEquipment);

  var init = function () {
    equipment = [];
  };

  var equipmentDataService = {
    init: init,
    getEquipment: getEquipment,
    getEquipmentSuccessHandler: getEquipmentSuccessHandler,
    getEquipmentErrorHandler: getEquipmentErrorHandler,
    getEquipmentById: getEquipmentById,
    getEquipmentByIdSuccessHandler: getEquipmentByIdSuccessHandler,
    getEquipmentByIdErrorHandler: getEquipmentByIdErrorHandler,
    createEquipment: createEquipment,
    createEquipmentSuccessHandler: createEquipmentSuccessHandler,
    createEquipmentErrorHandler: createEquipmentErrorHandler,
    updateEquipment: updateEquipment,
    updateEquipmentSuccessHandler: updateEquipmentSuccessHandler,
    updateEquipmentErrorHandler: updateEquipmentErrorHandler,
    deleteEquipment: deleteEquipment,
    deleteEquipmentSuccessHandler: deleteEquipmentSuccessHandler,
    deleteEquipmentErrorHandler: deleteEquipmentErrorHandler
  };

  return equipmentDataService;
});