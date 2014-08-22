angular.module('brew-everywhere')
  .filter('translateFermentableToDisplay', function () {

    return function (input) {
      var result = [];

      angular.forEach(input, function (item) {
        result.push({Name: item.Name, Type: item.Type});
      });

      return result;
    };
  });