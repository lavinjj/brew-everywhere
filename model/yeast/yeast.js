var Yeast = function () {
  var self = this;
  self.Name = '';
  self.Type = ''; // can be "Ale", "Lager", "Wheat", "Wine" or "Champagne"
  self.Form = ''; // can be "Liquid", "Dry", "Slant" or "Culture"
  self.Amount = 0.0; // in liters
  self.AmountIsWeight = false;
  self.Laboratory = '';
  self.ProductID = '';
  self.MinTemperature = 0.0; // in C
  self.MaxTemperature = 0.0; // in C
  self.Flocculation = ''; // can be "Low", "Medium", "High" or "Very High"
  self.Attenuation = 0.0; // percent
  self.Notes = '';
  self.BestFor = '';
  self.TimesCultured = 0;
  self.MaxReuse = 0;
  self.AddToSecondary = false;
};


angular.module('brew-everywhere').value('Yeast', Yeast);