var Adjunct = function () {
  var self = this;
  self.Name = '';
  self.Type = ''; // can be "Spice", "Fining", "Water Agent", "Herb", "Flavor" or "Other"
  self.Use = ''; // can be "Boil", "Mash", "Primary", "Secondary" or "Bottling"
  self.Time = 0.0; // in minutes
  self.Amount = 0.0; // liters or kg
  self.AmountIsWeight = false;
  self.UseFor = '';
  self.Notes = '';
};

angular.module('brew-everywhere').value('Adjunct', Adjunct);