var ProjectView = require('./ProjectView');
var Navtab = require('./Navtab');
var Project = require('../models/Project');

var ProjectsView = Backbone.View.extend({
  el: '#slideshow',

  events: function(){
    return {
      'click button': 'test',
    };
  },

  initialize: function(){
    // track subviews incase we need to remove the view
    this.subviews = [];
    this.render();
  },

  render: function(){
    this.collection.each(function(project, idx){
      view = new ProjectView({model: project});
      this.$el.find('#projects').append(view.render().el);
      this.subviews.push(view);

      navtab = new Navtab({model: project});
      console.log(navtab.el);
      this.$('nav').append(navtab.render().el);
      this.subviews.push(navtab);
    }, this);
  },

});

module.exports = ProjectsView;