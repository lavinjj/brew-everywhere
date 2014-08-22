/*jshint -W117 */
angular.module('brew-everywhere').factory('googlePlusAuthentication', function ($http, messaging, events) {
//#region internal properties
  // defaults for calling the Google+ OAuth2 Service
  var defaults = {
    // Google App Client Id
    clientId: '',
    // google plus person api url
    personInfoUrl: 'https://www.googleapis.com/plus/v1/people/me',
    // google api access privileges required by app
    scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email'],
    // type of response requested
    responseType: 'token'
  };
  // authentication results
  var accessResults = {};
  var userInfo = {};
//#endregion

//#region internal methods
  /**
   * public method that populates the internal default object with the passed
   * in object's properties
   * @param config - object instance which contains configuration properties
   * required to authenticate with Google+
   */
  var configure = function (config) {
    for (var prop in config) {
      if (config.hasOwnProperty(prop)) {
        defaults[prop] = config[prop];
      }
    }
  };

  /**
   * utility routine to determine if an ampersand needs to be added to the end of a Url
   * @param value - Url string being composed
   * @returns {*} - The Url string with or without the required ampersand
   */
  var appendSeparator = function (value) {
    if (value[value.length - 1] !== '?') {
      value += '&';
    }
    return value;
  };

  /**
   * utility method to build user profile request url
   * @returns {string} - user progfile request url
   */
  var buildUserProfileUrl = function () {
    var result = defaults.personInfoUrl + '?';
    result = appendSeparator(result);
    if (accessResults.access_token) {
      result += 'access_token=' + accessResults.access_token;
    }
    return result;
  };

  /**
   * parses the query string hash and stores the results into the internal
   * accesResults object for use by the service.
   */
  var parseToken = function (oauthToken) {
    // reset the results object
    accessResults = {};
    for (var prop in oauthToken) {
      accessResults[prop] = oauthToken[prop];
    }
  };

  /**
   * request callback handler that if the request is successful will request the
   * logged in user's google+ profile, if nto will request the user log in using Google+
   * @param response - boolean value indicating the session is valid
   */
  var tokenValidationHandler = function (response) {
    if (response) {
      requestUserInfo();
    } else {
      login();
    }
  };

  /**
   * validates the token returned from the Google+ Authorization request
   * and redirects the user to the appropriate Url.
   */
  var validateSession = function () {
    var sessionParams = {
      client_id: defaults.clientId,
      session_state: accessResults.session_state
    };

    gapi.auth.checkSessionState(sessionParams, tokenValidationHandler);
  };

  /**
   * public method to request the user be redirected to the Google+ Authentication page
   */
  var login = function () {
    var parameters = {
      client_id: defaults.clientId,
      immediate: false,
      response_type: defaults.responseType,
      scope: defaults.scope
    };
    gapi.auth.authorize(parameters, handleResponse);
  };

  /**
   * internal method used to parse the Google+ Authentication results and validate
   * the returned token. Method also redirects the user to the one of the given
   * Urls provided in login based on success or failure.
   */
  var handleResponse = function (oauthToken) {
    parseToken(oauthToken);
    if (accessResults.access_token) {
      requestUserInfo();
    } else {
      userProfileErrorHandler();
    }
  };

  /**
   * success request handler that parses the provided Google+ profile and
   * assigns it to the internal userInfo property and then redirects
   * the user to the success url
   * @param response - Google+ user profile returned from profile request
   */
  var userProfileSuccessHandler = function (response) {
    if (response && response.data) {
      userInfo = response.data;
      messaging.publish(events.message._GPLUS_AUTHENTICATED_, [userInfo]);
    }
  };

  /**
   * error handler that redirects failed authentication requests to the error url
   */
  var userProfileErrorHandler = function () {
    messaging.publish(events.message._GPLUS_FAILED_);
  };

  /**
   * requests the logged in user's Google+ profile
   */
  var requestUserInfo = function () {
    var url = buildUserProfileUrl();

    $http.get(url).then(userProfileSuccessHandler, userProfileErrorHandler);
  };

  /**
   *
   * @returns {object} signed in user's Google+ profile
   */
  var getUserProfile = function () {
    return userInfo;
  };

  /**
   * returns the Google API Access token for use in API requests
   * @returns {*} - Google API Access token
   */
  var getAccessToken = function () {
    return accessResults.access_token;
  };

  //#region messaging handlers
  var onAuthenticateHandler = function () {
    login();
  };

  messaging.subscribe(events.message._GPLUS_AUTHENTICATE_, onAuthenticateHandler);

  //#endregion

  var googlePlusAuthentication = {
    configure: configure,
    login: login,
    getUserProfile: getUserProfile,
    getAccessToken: getAccessToken
  };

  return googlePlusAuthentication;
});
