describe('stateMachine', function() {
  var activity = {
    id: 'MainMenu',
    processController: 'MainMenuProcessController',
    title: 'Main Menu',
    description: 'UI Process flow for Main Launch View',
    transitions: [
      {id: 'exit', targetState: 'Exit'},
      {id: 'displayErrorMessage', targetState: 'Error'},
      {id: 'Begin', targetState: 'DisplayMainMenu'}
    ],
    states: [
      { id: 'Exit',
        activityId:'MainMenu',
        Url: '/',
        title: 'Exit',
        description: 'Return to Main Menu',
        commands: []
      },
      { id: 'Error',
        activityId:'MainMenu',
        Url: '/Error',
        title: 'Error',
        description: 'An error has occurred while performing the last action.',
        commands: [
          { id: 'Previous', transition: 'exit'},
          { id: 'Next', transition: 'exit'},
          { id: 'Cancel', transition: 'exit'}
        ]},
      { id: 'DisplayMainMenu',
        activityId:'MainMenu',
        Url: '/Menu',
        title: 'orderTalk',
        description: 'Superior On-Line Ordering',
        commands: [
          { id: 'Home', transition: 'home'},
          { id: 'Order', transition: 'exit'},
          { id: 'About', transition: 'exit'},
          { id: 'DisplayErrorMessage', transition: 'displayErrorMessage'}
        ]}
    ]
  };

  var second_activity = {
    id: 'Home',
    processController: 'HomeProcessController',
    title: 'Home',
    description: 'UI Process flow for Main Launch View',
    transitions: [
      {id: 'exit', targetState: 'Exit'},
      {id: 'displayErrorMessage', targetState: 'Error'},
      {id: 'Begin', targetState: 'DisplayMainMenu'}
    ],
    states: [
      { id: 'Exit',
        activityId:'MainMenu',
        Url: '/',
        title: 'Exit',
        description: 'Return to Main Menu',
        commands: []
      },
      { id: 'Error',
        activityId:'MainMenu',
        Url: '/Error',
        title: 'Error',
        description: 'An error has occurred while performing the last action.',
        commands: [
          { id: 'Previous', transition: 'exit'},
          { id: 'Next', transition: 'exit'},
          { id: 'Cancel', transition: 'exit'}
        ]},
      { id: 'DisplayMainMenu',
        activityId:'MainMenu',
        Url: '/Menu',
        title: 'orderTalk',
        description: 'Superior On-Line Ordering',
        commands: [
          { id: 'Home', transition: 'home'},
          { id: 'Order', transition: 'exit'},
          { id: 'About', transition: 'exit'},
          { id: 'DisplayErrorMessage', transition: 'displayErrorMessage'}
        ]}
    ]
  };

  var service = null;

  beforeEach(module('brew-everywhere'));

  beforeEach(inject(function ($injector){
    service = $injector.get('stateMachine');
  }));

  it('should store an activity', function(){
    service.addActivity(activity);

    expect(service.activities.length).toBe(1);
  });

  it('should remove all activities from service', function(){
    service.resetActivities();

    expect(service.activities.length).toBe(0);
  });

  it('should return the requested activity when there is only one', function(){
    service.addActivity(activity);

    var result = service.getActivity('MainMenu');

    expect(result.id).toBe('MainMenu');
  });

  it('should store more than one activity', function(){
    service.addActivity(activity);
    service.addActivity(second_activity);

    expect(service.activities.length).toBe(2);
  });

  it('should return the requested activity when more than one are available', function(){
    service.addActivity(activity);
    service.addActivity(second_activity);

    var result = service.getActivity('MainMenu');

    expect(result.id).toBe('MainMenu');

    result = service.getActivity('Home');

    expect(result.id).toBe('Home');
  });


  it('should return undefined when the requested activity does not exist', function(){
    service.addActivity(activity);

    var result = service.getActivity('Payment');

    expect(result).toBe(undefined);
  });

  it('should return the requested transition', function(){
    service.addActivity(activity);

    var result = service.getTransitionForActivity('MainMenu', 'displayErrorMessage');

    expect(result.id).toBe('displayErrorMessage');
    expect(result.targetState).toBe('Error');
  });

  it('should return undefined if the requested transition does not exist', function(){
    service.addActivity(activity);

    var result = service.getTransitionForActivity('MainMenu', 'displayPrompt');

    expect(result).toBeFalsy();
  });

  it('should return the requested state', function(){
    service.addActivity(activity);

    var result = service.getStateForActivity('MainMenu', 'DisplayMainMenu');

    expect(result.id).toBe('DisplayMainMenu');
    expect(result.Url).toBe('/Menu');
  });

  it('should return undefined if the requested state does not exist', function(){
    service.addActivity(activity);

    var result = service.getStateForActivity('MainMenu', 'DisplayPaymentPage');

    expect(result).toBeFalsy();
  });

  it('should return the target state for the given transition', function(){
    service.addActivity(activity);

    var result = service.getTargetStateForActivity('MainMenu', 'Begin');

    expect(result.id).toBe('DisplayMainMenu');
    expect(result.Url).toBe('/Menu');
  });

  it('should return null if the given transition does not exist', function(){
    service.addActivity(activity);

    var result = service.getTargetStateForActivity('MainMenu', 'Home');

    expect(result).toBeNull();
  });

  it('should return the target state for the transition associated with the given command', function(){
    service.addActivity(activity);

    var state = service.getStateForActivity('MainMenu', 'DisplayMainMenu');

    var command = _.findWhere(state.commands, { id: 'Order'});

    var result = service.getTargetStateForCommand(state, command.id);

    expect(result).not.toBeFalsy();
    expect(result.id).toBe('Exit');
    expect(result.Url).toBe('/');
  });

  it('should return null if the transition associated with the given command does not exist', function(){
    service.addActivity(activity);

    var state = service.getStateForActivity('MainMenu', 'DisplayMainMenu');

    var result = service.getTargetStateForCommand(state, 'Home');

    expect(result).toBeNull();
  });
});