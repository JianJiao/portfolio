var ProjectView = require('./views/ProjectView');
var Project = require('./models/Project');

$('document').ready(function(){
  var test = {
    anim: function(){
      var project = new Project({
        title: 'ok',
        description: 'des',
      });
      var view = new ProjectView({model: project});
      $('#projects').append(view.render().el);

      setTimeout(function(){
        view.show();
      }.bind(this), 0);
    },
  };

  test.anim();




});
