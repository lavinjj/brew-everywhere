var BrewerInventory = function () {
  var self = this;
  self.Equipment = [];
  self.Adjuncts = [];
  self.Fermentables = [];
  self.Hops = [];
  self.WaterProfiles = [];
  self.Yeast = [];
};

angular.module('brew-everywhere').value('BrewerInventory', BrewerInventory);