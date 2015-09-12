// for those that you export in Gruntfile, they are already there
var ProjectsView = require('./ProjectsView');
var Projects = require('../collections/Projects');
var config = require('../config');
var GroupView = require('./GroupView');

/**
* App is the presenter of the whole application
*/
var App = Backbone.View.extend({
  el: '#app',

  initialize: function(){
    this.config = config;
    this.y = this.$el.scrollTop();


    // groups
    this.introGroupView = new GroupView.IntroGroup({el: '#group1'});

    // prepare the projects and create the view
    projects = new Projects(this.config.projects);
    this.projectsView = new ProjectsView({
      collection: projects,
    });
  },

  events:{
    'scroll': 'onScroll'
  },

  getDelta: function(){
    var newY = this.$el.scrollTop();
    var yDelta = newY - this.y;
    this.y = newY;
    return yDelta;
  },

  onScroll: function(){
    this.introGroupView.onScroll(this.getDelta());
  },


});


module.exports = App;
