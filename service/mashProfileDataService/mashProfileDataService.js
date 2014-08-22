angular.module('brew-everywhere').factory('mashProfileDataService', function (messaging, events, mongolab, modelTransformer, MashProfile) {
  var mashProfiles = [];

  var getMashProfiles = function () {
    return mongolab.query('brew_everywhere', 'mashProfiles', [])
        .then(getMashProfileSuccessHandler, getMashProfileErrorHandler);
  };

  var getMashProfileSuccessHandler = function (response) {
    if (response.data.length > 0) {
      var result = [];
      angular.forEach(response.data, function (mashProfile) {
        result.push(modelTransformer.transform(mashProfile, MashProfile));
      });
      messaging.publish(events.message._GET_MASHPROFILES_COMPLETE_, [result]);
    } else {
      getMashProfileErrorHandler();
    }
  };

  var getMashProfileErrorHandler = function () {
    messaging.publish(events.message._GET_MASHPROFILES_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to get mashProfiles from server', 'alert.warning']);
  };

  messaging.subscribe(events.message._GET_MASHPROFILES_, getMashProfiles);

  var getMashProfileById = function (id) {
    return mongolab.queryById('brew_everywhere', 'mashProfiles', id, [])
        .then(getMashProfileByIdSuccessHandler, getMashProfileByIdErrorHandler);
  };

  var getMashProfileByIdSuccessHandler = function (response) {
    if (response.data) {
      messaging.publish(events.message._GET_MASHPROFILE_BY_ID_COMPLETE_,
          [modelTransformer.transform(response.data, MashProfile)]);
    }
    else {
      getMashProfileByIdErrorHandler();
    }
  };

  var getMashProfileByIdErrorHandler = function () {
    messaging.publish(events.message._GET_MASHPROFILE_BY_ID_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to get mashProfile by id from server', 'alert.warning']);
  };

  messaging.subscribe(events.message._GET_MASHPROFILE_BY_ID_, getMashProfileById);

  var createMashProfile = function (mashProfile) {
    return mongolab.create('brew_everywhere', 'mashProfiles', mashProfile)
        .then(createMashProfileSuccessHandler, createMashProfileErrorHandler);
  };

  var createMashProfileSuccessHandler = function (response) {
    if (response.data) {
      messaging.publish(events.message._CREATE_MASHPROFILE_COMPLETE_,
          [modelTransformer.transform(response.data, MashProfile)]);
    }
    else {
      createMashProfileErrorHandler();
    }
  };

  var createMashProfileErrorHandler = function () {
    messaging.publish(events.message._CREATE_MASHPROFILE_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to create mashProfile', 'alert.warning']);
  };

  messaging.subscribe(events.message._CREATE_MASHPROFILE_, createMashProfile);

  var updateMashProfile = function (mashProfile) {
    return mongolab.update('brew_everywhere', 'mashProfiles', mashProfile)
        .then(updateMashProfileSuccessHandler, updateMashProfileErrorHandler);
  };

  var updateMashProfileSuccessHandler = function (response) {
    if (response.data) {
      messaging.publish(events.message._UPDATE_MASHPROFILE_COMPLETE_,
          [modelTransformer.transform(response.data, MashProfile)]);
    }
    else {
      updateMashProfileErrorHandler();
    }
  };

  var updateMashProfileErrorHandler = function () {
    messaging.publish(events.message._UPDATE_MASHPROFILE_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to update mashProfile', 'alert.warning']);
  };

  messaging.subscribe(events.message._UPDATE_MASHPROFILE_, updateMashProfile);

  var deleteMashProfile = function (mashProfile) {
    return mongolab.delete('brew_everywhere', 'mashProfiles', mashProfile)
        .then(deleteMashProfileSuccessHandler, deleteMashProfileErrorHandler);
  };

  var deleteMashProfileSuccessHandler = function (response) {
    if (response.status === 200) {
      messaging.publish(events.message._DELETE_MASHPROFILE_COMPLETE_);
    }
    else {
      deleteMashProfileErrorHandler();
    }
  };

  var deleteMashProfileErrorHandler = function () {
    messaging.publish(events.message._DELETE_MASHPROFILE_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
        ['Unable to delete mashProfile', 'alert.warning']);
  };

  messaging.subscribe(events.message._DELETE_MASHPROFILE_, deleteMashProfile);

  var init = function () {
    mashProfiles = [];
  };

  var mashProfileDataService = {
    init: init,
    getMashProfiles: getMashProfiles,
    getMashProfileSuccessHandler: getMashProfileSuccessHandler,
    getMashProfileErrorHandler: getMashProfileErrorHandler,
    getMashProfileById: getMashProfileById,
    getMashProfileByIdSuccessHandler: getMashProfileByIdSuccessHandler,
    getMashProfileByIdErrorHandler: getMashProfileByIdErrorHandler,
    createMashProfile: createMashProfile,
    createMashProfileSuccessHandler: createMashProfileSuccessHandler,
    createMashProfileErrorHandler: createMashProfileErrorHandler,
    updateMashProfile: updateMashProfile,
    updateMashProfileSuccessHandler: updateMashProfileSuccessHandler,
    updateMashProfileErrorHandler: updateMashProfileErrorHandler,
    deleteMashProfile: deleteMashProfile,
    deleteMashProfileSuccessHandler: deleteMashProfileSuccessHandler,
    deleteMashProfileErrorHandler: deleteMashProfileErrorHandler
  };

  return mashProfileDataService;
});