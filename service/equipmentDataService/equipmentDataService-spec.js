describe('equipmentDataService', function() {
  var rootScope = null;
  var service = null;
  var db = null;
  var pubsub = null;
  var constants = null;

  beforeEach(module('brew-everywhere'));
  beforeEach(module('test.messaging'));
  beforeEach(module('test.mongolab'));

  beforeEach(inject(function ($rootScope, $q, equipmentDataService, mongolab, messaging, events) {
    rootScope = $rootScope;
    service = equipmentDataService;
    db = mongolab;
    pubsub = messaging;
    constants = events;
  }));

  it('should request the full list of equipment', function () {
    spyOn(db, 'query').andCallThrough();

    service.getEquipment().then(function(){
      expect(db.query).toHaveBeenCalled();
    });

    var result = {
      data: [
        {"Name": "Pot ( 2 Gal/7.6 L) - Extract", "TUNVolume": 256.0000000, "TUNWeight": 40.0000000, "TUNSpecificHeat": 0.1200000,"TUNDeadSpace": 0.0000000,"CalcBoilTime": 1,"BoilSize": 217.6000000,"BoilTime": 60.0000000,"EvapRate": 9.0000000,"BoilOff": 17.9200000,"TrubChillerLoss": 32.0000000,"CoolingPercentage": 4.0000000,"TopUpKettle": 0.0000000,"BatchSize": 640.0000000,"FermenterLoss": 51.2000000,"TopUpWater": 480.0000000,"Efficiency": 72.0000000,"HopUtilization": 100.0000000,"Notes": "Simple brew pot with 2 gallon capacity for extract brewing.  May also be used for partial mash with temperature or infusion mashing."},
        {"Name": "Pot ( 3 Gal/11.4 L) - Extract", "TUNVolume": 384.0000000, "TUNWeight": 48.0000000, "TUNSpecificHeat": 0.1200000, "TUNDeadSpace": 0.0000000, "CalcBoilTime": 1, "BoilSize": 360.9600000, "BoilTime": 60.0000000, "EvapRate": 9.0000000, "BoilOff": 28.1600000, "TrubChillerLoss": 64.0000000, "CoolingPercentage": 4.0000000, "TopUpKettle": 0.0000000, "BatchSize": 640.0000000, "FermenterLoss": 51.2000000, "TopUpWater": 384.0000000, "Efficiency": 72.0000000, "HopUtilization": 100.0000000, "Notes": "Simple Brew Pot with a 3 Gallon Capacity - leaving a workable boil volume of around 2.5 gal.  Used for extract or partial mash brewing."},
        {"Name": "Pot ( 4 Gal/15.1 L) - Extract", "TUNVolume": 512.0000000, "TUNWeight": 64.0000000, "TUNSpecificHeat": 0.1200000, "TUNDeadSpace": 0.0000000, "CalcBoilTime": 1, "BoilSize": 469.7600000, "BoilTime": 60.0000000, "EvapRate": 9.0000000, "BoilOff": 37.1200000, "TrubChillerLoss": 64.0000000, "CoolingPercentage": 4.0000000, "TopUpKettle": 0.0000000, "BatchSize": 640.0000000, "FermenterLoss": 51.2000000, "TopUpWater": 288.0000000, "Efficiency": 72.0000000, "HopUtilization": 100.0000000, "Notes": "Simple Brew Pot with a 4 Gallon Capacity - leaving a workable boil volume of around 3.25 gal.  Used for extract or partial mash brewing."},
        {"Name": "Pot and Cooler ( 5 Gal/19 L) - All Grain", "TUNVolume": 640.0000000, "TUNWeight": 64.0000000, "TUNSpecificHeat": 0.3000000, "TUNDeadSpace": 32.0000000, "CalcBoilTime": 1, "BoilSize": 834.5600000, "BoilTime": 60.0000000, "EvapRate": 9.0000000, "BoilOff": 69.1200000, "TrubChillerLoss": 96.0000000, "CoolingPercentage": 4.0000000, "TopUpKettle": 0.0000000, "BatchSize": 640.0000000, "FermenterLoss": 51.2000000, "TopUpWater": 0.0000000, "Efficiency": 72.0000000, "HopUtilization": 100.0000000, "Notes": "Popular all grain setup.  5 Gallon cooler as mash tun with false bottom, and 7-9 gallon brewpot capable of boiling at least 6 gallons of wort without spilling over.  Primarily used for single infusion mashes."}
      ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should send database and collection name when requesting the full list of equipment', function () {
    spyOn(db, 'query').andCallThrough();

    service.getEquipment().then(function(){
      expect(db.query).toHaveBeenCalled();
      expect(db.query).toHaveBeenCalledWith('brew_everywhere', 'equipment', []);
    });

    var result = {
      data: [
        {"Name": "Pot ( 2 Gal/7.6 L) - Extract", "TUNVolume": 256.0000000, "TUNWeight": 40.0000000, "TUNSpecificHeat": 0.1200000,"TUNDeadSpace": 0.0000000,"CalcBoilTime": 1,"BoilSize": 217.6000000,"BoilTime": 60.0000000,"EvapRate": 9.0000000,"BoilOff": 17.9200000,"TrubChillerLoss": 32.0000000,"CoolingPercentage": 4.0000000,"TopUpKettle": 0.0000000,"BatchSize": 640.0000000,"FermenterLoss": 51.2000000,"TopUpWater": 480.0000000,"Efficiency": 72.0000000,"HopUtilization": 100.0000000,"Notes": "Simple brew pot with 2 gallon capacity for extract brewing.  May also be used for partial mash with temperature or infusion mashing."},
        {"Name": "Pot ( 3 Gal/11.4 L) - Extract", "TUNVolume": 384.0000000, "TUNWeight": 48.0000000, "TUNSpecificHeat": 0.1200000, "TUNDeadSpace": 0.0000000, "CalcBoilTime": 1, "BoilSize": 360.9600000, "BoilTime": 60.0000000, "EvapRate": 9.0000000, "BoilOff": 28.1600000, "TrubChillerLoss": 64.0000000, "CoolingPercentage": 4.0000000, "TopUpKettle": 0.0000000, "BatchSize": 640.0000000, "FermenterLoss": 51.2000000, "TopUpWater": 384.0000000, "Efficiency": 72.0000000, "HopUtilization": 100.0000000, "Notes": "Simple Brew Pot with a 3 Gallon Capacity - leaving a workable boil volume of around 2.5 gal.  Used for extract or partial mash brewing."},
        {"Name": "Pot ( 4 Gal/15.1 L) - Extract", "TUNVolume": 512.0000000, "TUNWeight": 64.0000000, "TUNSpecificHeat": 0.1200000, "TUNDeadSpace": 0.0000000, "CalcBoilTime": 1, "BoilSize": 469.7600000, "BoilTime": 60.0000000, "EvapRate": 9.0000000, "BoilOff": 37.1200000, "TrubChillerLoss": 64.0000000, "CoolingPercentage": 4.0000000, "TopUpKettle": 0.0000000, "BatchSize": 640.0000000, "FermenterLoss": 51.2000000, "TopUpWater": 288.0000000, "Efficiency": 72.0000000, "HopUtilization": 100.0000000, "Notes": "Simple Brew Pot with a 4 Gallon Capacity - leaving a workable boil volume of around 3.25 gal.  Used for extract or partial mash brewing."},
        {"Name": "Pot and Cooler ( 5 Gal/19 L) - All Grain", "TUNVolume": 640.0000000, "TUNWeight": 64.0000000, "TUNSpecificHeat": 0.3000000, "TUNDeadSpace": 32.0000000, "CalcBoilTime": 1, "BoilSize": 834.5600000, "BoilTime": 60.0000000, "EvapRate": 9.0000000, "BoilOff": 69.1200000, "TrubChillerLoss": 96.0000000, "CoolingPercentage": 4.0000000, "TopUpKettle": 0.0000000, "BatchSize": 640.0000000, "FermenterLoss": 51.2000000, "TopUpWater": 0.0000000, "Efficiency": 72.0000000, "HopUtilization": 100.0000000, "Notes": "Popular all grain setup.  5 Gallon cooler as mash tun with false bottom, and 7-9 gallon brewpot capable of boiling at least 6 gallons of wort without spilling over.  Primarily used for single infusion mashes."}
      ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _GET_EQUIPMENT_COMPLETE_ after all equipment are received', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var result = {
      data: [
        {"Name": "Pot ( 2 Gal/7.6 L) - Extract", "TUNVolume": 256.0000000, "TUNWeight": 40.0000000, "TUNSpecificHeat": 0.1200000,"TUNDeadSpace": 0.0000000,"CalcBoilTime": 1,"BoilSize": 217.6000000,"BoilTime": 60.0000000,"EvapRate": 9.0000000,"BoilOff": 17.9200000,"TrubChillerLoss": 32.0000000,"CoolingPercentage": 4.0000000,"TopUpKettle": 0.0000000,"BatchSize": 640.0000000,"FermenterLoss": 51.2000000,"TopUpWater": 480.0000000,"Efficiency": 72.0000000,"HopUtilization": 100.0000000,"Notes": "Simple brew pot with 2 gallon capacity for extract brewing.  May also be used for partial mash with temperature or infusion mashing."},
        {"Name": "Pot ( 3 Gal/11.4 L) - Extract", "TUNVolume": 384.0000000, "TUNWeight": 48.0000000, "TUNSpecificHeat": 0.1200000, "TUNDeadSpace": 0.0000000, "CalcBoilTime": 1, "BoilSize": 360.9600000, "BoilTime": 60.0000000, "EvapRate": 9.0000000, "BoilOff": 28.1600000, "TrubChillerLoss": 64.0000000, "CoolingPercentage": 4.0000000, "TopUpKettle": 0.0000000, "BatchSize": 640.0000000, "FermenterLoss": 51.2000000, "TopUpWater": 384.0000000, "Efficiency": 72.0000000, "HopUtilization": 100.0000000, "Notes": "Simple Brew Pot with a 3 Gallon Capacity - leaving a workable boil volume of around 2.5 gal.  Used for extract or partial mash brewing."},
        {"Name": "Pot ( 4 Gal/15.1 L) - Extract", "TUNVolume": 512.0000000, "TUNWeight": 64.0000000, "TUNSpecificHeat": 0.1200000, "TUNDeadSpace": 0.0000000, "CalcBoilTime": 1, "BoilSize": 469.7600000, "BoilTime": 60.0000000, "EvapRate": 9.0000000, "BoilOff": 37.1200000, "TrubChillerLoss": 64.0000000, "CoolingPercentage": 4.0000000, "TopUpKettle": 0.0000000, "BatchSize": 640.0000000, "FermenterLoss": 51.2000000, "TopUpWater": 288.0000000, "Efficiency": 72.0000000, "HopUtilization": 100.0000000, "Notes": "Simple Brew Pot with a 4 Gallon Capacity - leaving a workable boil volume of around 3.25 gal.  Used for extract or partial mash brewing."},
        {"Name": "Pot and Cooler ( 5 Gal/19 L) - All Grain", "TUNVolume": 640.0000000, "TUNWeight": 64.0000000, "TUNSpecificHeat": 0.3000000, "TUNDeadSpace": 32.0000000, "CalcBoilTime": 1, "BoilSize": 834.5600000, "BoilTime": 60.0000000, "EvapRate": 9.0000000, "BoilOff": 69.1200000, "TrubChillerLoss": 96.0000000, "CoolingPercentage": 4.0000000, "TopUpKettle": 0.0000000, "BatchSize": 640.0000000, "FermenterLoss": 51.2000000, "TopUpWater": 0.0000000, "Efficiency": 72.0000000, "HopUtilization": 100.0000000, "Notes": "Popular all grain setup.  5 Gallon cooler as mash tun with false bottom, and 7-9 gallon brewpot capable of boiling at least 6 gallons of wort without spilling over.  Primarily used for single infusion mashes."}
      ]
    };

    service.getEquipment().then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._GET_EQUIPMENT_COMPLETE_, [result.data]);
    });

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _GET_EQUIPMENT_FAILED_ when query request fails', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    service.getEquipment().then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._GET_EQUIPMENT_FAILED_);
    });

    db.deferred.reject();

    rootScope.$digest();
  });

  it('should publish the message _ADD_ERROR_MESSAGE_ when query request fails', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    service.getEquipment().then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith('_ADD_ERROR_MESSAGE_', [ 'Unable to get equipment from server', 'alert.warning' ]);
    });

    db.deferred.reject();

    rootScope.$digest();
  });

  it('should request queryById when getEquipmentById is called', function () {
    spyOn(db, 'queryById').andCallThrough();

    service.getEquipmentById('123').then(function(){
      expect(db.queryById).toHaveBeenCalled();
    });

    var result = {
      data: [
        {"Name": "Pot (18.5 Gal/70 L) and Cooler (9.5 Gal/40 L)  - All Grain", "TUNVolume": 1280.0000000, "TUNWeight": 144.0000000, "TUNSpecificHeat": 0.3000000, "TUNDeadSpace": 102.4000000, "CalcBoilTime": 1, "BoilSize": 1253.1200000, "BoilTime": 90.0000000, "EvapRate": 9.0000000, "BoilOff": 229.5466667, "TrubChillerLoss": 96.0000000, "CoolingPercentage": 4.0000000, "TopUpKettle": 0.0000000, "BatchSize": 778.2400000, "FermenterLoss": 57.6000000, "TopUpWater": 0.0000000, "Efficiency": 68.0000000, "HopUtilization": 100.0000000, "Notes": "Based on a 18.5 Gal/70 L pot with a diameter of 18 inches/45 cm and a 9.5 Gal/40 L cooler. The above assumes loose pellet hops and only clear, chilled wort transferred from the kettle using no trub management techniques. Experienced brewers should adjust &#39;Loss to Trub and Chiller&#39; and &#39;Brewhouse Efficiency&#39; accordingly to suit their trub management techniques."}
      ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should send database and collection name and id when requesting queryById', function () {
    spyOn(db, 'queryById').andCallThrough();

    service.getEquipmentById('123').then(function(){
      expect(db.queryById).toHaveBeenCalled();
      expect(db.queryById).toHaveBeenCalledWith('brew_everywhere', 'equipment', '123', []);
    });

    var result = {
      data: [
        {"Name": "Pot (18.5 Gal/70 L) and Cooler (9.5 Gal/40 L)  - All Grain", "TUNVolume": 1280.0000000, "TUNWeight": 144.0000000, "TUNSpecificHeat": 0.3000000, "TUNDeadSpace": 102.4000000, "CalcBoilTime": 1, "BoilSize": 1253.1200000, "BoilTime": 90.0000000, "EvapRate": 9.0000000, "BoilOff": 229.5466667, "TrubChillerLoss": 96.0000000, "CoolingPercentage": 4.0000000, "TopUpKettle": 0.0000000, "BatchSize": 778.2400000, "FermenterLoss": 57.6000000, "TopUpWater": 0.0000000, "Efficiency": 68.0000000, "HopUtilization": 100.0000000, "Notes": "Based on a 18.5 Gal/70 L pot with a diameter of 18 inches/45 cm and a 9.5 Gal/40 L cooler. The above assumes loose pellet hops and only clear, chilled wort transferred from the kettle using no trub management techniques. Experienced brewers should adjust &#39;Loss to Trub and Chiller&#39; and &#39;Brewhouse Efficiency&#39; accordingly to suit their trub management techniques."}
      ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _GET_EQUIPMENT_BY_ID_COMPLETE_ when queryById succeeds', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var result = {
      data: [
        {"Name": "Pot (18.5 Gal/70 L) and Cooler (9.5 Gal/40 L)  - All Grain", "TUNVolume": 1280.0000000, "TUNWeight": 144.0000000, "TUNSpecificHeat": 0.3000000, "TUNDeadSpace": 102.4000000, "CalcBoilTime": 1, "BoilSize": 1253.1200000, "BoilTime": 90.0000000, "EvapRate": 9.0000000, "BoilOff": 229.5466667, "TrubChillerLoss": 96.0000000, "CoolingPercentage": 4.0000000, "TopUpKettle": 0.0000000, "BatchSize": 778.2400000, "FermenterLoss": 57.6000000, "TopUpWater": 0.0000000, "Efficiency": 68.0000000, "HopUtilization": 100.0000000, "Notes": "Based on a 18.5 Gal/70 L pot with a diameter of 18 inches/45 cm and a 9.5 Gal/40 L cooler. The above assumes loose pellet hops and only clear, chilled wort transferred from the kettle using no trub management techniques. Experienced brewers should adjust &#39;Loss to Trub and Chiller&#39; and &#39;Brewhouse Efficiency&#39; accordingly to suit their trub management techniques."}
      ]
    };

    service.getEquipmentById('123').then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._GET_EQUIPMENT_BY_ID_COMPLETE_, [result.data]);
    });

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _GET_EQUIPMENT_BY_ID_FAILED_ when queryByID request fails', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    service.getEquipmentById('123').then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._GET_EQUIPMENT_BY_ID_FAILED_);
    });

    db.deferred.reject();

    rootScope.$digest();
  });

  it('should publish the message _ADD_ERROR_MESSAGE_ when queryById request fails', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    service.getEquipmentById('123').then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith('_ADD_ERROR_MESSAGE_', [ 'Unable to get equipment by id from server', 'alert.warning' ]);
    });

    db.deferred.reject();

    rootScope.$digest();
  });

  it('should request create when createEquipment is called', function () {
    spyOn(db, 'create').andCallThrough();

    var equipment = {"Name": "Pot (18.5 Gal/70 L) and Cooler (9.5 Gal/40 L)  - All Grain", "TUNVolume": 1280.0000000, "TUNWeight": 144.0000000, "TUNSpecificHeat": 0.3000000, "TUNDeadSpace": 102.4000000, "CalcBoilTime": 1, "BoilSize": 1253.1200000, "BoilTime": 90.0000000, "EvapRate": 9.0000000, "BoilOff": 229.5466667, "TrubChillerLoss": 96.0000000, "CoolingPercentage": 4.0000000, "TopUpKettle": 0.0000000, "BatchSize": 778.2400000, "FermenterLoss": 57.6000000, "TopUpWater": 0.0000000, "Efficiency": 68.0000000, "HopUtilization": 100.0000000, "Notes": "Based on a 18.5 Gal/70 L pot with a diameter of 18 inches/45 cm and a 9.5 Gal/40 L cooler. The above assumes loose pellet hops and only clear, chilled wort transferred from the kettle using no trub management techniques. Experienced brewers should adjust &#39;Loss to Trub and Chiller&#39; and &#39;Brewhouse Efficiency&#39; accordingly to suit their trub management techniques."};

    service.createEquipment(equipment).then(function(){
      expect(db.create).toHaveBeenCalled();
    });

    var result = {
      data: [ equipment ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should send database and collection name and object when requesting create', function () {
    spyOn(db, 'create').andCallThrough();

    var equipment = {"Name": "Pot (18.5 Gal/70 L) and Cooler (9.5 Gal/40 L)  - All Grain", "TUNVolume": 1280.0000000, "TUNWeight": 144.0000000, "TUNSpecificHeat": 0.3000000, "TUNDeadSpace": 102.4000000, "CalcBoilTime": 1, "BoilSize": 1253.1200000, "BoilTime": 90.0000000, "EvapRate": 9.0000000, "BoilOff": 229.5466667, "TrubChillerLoss": 96.0000000, "CoolingPercentage": 4.0000000, "TopUpKettle": 0.0000000, "BatchSize": 778.2400000, "FermenterLoss": 57.6000000, "TopUpWater": 0.0000000, "Efficiency": 68.0000000, "HopUtilization": 100.0000000, "Notes": "Based on a 18.5 Gal/70 L pot with a diameter of 18 inches/45 cm and a 9.5 Gal/40 L cooler. The above assumes loose pellet hops and only clear, chilled wort transferred from the kettle using no trub management techniques. Experienced brewers should adjust &#39;Loss to Trub and Chiller&#39; and &#39;Brewhouse Efficiency&#39; accordingly to suit their trub management techniques."};

    service.createEquipment(equipment).then(function(){
      expect(db.create).toHaveBeenCalled();
      expect(db.create).toHaveBeenCalledWith('brew_everywhere', 'equipment', equipment);
    });

    var result = {
      data: [ equipment ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _CREATE_EQUIPMENT_COMPLETE_ when create succeeds', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var equipment = {"Name": "Pot (18.5 Gal/70 L) and Cooler (9.5 Gal/40 L)  - All Grain", "TUNVolume": 1280.0000000, "TUNWeight": 144.0000000, "TUNSpecificHeat": 0.3000000, "TUNDeadSpace": 102.4000000, "CalcBoilTime": 1, "BoilSize": 1253.1200000, "BoilTime": 90.0000000, "EvapRate": 9.0000000, "BoilOff": 229.5466667, "TrubChillerLoss": 96.0000000, "CoolingPercentage": 4.0000000, "TopUpKettle": 0.0000000, "BatchSize": 778.2400000, "FermenterLoss": 57.6000000, "TopUpWater": 0.0000000, "Efficiency": 68.0000000, "HopUtilization": 100.0000000, "Notes": "Based on a 18.5 Gal/70 L pot with a diameter of 18 inches/45 cm and a 9.5 Gal/40 L cooler. The above assumes loose pellet hops and only clear, chilled wort transferred from the kettle using no trub management techniques. Experienced brewers should adjust &#39;Loss to Trub and Chiller&#39; and &#39;Brewhouse Efficiency&#39; accordingly to suit their trub management techniques."};

    service.createEquipment(equipment).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._CREATE_EQUIPMENT_COMPLETE_, [result.data]);
    });

    var result = {
      data: [ equipment ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _CREATE_EQUIPMENT_FAILED_ when create request fails', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var equipment = {"Name": "Pot (18.5 Gal/70 L) and Cooler (9.5 Gal/40 L)  - All Grain", "TUNVolume": 1280.0000000, "TUNWeight": 144.0000000, "TUNSpecificHeat": 0.3000000, "TUNDeadSpace": 102.4000000, "CalcBoilTime": 1, "BoilSize": 1253.1200000, "BoilTime": 90.0000000, "EvapRate": 9.0000000, "BoilOff": 229.5466667, "TrubChillerLoss": 96.0000000, "CoolingPercentage": 4.0000000, "TopUpKettle": 0.0000000, "BatchSize": 778.2400000, "FermenterLoss": 57.6000000, "TopUpWater": 0.0000000, "Efficiency": 68.0000000, "HopUtilization": 100.0000000, "Notes": "Based on a 18.5 Gal/70 L pot with a diameter of 18 inches/45 cm and a 9.5 Gal/40 L cooler. The above assumes loose pellet hops and only clear, chilled wort transferred from the kettle using no trub management techniques. Experienced brewers should adjust &#39;Loss to Trub and Chiller&#39; and &#39;Brewhouse Efficiency&#39; accordingly to suit their trub management techniques."};

    service.createEquipment(equipment).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._CREATE_EQUIPMENT_FAILED_);
    });

    db.deferred.reject();

    rootScope.$digest();
  });

  it('should publish the message _ADD_ERROR_MESSAGE_ when create request fails', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var equipment = {"Name": "Pot (18.5 Gal/70 L) and Cooler (9.5 Gal/40 L)  - All Grain", "TUNVolume": 1280.0000000, "TUNWeight": 144.0000000, "TUNSpecificHeat": 0.3000000, "TUNDeadSpace": 102.4000000, "CalcBoilTime": 1, "BoilSize": 1253.1200000, "BoilTime": 90.0000000, "EvapRate": 9.0000000, "BoilOff": 229.5466667, "TrubChillerLoss": 96.0000000, "CoolingPercentage": 4.0000000, "TopUpKettle": 0.0000000, "BatchSize": 778.2400000, "FermenterLoss": 57.6000000, "TopUpWater": 0.0000000, "Efficiency": 68.0000000, "HopUtilization": 100.0000000, "Notes": "Based on a 18.5 Gal/70 L pot with a diameter of 18 inches/45 cm and a 9.5 Gal/40 L cooler. The above assumes loose pellet hops and only clear, chilled wort transferred from the kettle using no trub management techniques. Experienced brewers should adjust &#39;Loss to Trub and Chiller&#39; and &#39;Brewhouse Efficiency&#39; accordingly to suit their trub management techniques."};

    service.createEquipment(equipment).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith('_ADD_ERROR_MESSAGE_', [ 'Unable to create equipment', 'alert.warning' ]);
    });

    db.deferred.reject();

    rootScope.$digest();
  });

  it('should request update when updateEquipment is called', function () {
    spyOn(db, 'update').andCallThrough();

    var equipment = {"Name": "Pot (18.5 Gal/70 L) and Cooler (9.5 Gal/40 L)  - All Grain", "TUNVolume": 1280.0000000, "TUNWeight": 144.0000000, "TUNSpecificHeat": 0.3000000, "TUNDeadSpace": 102.4000000, "CalcBoilTime": 1, "BoilSize": 1253.1200000, "BoilTime": 90.0000000, "EvapRate": 9.0000000, "BoilOff": 229.5466667, "TrubChillerLoss": 96.0000000, "CoolingPercentage": 4.0000000, "TopUpKettle": 0.0000000, "BatchSize": 778.2400000, "FermenterLoss": 57.6000000, "TopUpWater": 0.0000000, "Efficiency": 68.0000000, "HopUtilization": 100.0000000, "Notes": "Based on a 18.5 Gal/70 L pot with a diameter of 18 inches/45 cm and a 9.5 Gal/40 L cooler. The above assumes loose pellet hops and only clear, chilled wort transferred from the kettle using no trub management techniques. Experienced brewers should adjust &#39;Loss to Trub and Chiller&#39; and &#39;Brewhouse Efficiency&#39; accordingly to suit their trub management techniques."};

    service.updateEquipment(equipment).then(function(){
      expect(db.update).toHaveBeenCalled();
    });

    var result = {
      data: [ equipment ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should send database and collection name and object when requesting update', function () {
    spyOn(db, 'update').andCallThrough();

    var equipment = {"Name": "Pot (18.5 Gal/70 L) and Cooler (9.5 Gal/40 L)  - All Grain", "TUNVolume": 1280.0000000, "TUNWeight": 144.0000000, "TUNSpecificHeat": 0.3000000, "TUNDeadSpace": 102.4000000, "CalcBoilTime": 1, "BoilSize": 1253.1200000, "BoilTime": 90.0000000, "EvapRate": 9.0000000, "BoilOff": 229.5466667, "TrubChillerLoss": 96.0000000, "CoolingPercentage": 4.0000000, "TopUpKettle": 0.0000000, "BatchSize": 778.2400000, "FermenterLoss": 57.6000000, "TopUpWater": 0.0000000, "Efficiency": 68.0000000, "HopUtilization": 100.0000000, "Notes": "Based on a 18.5 Gal/70 L pot with a diameter of 18 inches/45 cm and a 9.5 Gal/40 L cooler. The above assumes loose pellet hops and only clear, chilled wort transferred from the kettle using no trub management techniques. Experienced brewers should adjust &#39;Loss to Trub and Chiller&#39; and &#39;Brewhouse Efficiency&#39; accordingly to suit their trub management techniques."};

    service.updateEquipment(equipment).then(function(){
      expect(db.update).toHaveBeenCalled();
      expect(db.update).toHaveBeenCalledWith('brew_everywhere', 'equipment', equipment);
    });

    var result = {
      data: [ equipment ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _UPDATE_EQUIPMENT_COMPLETE_ when update succeeds', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var equipment = {"Name": "Pot (18.5 Gal/70 L) and Cooler (9.5 Gal/40 L)  - All Grain", "TUNVolume": 1280.0000000, "TUNWeight": 144.0000000, "TUNSpecificHeat": 0.3000000, "TUNDeadSpace": 102.4000000, "CalcBoilTime": 1, "BoilSize": 1253.1200000, "BoilTime": 90.0000000, "EvapRate": 9.0000000, "BoilOff": 229.5466667, "TrubChillerLoss": 96.0000000, "CoolingPercentage": 4.0000000, "TopUpKettle": 0.0000000, "BatchSize": 778.2400000, "FermenterLoss": 57.6000000, "TopUpWater": 0.0000000, "Efficiency": 68.0000000, "HopUtilization": 100.0000000, "Notes": "Based on a 18.5 Gal/70 L pot with a diameter of 18 inches/45 cm and a 9.5 Gal/40 L cooler. The above assumes loose pellet hops and only clear, chilled wort transferred from the kettle using no trub management techniques. Experienced brewers should adjust &#39;Loss to Trub and Chiller&#39; and &#39;Brewhouse Efficiency&#39; accordingly to suit their trub management techniques."};

    service.updateEquipment(equipment).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._UPDATE_EQUIPMENT_COMPLETE_, [result.data]);
    });

    var result = {
      data: [equipment]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _UPDATE_EQUIPMENT_FAILED_ when update request fails', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var equipment = {"Name": "Pot (18.5 Gal/70 L) and Cooler (9.5 Gal/40 L)  - All Grain", "TUNVolume": 1280.0000000, "TUNWeight": 144.0000000, "TUNSpecificHeat": 0.3000000, "TUNDeadSpace": 102.4000000, "CalcBoilTime": 1, "BoilSize": 1253.1200000, "BoilTime": 90.0000000, "EvapRate": 9.0000000, "BoilOff": 229.5466667, "TrubChillerLoss": 96.0000000, "CoolingPercentage": 4.0000000, "TopUpKettle": 0.0000000, "BatchSize": 778.2400000, "FermenterLoss": 57.6000000, "TopUpWater": 0.0000000, "Efficiency": 68.0000000, "HopUtilization": 100.0000000, "Notes": "Based on a 18.5 Gal/70 L pot with a diameter of 18 inches/45 cm and a 9.5 Gal/40 L cooler. The above assumes loose pellet hops and only clear, chilled wort transferred from the kettle using no trub management techniques. Experienced brewers should adjust &#39;Loss to Trub and Chiller&#39; and &#39;Brewhouse Efficiency&#39; accordingly to suit their trub management techniques."};

    service.updateEquipment(equipment).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._UPDATE_EQUIPMENT_FAILED_);
    });

    db.deferred.reject();

    rootScope.$digest();
  });

  it('should publish the message _ADD_ERROR_MESSAGE_ when update request fails', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var equipment = {"Name": "Pot (18.5 Gal/70 L) and Cooler (9.5 Gal/40 L)  - All Grain", "TUNVolume": 1280.0000000, "TUNWeight": 144.0000000, "TUNSpecificHeat": 0.3000000, "TUNDeadSpace": 102.4000000, "CalcBoilTime": 1, "BoilSize": 1253.1200000, "BoilTime": 90.0000000, "EvapRate": 9.0000000, "BoilOff": 229.5466667, "TrubChillerLoss": 96.0000000, "CoolingPercentage": 4.0000000, "TopUpKettle": 0.0000000, "BatchSize": 778.2400000, "FermenterLoss": 57.6000000, "TopUpWater": 0.0000000, "Efficiency": 68.0000000, "HopUtilization": 100.0000000, "Notes": "Based on a 18.5 Gal/70 L pot with a diameter of 18 inches/45 cm and a 9.5 Gal/40 L cooler. The above assumes loose pellet hops and only clear, chilled wort transferred from the kettle using no trub management techniques. Experienced brewers should adjust &#39;Loss to Trub and Chiller&#39; and &#39;Brewhouse Efficiency&#39; accordingly to suit their trub management techniques."};

    service.updateEquipment(equipment).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith('_ADD_ERROR_MESSAGE_', [ 'Unable to update equipment', 'alert.warning' ]);
    });

    db.deferred.reject();

    rootScope.$digest();
  });

  it('should request delete when deleteEquipment is called', function () {
    spyOn(db, 'delete').andCallThrough();

    var equipment = {"Name": "Pot (18.5 Gal/70 L) and Cooler (9.5 Gal/40 L)  - All Grain", "TUNVolume": 1280.0000000, "TUNWeight": 144.0000000, "TUNSpecificHeat": 0.3000000, "TUNDeadSpace": 102.4000000, "CalcBoilTime": 1, "BoilSize": 1253.1200000, "BoilTime": 90.0000000, "EvapRate": 9.0000000, "BoilOff": 229.5466667, "TrubChillerLoss": 96.0000000, "CoolingPercentage": 4.0000000, "TopUpKettle": 0.0000000, "BatchSize": 778.2400000, "FermenterLoss": 57.6000000, "TopUpWater": 0.0000000, "Efficiency": 68.0000000, "HopUtilization": 100.0000000, "Notes": "Based on a 18.5 Gal/70 L pot with a diameter of 18 inches/45 cm and a 9.5 Gal/40 L cooler. The above assumes loose pellet hops and only clear, chilled wort transferred from the kettle using no trub management techniques. Experienced brewers should adjust &#39;Loss to Trub and Chiller&#39; and &#39;Brewhouse Efficiency&#39; accordingly to suit their trub management techniques."};

    service.deleteEquipment(equipment).then(function(){
      expect(db.delete).toHaveBeenCalled();
    });

    var result = {
      data: [ equipment ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should send database and collection name and object when requesting delete', function () {
    spyOn(db, 'delete').andCallThrough();

    var equipment = {"Name": "Pot (18.5 Gal/70 L) and Cooler (9.5 Gal/40 L)  - All Grain", "TUNVolume": 1280.0000000, "TUNWeight": 144.0000000, "TUNSpecificHeat": 0.3000000, "TUNDeadSpace": 102.4000000, "CalcBoilTime": 1, "BoilSize": 1253.1200000, "BoilTime": 90.0000000, "EvapRate": 9.0000000, "BoilOff": 229.5466667, "TrubChillerLoss": 96.0000000, "CoolingPercentage": 4.0000000, "TopUpKettle": 0.0000000, "BatchSize": 778.2400000, "FermenterLoss": 57.6000000, "TopUpWater": 0.0000000, "Efficiency": 68.0000000, "HopUtilization": 100.0000000, "Notes": "Based on a 18.5 Gal/70 L pot with a diameter of 18 inches/45 cm and a 9.5 Gal/40 L cooler. The above assumes loose pellet hops and only clear, chilled wort transferred from the kettle using no trub management techniques. Experienced brewers should adjust &#39;Loss to Trub and Chiller&#39; and &#39;Brewhouse Efficiency&#39; accordingly to suit their trub management techniques."};

    service.deleteEquipment(equipment).then(function(){
      expect(db.delete).toHaveBeenCalled();
      expect(db.delete).toHaveBeenCalledWith('brew_everywhere', 'equipment', equipment);
    });

    var result = {
      data: [ equipment ]
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _DELETE_EQUIPMENT_COMPLETE_ when delete succeeds', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var equipment = {"Name": "Pot (18.5 Gal/70 L) and Cooler (9.5 Gal/40 L)  - All Grain", "TUNVolume": 1280.0000000, "TUNWeight": 144.0000000, "TUNSpecificHeat": 0.3000000, "TUNDeadSpace": 102.4000000, "CalcBoilTime": 1, "BoilSize": 1253.1200000, "BoilTime": 90.0000000, "EvapRate": 9.0000000, "BoilOff": 229.5466667, "TrubChillerLoss": 96.0000000, "CoolingPercentage": 4.0000000, "TopUpKettle": 0.0000000, "BatchSize": 778.2400000, "FermenterLoss": 57.6000000, "TopUpWater": 0.0000000, "Efficiency": 68.0000000, "HopUtilization": 100.0000000, "Notes": "Based on a 18.5 Gal/70 L pot with a diameter of 18 inches/45 cm and a 9.5 Gal/40 L cooler. The above assumes loose pellet hops and only clear, chilled wort transferred from the kettle using no trub management techniques. Experienced brewers should adjust &#39;Loss to Trub and Chiller&#39; and &#39;Brewhouse Efficiency&#39; accordingly to suit their trub management techniques."};

    service.deleteEquipment(equipment).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._DELETE_EQUIPMENT_COMPLETE_);
    });

    var result = {
      status: 200
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _DELETE_EQUIPMENT_FAILED_ if status code is not 200', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var equipment = {"Name": "Pot (18.5 Gal/70 L) and Cooler (9.5 Gal/40 L)  - All Grain", "TUNVolume": 1280.0000000, "TUNWeight": 144.0000000, "TUNSpecificHeat": 0.3000000, "TUNDeadSpace": 102.4000000, "CalcBoilTime": 1, "BoilSize": 1253.1200000, "BoilTime": 90.0000000, "EvapRate": 9.0000000, "BoilOff": 229.5466667, "TrubChillerLoss": 96.0000000, "CoolingPercentage": 4.0000000, "TopUpKettle": 0.0000000, "BatchSize": 778.2400000, "FermenterLoss": 57.6000000, "TopUpWater": 0.0000000, "Efficiency": 68.0000000, "HopUtilization": 100.0000000, "Notes": "Based on a 18.5 Gal/70 L pot with a diameter of 18 inches/45 cm and a 9.5 Gal/40 L cooler. The above assumes loose pellet hops and only clear, chilled wort transferred from the kettle using no trub management techniques. Experienced brewers should adjust &#39;Loss to Trub and Chiller&#39; and &#39;Brewhouse Efficiency&#39; accordingly to suit their trub management techniques."};

    service.deleteEquipment(equipment).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._DELETE_EQUIPMENT_FAILED_);
    });

    var result = {
      status: 400
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _ADD_ERROR_MESSAGE_ if status code is not 200', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var equipment = {"Name": "Pot (18.5 Gal/70 L) and Cooler (9.5 Gal/40 L)  - All Grain", "TUNVolume": 1280.0000000, "TUNWeight": 144.0000000, "TUNSpecificHeat": 0.3000000, "TUNDeadSpace": 102.4000000, "CalcBoilTime": 1, "BoilSize": 1253.1200000, "BoilTime": 90.0000000, "EvapRate": 9.0000000, "BoilOff": 229.5466667, "TrubChillerLoss": 96.0000000, "CoolingPercentage": 4.0000000, "TopUpKettle": 0.0000000, "BatchSize": 778.2400000, "FermenterLoss": 57.6000000, "TopUpWater": 0.0000000, "Efficiency": 68.0000000, "HopUtilization": 100.0000000, "Notes": "Based on a 18.5 Gal/70 L pot with a diameter of 18 inches/45 cm and a 9.5 Gal/40 L cooler. The above assumes loose pellet hops and only clear, chilled wort transferred from the kettle using no trub management techniques. Experienced brewers should adjust &#39;Loss to Trub and Chiller&#39; and &#39;Brewhouse Efficiency&#39; accordingly to suit their trub management techniques."};

    service.deleteEquipment(equipment).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith('_ADD_ERROR_MESSAGE_', [ 'Unable to delete equipment', 'alert.warning' ]);
    });

    var result = {
      status: 400
    };

    db.deferred.resolve(result);

    rootScope.$digest();
  });

  it('should publish the message _DELETE_EQUIPMENT_FAILED_ when delete request fails', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var equipment = {"Name": "Pot (18.5 Gal/70 L) and Cooler (9.5 Gal/40 L)  - All Grain", "TUNVolume": 1280.0000000, "TUNWeight": 144.0000000, "TUNSpecificHeat": 0.3000000, "TUNDeadSpace": 102.4000000, "CalcBoilTime": 1, "BoilSize": 1253.1200000, "BoilTime": 90.0000000, "EvapRate": 9.0000000, "BoilOff": 229.5466667, "TrubChillerLoss": 96.0000000, "CoolingPercentage": 4.0000000, "TopUpKettle": 0.0000000, "BatchSize": 778.2400000, "FermenterLoss": 57.6000000, "TopUpWater": 0.0000000, "Efficiency": 68.0000000, "HopUtilization": 100.0000000, "Notes": "Based on a 18.5 Gal/70 L pot with a diameter of 18 inches/45 cm and a 9.5 Gal/40 L cooler. The above assumes loose pellet hops and only clear, chilled wort transferred from the kettle using no trub management techniques. Experienced brewers should adjust &#39;Loss to Trub and Chiller&#39; and &#39;Brewhouse Efficiency&#39; accordingly to suit their trub management techniques."};

    service.deleteEquipment(equipment).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith(constants.message._DELETE_EQUIPMENT_FAILED_);
    });

    db.deferred.reject();

    rootScope.$digest();
  });

  it('should publish the message _ADD_ERROR_MESSAGE_ when delete request fails', function () {
    spyOn(pubsub, 'publish').andCallThrough();

    var equipment = {"Name": "Pot (18.5 Gal/70 L) and Cooler (9.5 Gal/40 L)  - All Grain", "TUNVolume": 1280.0000000, "TUNWeight": 144.0000000, "TUNSpecificHeat": 0.3000000, "TUNDeadSpace": 102.4000000, "CalcBoilTime": 1, "BoilSize": 1253.1200000, "BoilTime": 90.0000000, "EvapRate": 9.0000000, "BoilOff": 229.5466667, "TrubChillerLoss": 96.0000000, "CoolingPercentage": 4.0000000, "TopUpKettle": 0.0000000, "BatchSize": 778.2400000, "FermenterLoss": 57.6000000, "TopUpWater": 0.0000000, "Efficiency": 68.0000000, "HopUtilization": 100.0000000, "Notes": "Based on a 18.5 Gal/70 L pot with a diameter of 18 inches/45 cm and a 9.5 Gal/40 L cooler. The above assumes loose pellet hops and only clear, chilled wort transferred from the kettle using no trub management techniques. Experienced brewers should adjust &#39;Loss to Trub and Chiller&#39; and &#39;Brewhouse Efficiency&#39; accordingly to suit their trub management techniques."};

    service.deleteEquipment(equipment).then(function(){
      expect(pubsub.publish).toHaveBeenCalled();
      expect(pubsub.publish).toHaveBeenCalledWith('_ADD_ERROR_MESSAGE_', [ 'Unable to delete equipment', 'alert.warning' ]);
    });

    db.deferred.reject();

    rootScope.$digest();
  });

});