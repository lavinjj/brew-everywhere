var Style = function() {
  var self = this;
  self.Name = '';
  self.Category = '';
  self.CategoryNumber = ''; // BJCP style guide int
  self.StyleLetter = ''; // BJCP style letter
  self.StyleGuide = ''; // "BJCP", "AHA", etc
  self.Type = ''; // can be "Lager", "Ale", "Mead", "Wheat", "Mixed" or "Cider"
  self.OGMin = 0.0;
  self.OGMax = 0.0;
  self.FGMin = 0.0;
  self.FGMax = 0.0;
  self.IBUMin = 0.0;
  self.IBUMax = 0.0;
  self.ColorMin = 0.0;
  self.ColorMax = 0.0;
  self.CarbMin = 0.0;
  self.CarbMax = 0.0;
  self.ABVMin = 0.0;
  self.ABVMax = 0.0;
  self.Aroma = '';
  self.Appearance = '';
  self.Flavor = '';
  self.Mouthfeel = '';
  self.OverallImpression = '';
  self.Comments = '';
  self.Profile = '';
  self.Ingredients = '';
  self.Examples = '';
};

angular.module('brew-everywhere').value('Style', Style);