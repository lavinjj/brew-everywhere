describe('adjunct', function() {

  beforeEach(module('brew-everywhere'));

  it('should create a new instance', inject(function(Adjunct) {

    var actual = new Adjunct();
    actual.Name = 'Amylase Enzyme';
    actual.Type = 'Other';
    actual.Use = 'Primary';
    actual.UseFor = 'Fermentation';

    expect(actual.Name).toBe('Amylase Enzyme');
    expect(actual.Type).toBe('Other');
    expect(actual.Use).toBe('Primary');
    expect(actual.UseFor).toBe('Fermentation');

  }));

});