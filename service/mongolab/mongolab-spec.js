describe('mongolab', function() {

  beforeEach(module('brew-everywhere'));

  it('should save the Api Key', inject(function(mongolab) {

    var expected = 'uBNL_OFgaJ77eIEA0ZLFmwFcvuVLVv0o';

    mongolab.setApiKey(expected);

    var actual = mongolab.getApiKey();

    expect(actual).toBe(expected);

  }));

  it('should save the Base url', inject(function(mongolab){
    var expected = 'https://api.mongolab.com/api/1/databases';

    mongolab.setBaseUrl(expected);

    var actual = mongolab.getBaseUrl();

    expect(actual).toBe(expected);

  }));

  it('should return the records in a collection', inject(function(mongolab){
    var expected = 'uBNL_OFgaJ77eIEA0ZLFmwFcvuVLVv0o';

    mongolab.setApiKey(expected);

    mongolab.query('brew_everywhere', 'adjuncts', {}).success(function(response){
      expect(response).toBeTruthy();
      expect(response.length).toBe(69);
    });

  }));

  it('should return a record for the given query', inject(function(mongolab){
    var expected = 'uBNL_OFgaJ77eIEA0ZLFmwFcvuVLVv0o';

    mongolab.setApiKey(expected);

    mongolab.query('brew_everywhere', 'adjuncts', {q: {"Name": "Anise, Star"}}).success(function(response){
      expect(response).toBeTruthy();
      expect(response.length).toBe(1);
    });

  }));

  it('should create a new record in the collection', inject(function(mongolab){
    var user = {
      "UserName": "test_1376536470818",
      "FirstName": "Test",
      "LastName": "User",
      "Location": "",
      "Bio": "",
      "WebSite": "",
      "Avatar": "",
      "Photo": "",
      "Password": "771fde1f227c07123c4aed1ed7ec4da7dfd1347d",
      "DateJoined": "2013-08-15T03:14:36.128Z",
      "Inventory": null,
      "BrewerIsAdmin": false
    };

    var apikey = 'uBNL_OFgaJ77eIEA0ZLFmwFcvuVLVv0o';

    mongolab.setApiKey(apikey);

    mongolab.query('brew_everywhere', 'brewers', {}).success(function(response){
      var expected = response.length;

      mongolab.create('brew_everywhere', 'brewers', user).success(function(response) {

        mongolab.query('brew_everywhere', 'brewers', {}).success(function (response) {
          var actual = response.length;

          expect(actual).toBe(expected + 1);
        });
      });
    });
  }));


});