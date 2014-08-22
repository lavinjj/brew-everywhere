describe('brewerDataService', function() {
  var rootScope = null;
  var service = null;
  var db = null;
  var pubsub = null;
  var constants = null;

  beforeEach(module('brew-everywhere'));
  beforeEach(module('test.messaging'));
  beforeEach(module('test.mongolab'));

  beforeEach(inject(function ($rootScope, brewerDataService, mongolab, messaging, events) {
    rootScope = $rootScope;
    service = brewerDataService;
    db = mongolab;
    pubsub = messaging;
    constants = events;
  }));

  it('should request the full list of adjuncts', function () {
    spyOn(db, 'query').andCallThrough();

    service.getBrewers().then(function(){
      expect(db.query).toHaveBeenCalled();
    });

    var result = {
      data: [
        {
          "_id": {"$oid": "5362763ae4b02cb0bbd34134"},
          "UserName": "GP:115866653308487813475",
          "FirstName": "Jim",
          "LastName": "Lavin",
          "Email": "jim.lavin.tx@gmail.com",
          "Location": "Lewisville, TX 75067",
          "Bio": "Are you ready for a Smack Down!",
          "WebSite": "https://plus.google.com/+JimLavin",
          "Avatar": "https://lh5.googleusercontent.com/-OSUon8WUTso/AAAAAAAAAAI/AAAAAAAAAWI/E3wOoyvSg_8/photo.jpg?sz=50",
          "Photo": "https://lh5.googleusercontent.com/-OSUon8WUTso/AAAAAAAAAAI/AAAAAAAAAWI/E3wOoyvSg_8/photo.jpg?sz=50",
          "Password": "",
          "DateJoined": "2014-05-01T16:28:42.297Z",
          "Inventory": null,
          "BrewerIsAdmin": false
        },
        {
          "_id": {"$oid": "53d9aa79e4b0c0293197d9e6"},
          "UserName": "testuser",
          "FirstName": "Test",
          "LastName": "User",
          "Email": "test@nomail.com",
          "Location": "Lewisville, TX",
          "Bio": "Crazy Tech Guy",
          "WebSite": "http://codingsmackdown.tv",
          "Avatar": "",
          "Photo": "",
          "Password": "2ab5a7e0cc4eaaf706325db03236932f5a2bf7c9",
          "DateJoined": "2014-07-31T02:31:14.625Z",
          "Inventory": null,
          "BrewerIsAdmin": false
        },
        {
          "_id": {"$oid": "53d9ae05e4b0c20ee27509fa"},
          "UserName": "test123",
          "FirstName": "Test",
          "LastName": "User",
          "Email": "test123@nomail.com",
          "Location": "Lewisville, TX",
          "Bio": "Crazy Tech Guy",
          "WebSite": "http://codingsmackdown.tv",
          "Avatar": "",
          "Photo": "",
          "Password": "af5b81a178f545fa91dddb89a3a3a406cba7acef",
          "DateJoined": "2014-07-31T02:46:28.602Z",
          "Inventory": null,
          "BrewerIsAdmin": false
        }
      ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should send database and collection name when requesting the full list of adjuncts', function () {
    spyOn(db, 'query').andCallThrough();

    service.getBrewers().then(function(){
      expect(db.query).toHaveBeenCalled();
      expect(db.query).toHaveBeenCalledWith('brew_everywhere', 'brewers', []);
    });

    var result = {
      data: [
        {
          "_id": {"$oid": "5362763ae4b02cb0bbd34134"},
          "UserName": "GP:115866653308487813475",
          "FirstName": "Jim",
          "LastName": "Lavin",
          "Email": "jim.lavin.tx@gmail.com",
          "Location": "Lewisville, TX 75067",
          "Bio": "Are you ready for a Smack Down!",
          "WebSite": "https://plus.google.com/+JimLavin",
          "Avatar": "https://lh5.googleusercontent.com/-OSUon8WUTso/AAAAAAAAAAI/AAAAAAAAAWI/E3wOoyvSg_8/photo.jpg?sz=50",
          "Photo": "https://lh5.googleusercontent.com/-OSUon8WUTso/AAAAAAAAAAI/AAAAAAAAAWI/E3wOoyvSg_8/photo.jpg?sz=50",
          "Password": "",
          "DateJoined": "2014-05-01T16:28:42.297Z",
          "Inventory": null,
          "BrewerIsAdmin": false
        },
        {
          "_id": {"$oid": "53d9aa79e4b0c0293197d9e6"},
          "UserName": "testuser",
          "FirstName": "Test",
          "LastName": "User",
          "Email": "test@nomail.com",
          "Location": "Lewisville, TX",
          "Bio": "Crazy Tech Guy",
          "WebSite": "http://codingsmackdown.tv",
          "Avatar": "",
          "Photo": "",
          "Password": "2ab5a7e0cc4eaaf706325db03236932f5a2bf7c9",
          "DateJoined": "2014-07-31T02:31:14.625Z",
          "Inventory": null,
          "BrewerIsAdmin": false
        },
        {
          "_id": {"$oid": "53d9ae05e4b0c20ee27509fa"},
          "UserName": "test123",
          "FirstName": "Test",
          "LastName": "User",
          "Email": "test123@nomail.com",
          "Location": "Lewisville, TX",
          "Bio": "Crazy Tech Guy",
          "WebSite": "http://codingsmackdown.tv",
          "Avatar": "",
          "Photo": "",
          "Password": "af5b81a178f545fa91dddb89a3a3a406cba7acef",
          "DateJoined": "2014-07-31T02:46:28.602Z",
          "Inventory": null,
          "BrewerIsAdmin": false
        }
      ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _GET_BREWERS_COMPLETE_ after all adjuncts are received', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var result = {
      data: [
        {
          "_id": {"$oid": "5362763ae4b02cb0bbd34134"},
          "UserName": "GP:115866653308487",
          "FirstName": "Jim",
          "LastName": "Lavin",
          "Email": "jim.lavin.tx@gmail.com",
          "Location": "Lewisville, TX 75067",
          "Bio": "Are you ready for a Smack Down!",
          "WebSite": "https://plus.google.com/+JimLavin",
          "Avatar": "https://lh5.googleusercontent.com/-OSUon8WUTso/AAAAAAAAAAI/AAAAAAAAAWI/E3wOoyvSg_8/photo.jpg?sz=50",
          "Photo": "https://lh5.googleusercontent.com/-OSUon8WUTso/AAAAAAAAAAI/AAAAAAAAAWI/E3wOoyvSg_8/photo.jpg?sz=50",
          "Password": "",
          "DateJoined": "2014-05-01T16:28:42.297Z",
          "Inventory": null,
          "BrewerIsAdmin": false
        },
        {
          "_id": {"$oid": "53d9aa79e4b0c0293197d9e6"},
          "UserName": "testuser",
          "FirstName": "Test",
          "LastName": "User",
          "Email": "test@nomail.com",
          "Location": "Lewisville, TX",
          "Bio": "Crazy Tech Guy",
          "WebSite": "http://codingsmackdown.tv",
          "Avatar": "",
          "Photo": "",
          "Password": "2ab5a7e0cc4eaaf706325db03236932f5a2bf7c9",
          "DateJoined": "2014-07-31T02:31:14.625Z",
          "Inventory": null,
          "BrewerIsAdmin": false
        },
        {
          "_id": {"$oid": "53d9ae05e4b0c20ee27509fa"},
          "UserName": "test123",
          "FirstName": "Test",
          "LastName": "User",
          "Email": "test123@nomail.com",
          "Location": "Lewisville, TX",
          "Bio": "Crazy Tech Guy",
          "WebSite": "http://codingsmackdown.tv",
          "Avatar": "",
          "Photo": "",
          "Password": "af5b81a178f545fa91dddb89a3a3a406cba7acef",
          "DateJoined": "2014-07-31T02:46:28.602Z",
          "Inventory": null,
          "BrewerIsAdmin": false
        }
      ]
    };

    service.getBrewers().then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._GET_BREWERS_COMPLETE_, [result.data]);
    });

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _GET_BREWERS_FAILED_ when query request fails', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    service.getBrewers().then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._GET_BREWERS_FAILED_);
    });

    db.deferred.reject();

    rootScope.$digest();
  });

  it('should publish the message _ADD_ERROR_MESSAGE_ when query request fails', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    service.getBrewers().then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith('_ADD_ERROR_MESSAGE_', [ 'Unable to get brewers from server', 'alert.warning' ]);
    });

    db.deferred.reject();

    rootScope.$digest();
  });

  it('should request queryById when getBrewerById is called', function () {
    spyOn(db, 'queryById').andCallThrough();

    service.getBrewerById('123').then(function(){
      expect(db.queryById).toHaveBeenCalled();
    });

    var result = {
      data: [
        {
          "_id": {"$oid": "53d9ae05e4b0c20ee27509fa"},
          "UserName": "test123",
          "FirstName": "Test",
          "LastName": "User",
          "Email": "test123@nomail.com",
          "Location": "Lewisville, TX",
          "Bio": "Crazy Tech Guy",
          "WebSite": "http://codingsmackdown.tv",
          "Avatar": "",
          "Photo": "",
          "Password": "af5b81a178f545fa91dddb89a3a3a406cba7acef",
          "DateJoined": "2014-07-31T02:46:28.602Z",
          "Inventory": null,
          "BrewerIsAdmin": false
        }
      ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should send database and collection name and id when requesting queryById', function () {
    spyOn(db, 'queryById').andCallThrough();

    service.getBrewerById('123').then(function(){
      expect(db.queryById).toHaveBeenCalled();
      expect(db.queryById).toHaveBeenCalledWith('brew_everywhere', 'brewers', '123', []);
    });

    var result = {
      data: [
        {
          "_id": {"$oid": "53d9ae05e4b0c20ee27509fa"},
          "UserName": "test123",
          "FirstName": "Test",
          "LastName": "User",
          "Email": "test123@nomail.com",
          "Location": "Lewisville, TX",
          "Bio": "Crazy Tech Guy",
          "WebSite": "http://codingsmackdown.tv",
          "Avatar": "",
          "Photo": "",
          "Password": "af5b81a178f545fa91dddb89a3a3a406cba7acef",
          "DateJoined": "2014-07-31T02:46:28.602Z",
          "Inventory": null,
          "BrewerIsAdmin": false
        }
      ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _GET_BREWER_BY_ID_COMPLETE_ when queryById succeeds', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var result = {
      data: [
        {
          "_id": {"$oid": "53d9ae05e4b0c20ee27509fa"},
          "UserName": "test123",
          "FirstName": "Test",
          "LastName": "User",
          "Email": "test123@nomail.com",
          "Location": "Lewisville, TX",
          "Bio": "Crazy Tech Guy",
          "WebSite": "http://codingsmackdown.tv",
          "Avatar": "",
          "Photo": "",
          "Password": "af5b81a178f545fa91dddb89a3a3a406cba7acef",
          "DateJoined": "2014-07-31T02:46:28.602Z",
          "Inventory": null,
          "BrewerIsAdmin": false
        }
      ]
    };

    service.getBrewerById('123').then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._GET_BREWER_BY_ID_COMPLETE_, [result.data]);
    });

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _GET_BREWER_BY_ID_FAILED_ when queryByID request fails', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    service.getBrewerById('123').then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._GET_BREWER_BY_ID_FAILED_);
    });

    db.deferred.reject();

    rootScope.$digest();
  });

  it('should publish the message _ADD_ERROR_MESSAGE_ when queryById request fails', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    service.getBrewerById('123').then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith('_ADD_ERROR_MESSAGE_', [ 'Unable to get brewer by id from server', 'alert.warning' ]);
    });

    db.deferred.reject();

    rootScope.$digest();
  });

  it('should request create when createBrewer is called', function () {
    spyOn(db, 'create').andCallThrough();

    var brewer = {
        "_id": {"$oid": "53d9ae05e4b0c20ee27509fa"},
        "UserName": "test123",
        "FirstName": "Test",
        "LastName": "User",
        "Email": "test123@nomail.com",
        "Location": "Lewisville, TX",
        "Bio": "Crazy Tech Guy",
        "WebSite": "http://codingsmackdown.tv",
        "Avatar": "",
        "Photo": "",
        "Password": "af5b81a178f545fa91dddb89a3a3a406cba7acef",
        "DateJoined": "2014-07-31T02:46:28.602Z",
        "Inventory": null,
        "BrewerIsAdmin": false
      };

    service.createBrewer(brewer).then(function(){
      expect(db.create).toHaveBeenCalled();
    });

    var result = {
      data: [ brewer ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should send database and collection name and object when requesting create', function () {
    spyOn(db, 'create').andCallThrough();

    var brewer = {
      "_id": {"$oid": "53d9ae05e4b0c20ee27509fa"},
      "UserName": "test123",
      "FirstName": "Test",
      "LastName": "User",
      "Email": "test123@nomail.com",
      "Location": "Lewisville, TX",
      "Bio": "Crazy Tech Guy",
      "WebSite": "http://codingsmackdown.tv",
      "Avatar": "",
      "Photo": "",
      "Password": "af5b81a178f545fa91dddb89a3a3a406cba7acef",
      "DateJoined": "2014-07-31T02:46:28.602Z",
      "Inventory": null,
      "BrewerIsAdmin": false
    };

    service.createBrewer(brewer).then(function(){
      expect(db.create).toHaveBeenCalled();
      expect(db.create).toHaveBeenCalledWith('brew_everywhere', 'brewers', brewer);
    });

    var result = {
      data: [ brewer ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _CREATE_BREWER_COMPLETE_ when create succeeds', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var brewer = {
      "_id": {"$oid": "53d9ae05e4b0c20ee27509fa"},
      "UserName": "test123",
      "FirstName": "Test",
      "LastName": "User",
      "Email": "test123@nomail.com",
      "Location": "Lewisville, TX",
      "Bio": "Crazy Tech Guy",
      "WebSite": "http://codingsmackdown.tv",
      "Avatar": "",
      "Photo": "",
      "Password": "af5b81a178f545fa91dddb89a3a3a406cba7acef",
      "DateJoined": "2014-07-31T02:46:28.602Z",
      "Inventory": null,
      "BrewerIsAdmin": false
    };

    service.createBrewer(brewer).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._CREATE_BREWER_COMPLETE_, [result.data]);
    });

    var result = {
      data: [ brewer ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _CREATE_BREWER_FAILED_ when create request fails', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var brewer = {
      "_id": {"$oid": "53d9ae05e4b0c20ee27509fa"},
      "UserName": "test123",
      "FirstName": "Test",
      "LastName": "User",
      "Email": "test123@nomail.com",
      "Location": "Lewisville, TX",
      "Bio": "Crazy Tech Guy",
      "WebSite": "http://codingsmackdown.tv",
      "Avatar": "",
      "Photo": "",
      "Password": "af5b81a178f545fa91dddb89a3a3a406cba7acef",
      "DateJoined": "2014-07-31T02:46:28.602Z",
      "Inventory": null,
      "BrewerIsAdmin": false
    };

    service.createBrewer(brewer).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._CREATE_BREWER_FAILED_);
    });

    db.deferred.reject();

    rootScope.$digest();
  });

  it('should publish the message _ADD_ERROR_MESSAGE_ when create request fails', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var brewer = {
      "_id": {"$oid": "53d9ae05e4b0c20ee27509fa"},
      "UserName": "test123",
      "FirstName": "Test",
      "LastName": "User",
      "Email": "test123@nomail.com",
      "Location": "Lewisville, TX",
      "Bio": "Crazy Tech Guy",
      "WebSite": "http://codingsmackdown.tv",
      "Avatar": "",
      "Photo": "",
      "Password": "af5b81a178f545fa91dddb89a3a3a406cba7acef",
      "DateJoined": "2014-07-31T02:46:28.602Z",
      "Inventory": null,
      "BrewerIsAdmin": false
    };

    service.createBrewer(brewer).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith('_ADD_ERROR_MESSAGE_', [ 'Unable to create brewer', 'alert.warning' ]);
    });

    db.deferred.reject();

    rootScope.$digest();
  });

  it('should request update when updateBrewer is called', function () {
    spyOn(db, 'update').andCallThrough();

    var brewer = {
      "_id": {"$oid": "53d9ae05e4b0c20ee27509fa"},
      "UserName": "test123",
      "FirstName": "Test",
      "LastName": "User",
      "Email": "test123@nomail.com",
      "Location": "Lewisville, TX",
      "Bio": "Crazy Tech Guy",
      "WebSite": "http://codingsmackdown.tv",
      "Avatar": "",
      "Photo": "",
      "Password": "af5b81a178f545fa91dddb89a3a3a406cba7acef",
      "DateJoined": "2014-07-31T02:46:28.602Z",
      "Inventory": null,
      "BrewerIsAdmin": false
    };

    service.updateBrewer(brewer).then(function(){
      expect(db.update).toHaveBeenCalled();
    });

    var result = {
      data: [ brewer ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should send database and collection name and object when requesting update', function () {
    spyOn(db, 'update').andCallThrough();

    var brewer = {
      "_id": {"$oid": "53d9ae05e4b0c20ee27509fa"},
      "UserName": "test123",
      "FirstName": "Test",
      "LastName": "User",
      "Email": "test123@nomail.com",
      "Location": "Lewisville, TX",
      "Bio": "Crazy Tech Guy",
      "WebSite": "http://codingsmackdown.tv",
      "Avatar": "",
      "Photo": "",
      "Password": "af5b81a178f545fa91dddb89a3a3a406cba7acef",
      "DateJoined": "2014-07-31T02:46:28.602Z",
      "Inventory": null,
      "BrewerIsAdmin": false
    };

    service.updateBrewer(brewer).then(function(){
      expect(db.update).toHaveBeenCalled();
      expect(db.update).toHaveBeenCalledWith('brew_everywhere', 'brewers', brewer);
    });

    var result = {
      data: [ brewer ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _UPDATE_BREWER_COMPLETE_ when update succeeds', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var brewer = {
      "_id": {"$oid": "53d9ae05e4b0c20ee27509fa"},
      "UserName": "test123",
      "FirstName": "Test",
      "LastName": "User",
      "Email": "test123@nomail.com",
      "Location": "Lewisville, TX",
      "Bio": "Crazy Tech Guy",
      "WebSite": "http://codingsmackdown.tv",
      "Avatar": "",
      "Photo": "",
      "Password": "af5b81a178f545fa91dddb89a3a3a406cba7acef",
      "DateJoined": "2014-07-31T02:46:28.602Z",
      "Inventory": null,
      "BrewerIsAdmin": false
    };

    service.updateBrewer(brewer).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._UPDATE_BREWER_COMPLETE_, [result.data]);
    });

    var result = {
      data: [ brewer ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _UPDATE_BREWER_FAILED_ when update request fails', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var brewer = {
      "_id": {"$oid": "53d9ae05e4b0c20ee27509fa"},
      "UserName": "test123",
      "FirstName": "Test",
      "LastName": "User",
      "Email": "test123@nomail.com",
      "Location": "Lewisville, TX",
      "Bio": "Crazy Tech Guy",
      "WebSite": "http://codingsmackdown.tv",
      "Avatar": "",
      "Photo": "",
      "Password": "af5b81a178f545fa91dddb89a3a3a406cba7acef",
      "DateJoined": "2014-07-31T02:46:28.602Z",
      "Inventory": null,
      "BrewerIsAdmin": false
    };

    service.updateBrewer(brewer).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._UPDATE_BREWER_FAILED_);
    });

    db.deferred.reject();

    rootScope.$digest();
  });

  it('should publish the message _ADD_ERROR_MESSAGE_ when update request fails', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var brewer = {
      "_id": {"$oid": "53d9ae05e4b0c20ee27509fa"},
      "UserName": "test123",
      "FirstName": "Test",
      "LastName": "User",
      "Email": "test123@nomail.com",
      "Location": "Lewisville, TX",
      "Bio": "Crazy Tech Guy",
      "WebSite": "http://codingsmackdown.tv",
      "Avatar": "",
      "Photo": "",
      "Password": "af5b81a178f545fa91dddb89a3a3a406cba7acef",
      "DateJoined": "2014-07-31T02:46:28.602Z",
      "Inventory": null,
      "BrewerIsAdmin": false
    };

    service.updateBrewer(brewer).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith('_ADD_ERROR_MESSAGE_', [ 'Unable to update brewer', 'alert.warning' ]);
    });

    db.deferred.reject();

    rootScope.$digest();
  });

  it('should request delete when deleteBrewer is called', function () {
    spyOn(db, 'delete').andCallThrough();

    var brewer = {
      "_id": {"$oid": "53d9ae05e4b0c20ee27509fa"},
      "UserName": "test123",
      "FirstName": "Test",
      "LastName": "User",
      "Email": "test123@nomail.com",
      "Location": "Lewisville, TX",
      "Bio": "Crazy Tech Guy",
      "WebSite": "http://codingsmackdown.tv",
      "Avatar": "",
      "Photo": "",
      "Password": "af5b81a178f545fa91dddb89a3a3a406cba7acef",
      "DateJoined": "2014-07-31T02:46:28.602Z",
      "Inventory": null,
      "BrewerIsAdmin": false
    };

    service.deleteBrewer(brewer).then(function(){
      expect(db.delete).toHaveBeenCalled();
    });

    var result = {
      data: [ brewer ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should send database and collection name and object when requesting delete', function () {
    spyOn(db, 'delete').andCallThrough();

    var brewer = {
      "_id": {"$oid": "53d9ae05e4b0c20ee27509fa"},
      "UserName": "test123",
      "FirstName": "Test",
      "LastName": "User",
      "Email": "test123@nomail.com",
      "Location": "Lewisville, TX",
      "Bio": "Crazy Tech Guy",
      "WebSite": "http://codingsmackdown.tv",
      "Avatar": "",
      "Photo": "",
      "Password": "af5b81a178f545fa91dddb89a3a3a406cba7acef",
      "DateJoined": "2014-07-31T02:46:28.602Z",
      "Inventory": null,
      "BrewerIsAdmin": false
    };

    service.deleteBrewer(brewer).then(function(){
      expect(db.delete).toHaveBeenCalled();
      expect(db.delete).toHaveBeenCalledWith('brew_everywhere', 'brewers', brewer);
    });

    var result = {
      data: [ brewer ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _DELETE_BREWER_COMPLETE_ when delete succeeds', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var brewer = {
      "_id": {"$oid": "53d9ae05e4b0c20ee27509fa"},
      "UserName": "test123",
      "FirstName": "Test",
      "LastName": "User",
      "Email": "test123@nomail.com",
      "Location": "Lewisville, TX",
      "Bio": "Crazy Tech Guy",
      "WebSite": "http://codingsmackdown.tv",
      "Avatar": "",
      "Photo": "",
      "Password": "af5b81a178f545fa91dddb89a3a3a406cba7acef",
      "DateJoined": "2014-07-31T02:46:28.602Z",
      "Inventory": null,
      "BrewerIsAdmin": false
    };

    service.deleteBrewer(brewer).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._DELETE_BREWER_COMPLETE_);
    });

    var result = {
      status: 200
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _DELETE_BREWER_FAILED_ if status code is not 200', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var brewer = {
      "_id": {"$oid": "53d9ae05e4b0c20ee27509fa"},
      "UserName": "test123",
      "FirstName": "Test",
      "LastName": "User",
      "Email": "test123@nomail.com",
      "Location": "Lewisville, TX",
      "Bio": "Crazy Tech Guy",
      "WebSite": "http://codingsmackdown.tv",
      "Avatar": "",
      "Photo": "",
      "Password": "af5b81a178f545fa91dddb89a3a3a406cba7acef",
      "DateJoined": "2014-07-31T02:46:28.602Z",
      "Inventory": null,
      "BrewerIsAdmin": false
    };

    service.deleteBrewer(brewer).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._DELETE_BREWER_FAILED_);
    });

    var result = {
      status: 400
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _ADD_ERROR_MESSAGE_ if status code is not 200', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var brewer = {
      "_id": {"$oid": "53d9ae05e4b0c20ee27509fa"},
      "UserName": "test123",
      "FirstName": "Test",
      "LastName": "User",
      "Email": "test123@nomail.com",
      "Location": "Lewisville, TX",
      "Bio": "Crazy Tech Guy",
      "WebSite": "http://codingsmackdown.tv",
      "Avatar": "",
      "Photo": "",
      "Password": "af5b81a178f545fa91dddb89a3a3a406cba7acef",
      "DateJoined": "2014-07-31T02:46:28.602Z",
      "Inventory": null,
      "BrewerIsAdmin": false
    };

    service.deleteBrewer(brewer).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith('_ADD_ERROR_MESSAGE_', [ 'Unable to delete brewer', 'alert.warning' ]);
    });

    var result = {
      status: 400
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _DELETE_BREWER_FAILED_ when delete request fails', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var brewer = {
      "_id": {"$oid": "53d9ae05e4b0c20ee27509fa"},
      "UserName": "test123",
      "FirstName": "Test",
      "LastName": "User",
      "Email": "test123@nomail.com",
      "Location": "Lewisville, TX",
      "Bio": "Crazy Tech Guy",
      "WebSite": "http://codingsmackdown.tv",
      "Avatar": "",
      "Photo": "",
      "Password": "af5b81a178f545fa91dddb89a3a3a406cba7acef",
      "DateJoined": "2014-07-31T02:46:28.602Z",
      "Inventory": null,
      "BrewerIsAdmin": false
    };

    service.deleteBrewer(brewer).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._DELETE_BREWER_FAILED_);
    });

    db.deferred.reject();

    rootScope.$digest();
  });

  it('should publish the message _ADD_ERROR_MESSAGE_ when delete request fails', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var brewer = {
      "_id": {"$oid": "53d9ae05e4b0c20ee27509fa"},
      "UserName": "test123",
      "FirstName": "Test",
      "LastName": "User",
      "Email": "test123@nomail.com",
      "Location": "Lewisville, TX",
      "Bio": "Crazy Tech Guy",
      "WebSite": "http://codingsmackdown.tv",
      "Avatar": "",
      "Photo": "",
      "Password": "af5b81a178f545fa91dddb89a3a3a406cba7acef",
      "DateJoined": "2014-07-31T02:46:28.602Z",
      "Inventory": null,
      "BrewerIsAdmin": false
    };

    service.deleteBrewer(brewer).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith('_ADD_ERROR_MESSAGE_', [ 'Unable to delete brewer', 'alert.warning' ]);
    });

    db.deferred.reject();

    rootScope.$digest();
  });
});