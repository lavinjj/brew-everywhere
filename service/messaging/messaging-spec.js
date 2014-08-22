/*jshint -W117*/
describe('messaging', function () {

  beforeEach(module('brew-everywhere'));

  it('should store the subscriber in the cache', inject(function (messaging) {
    var callbackHandler = function (value) {
      expect(value).toBeTruthy();
    };

    messaging.subscribe('TEST', callbackHandler);

    messaging.publish('TEST', ['value']);

  }));

  it('should pass through the values published', inject(function(messaging){
    var  actual = 'TEST';
    var callbackHandler = function (value) {
      expect(value).toBe(actual);
    };

    messaging.subscribe('TEST', callbackHandler);

    messaging.publish('TEST', [actual]);

  }));

  it('should remove the callback handler when unsubscribed', inject(function(messaging){
    var  actual = 'TEST';
    var callbackHandler = function (value) {
      expect(value).toBe(actual);
    };

    var handle = messaging.subscribe('TEST', callbackHandler);

    messaging.publish('TEST', [actual]);

    messaging.unsubscribe(handle);

    actual = 'NEW VALUE';

    messaging.publish('TEST', [actual]);
  }));

});