angular.module('brew-everywhere').filter('filterFermentable', function () {
  return function (input, arg) {
    var result = [];

    angular.forEach(input, function (item) {
      var add = true;
      for (var key in arg) {
        if (item.hasOwnProperty(key)) {
          if (item[key] !== arg[key]) {
            add = false;
          }
        }
      }
      if (add) {
        result.push(item);
      }
    });

    return result;
  };
});