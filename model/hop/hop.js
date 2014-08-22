var Hop = function () {
  var self = this;
  self.Name = '';
  self.Alpha = 0.0; // percent
  self.Amount = 0.0; // weight in kg
  self.Use = ''; // can be "Boil", "Dry Hop", "Mash", "First Wort" or "Aroma"
  self.Time = 0.0;  // in minutes
  self.Notes = '';
  self.Type = ''; // can be "Bittering", "Armoa" or "Both"
  self.Form = ''; // can be "Pellet", "Plug" or "Leaf"
  self.Beta = 0.0; // percent
  self.HSI = 0.0; // percent
  self.Origin = '';
  self.Substitutes = '';
  self.Humulene = 0.0; // percent
  self.Caryophyllene = 0.0; // percent
  self.Cohumulone = 0.0; // percent
  self.Myrcene = 0.0; // percent
};

Hop.prototype = {
  estimatedHBU: function(){
    return (parseFloat(this.Amount) * 0.0352739619) * this.Alpha;
  }
};

angular.module('brew-everywhere').value('Hop', Hop);