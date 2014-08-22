var Recipe = function () {
  var self = this;
  self.BrewerId = '';
  self.Name = '';
  self.Type = ''; // can only be "Extract", "Partial Mash" or "All Grain"
  self.Style = null;
  self.StyleId = '';
  self.Equipment = null;
  self.BrewerName = '';
  self.AssistantBrewerName = '';
  self.BatchSize = 0.0; // in liters
  self.BoilSize = 0.0; // in liters
  self.BoilTime = 0.0; // in minutes
  self.BrewHouseEfficiency = 0.0;
  self.Hops = [];
  self.Fermentables = [];
  self.Adjuncts = [];
  self.Yeast = [];
  self.SourceWaterProfile = null;
  self.DesiredWaterProfile = null;
  self.MashProfile = null;
  self.Notes = '';
  self.TasteNotes = '';
  self.TasteRating = 0.0; // 0-50.0
  self.OriginalGravity = 0.0;
  self.FinalGravity = 0.0;
  self.FermentationStages = 0;
  self.PrimaryAge = 0.0; // in days
  self.PrimaryTemp = 0.0; // in C
  self.SecondaryAge = 0.0; // in days
  self.SecondaryTemp = 0.0; // in C
  self.TertiaryAge = 0.0; // in days
  self.TertiaryTemp = 0.0; // in C
  self.ConditioningAge = 0.0; // bottle conditioning age in days
  self.ConditioningTemp = 0.0; // temp to age bottles in C
  self.Date = ''; // date brewed
  self.Carbonation = 0.0; // carbonation in vol of CO2
  self.ForcedCarbonation = false;
  self.PrimingSugarName = '';
  self.CarbonationTemp = 0.0;
  self.PrimingSugarEquiv = 0.0;
  self.KegPrimingFactor = 0.0;
  self.Units = 'us';
};

Recipe.prototype = {
  estimatedOriginalGravity: function(){
    var estGravity = 0.0;
    var totalWeight = 0.0;
    var type = this.Type;
    var boilSize = parseFloat(this.BoilSize);
    var efficiency = parseFloat(this.BrewHouseEfficiency) / 100.0;

    angular.forEach(this.Fermentables, function(fermentable){
      estGravity += fermentable.gravityPoints(type, boilSize, efficiency);
      totalWeight += fermentable.Amount;
    });

    return estGravity + 1.0;
  },

  estimatedFinalGravity: function() {
    if(this.Yeast[0]){
      var estimate = (((this.estimatedOriginalGravity() - 1.0) * (1.0 - (this.Yeast[0].Attenuation / 100) )) + 1.0);
      return estimate;
    }
    return 0.0;
  },
  estimatedABV: function(){
    var estimate = (((this.estimatedOriginalGravity() - this.estimatedFinalGravity()) * 1.29) * 100);
    return estimate;
  },
  estimatedIBUTinseth: function(){
    var batchVol = parseFloat(this.BatchSize);
    var boilGravity = this.estimatedBoilGravity();
    var bitterness = 0.0;
    var time = 0.0;

    angular.forEach(this.Hops, function(hop){
      switch(hop.Use)
      {
        case "Mash":
          time = 10.0;
          break;
        case "First Wort":
          time = 20.0;
          break;
        case "Boil":
          time = parseFloat(hop.Time);
          break;
        case "Aroma":
          time = parseFloat(hop.Time);
          break;
        case "Dry Hop":
          time = 0.0;
          break;
      }

      var grav_factor = 1.65 * Math.pow(0.000125, boilGravity);
      var time_factor = ( 1 - Math.exp(-0.04 * time) ) / 4.15;
      var util = grav_factor * time_factor;
      if (hop.Form === 'Pellet')
      {
        util *= 1.10;
      }
      var isoalpha = (hop.estimatedHBU() * util * 74.89 ) / batchVol;
      bitterness += isoalpha;
    });

    return bitterness * 1000.0;
  },
  estimatedSRM: function(){
    var estSRM = 0.0;
    var boilSize = parseFloat(this.BoilSize);

    angular.forEach(this.Fermentables, function (fermentable){
      estSRM += fermentable.colorPoints(boilSize);
    });

    // Use Dan A. Morey's formula
    if (estSRM > 8.0)
    {
      estSRM = (Math.pow(estSRM,0.6859)) * 1.4922;
      if (estSRM > 50)
      {
        estSRM = 50;
      }
    }
    return Math.round(estSRM);
  },
  estimatedBoilGravity: function(){
    var batchVol = parseFloat(this.BatchSize);
    var boilVol = parseFloat(this.BoilSize);
    var estimated = 1 + ( (this.estimatedOriginalGravity() - 1) * (batchVol / boilVol));
    return estimated;
  }
};

angular.module('brew-everywhere').value('Recipe', Recipe);