angular.module('brew-everywhere').factory('mongolab', function ($http) {
  var apiKey = '';
  var baseUrl = 'https://api.mongolab.com/api/1/databases';

  /**
   * sets the mongolab.com api key to use for authenticaiton with service
   * @param apikey - mongolab api key
   */
  var setApiKey = function (apikey) {
    apiKey = apikey;
  };

  /**
   * returns the current api key used for authentication with service
   * @returns {string} - mongolab api key
   */
  var getApiKey = function () {
    return apiKey;
  };

  /**
   * sets the base url of the mongolab service
   * @param uri - mongolab url
   */
  var setBaseUrl = function (uri) {
    baseUrl = uri;
  };

  /**
   * returns the current base url of the mongolab service
   * @returns {string} - mongolab url
   */
  var getBaseUrl = function () {
    return baseUrl;
  };

  /**
   * performs a generic query against mongolab
   * @param database - mongolab database
   * @param collection - collection in database to query
   * @param parameters - query parameters used for the query
   * @returns {*} - a promise for the $http call
   */
  var query = function (database, collection, parameters) {
    parameters = parameters || {};
    parameters['apiKey'] = apiKey;
    var uri = baseUrl + '/' + database + '/collections/' + collection;
    return $http({method: "GET", url: uri, params: parameters, cache: false});
  };

  /**
   * performs a query on a collection by object id
   * @param database - mongolab database
   * @param collection - collection in database to query
   * @param id - id of the object to retrieve
   * @param parameters - query parameters used for the query
   * @returns {*} - a promise for the $http call
   */
  var queryById = function (database, collection, id, parameters) {
    parameters = parameters || {};
    parameters['apiKey'] = apiKey;
    var uri = baseUrl + '/' + database + '/collections/' + collection + '/' + id;
    return $http({method: "GET", url: uri, params: parameters, cache: false});
  };

  /**
   * create a new object in the given collection
   * @param database - mongolab database
   * @param collection - collection in database to create object in
   * @param object - object to insert into collection
   * @returns {*} - a promise for the $http call
   */
  var createObject = function (database, collection, object) {
    var uri = baseUrl + '/' + database + '/collections/' + collection + '?apiKey=' + apiKey;
    return $http({method: "POST", url: uri, data: angular.toJson(object), cache: false});
  };

  /**
   * updates an object in the given collection
   * @param database - mongolab database
   * @param collection - collection in database to update object in
   * @param object - object to update in collection
   * @returns {*} - a promise for the $http call
   */
  var updateObject = function (database, collection, object) {
    var uri = baseUrl + '/' + database + '/collections/' + collection + '/' + object._id.$oid + '?apiKey=' + apiKey;
    delete object._id;
    return $http({method: "PUT", url: uri, data: angular.toJson(object), cache: false});
  };

  /**
   * deletes an object in the given collection
   * @param database - mongolab database
   * @param collection - collection in database to delete object from
   * @param object - object to delete in collection
   * @returns {*} - a promise for the $http call
   */
  var deleteObject = function (database, collection, object) {
    var uri = baseUrl + '/' + database + '/collections/' + collection + '/' + object._id.$oid + '?apiKey=' + apiKey;
    return $http({method: "DELETE", url: uri, cache: false});
  };

  var mongolab = {
    setApiKey: setApiKey,
    getApiKey: getApiKey,
    setBaseUrl: setBaseUrl,
    getBaseUrl: getBaseUrl,
    query: query,
    queryById: queryById,
    create: createObject,
    update: updateObject,
    delete: deleteObject
  };

  return mongolab;
});