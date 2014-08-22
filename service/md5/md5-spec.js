describe('md5', function() {

  beforeEach(module('brew-everywhere'));

  it('should hash the passed in value', inject(function(md5) {
    expect(md5.createHash('jlavin@jimlavin.net')).toBe('80b03752791145a3fdd027b154d7b42b');
  }));

});