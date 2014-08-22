angular.module('brew-everywhere').factory('authenticate', function (messaging, events, brewerDataService, sha, Brewer) {
  var currentUser = {};
  var receivedUser = {};
  var authenticationType = '';
  var currentPassword = '';

  var loginWithGooglePlus = function () {
    authenticationType = 'GPLUS';
    messaging.publish(events.message._SERVER_REQUEST_STARTED_);
    messaging.publish(events.message._GPLUS_AUTHENTICATE_);
  };

  messaging.subscribe(events.message._AUTHENTICATE_USER_GPLUS_, loginWithGooglePlus);

  var googlePlusAuthenticatedHandler = function (user) {
    receivedUser = user;
    var userName = "GP:" + user.id;
    messaging.publish(events.message._GET_BREWER_BY_USERNAME_, [userName]);
  };

  messaging.subscribe(events.message._GPLUS_AUTHENTICATED_, googlePlusAuthenticatedHandler);

  var loginWithFacebook = function () {
    authenticationType = 'FBOOK';
    messaging.publish(events.message._SERVER_REQUEST_STARTED_);
    messaging.publish(events.message._FACEBOOK_AUTHENTICATE_);
  };

  messaging.subscribe(events.message._AUTHENTICATE_USER_FACEBOOK_, loginWithFacebook);

  var facebookAuthenticatedHandler = function (user) {
    receivedUser = user;
    var userName = "FB:" + user.id;
    messaging.publish(events.message._GET_BREWER_BY_USERNAME_, [userName]);
  };

  messaging.subscribe(events.message._FACEBOOK_AUTHENTICATED_, facebookAuthenticatedHandler);

  var authenticationFailureHandler = function () {
    messaging.publish(events.message._AUTHENTICATE_USER_FAILED_);
    messaging.publish(events.message._SERVER_REQUEST_ENDED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_, ['Log In Failed.', 'alert-warning']);
  };

  messaging.subscribe(events.message._GPLUS_FAILED_, authenticationFailureHandler);
  messaging.subscribe(events.message._FACEBOOK_FAILED_, authenticationFailureHandler);

  var login = function (username, password) {
    currentPassword = password;
    messaging.publish(events.message._GET_BREWER_BY_USERNAME_, [username]);
  };

  messaging.subscribe(events.message._AUTHENTICATE_USER_, login);

  var onGetBrewerByUserNameComplete = function(brewers){
    var brewer = brewers[0];
    var passwordHash = sha.hash(currentPassword + Date.parse(brewer.DateJoined).valueOf().toString());

    if (passwordHash !== brewer.Password) {
      messaging.publish(events.message._ADD_ERROR_MESSAGE_, ['Invalid password', 'alert.warning']);
    }

    currentUser = brewer;

    messaging.publish(events.message._AUTHENTICATE_USER_COMPLETE_, [currentUser]);
  };

  messaging.subscribe(events.message._GET_BREWER_BY_USERNAME_COMPLETE_, onGetBrewerByUserNameComplete);

  var currentUserHandler = function () {
    messaging.publish(events.message._CURRENT_USER_RESPONSE_, [currentUser]);
  };

  messaging.subscribe(events.message._REQUEST_CURRENT_USER_, currentUserHandler);

  var getBrewerByUserNameSuccessHandler = function (brewer) {
    currentUser = brewer[0];
    messaging.publish(events.message._AUTHENTICATE_USER_COMPLETE_, [currentUser]);
    messaging.publish(events.message._SERVER_REQUEST_ENDED_);
  };

  messaging.subscribe(events.message._GET_BREWER_BY_USERNAME_COMPLETE_, getBrewerByUserNameSuccessHandler);

  var getBrewerByUserNameErrorHandler = function(){
    if(authenticationType === 'GPLUS'){
      getBrewerByUserNameErrorGPlusHandler();
    }
    if(authenticationType === 'FBOOK'){
      getBrewerByUserNameErrorFacebookHandler();
    }
  };

  messaging.subscribe(events.message._GET_BREWER_BY_USERNAME_FAILED_, getBrewerByUserNameErrorHandler);

  var getBrewerByUserNameErrorGPlusHandler = function () {
    // parse out values from received user info
    var emailAddress = '';
    angular.forEach(receivedUser.emails, function(email){
      if(email.type === 'account'){
        emailAddress = email.value;
      }
    });
    var locationValue = '';
    angular.forEach(receivedUser.placesLived, function(place){
      if(place.primary){
        locationValue = place.value;
      }
    });

    var brewer = new Brewer();
    brewer.UserName = "GP:" + receivedUser.id;
    brewer.FirstName = receivedUser.name.givenName;
    brewer.LastName = receivedUser.name.familyName;
    brewer.Email = emailAddress;
    brewer.Location = locationValue;
    brewer.Bio = receivedUser.tagline;
    brewer.WebSite = receivedUser.url;
    brewer.Avatar = receivedUser.image.url;
    brewer.Photo = receivedUser.image.url;
    brewer.Password = '';
    brewer.DateJoined = new Date();
    brewer.Inventory = null;
    Brewer.BrewerIsAdmin = false;

    messaging.publish(events.message._CREATE_BREWER_, [brewer]);
  };

  var getBrewerByUserNameErrorFacebookHandler = function () {
    var brewer = new Brewer();
    brewer.UserName = "FB:" + receivedUser.id;
    brewer.FirstName = receivedUser.first_name;
    brewer.LastName = receivedUser.last_name;
    brewer.WebSite = receivedUser.link;
    brewer.DateJoined = new Date();
    brewer.Inventory = null;
    Brewer.BrewerIsAdmin = false;

    messaging.publish(events.message._CREATE_BREWER_, [brewer]);
  };

  var createBrewerSuccessHandler = function (brewer) {
    currentUser = brewer;
    messaging.publish(events.message._AUTHENTICATE_USER_COMPLETE_, [currentUser]);
    messaging.publish(events.message._SERVER_REQUEST_ENDED_);
  };

  messaging.publish(events.message._CREATE_BREWER_COMPLETE_, createBrewerSuccessHandler);

  var init = function () {
    currentUser = {};
  };

  var authenticate = {
    init: init,
    loginWithGooglePlus: loginWithGooglePlus,
    googlePlusAuthenticatedHandler: googlePlusAuthenticatedHandler,
    loginWithFacebook: loginWithFacebook,
    facebookAuthenticatedHandler: facebookAuthenticatedHandler,
    authenticationFailureHandler: authenticationFailureHandler,
    login: login,
    currentUserHandler: currentUserHandler
  };

  return authenticate;
});
