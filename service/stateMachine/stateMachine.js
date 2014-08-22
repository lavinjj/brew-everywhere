/*jsLint -W117*/
angular.module('brew-everywhere').factory('stateMachine', function () {
  var stateMachine = {
    activities: [],
    currentState: null,

    init: function(){
      stateMachine.activities = [];
      stateMachine.currentState = null;
    },
    /**
     * @description
     *
     * Utility method used to add activities to the state machine
     *
     * @param activity {object} containing the state machine graph nodes
     */
    addActivity: function (activity) {
      if (!stateMachine.activities) {
        stateMachine.activities = [];
      }
      stateMachine.activities.push(activity);
    },

    /**
     * @description
     *
     * Utility method used to reset the internal activities array
     */
    resetActivities: function () {
      stateMachine.activities = [];
    },

    /**
     * @description
     *
     * Returns an activity object for the given identifier
     *
     * @param activityId {string} identifier of the activity object to return
     * @returns {*} {object} the requested activity object or null if the activity is not found
     */
    getActivity: function (activityId) {
      return _.findWhere(stateMachine.activities, { id: activityId});
    },

    /**
     * @description
     *
     * Returns a transition for an activity
     *
     * @param activityId {string} activity identifier of the activity to search
     * @param transitionId {string} transition identifier to search for
     * @returns {*} {object} the requested transition object or null if the transition is not found
     */
    getTransitionForActivity: function (activityId, transitionId) {
      var transition = null;
      var activity = stateMachine.getActivity(activityId);
      if (activity) {
        transition = _.findWhere(activity['transitions'], { id: transitionId});
      }
      return transition;
    },

    /**
     * @description
     *
     * Returns a state for an activity
     *
     * @param activityId {string} activity identifier of the activity to search
     * @param stateId {string} state identifier to search for
     * @returns {*} {object} the requested state object or null if the state is not found
     */
    getStateForActivity: function (activityId, stateId) {
      var state = null;
      var activity = stateMachine.getActivity(activityId);
      if (activity) {
        state = _.findWhere(activity['states'], { id: stateId});
      }
      return state;
    },

    /**
     * @description
     *
     * Returns a state for a given transition associated with an activity
     *
     * @param activityId {string} activity identifier of the activity to search
     * @param transitionId {string} transition identifier to follow
     * @returns {*} {object} the target state for the given transition or null if the state is not found
     */
    getTargetStateForActivity: function (activityId, transitionId) {
      var state = null;
      var activity = stateMachine.getActivity(activityId);
      if (activity) {
        var transition = stateMachine.getTransitionForActivity(activityId, transitionId);
        if (transition) {
          state = _.findWhere(activity['states'], { id: transition['targetState']});
        }
      }

      return state;
    },

    /**
     * @description
     *
     * Returns the target state for the transition associated with the command of the given state object
     *
     * @param state {object} the state object instance to use
     * @param commandId {string} the command to follow
     * @returns {*} {object} the target state for the transition associated with the given command or null if the state is not found
     */
    getTargetStateForCommand: function (state, commandId) {
      var outState = null;
      var command = _.findWhere(state['commands'], { id: commandId});
      if (command) {
        outState = stateMachine.getTargetStateForActivity(state['activityId'], command['transition']);
      }

      return outState;
    }
  };

  return stateMachine;
})
  .factory('viewController', function ($location, stateMachine) {
    var controller = {
      currentState: null,
      processControllers: [],

      /**
       * @description
       *
       * utility function to populate the internal array of process controllers
       *
       * @param controller {service} business object responsible for executing business logic for a given activity
       * in the state machine
       */
      addProcessController: function (controller) {
        if (!controller.processControllers) {
          controller.processControllers = [];
        }
        controller.processControllers.push(controller);
      },

      /**
       * @description
       *
       * causes the controller to navigate to the Begin state for the given activity.
       *
       * @param activityId {string} activity identifier of the activity to use for navigation
       */
      navigateToBeginStateForActivity: function (activityId) {
        controller.navigateToStateViaActivityAndTransition(activityId, 'Begin');
      },

      /**
       * @description
       *
       * Invokes the navigation process, which will result in a redirection to
       * a new view. If the resulting state is not set, that means we redirect to the home view.
       *
       * @param activityId {string} identifier of the activity to use for navigation
       * @param transitionId {string} identifier of the transition to use for navigation
       */
      navigateToStateViaActivityAndTransition: function (activityId, transitionId) {
        // if we have a current state execute the post processing for the state
        if (controller.currentState) {
          controller.executePostProcessMethodForActivity(controller.currentState['id'], controller.currentState.activityId);
        }
        // if a new activity is specified, a transition must also be specified
        // otherwise, we are navigating within an activity, which means we have
        // a current state, and a command to execute within that state
        // anything else is incorrect usage
        if (activityId && transitionId) {
          controller.currentState = stateMachine.getTargetStateForActivity(activityId, transitionId);
        }
        // check to make sure we have a currentState
        // and return success if we do
        if (controller.currentState) {
          // execute and pre processing for the new state
          controller.executePreProcessMethodForActivity(controller.currentState['id'], controller.currentState.activityId);
          // change the view based on the new state
          $location.path(controller.currentState.Url);
        }
      },

      /**
       * @description
       *
       * Invokes the navigation process based on the given command identifier, which will result in a redirection to
       * a new view. If the resulting state is not set, that means we redirect to the home view.
       *
       * @param commandId {string} identifier of the command of the current state to use invoke the state navigation
       */
      navigateToStateUsingCommand: function (commandId) {
        // if we have a current state execute the post processing for the state
        if (controller.currentState) {
          controller.executePostProcessMethodForActivity(controller.currentState['id'], controller.currentState.activityId);
        }
        // We are navigating within an activity, which means we have
        // a current state, and a command to execute within that state
        // anything else is incorrect usage
        var command = _.findWhere(controller.currentState.commands, { id: commandId });
        if (command) {
          // execute the process method for the command
          controller.executeCommandProcessMethod(commandId, controller.currentState['id'], controller.currentState.activityId);
          // navigate to the new state based on the command
          controller.currentState = stateMachine.getTargetStateForCommand(controller.currentState, commandId);
        }
        // check to make sure we have a currentState
        // and return success if we do
        if (controller.currentState) {
          // execute and pre processing for the new state
          controller.executePreProcessMethodForActivity(controller.currentState['id'], controller.currentState.activityId);
          // change the view based on the new state
          $location.path(controller.currentState.Url);
        }
      },

      /**
       * @description
       *
       * Navigates to the specified state within the activity.
       *
       * @param stateId {string} identifier of the desired state to navigate to
       * @param activityId {string} activity identifier of the activity to use for navigation
       */
      navigateToStateWithinActivity: function (stateId, activityId) {
        // if we have a current state execute the post processing for the state
        if (controller.currentState) {
          controller.executePostProcessMethodForActivity(controller.currentState['id'], controller.currentState.activityId);
        }
        // ensure we have valid arguments
        if (stateId && activityId) {
          controller.currentState = stateMachine.getStateForActivity(activityId, stateId);
        }
        // check to make sure we have a currentState
        // and return success if we do
        if (controller.currentState) {
          // execute and pre processing for the new state
          controller.executePreProcessMethodForActivity(controller.currentState['id'], controller.currentState.activityId);
          // change the view based on the new state
          $location.path(controller.currentState.Url);
        }
      },

      /**
       * @description
       *
       * Clears the current state and redirects to the FSM home view, usually the topmost page
       * in the wizard that starts all wizard workflows.
       */
      endNavigation: function () {
        controller.currentState = null;
        $location.path('/');
      },

      /**
       * @description
       *
       * executes the Pre Process Method on the Process Controller for the given state and activity
       *
       * @param stateId {string} identifier of the state being navigate to
       * @param activityId {string} activity identifier of the activity to use for navigation
       */
      executePreProcessMethodForActivity: function (stateId, activityId) {
        var processController = _.findWhere(controller.processControllers, {activityId: activityId});
        if (processController) {
          if (typeof processController['pre' + stateId] === 'function') {
            processController['pre' + stateId]();
          }
        }
      },

      /**
       * @description
       *
       * executes the Post Process Method on the Process Controller for the given state and activity
       *
       * @param stateId {string} identifier of the state being navigate to
       * @param activityId {string} activity identifier of the activity to use for navigation
       */
      executePostProcessMethodForActivity: function (stateId, activityId) {
        var processController = _.findWhere(controller.processControllers, {activityId: activityId});
        if (processController) {
          if (typeof processController['post' + stateId] === 'function') {
            processController['post' + stateId]();
          }
        }
      },

      /**
       * @description
       *
       * executes the Process Method on the Process Controller for the command of the given state and activity
       *
       * @param commandId {string} identifier of the command method to execute
       * @param stateId {string} identifier of the state being navigate to
       * @param activityId {string} activity identifier of the activity to use for navigation
       */
      executeCommandProcessMethod: function (commandId, stateId, activityId) {
        var processController = _.findWhere(controller.processControllers, {activityId: activityId});
        if (processController) {
          if (typeof processController[stateId + commandId] === 'function') {
            processController[stateId + commandId]();
          }
        }
      }
    };

    return controller;
  });