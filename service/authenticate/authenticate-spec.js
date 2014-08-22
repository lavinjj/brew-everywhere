/*jshint -W117*/
describe('authenticate', function() {
  beforeEach(module('brew-everywhere'));
  beforeEach(module('test.messaging'));

  it('should set current user to empty object when init called', inject(function(authenticate, events, messaging) {
    spyOn(messaging, "publish");

    authenticate.init();

    authenticate.currentUserHandler();

    expect(messaging.publish).toHaveBeenCalledWith(events.message._CURRENT_USER_RESPONSE_, [{}]);

  }));

  it('should publish a _SERVER_REQUEST_STARTED_ message when loginWithGooglePlus is called', inject(function(authenticate, events, messaging) {
    spyOn(messaging, "publish");

    authenticate.init();

    authenticate.loginWithGooglePlus();

    expect(messaging.publish).toHaveBeenCalledWith(events.message._SERVER_REQUEST_STARTED_);

  }));

  it('should publish a _GPLUS_AUTHENTICATE_ message when loginWithGooglePlus is called', inject(function(authenticate, events, messaging) {
    spyOn(messaging, "publish");

    authenticate.init();

    authenticate.loginWithGooglePlus();

    expect(messaging.publish).toHaveBeenCalledWith(events.message._GPLUS_AUTHENTICATE_);

  }));

  it('should update current user when googlePlusAuthenticatedHandler called', inject(function(authenticate, events, messaging) {
    spyOn(messaging, "publish");

    var user = {name: {givenName: "Test", surname: "User"}};

    authenticate.googlePlusAuthenticatedHandler(user);

    expect(messaging.publish).toHaveBeenCalledWith(events.message._GET_BREWER_BY_USERNAME_, ['GP:undefined']);

  }));

  it('should publish a _AUTHENTICATE_USER_COMPLETE_ message when googlePlusAuthenticatedHandler is called', inject(function(authenticate, events, messaging) {
    spyOn(messaging, "publish");

    var user = {name: {givenName: "Test", surname: "User"}};

    authenticate.googlePlusAuthenticatedHandler(user);

    expect(messaging.publish).toHaveBeenCalledWith(events.message._GET_BREWER_BY_USERNAME_, ['GP:undefined']);

  }));

  it('should publish a _SERVER_REQUEST_ENDED_ message when googlePlusAuthenticatedHandler is called', inject(function(authenticate, events, messaging) {
    spyOn(messaging, "publish");

    var user = {name: {givenName: "Test", surname: "User"}};

    authenticate.googlePlusAuthenticatedHandler(user);

    expect(messaging.publish).toHaveBeenCalledWith(events.message._GET_BREWER_BY_USERNAME_, ['GP:undefined']);

  }));

  it('should publish a _AUTHENTICATE_USER_FAILED_ message when authenticationFailureHandler is called', inject(function(authenticate, events, messaging) {
    spyOn(messaging, "publish");

    authenticate.authenticationFailureHandler();

    expect(messaging.publish).toHaveBeenCalledWith(events.message._AUTHENTICATE_USER_FAILED_);

  }));

  it('should publish a _SERVER_REQUEST_ENDED_ message when authenticationFailureHandler is called', inject(function(authenticate, events, messaging) {
    spyOn(messaging, "publish");

    authenticate.authenticationFailureHandler();

    expect(messaging.publish).toHaveBeenCalledWith(events.message._SERVER_REQUEST_ENDED_);

  }));

  it('should publish a _ADD_ERROR_MESSAGE_ message when authenticationFailureHandler is called', inject(function(authenticate, events, messaging) {
    spyOn(messaging, "publish");

    authenticate.authenticationFailureHandler();

    expect(messaging.publish).toHaveBeenCalledWith(events.message._ADD_ERROR_MESSAGE_, ['Log In Failed.', 'alert-warning']);

  }));

  it('should publish a _AUTHENTICATE_USER_COMPLETE_ message when login is called', inject(function(authenticate, events, messaging) {
    spyOn(messaging, "publish");

    authenticate.login('username', 'password');

    expect(messaging.publish).toHaveBeenCalledWith('_GET_BREWER_BY_USERNAME_', [ 'username' ]);

  }));


});