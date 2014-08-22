var Fermentable = function() {
  var self = this;
  self.Name = '';
  self.Type = ''; // can be "Grain", "Sugar", "Extract", "Dry Extract" or "Adjunct"
  self.Amount = 0.0;
  self.Yeild = 0.0; // percent
  self.Color = 0.0; // Lovibond units (SRM)
  self.AddAfterBoil = false;
  self.Origin = '';
  self.Supplier = '';
  self.Notes = '';
  self.CoarseFineDiff = 0.0; // percent
  self.Moisture = 0.0; // percent
  self.DiastaticPower = 0.0; // in lintner units
  self.Protein = 0.0; // percent
  self.MaxInBatch = 0.0; // percent
  self.RecommendMash = false;
  self.IBUGalPerPound = 0.0;
  self.DisplayAmount = '';
  self.Potential = 0.0;
  self.DisplayColor = 0.0;
  self.ExtractSubstitute = '';
};

Fermentable.prototype = {
  /**
   * calculates the gravity per pound for the fermentable
   * @param brewHouseEfficiency - the estimated brew house efficiency
   * @returns {number} - potential extract per pound for the fermentable
   */
  gravityPerPound: function(batchType, brewHouseEfficiency){
    var result = ((this.Potential - 1) * 1000.0);

    switch(batchType)
    {
      case "All Grain":
        result = result * brewHouseEfficiency;
        break;
      case "Partial Mash":
        result = result * 0.33;
        break;
      case "Extract":
        break;
    }

    return result;
  },
  /**
   * calculates the gravity for the ingredient
   * @param brewHouseEfficiency - the estimated brew house efficiency
   * @returns {number} - returns the total potential extract for the fermentable
   */
  ingredientGravity: function(batchType, brewHouseEfficiency){
    return this.Amount * (this.gravityPerPound(batchType, brewHouseEfficiency) / 1000);
  },

  /**
   * calculates the gravity points for a given recipe
   * @param batchVolume - total pre boil volume
   * @param brewHouseEfficiency - the estimated brew house efficiency
   * @returns {number} - returns the total gravity points for the fermentable
   */
  gravityPoints: function(batchType, batchVolume, brewHouseEfficiency){
    return (this.ingredientGravity(batchType, brewHouseEfficiency) / batchVolume);
  },

  /**
   * calculates the color the fermentable will contribute to a batch of
   * beer based on the amount of the feremntable used in the recipe
   * @returns {number} - the srm color value for the fermentable
   */
  srm: function(){
    return parseFloat(this.Amount) * parseFloat(this.Color);
  },

  /**
   * calculates the color the fermentable will contribute to a batch of
   * beer based on the pre-boil volume of the recipe
   * @param batchVolume - total pre-boil volume
   * @returns {number} - the srm color value for the fermentable
   */
  colorPoints: function(batchVolume){
    return this.srm() / batchVolume;
  }

};

angular.module('brew-everywhere').value('Fermentable', Fermentable);