var MashProfile = function () {
  var self = this;
  self.Name = '';
  self.GrainWieght  = 0.0;
  self.GrainTemp = 0.0;
  self.MashSteps = [];
  self.Notes = '';
  self.TUNTemp = 0.0;
  self.SpargeTemp = 0.0;
  self.PH = 0.0;
  self.TUNWeight = 0.0;
  self.TUNSpecificHeat = 0.0;
  self.EquipAdjust = false;
};

angular.module('brew-everywhere').value('MashProfile', MashProfile);