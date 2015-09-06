// for those that you export in Gruntfile, they are already there
var ProjectsView = require('./ProjectsView');
var Projects = require('../collections/Projects');
var config = require('../config');

/**
* App is the presenter of the whole application
*/
var App = Backbone.View.extend({
    el: '#app',

    initialize: function(){
        this.config = config;

        // prepare the projects and create the view
        projects = new Projects(this.config.projects);
        this.projectsView = new ProjectsView({
          collection: projects,
        });
    },


});


module.exports = App;
