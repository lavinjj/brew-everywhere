angular.module('test.mongolab', []).factory('mongolab', function ($q) {
  return {
    deferred: null,
    setApiKey: function (apikey) {
    },
    query: function (database, collection, parameters) {
      this.deferred = $q.defer();
      return this.deferred.promise;
    },
    queryById: function (database, collection, id, parameters) {
      this.deferred = $q.defer();
      return this.deferred.promise;
    },
    create: function (database, collection, object) {
      this.deferred = $q.defer();
      return this.deferred.promise;
    },
    update: function (database, collection, object) {
      this.deferred = $q.defer();
      return this.deferred.promise;
    },
    delete: function (database, collection, object) {
      this.deferred = $q.defer();
      return this.deferred.promise;
    }
  };
});

