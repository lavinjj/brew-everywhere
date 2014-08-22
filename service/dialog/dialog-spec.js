/*jshint -W117*/
describe('dialog', function() {
  beforeEach(module('brew-everywhere'));
  beforeEach(module('test.messaging'));


  it('should publish _DISPLAY_POPUP_ when displayDialogHandler is called with message', inject(function(dialog, events, $timeout, messaging) {
    spyOn(messaging, "publish");

    var message = 'To Be or Not To Be!';

    dialog.displayDialogHandler(message, 'popup');

    $timeout.flush(250);

    expect(messaging.publish).toHaveBeenCalledWith(events.message._DISPLAY_POPUP_, [message]);


  }));

  it('should not publish _DISPLAY_POPUP_ until after 100 milliseconds have passed', inject(function(dialog, events, $timeout, messaging) {
    spyOn(messaging, "publish");

    var message = 'To Be or Not To Be!';

    dialog.displayDialogHandler(message, 'popup');

    expect(messaging.publish).not.toHaveBeenCalled();

    $timeout.flush(250);

    expect(messaging.publish).toHaveBeenCalledWith(events.message._DISPLAY_POPUP_, [message]);


  }));

  it('should send the message when displayDialogHandler is called with message', inject(function(dialog, events, $timeout, messaging) {
    spyOn(messaging, "publish");

    var message = 'To Be or Not To Be!';

    dialog.displayDialogHandler(message, 'popup');

    $timeout.flush(250);

    expect(messaging.publish).toHaveBeenCalledWith(events.message._DISPLAY_POPUP_, [message]);


  }));

  it('should publish _DISPLAY_CONFIRMATION_ when displayDialogHandler is called with message', inject(function(dialog, events, $timeout, messaging) {
    spyOn(messaging, "publish");

    var message = 'To Be or Not To Be!';

    dialog.displayDialogHandler(message, 'confirmation');

    $timeout.flush(250);

    expect(messaging.publish).toHaveBeenCalledWith(events.message._DISPLAY_CONFIRMATION_, [message]);


  }));

  it('should publish _DISPLAY_POPUP_ when displayDialogHandler is called with neither popup or confirmation', inject(function(dialog, events, $timeout, messaging) {
    spyOn(messaging, "publish");

    var message = 'To Be or Not To Be!';

    dialog.displayDialogHandler(message, 'error');

    $timeout.flush(250);

    expect(messaging.publish).toHaveBeenCalledWith(events.message._DISPLAY_POPUP_, [message]);


  }));



});