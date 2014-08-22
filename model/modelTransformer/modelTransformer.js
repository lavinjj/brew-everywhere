/*jshint -W055*/
angular.module('brew-everywhere').factory('modelTransformer',function() {

  var transformObject = function(jsonResult, constructor) {
    var model = new constructor();
    angular.extend(model, jsonResult);
    return model;
  };

  var transformResult = function(jsonResult, constructor) {
    if (angular.isArray(jsonResult)) {
      var models = [];
      angular.forEach(jsonResult, function(object) {
        models.push(transformObject(object, constructor));
      });
      return models;
    } else {
      return transformObject(jsonResult, constructor);
    }
  };

  var modelTransformer = {
      transform: transformResult
  };

	return modelTransformer;
});