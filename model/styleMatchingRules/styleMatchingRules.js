angular.module('brew-everywhere').constant('styleMatchingRules', {
  styleRules: [
    {
      "name": "match og style parameters",
      "description": "matches all original gravity style parameters",
      "priority": 5,
      "on": 1,
      "condition": function (fact, cb) {
        fact.passOneMatches = [];

        angular.forEach(fact.styles, function (style) {
          console.log("Pass 1 - Evaluating style " + style.Name);
          if (fact.recipe.estimatedOriginalGravity() >= style.OGMin &&
            fact.recipe.estimatedOriginalGravity() <= style.OGMax) {
            console.log("Adding style " + style.Name + " to matches");
            fact.passOneMatches.push(style);
          }
        });

        cb(false);
      },
      "consequence": function (cb) {
        cb();
      }
    },
    {
      "name": "match fg style parameters",
      "description": "matches all final gravity style parameters",
      "priority": 4,
      "on": 1,
      "condition": function (fact, cb) {
        fact.passTwoMatches = [];

        angular.forEach(fact.passOneMatches, function (style) {
          console.log("Pass 2 - Evaluating style " + style.Name);
          if (fact.recipe.estimatedFinalGravity() >= style.FGMin &&
            fact.recipe.estimatedFinalGravity() <= style.FGMax) {
            console.log("Adding style " + style.Name + " to matches");
            fact.passTwoMatches.push(style);
          }
        });
        cb(false);
      },
      "consequence": function (cb) {
        cb();
      }
    },
    {
      "name": "match abv style parameters",
      "description": "matches all abv style parameters",
      "priority": 3,
      "on": 1,
      "condition": function (fact, cb) {
        fact.passThreeMatches = [];

        angular.forEach(fact.passTwoMatches, function (style) {
          console.log("Pass 3 - Evaluating style " + style.Name);
          if (fact.recipe.estimatedABV() >= style.ABVMin &&
            fact.recipe.estimatedABV() <= style.ABVMax) {
            console.log("Adding style " + style.Name + " to matches");
            fact.passThreeMatches.push(style);
          }
        });
        cb(false);
      },
      "consequence": function (cb) {
        cb();
      }
    },
    {
      "name": "match ibu style parameters",
      "description": "matches all ibu style parameters",
      "priority": 2,
      "on": 1,
      "condition": function (fact, cb) {
        fact.passFourMatches = [];

        angular.forEach(fact.passThreeMatches, function (style) {
          console.log("Pass 4 - Evaluating style " + style.Name);
          if (fact.recipe.estimatedIBUTinseth() >= style.IBUMin &&
            fact.recipe.estimatedIBUTinseth() <= style.IBUMax) {
            console.log("Adding style " + style.Name + " to matches");
            fact.passFourMatches.push(style);
          }
        });
        cb(false);
      },
      "consequence": function (cb) {
        cb();
      }
    },
    {
      "name": "match srm style parameters",
      "description": "matches all srm style parameters",
      "priority": 1,
      "on": 1,
      "condition": function (fact, cb) {
        fact.result = [];

        angular.forEach(fact.passFourMatches, function (style) {
          console.log("Pass 5 - Evaluating style " + style.Name);
          if (fact.recipe.estimatedSRM() >= style.ColorMin &&
            fact.recipe.estimatedSRM() <= style.ColorMax) {
            console.log("Adding style " + style.Name + " to matches");
            fact.result.push(style);
          }
        });
        cb(true);
      },
      "consequence": function (cb) {
        cb();
      }
    }
  ]
});