describe('utf8encode', function () {

  beforeEach(module('brew-everywhere'));

  it('should encode the given text', inject(function (utf8encode) {
    expect(utf8encode.encode('räksmörgås')).toEqual('rÃ¤ksmÃ¶rgÃ¥s');
  }));

  it('should decode the given text back', inject(function (utf8encode) {
    expect(utf8encode.decode('rÃ¤ksmÃ¶rgÃ¥s')).toEqual('räksmörgås');
  }));

});