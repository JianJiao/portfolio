var ProjectView = require('./views/ProjectView');
var Project = require('./models/Project');
var App = require('./views/App');


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
        view.show('moveDownOut');
      }.bind(this), 0);
    },

    init: function(){
      this.app = new App();
    },

    show: function(){
      this.init();
      var model = this.app.projectsView.collection.at(0);
      model.show();
      model.hide();
      return model;
    },

    hide: function(model){
      model.hide();
    }

  };

  // test.anim();
  // test.init();
  // var model = test.show();
  // setTimeout(function(){
  //   test.hide(model);
  // }.bind(this), 3000);
  test.init();
  // test.show('slideDownOut');
  // test.anim();





});
