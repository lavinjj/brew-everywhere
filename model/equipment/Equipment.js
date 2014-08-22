var Equipment = function () {
  var self = this;
  self.Name = '';
  self.BoilSize = 0.0;
  self.BatchSize = 0.0;
  self.TUNVolume = 0.0;
  self.TUNWeight = 0.0;
  self.TUNSpecificHeat = 0.0;
  self.TUNDeadSpace = 0.0;
  self.TopUpWater = 0.0;
  self.TrubChillerLoss = 0.0;
  self.EvapRate = 0.0; // percent
  self.BoilTime = 0.0;
  self.CalcBoilTime = 0.0;
  self.LauterDeadspace = 0.0;
  self.TopUpKettle = 0.0;
  self.HopUtilization = 0.0; // percent
  self.FermenterLoss = 0.0;
  self.Efficiency = 0.0;
  self.BoilOff = 0.0;
  self.CoolingPercentage = 0.0;
  self.Notes = '';
};

angular.module('brew-everywhere').value('Equipment', Equipment);