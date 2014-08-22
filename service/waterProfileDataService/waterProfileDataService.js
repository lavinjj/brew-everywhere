angular.module('brew-everywhere').factory('waterProfileDataService',function(messaging, events, mongolab, modelTransformer, WaterProfile) {
  var waterProfiles = [];

  var getWaterProfiles = function () {
    return mongolab.query('brew_everywhere', 'waterProfiles', [])
        .then(getWaterProfileSuccessHandler, getWaterProfileErrorHandler);
  };

  var getWaterProfileSuccessHandler = function (response) {
    if (response.data.length > 0) {
      var result = [];
      angular.forEach(response.data, function (waterProfile) {
        result.push(modelTransformer.transform(waterProfile, WaterProfile));
      });
      messaging.publish(events.message._GET_WATERPROFILES_COMPLETE_, [result]);
    } else {
      getWaterProfileErrorHandler();
    }
  };

  var getWaterProfileErrorHandler = function () {
    messaging.publish(events.message._GET_WATERPROFILES_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to get waterProfiles from server', 'alert.warning']);
  };

  messaging.subscribe(events.message._GET_WATERPROFILES_, getWaterProfiles);

  var getWaterProfileById = function (id) {
    return mongolab.queryById('brew_everywhere', 'waterProfiles', id, [])
        .then(getWaterProfileByIdSuccessHandler, getWaterProfileByIdErrorHandler);
  };

  var getWaterProfileByIdSuccessHandler = function (response) {
    if (response.data) {
      messaging.publish(events.message._GET_WATERPROFILE_BY_ID_COMPLETE_,
          [modelTransformer.transform(response.data, WaterProfile)]);
    }
    else {
      getWaterProfileByIdErrorHandler();
    }
  };

  var getWaterProfileByIdErrorHandler = function () {
    messaging.publish(events.message._GET_WATERPROFILE_BY_ID_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to get waterProfile by id from server', 'alert.warning']);
  };

  messaging.subscribe(events.message._GET_WATERPROFILE_BY_ID_, getWaterProfileById);

  var createWaterProfile = function (waterProfile) {
    return mongolab.create('brew_everywhere', 'waterProfiles', waterProfile)
        .then(createWaterProfileSuccessHandler, createWaterProfileErrorHandler);
  };

  var createWaterProfileSuccessHandler = function (response) {
    if (response.data) {
      messaging.publish(events.message._CREATE_WATERPROFILE_COMPLETE_,
          [modelTransformer.transform(response.data, WaterProfile)]);
    }
    else {
      createWaterProfileErrorHandler();
    }
  };

  var createWaterProfileErrorHandler = function () {
    messaging.publish(events.message._CREATE_WATERPROFILE_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to create waterProfile', 'alert.warning']);
  };

  messaging.subscribe(events.message._CREATE_WATERPROFILE_, createWaterProfile);

  var updateWaterProfile = function (waterProfile) {
    return mongolab.update('brew_everywhere', 'waterProfiles', waterProfile)
        .then(updateWaterProfileSuccessHandler, updateWaterProfileErrorHandler);
  };

  var updateWaterProfileSuccessHandler = function (response) {
    if (response.data) {
      messaging.publish(events.message._UPDATE_WATERPROFILE_COMPLETE_,
          [modelTransformer.transform(response.data, WaterProfile)]);
    }
    else {
      updateWaterProfileErrorHandler();
    }
  };

  var updateWaterProfileErrorHandler = function () {
    messaging.publish(events.message._UPDATE_WATERPROFILE_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to update waterProfile', 'alert.warning']);
  };

  messaging.subscribe(events.message._UPDATE_WATERPROFILE_, updateWaterProfile);

  var deleteWaterProfile = function (waterProfile) {
    return mongolab.delete('brew_everywhere', 'waterProfiles', waterProfile)
        .then(deleteWaterProfileSuccessHandler, deleteWaterProfileErrorHandler);
  };

  var deleteWaterProfileSuccessHandler = function (response) {
    if (response.status === 200) {
      messaging.publish(events.message._DELETE_WATERPROFILE_COMPLETE_);
    }
    else {
      deleteWaterProfileErrorHandler();
    }
  };

  var deleteWaterProfileErrorHandler = function () {
    messaging.publish(events.message._DELETE_WATERPROFILE_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to delete waterProfile', 'alert.warning']);
  };

  messaging.subscribe(events.message._DELETE_WATERPROFILE_, deleteWaterProfile);

  var init = function () {
    waterProfiles = [];
  };

  var waterProfileDataService = {
    init: init,
    getWaterProfiles: getWaterProfiles,
    getWaterProfileSuccessHandler: getWaterProfileSuccessHandler,
    getWaterProfileErrorHandler: getWaterProfileErrorHandler,
    getWaterProfileById: getWaterProfileById,
    getWaterProfileByIdSuccessHandler: getWaterProfileByIdSuccessHandler,
    getWaterProfileByIdErrorHandler: getWaterProfileByIdErrorHandler,
    createWaterProfile: createWaterProfile,
    createWaterProfileSuccessHandler: createWaterProfileSuccessHandler,
    createWaterProfileErrorHandler: createWaterProfileErrorHandler,
    updateWaterProfile: updateWaterProfile,
    updateWaterProfileSuccessHandler: updateWaterProfileSuccessHandler,
    updateWaterProfileErrorHandler: updateWaterProfileErrorHandler,
    deleteWaterProfile: deleteWaterProfile,
    deleteWaterProfileSuccessHandler: deleteWaterProfileSuccessHandler,
    deleteWaterProfileErrorHandler: deleteWaterProfileErrorHandler
  };

  return waterProfileDataService;
});