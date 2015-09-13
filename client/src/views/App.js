// for those that you export in Gruntfile, they are already there
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

    // prepare the projects
    this.projects = new Projects(this.config.projects);

    // intro group
    this.introGroupView = new GroupView.IntroGroup({
      el: '#group1',
      projects: this.projects,
    });

    // second group as the transition group
    var second = new GroupView.CommonGroup({
      el: '#group2',
    });
    second.addLayer('base layer');

    // all other groups with data
    var above = true;
    this.projects.each(function(project, idx){
      var groupId = '#group' + (idx + 3);
      var group = new GroupView.CommonGroup({
        el: groupId,
        model: project
      });
      if(above){
        group.addAboveLayers();
        above = false;
      }else{
        group.addBelowLayers();
        above = true;
      }
    }, this);

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
