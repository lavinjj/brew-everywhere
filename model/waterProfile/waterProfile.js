var WaterProfile = function() {
  var self = this;
  self.Name = '';
  self.Amount = 0.0; // in liter
  self.Calcium = 0.0;
  self.Bicarbonate = 0.0;
  self.Sulfate = 0.0;
  self.Chloride = 0.0;
  self.Sodium = 0.0;
  self.Magnesium = 0.0;
  self.PH = 0.0;
  self.Notes = '';
};

angular.module('brew-everywhere').value('WaterProfile', WaterProfile);