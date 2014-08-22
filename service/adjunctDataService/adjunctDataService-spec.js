describe('adjunctDataService', function () {
  var rootScope = null;
  var service = null;
  var db = null;
  var pubsub = null;
  var constants = null;

  beforeEach(module('brew-everywhere'));
  beforeEach(module('test.messaging'));
  beforeEach(module('test.mongolab'));

  beforeEach(inject(function ($rootScope, $q, adjunctDataService, mongolab, messaging, events) {
    rootScope = $rootScope;
    service = adjunctDataService;
    db = mongolab;
    pubsub = messaging;
    constants = events;
  }));

  it('should request the full list of adjuncts', function () {
    spyOn(db, 'query').andCallThrough();

    service.getAdjuncts().then(function(){
      expect(db.query).toHaveBeenCalled();
    });

    var result = {
      data: [
        {  "Name": "Amylase Enzyme", "Type": "Other", "Use": "Primary", "Amount": 0.002464, "Time": 4320.000, "AmountIsWeight": false, "UseFor": "Fermentation", "Notes": "Enhances fermentation and lowers final gravity by breaking down complex starches.  Produces light bodied, high alcohol beers.  Add when pitching yeast." },
        {  "Name": "Anise, Star", "Type": "Spice", "Use": "Boil", "Amount": 0.073934, "Time": 30.000, "AmountIsWeight": false, "UseFor": "Licorice flavor", "Notes": "Star Anise spice adds a strong black licorice flavor to holiday and specialty beers.  Boil for 30 minutes to extract flavor." },
        {  "Name": "Apple Extract", "Type": "Flavor", "Use": "Bottling", "Amount": 0.192229, "Time": 5.000, "AmountIsWeight": false, "UseFor": "Fruit Beer", "Notes": "Apple flavor extract.  Mix into beer just before bottling.  Adds Apple flavor to light ales and wheat beers.  Use low hop rate to allow sweet flavor through." },
        {  "Name": "Apricot Extract", "Type": "Flavor", "Use": "Bottling", "Amount": 0.192229, "Time": 5.000, "AmountIsWeight": false, "UseFor": "Fruit Beer", "Notes": "Apricot flavor extract.  Mix into beer just before bottling.  Adds apricot flavor to light ales and wheat beers.  Use low hop rate to allow sweet flavor through." },
        {  "Name": "Ascorbic Acid", "Type": "Other", "Use": "Bottling", "Amount": 0.029574, "Time": 5.000, "AmountIsWeight": false, "UseFor": "Preservative", "Notes": "This is Vitimin C.  Adding at bottling time to wine and soda as a preservative.  Not recommended for beer due to the off flavors it might add." }
      ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should send database and collection name when requesting the full list of adjuncts', function () {
    spyOn(db, 'query').andCallThrough();

    service.getAdjuncts().then(function(){
      expect(db.query).toHaveBeenCalled();
      expect(db.query).toHaveBeenCalledWith('brew_everywhere', 'adjuncts', []);
    });

    var result = {
      data: [
        {  "Name": "Amylase Enzyme", "Type": "Other", "Use": "Primary", "Amount": 0.002464, "Time": 4320.000, "AmountIsWeight": false, "UseFor": "Fermentation", "Notes": "Enhances fermentation and lowers final gravity by breaking down complex starches.  Produces light bodied, high alcohol beers.  Add when pitching yeast." },
        {  "Name": "Anise, Star", "Type": "Spice", "Use": "Boil", "Amount": 0.073934, "Time": 30.000, "AmountIsWeight": false, "UseFor": "Licorice flavor", "Notes": "Star Anise spice adds a strong black licorice flavor to holiday and specialty beers.  Boil for 30 minutes to extract flavor." },
        {  "Name": "Apple Extract", "Type": "Flavor", "Use": "Bottling", "Amount": 0.192229, "Time": 5.000, "AmountIsWeight": false, "UseFor": "Fruit Beer", "Notes": "Apple flavor extract.  Mix into beer just before bottling.  Adds Apple flavor to light ales and wheat beers.  Use low hop rate to allow sweet flavor through." },
        {  "Name": "Apricot Extract", "Type": "Flavor", "Use": "Bottling", "Amount": 0.192229, "Time": 5.000, "AmountIsWeight": false, "UseFor": "Fruit Beer", "Notes": "Apricot flavor extract.  Mix into beer just before bottling.  Adds apricot flavor to light ales and wheat beers.  Use low hop rate to allow sweet flavor through." },
        {  "Name": "Ascorbic Acid", "Type": "Other", "Use": "Bottling", "Amount": 0.029574, "Time": 5.000, "AmountIsWeight": false, "UseFor": "Preservative", "Notes": "This is Vitimin C.  Adding at bottling time to wine and soda as a preservative.  Not recommended for beer due to the off flavors it might add." }
      ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _GET_ADJUNCTS_COMPLETE_ after all adjuncts are received', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var result = {
      data: [
        {  "Name": "Amylase Enzyme", "Type": "Other", "Use": "Primary", "Amount": 0.002464, "Time": 4320.000, "AmountIsWeight": false, "UseFor": "Fermentation", "Notes": "Enhances fermentation and lowers final gravity by breaking down complex starches.  Produces light bodied, high alcohol beers.  Add when pitching yeast." },
        {  "Name": "Anise, Star", "Type": "Spice", "Use": "Boil", "Amount": 0.073934, "Time": 30.000, "AmountIsWeight": false, "UseFor": "Licorice flavor", "Notes": "Star Anise spice adds a strong black licorice flavor to holiday and specialty beers.  Boil for 30 minutes to extract flavor." },
        {  "Name": "Apple Extract", "Type": "Flavor", "Use": "Bottling", "Amount": 0.192229, "Time": 5.000, "AmountIsWeight": false, "UseFor": "Fruit Beer", "Notes": "Apple flavor extract.  Mix into beer just before bottling.  Adds Apple flavor to light ales and wheat beers.  Use low hop rate to allow sweet flavor through." },
        {  "Name": "Apricot Extract", "Type": "Flavor", "Use": "Bottling", "Amount": 0.192229, "Time": 5.000, "AmountIsWeight": false, "UseFor": "Fruit Beer", "Notes": "Apricot flavor extract.  Mix into beer just before bottling.  Adds apricot flavor to light ales and wheat beers.  Use low hop rate to allow sweet flavor through." },
        {  "Name": "Ascorbic Acid", "Type": "Other", "Use": "Bottling", "Amount": 0.029574, "Time": 5.000, "AmountIsWeight": false, "UseFor": "Preservative", "Notes": "This is Vitimin C.  Adding at bottling time to wine and soda as a preservative.  Not recommended for beer due to the off flavors it might add." }
      ]
    };

    service.getAdjuncts().then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._GET_ADJUNCTS_COMPLETE_, [result.data]);
    });

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _GET_ADJUNCTS_FAILED_ when query request fails', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    service.getAdjuncts().then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._GET_ADJUNCTS_FAILED_);
    });

    db.deferred.reject();

    rootScope.$digest();
  });

  it('should publish the message _ADD_ERROR_MESSAGE_ when query request fails', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    service.getAdjuncts().then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith('_ADD_ERROR_MESSAGE_', [ 'Unable to get adjuncts from server', 'alert.warning' ]);
    });

    db.deferred.reject();

    rootScope.$digest();
  });

  it('should request queryById when getAdjunctById is called', function () {
    spyOn(db, 'queryById').andCallThrough();

    service.getAdjunctById('123').then(function(){
      expect(db.queryById).toHaveBeenCalled();
    });

    var result = {
      data: [
        {  "Name": "Amylase Enzyme", "Type": "Other", "Use": "Primary", "Amount": 0.002464, "Time": 4320.000, "AmountIsWeight": false, "UseFor": "Fermentation", "Notes": "Enhances fermentation and lowers final gravity by breaking down complex starches.  Produces light bodied, high alcohol beers.  Add when pitching yeast." }
      ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should send database and collection name and id when requesting queryById', function () {
    spyOn(db, 'queryById').andCallThrough();

    service.getAdjunctById('123').then(function(){
      expect(db.queryById).toHaveBeenCalled();
      expect(db.queryById).toHaveBeenCalledWith('brew_everywhere', 'adjuncts', '123', []);
    });

    var result = {
      data: [
        {  "Name": "Amylase Enzyme", "Type": "Other", "Use": "Primary", "Amount": 0.002464, "Time": 4320.000, "AmountIsWeight": false, "UseFor": "Fermentation", "Notes": "Enhances fermentation and lowers final gravity by breaking down complex starches.  Produces light bodied, high alcohol beers.  Add when pitching yeast." }
      ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _GET_ADJUNCT_BY_ID_COMPLETE_ when queryById succeeds', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var result = {
      data: [
        {  "Name": "Amylase Enzyme", "Type": "Other", "Use": "Primary", "Amount": 0.002464, "Time": 4320.000, "AmountIsWeight": false, "UseFor": "Fermentation", "Notes": "Enhances fermentation and lowers final gravity by breaking down complex starches.  Produces light bodied, high alcohol beers.  Add when pitching yeast." }
      ]
    };

    service.getAdjunctById('123').then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._GET_ADJUNCT_BY_ID_COMPLETE_, [result.data]);
    });

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _GET_ADJUNCT_BY_ID_FAILED_ when queryByID request fails', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    service.getAdjunctById('123').then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._GET_ADJUNCT_BY_ID_FAILED_);
    });

    db.deferred.reject();

    rootScope.$digest();
  });

  it('should publish the message _ADD_ERROR_MESSAGE_ when queryById request fails', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    service.getAdjunctById('123').then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith('_ADD_ERROR_MESSAGE_', [ 'Unable to get adjunct by id from server', 'alert.warning' ]);
    });

    db.deferred.reject();

    rootScope.$digest();
  });

  it('should request create when createAdjunct is called', function () {
    spyOn(db, 'create').andCallThrough();

    var adjunct = {  "Name": "Amylase Enzyme", "Type": "Other", "Use": "Primary", "Amount": 0.002464, "Time": 4320.000, "AmountIsWeight": false, "UseFor": "Fermentation", "Notes": "Enhances fermentation and lowers final gravity by breaking down complex starches.  Produces light bodied, high alcohol beers.  Add when pitching yeast." };

    service.createAdjunct(adjunct).then(function(){
      expect(db.create).toHaveBeenCalled();
    });

    var result = {
      data: [ adjunct ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should send database and collection name and object when requesting create', function () {
    spyOn(db, 'create').andCallThrough();

    var adjunct = {  "Name": "Amylase Enzyme", "Type": "Other", "Use": "Primary", "Amount": 0.002464, "Time": 4320.000, "AmountIsWeight": false, "UseFor": "Fermentation", "Notes": "Enhances fermentation and lowers final gravity by breaking down complex starches.  Produces light bodied, high alcohol beers.  Add when pitching yeast." };

    service.createAdjunct(adjunct).then(function(){
      expect(db.create).toHaveBeenCalled();
      expect(db.create).toHaveBeenCalledWith('brew_everywhere', 'adjuncts', adjunct);
    });

    var result = {
      data: [ adjunct ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _CREATE_ADJUNCT_COMPLETE_ when create succeeds', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var adjunct = {  "Name": "Amylase Enzyme", "Type": "Other", "Use": "Primary", "Amount": 0.002464, "Time": 4320.000, "AmountIsWeight": false, "UseFor": "Fermentation", "Notes": "Enhances fermentation and lowers final gravity by breaking down complex starches.  Produces light bodied, high alcohol beers.  Add when pitching yeast." };

    service.createAdjunct(adjunct).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._CREATE_ADJUNCT_COMPLETE_, [result.data]);
    });

    var result = {
      data: [ adjunct ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _CREATE_ADJUNCT_FAILED_ when create request fails', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var adjunct = {  "Name": "Amylase Enzyme", "Type": "Other", "Use": "Primary", "Amount": 0.002464, "Time": 4320.000, "AmountIsWeight": false, "UseFor": "Fermentation", "Notes": "Enhances fermentation and lowers final gravity by breaking down complex starches.  Produces light bodied, high alcohol beers.  Add when pitching yeast." };

    service.createAdjunct(adjunct).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._CREATE_ADJUNCT_FAILED_);
    });

    db.deferred.reject();

    rootScope.$digest();
  });

  it('should publish the message _ADD_ERROR_MESSAGE_ when create request fails', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var adjunct = {  "Name": "Amylase Enzyme", "Type": "Other", "Use": "Primary", "Amount": 0.002464, "Time": 4320.000, "AmountIsWeight": false, "UseFor": "Fermentation", "Notes": "Enhances fermentation and lowers final gravity by breaking down complex starches.  Produces light bodied, high alcohol beers.  Add when pitching yeast." };

    service.createAdjunct(adjunct).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith('_ADD_ERROR_MESSAGE_', [ 'Unable to create adjunct', 'alert.warning' ]);
    });

    db.deferred.reject();

    rootScope.$digest();
  });

  it('should request update when updateAdjunct is called', function () {
    spyOn(db, 'update').andCallThrough();

    var adjunct = {  "Name": "Amylase Enzyme", "Type": "Other", "Use": "Primary", "Amount": 0.002464, "Time": 4320.000, "AmountIsWeight": false, "UseFor": "Fermentation", "Notes": "Enhances fermentation and lowers final gravity by breaking down complex starches.  Produces light bodied, high alcohol beers.  Add when pitching yeast." };

    service.updateAdjunct(adjunct).then(function(){
      expect(db.update).toHaveBeenCalled();
    });

    var result = {
      data: [ adjunct ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should send database and collection name and object when requesting update', function () {
    spyOn(db, 'update').andCallThrough();

    var adjunct = {  "Name": "Amylase Enzyme", "Type": "Other", "Use": "Primary", "Amount": 0.002464, "Time": 4320.000, "AmountIsWeight": false, "UseFor": "Fermentation", "Notes": "Enhances fermentation and lowers final gravity by breaking down complex starches.  Produces light bodied, high alcohol beers.  Add when pitching yeast." };

    service.updateAdjunct(adjunct).then(function(){
      expect(db.update).toHaveBeenCalled();
      expect(db.update).toHaveBeenCalledWith('brew_everywhere', 'adjuncts', adjunct);
    });

    var result = {
      data: [ adjunct ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _UPDATE_ADJUNCT_COMPLETE_ when update succeeds', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var adjunct = {  "Name": "Amylase Enzyme", "Type": "Other", "Use": "Primary", "Amount": 0.002464, "Time": 4320.000, "AmountIsWeight": false, "UseFor": "Fermentation", "Notes": "Enhances fermentation and lowers final gravity by breaking down complex starches.  Produces light bodied, high alcohol beers.  Add when pitching yeast." };

    service.updateAdjunct(adjunct).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._UPDATE_ADJUNCT_COMPLETE_, [result.data]);
    });

    var result = {
      data: [ adjunct ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _UPDATE_ADJUNCT_FAILED_ when update request fails', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var adjunct = {  "Name": "Amylase Enzyme", "Type": "Other", "Use": "Primary", "Amount": 0.002464, "Time": 4320.000, "AmountIsWeight": false, "UseFor": "Fermentation", "Notes": "Enhances fermentation and lowers final gravity by breaking down complex starches.  Produces light bodied, high alcohol beers.  Add when pitching yeast." };

    service.updateAdjunct(adjunct).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._UPDATE_ADJUNCT_FAILED_);
    });

    db.deferred.reject();

    rootScope.$digest();
  });

  it('should publish the message _ADD_ERROR_MESSAGE_ when update request fails', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var adjunct = {  "Name": "Amylase Enzyme", "Type": "Other", "Use": "Primary", "Amount": 0.002464, "Time": 4320.000, "AmountIsWeight": false, "UseFor": "Fermentation", "Notes": "Enhances fermentation and lowers final gravity by breaking down complex starches.  Produces light bodied, high alcohol beers.  Add when pitching yeast." };

    service.updateAdjunct(adjunct).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith('_ADD_ERROR_MESSAGE_', [ 'Unable to update adjunct', 'alert.warning' ]);
    });

    db.deferred.reject();

    rootScope.$digest();
  });

  it('should request delete when deleteAdjunct is called', function () {
    spyOn(db, 'delete').andCallThrough();

    var adjunct = {  "Name": "Amylase Enzyme", "Type": "Other", "Use": "Primary", "Amount": 0.002464, "Time": 4320.000, "AmountIsWeight": false, "UseFor": "Fermentation", "Notes": "Enhances fermentation and lowers final gravity by breaking down complex starches.  Produces light bodied, high alcohol beers.  Add when pitching yeast." };

    service.deleteAdjunct(adjunct).then(function(){
      expect(db.delete).toHaveBeenCalled();
    });

    var result = {
      data: [ adjunct ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should send database and collection name and object when requesting delete', function () {
    spyOn(db, 'delete').andCallThrough();

    var adjunct = {  "Name": "Amylase Enzyme", "Type": "Other", "Use": "Primary", "Amount": 0.002464, "Time": 4320.000, "AmountIsWeight": false, "UseFor": "Fermentation", "Notes": "Enhances fermentation and lowers final gravity by breaking down complex starches.  Produces light bodied, high alcohol beers.  Add when pitching yeast." };

    service.deleteAdjunct(adjunct).then(function(){
      expect(db.delete).toHaveBeenCalled();
      expect(db.delete).toHaveBeenCalledWith('brew_everywhere', 'adjuncts', adjunct);
    });

    var result = {
      data: [ adjunct ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _DELETE_ADJUNCT_COMPLETE_ when delete succeeds', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var adjunct = {  "Name": "Amylase Enzyme", "Type": "Other", "Use": "Primary", "Amount": 0.002464, "Time": 4320.000, "AmountIsWeight": false, "UseFor": "Fermentation", "Notes": "Enhances fermentation and lowers final gravity by breaking down complex starches.  Produces light bodied, high alcohol beers.  Add when pitching yeast." };

    service.deleteAdjunct(adjunct).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._DELETE_ADJUNCT_COMPLETE_);
    });

    var result = {
      status: 200
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _DELETE_ADJUNCT_FAILED_ if status code is not 200', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var adjunct = {  "Name": "Amylase Enzyme", "Type": "Other", "Use": "Primary", "Amount": 0.002464, "Time": 4320.000, "AmountIsWeight": false, "UseFor": "Fermentation", "Notes": "Enhances fermentation and lowers final gravity by breaking down complex starches.  Produces light bodied, high alcohol beers.  Add when pitching yeast." };

    service.deleteAdjunct(adjunct).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._DELETE_ADJUNCT_FAILED_);
    });

    var result = {
      status: 400
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _ADD_ERROR_MESSAGE_ if status code is not 200', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var adjunct = {  "Name": "Amylase Enzyme", "Type": "Other", "Use": "Primary", "Amount": 0.002464, "Time": 4320.000, "AmountIsWeight": false, "UseFor": "Fermentation", "Notes": "Enhances fermentation and lowers final gravity by breaking down complex starches.  Produces light bodied, high alcohol beers.  Add when pitching yeast." };

    service.deleteAdjunct(adjunct).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith('_ADD_ERROR_MESSAGE_', [ 'Unable to delete adjunct', 'alert.warning' ]);
    });

    var result = {
      status: 400
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _DELETE_ADJUNCT_FAILED_ when delete request fails', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var adjunct = {  "Name": "Amylase Enzyme", "Type": "Other", "Use": "Primary", "Amount": 0.002464, "Time": 4320.000, "AmountIsWeight": false, "UseFor": "Fermentation", "Notes": "Enhances fermentation and lowers final gravity by breaking down complex starches.  Produces light bodied, high alcohol beers.  Add when pitching yeast." };

    service.deleteAdjunct(adjunct).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._DELETE_ADJUNCT_FAILED_);
    });

    db.deferred.reject();

    rootScope.$digest();
  });

  it('should publish the message _ADD_ERROR_MESSAGE_ when delete request fails', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var adjunct = {  "Name": "Amylase Enzyme", "Type": "Other", "Use": "Primary", "Amount": 0.002464, "Time": 4320.000, "AmountIsWeight": false, "UseFor": "Fermentation", "Notes": "Enhances fermentation and lowers final gravity by breaking down complex starches.  Produces light bodied, high alcohol beers.  Add when pitching yeast." };

    service.deleteAdjunct(adjunct).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith('_ADD_ERROR_MESSAGE_', [ 'Unable to delete adjunct', 'alert.warning' ]);
    });

    db.deferred.reject();

    rootScope.$digest();
  });


});