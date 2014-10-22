angular.module('brew-everywhere').directive('uniqueEmail', function (mongolab, constants) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ctrl) {
      var getBrewerByEmailSuccessHandler = function (response) {
        if(response.data && response.data.length > 0){
          ctrl.$setValidity('uniqueEmail', false);
        }
        else{
          ctrl.$setValidity('uniqueEmail', true);
        }
      };

      var getBrewerByEmailErrorHandler = function () {
        ctrl.$setValidity('uniqueEmail', true);
      };

      ctrl.$parsers.unshift(function (viewValue) {
        // do nothing unless we match a valid email address
        if ((viewValue !== null) && (viewValue !== undefined) && (viewValue !== '') && (null !== viewValue.match(/.*@.*\..{2}/))) {
          mongolab.query(constants.mongodb.database, constants.mongodb.brewerCollection, {q: {Email: viewValue}})
            .then(getBrewerByEmailSuccessHandler, getBrewerByEmailErrorHandler);
        }

        return viewValue;
      });
    }
  };
});