/*jshint -W117*/
angular.module('brew-everywhere', ['ui.bootstrap', 'ui.utils', 'ngRoute', 'ngAnimate']);

angular.module('brew-everywhere').config(function ($routeProvider) {

  $routeProvider.
    when('/', {templateUrl: 'partial/login/login.html'}).
    when('/home', {templateUrl: 'partial/home/home.html'}).
    when('/register', {templateUrl: 'partial/register/register.html'}).
    when('/profile', {templateUrl: 'partial/profile/profile.html'}).
    when('/calendar', {templateUrl: 'partial/calendar/calendar.html'}).
    when('/recipe', {templateUrl: 'partial/recipe/recipe.html'}).
    when('/recipe/:id', {templateUrl: 'partial/recipe/recipe.html'}).
    when('/schedulebrewday', {templateUrl: 'partial/schedulebrewday/schedulebrewday.html'}).
    when('/register', {templateUrl: 'partial/register/register.html'}).
    when('/error', {templateUrl: 'partial/error/error.html'}).
    when('/preheatmash', {templateUrl: 'partial/preheatmash/preheatmash.html'}).
    when('/mash', {templateUrl: 'partial/mash/mash.html'}).
    when('/mashout', {templateUrl: 'partial/mashout/mashout.html'}).
    when('/preheatboil', {templateUrl: 'partial/preheatboil/preheatboil.html'}).
    when('/boil', {templateUrl: 'partial/boil/boil.html'}).
    when('/startbrewing', {templateUrl: 'partial/startbrewing/startbrewing.html'}).
    /* Add New Routes Above */
    otherwise({redirectTo: '/home'});

});

angular.module('brew-everywhere').run(function ($rootScope) {

  $rootScope.safeApply = function (fn) {
    var phase = $rootScope.$$phase;
    if (phase === '$apply' || phase === '$digest') {
      if (fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };

});

angular.module('brew-everywhere')
  .run(function (logging) {
    logging.init('main');
    logging.setLogLevel(log4javascript.Level.ALL);
    logging.setLogAppender(new log4javascript.BrowserConsoleAppender());
  })
  .run(function (mongolab) {
    mongolab.setApiKey('YOUR_API_KEY');
  })
//  .run(function (facebookAuthenticate) {
//    facebookAuthenticate.setApiKey('<YOUR_API_KEY>');
//    facebookAuthenticate.init();
//  })
  .run(function (googlePlusAuthentication) {
    googlePlusAuthentication.configure({
      "clientId": "YOUR_CLIENT_ID",
      "scope": ['https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/tasks']
    });
  })
  .run(function (googleCalendar) {
    googleCalendar.init();
  })
  .run(function (googleTasks) {
    googleTasks.init();
  })
  .run(function (dialog) {
    dialog.init();
  })
  .run(function (errors) {
    errors.init();
  })
  .run(function (notification) {
    notification.init();
  })
  .run(function (authenticate) {
    authenticate.init();
  })
  .run(function (adjunctDataService) {
    adjunctDataService.init();
  })
  .run(function (brewerDataService) {
    brewerDataService.init();
  })
  .run(function (equipmentDataService) {
    equipmentDataService.init();
  })
  .run(function (fermentableDataService) {
    fermentableDataService.init();
  })
  .run(function (hopDataService) {
    hopDataService.init();
  })
  .run(function (mashProfileDataService) {
    mashProfileDataService.init();
  })
  .run(function (recipeDataService) {
    recipeDataService.init();
  })
  .run(function (styleDataService) {
    styleDataService.init();
  })
  .run(function (waterProfileDataService) {
    waterProfileDataService.init();
  })
  .run(function (yeastDataService) {
    yeastDataService.init();
  })
  .run(function (brewCalendar) {
    brewCalendar.init();
  })
  .run(function (brewingHistoryDataService) {
    brewingHistoryDataService.init();
  });



