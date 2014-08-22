angular.module('brew-everywhere').filter('fermentableType', function () {
  return function (input, arg) {
    var result = [];

    angular.forEach(input, function(item){
      if(item.Type === arg){
        result.push(item);
      }
    });

    return result;
  };
});