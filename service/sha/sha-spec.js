describe('sha', function () {

  beforeEach(module('brew-everywhere'));

  it('should create an almost-unique 160-bit (20-byte) signature for a text', inject(function (sha) {

    expect(sha.hash('abc')).toBe('a9993e364706816aba3e25717850c26c9cd0d89d');

  }));

});