var Brewer = function(){
    var self = this;
    self.UserName = '';
    self.FirstName = '';
    self.LastName = '';
    self.Email = '';
    self.Location = '';
    self.Bio = '';
    self.WebSite = '';
    self.Avatar = '';
    self.Photo = '';
    self.Password = '';
    self.DateJoined = '';
    self.Inventory = null;
    self.BrewerIsAdmin = false;
  };

angular.module('brew-everywhere').value('Brewer',Brewer);

