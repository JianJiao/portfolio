var ProjectView = require('./ProjectView');
var Project = require('../models/Project');

var ProjectsView = Backbone.View.extend({
  el: '#projects',

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
      this.$el.append(view.render().el);
      this.subviews.push(view);
    }, this);
  },

});

module.exports = ProjectsView;