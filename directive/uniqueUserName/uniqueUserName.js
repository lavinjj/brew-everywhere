angular.module('brew-everywhere').directive('uniqueUserName', function(mongolab) {
	return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ctrl) {
      var getBrewerByUserNameSuccessHandler = function (response) {
        if(response.data && response.data.length > 0) {
          ctrl.$setValidity('uniqueUserName', false);
        }
        else{
          ctrl.$setValidity('uniqueUserName', true);
        }
      };

      var getBrewerByUserNameErrorHandler = function () {
        ctrl.$setValidity('uniqueUserName', true);
      };

      ctrl.$parsers.unshift(function (viewValue) {
        // do nothing unless we match a valid email address
        if ((viewValue !== null) && (viewValue !== undefined) && (viewValue !== '')) {
          mongolab.query('brew_everywhere', 'brewers', {q: {UserName: viewValue}})
            .then(getBrewerByUserNameSuccessHandler, getBrewerByUserNameErrorHandler);
        }

        return viewValue;
      });
    }
	};
});