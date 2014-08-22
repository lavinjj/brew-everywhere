/*jshint -W117*/
describe('errors', function() {
  beforeEach(module('brew-everywhere'));
  beforeEach(module('test.messaging'));

  it('should publish a _ERROR_MESSAGES_UPDATED_ message when addErrorMessageHandler is called', inject(function(errors, events, messaging, $timeout) {
    spyOn(messaging, "publish");

    var message = 'To Be or Not To Be!';

    errors.addErrorMessageHandler(message, 'popup');

    $timeout.flush(250);

    expect(messaging.publish).toHaveBeenCalledWith(events.message._ERROR_MESSAGES_UPDATED_, [{ type : 'popup', message : 'To Be or Not To Be!' }]);
  }));

  it('should only publish a _ERROR_MESSAGES_UPDATED_ message after 100 millisconds have passed', inject(function(errors, events, messaging, $timeout) {
    spyOn(messaging, "publish");

    var message = 'To Be or Not To Be!';

    errors.addErrorMessageHandler(message, 'popup');

    expect(messaging.publish).not.toHaveBeenCalled();

    $timeout.flush(250);

    expect(messaging.publish).toHaveBeenCalledWith(events.message._ERROR_MESSAGES_UPDATED_, [{ type : 'popup', message : 'To Be or Not To Be!' }]);
  }));


  it('should not clear out the message array when addErrorMessageHandler is called', inject(function(errors, events, messaging, $timeout) {
    spyOn(messaging, "publish");

    var message = 'To Be or Not To Be!';

    errors.addErrorMessageHandler(message, 'popup');
    errors.addErrorMessageHandler(message, 'confirmation');

    $timeout.flush(250);

    expect(messaging.publish).toHaveBeenCalledWith(events.message._ERROR_MESSAGES_UPDATED_, [{ type : 'popup', message : 'To Be or Not To Be!' }, { type : 'confirmation', message : 'To Be or Not To Be!' }]);
  }));

  it('should clear out the message array when clearErrorMessagesHandler is called', inject(function(errors, events, messaging, $timeout) {
    spyOn(messaging, "publish");

    var message = 'To Be or Not To Be!';

    errors.addErrorMessageHandler(message, 'popup');
    errors.addErrorMessageHandler(message, 'confirmation');

    $timeout.flush(250);

    expect(messaging.publish).toHaveBeenCalledWith(events.message._ERROR_MESSAGES_UPDATED_, [{ type : 'popup', message : 'To Be or Not To Be!' }, { type : 'confirmation', message : 'To Be or Not To Be!' }]);

    errors.clearErrorMessagesHandler();

    errors.addErrorMessageHandler(message, 'popup');

    $timeout.flush(250);

    expect(messaging.publish).toHaveBeenCalledWith(events.message._ERROR_MESSAGES_UPDATED_, [{ type : 'popup', message : 'To Be or Not To Be!' }]);

  }));

});