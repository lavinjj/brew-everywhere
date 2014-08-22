angular.module('brew-everywhere').factory('rulesEngine', function ($timeout, $parse, messaging, events) {
  var rules = [];
  var rulelist = [];
  var consequencelist = [];
  var outcome = true;
  var session = [];
  var last_session = [];
  var goal = false;
  var currentRuleIndex = 0;
  var completionCallBack;

  var init = function (ruleSet) {
    rules = ruleSet;

    rules = rules.filter(function (a) {
      if (a.on === 1){
        return a;
      }
    });

    rules = rules.sort(function (a, b) {
      return b.priority - a.priority;
    });
  };

  var execute = function (fact, callBack) {
    //these new attributes has to be there in both last session and current session so that compare works perfectly.
    fact['process'] = false;
    fact['result'] = true;

    completionCallBack = callBack;
    session = _.clone(fact);
    last_session = _.clone(fact);
    goal = false;

    doit(0);
  };

  var doit = function(x) {
    currentRuleIndex = x;

    if (x < rules.length && session.process === false) {
      outcome = true;
      rulelist = _.flatten([rules[x].condition]);
      looprules(0);
    }
    else {
      $timeout(function () {
        completionCallBack(session);
      }, 0);
    }
  };

  var looprules = function(y) {
    if (y < rulelist.length) {
      if (typeof rulelist[y] === 'string') {
        rulelist[y] = $parse(rulelist[y]);
      }

      rulelist[y].call({}, session, function (out) {
        outcome = outcome && out;
        $timeout(function () {
          return looprules(y + 1);
        }, 0);
      });
    }
    else {
      if (outcome) {
        consequencelist = _.flatten([rules[currentRuleIndex].consequence]);
        loopconsequence(0);
      }
      else {
        $timeout(function () {
          return doit(currentRuleIndex + 1);
        }, 0);
      }
    }
  };

  var loopconsequence = function(z) {
    if (z < consequencelist.length) {
      if (typeof consequencelist[z] === 'string'){
        consequencelist[z] = $parse(consequencelist[z]);
      }

      consequencelist[z].apply(session, [function () {
        if (!_.isEqual(last_session, session)) {
          last_session = _.clone(session);
          $timeout(function () {
            return doit(0);
          }, 0);
        }
        else {
          $timeout(function () {
            return loopconsequence(z + 1);
          }, 0);
        }
      }]);
    }
    else {
      $timeout(function () {
        return doit(currentRuleIndex + 1);
      }, 0);
    }
  };

  var rulesEngine = {
    init: init,
    execute: execute
  };

  return rulesEngine;
});