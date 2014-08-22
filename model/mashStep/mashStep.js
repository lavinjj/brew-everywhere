var MashStep = function () {
  var self = this;
  self.Name = '';
  self.Type = ''; // can be "Infusion", "Temperature" or "Decoction"
  self.InfuseAmount = 0.0;
  self.Temperature = 0.0; // in C
  self.StepTime = 0.0; // in minutes
  self.RampTime = 0.0; // in minutes
  self.EndTemperature = 0.0;
};

angular.module('brew-everywhere').value('MashStep', MashStep);